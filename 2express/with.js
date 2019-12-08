//let obj = { name :"xiajiang",age:9 ,number: 5 ,user:{name:"lxj"}};

// with(obj){
//     console.log("hello"+name+"age"+age);
//     for(let i=0;i<number;i++){
//         console.log(i);
//     }
// }

// let str = `
//     <%if(user){%>
//         hello <%=user.name%>
//     <%} else {%>
//         hello guest
//     <%}%>
// `;

// let script = `
// let template = "";
// with(obj){
//     if(user){
//         template+="hello username";
//     } else {
//         template+="hello guest";
//     } 
// }
// return template;`;

// let fn = new Function("obj",script);

// let result = fn(obj);

// console.log(result);


let str = `
<%if(user){%>
   hello <%=user.name%>
<%}else{%>
   hello guest
<%}%>
<ul>
<%for(let i=0;i<total;i++){%>
  <li><%=i%></li>
<%}%>
</ul>
`;
//它的原理就是拼出一段函数体代码，然后把options做为作用域变量提供属性
let options = { user: { name: 'test' }, total: 10 };
function render(str, options, callback) {
    let head = "let template = ``;\nwith (options) {\n template+=`";
    str = str.replace(/<%=([\s\S]+?)%>/g, function () {
        return "${" + arguments[1] + "}";
    });
    str = str.replace(/<%([\s\S]+?)%>/g, function () {
        return "`;\n" + arguments[1] + "\n;template+=`";
    });
    let tail = "`}\n return template; ";
    let html = head + str + tail;
    let fn = new Function('options', html);
    let result = fn(options);
    return result;
}
let result = render(str, options);//hello test


