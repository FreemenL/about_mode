# nodejs 模块知多少？

### 写在前面

目标读者：具备一定前后端nodejs编程经验并有兴趣深入了解它的模块机制。

### 前言

Node.js 作为一个足够优秀的js运行时 ，早已成为一名合格的前端攻城狮必备的技能。它几乎覆盖到了前端工程的方方面面，从构建工具到脚手架，再到模版工程，从BFF层构建到后台开发。还包括各种桌面应用等等，它几乎无孔不入。但是你真的了解他（的模块系统）么？

### 知识点剧透 

接下来我们将带着如下问题（或许在面试中也会碰到）一起深入探讨nodejs的模块系统。

1. CommonJS规范如何定义模块的？
2. 在nodejs 中引入一个模块经历了哪些步骤？
3. require 函数支持导入哪几类文件?
4. module.exports 与 exports 有什么区别？
5. nodejs 模块中的 exports, require, module, __filename, __dirname 这些值是哪儿来的 ？
6. 如何判断一个文件是否是被直接运行 ？


### CommonJS规范对模块的定义

说到nodejs的模块 不得不提commonjs 规范， commonjs 中对对模块的定义十分简单，主要分为模块引用，模块定义 ，和模块标识 三个部分。


1. 模块定义： 在模块中，上下文提供require（）方法来引入外部模块， 对应的提供了 esports  对象用于导出当前模块的方法或变量 ， 并且他是唯一的出口，在模块中还存在一个module 对象，他代表模块自身，而exports是module的属性。

2. 模块引用 ：commonjs规范中存在 require()方法，这个方法接受模块标识 ，以此引入一个模块的API到当前的上下文中

3. 模块标识 模块标识其实就是传给require 函数的参数。

### 在nodejs中引入一个模块经历了哪些步骤？

核心模块:

1.编译执行

文件模块:

1. 路径分析
2. 文件定位
3. 编译执行

### require 函数支持导入哪几类文件?

模块内的 require 函数，支持的文件类型主要有 .js 、.json 和 .node。其中 .js 和 .json 文件，相信大家都很熟悉了，.node 后缀的文件是 Node.js 的二进制文件。然而为什么 require 函数，只支持这三种文件格式呢？其实答案在模块内输出的 require 函数对象中 

我们新建一个 test.js 内容如下：

-> 代码段1
```js
console.log(require.extensions);

// [Object: null prototype] { '.js': [Function], '.json': [Function], '.node': [Function] }
```

在require 函数对象中，有一个 extensions 属性，顾名思义表示它支持的扩展名。细心的同学应该已经发现不同的后缀文件都对应的各自的加载函数，这块的逻辑对应的[源码文件](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js)在源码中可以找到如下代码

-> 代码段2 
```js
// Native extension for .js
Module._extensions['.js'] = function(module, filename) {
  if (filename.endsWith('.js')) {
    const pkg = readPackageScope(filename);
    // Function require shouldn't be used in ES modules.
    if (pkg && pkg.data && pkg.data.type === 'module') {
      const parentPath = module.parent && module.parent.filename;
      const packageJsonPath = path.resolve(pkg.path, 'package.json');
      throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
    }
  }
  const content = fs.readFileSync(filename, 'utf8');
  module._compile(content, filename);
};


// Native extension for .json
Module._extensions['.json'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');

  if (manifest) {
    const moduleURL = pathToFileURL(filename);
    manifest.assertIntegrity(moduleURL, content);
  }

  try {
    module.exports = JSONParse(stripBOM(content));
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};


// Native extension for .node
Module._extensions['.node'] = function(module, filename) {
  if (manifest) {
    const content = fs.readFileSync(filename);
    const moduleURL = pathToFileURL(filename);
    manifest.assertIntegrity(moduleURL, content);
  }
  // Be aware this doesn't use `content`
  return process.dlopen(module, path.toNamespacedPath(filename));
};
```

如上所述，可以看到不同后缀的文件对应各自的加载函数。.json文件的逻辑可以简单理解为用fs.readFileSync的方式读取到文件内容，然后将其内容格式化成对象后输出。而 .node 文件的处理方式，因为涉及到 bindings 这个后面会有专门的文章介绍这块内容。这里我们就来重点分析下 .js 文件的处理方式。

-> 代码段3 

```js
// Native extension for .js
Module._extensions['.js'] = function(module, filename) {
  if (filename.endsWith('.js')) {
    const pkg = readPackageScope(filename);
    // Function require shouldn't be used in ES modules.
    if (pkg && pkg.data && pkg.data.type === 'module') {
      const parentPath = module.parent && module.parent.filename;
      const packageJsonPath = path.resolve(pkg.path, 'package.json');
      throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
    }
  }
  const content = fs.readFileSync(filename, 'utf8');
  module._compile(content, filename);
};
```

可以看到不管用那种方处理，同样都用到了 ```fs.readFileSync``` 这个方法来加载文件内容， 处理js文件中最终调用 ```module._compile```这个函数来处理

```js
Module.prototype._compile = function(content, filename) {
  let moduleURL;
  let redirects;
  if (manifest) {
    moduleURL = pathToFileURL(filename);
    redirects = manifest.getRedirector(moduleURL);
    manifest.assertIntegrity(moduleURL, content);
  }

  maybeCacheSourceMap(filename, content, this);
  // 关键注释一 compiledWrapper
  const compiledWrapper = wrapSafe(filename, content, this);

  let inspectorWrapper = null;
  if (getOptionValue('--inspect-brk') && process._eval == null) {
    if (!resolvedArgv) {
      // We enter the repl if we're not given a filename argument.
      if (process.argv[1]) {
        try {
          resolvedArgv = Module._resolveFilename(process.argv[1], null, false);
        } catch {
          // We only expect this codepath to be reached in the case of a
          // preloaded module (it will fail earlier with the main entry)
          assert(ArrayIsArray(getOptionValue('--require')));
        }
      } else {
        resolvedArgv = 'repl';
      }
    }

    // Set breakpoint on module start
    if (resolvedArgv && !hasPausedEntry && filename === resolvedArgv) {
      hasPausedEntry = true;
      inspectorWrapper = internalBinding('inspector').callAndPauseOnStart;
    }
  }
  const dirname = path.dirname(filename);
  const require = makeRequireFunction(this, redirects);
  let result;
  const exports = this.exports;
  const thisValue = exports;
  const module = this;
  if (requireDepth === 0) statCache = new Map();
  if (inspectorWrapper) {
    result = inspectorWrapper(compiledWrapper, thisValue, exports,
                              require, module, filename, dirname);
  } else {
    // 关键注释二 result
    result = compiledWrapper.call(thisValue, exports, require, module,
                                  filename, dirname);
  }
  hasLoadedAnyUserCJSModule = true;
  if (requireDepth === 0) statCache = null;
  return result;
};
```







































