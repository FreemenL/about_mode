#!/usr/bin/env node
const fs = require("fs");
const jsonfile = require('jsonfile');
const qs = require("qs");
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const commander = require('commander');

const fetch = require("./lib/fetch");
const packageJson = require('./package.json');
const { stageOptions ,salaryOptions } = require("./config/config");
const hooks = require('./lib/hooks');
const { address } = require("./config/index");
const fetchStream = require("./lib/fetchStream");

const { 
    analyticJSON ,
    writeFile , 
    modifyObjectValues , 
    inquirerPack ,
    getRandom,
    timeout
} = require("./lib/utils");

const queue = hooks();
const screenshot = 'github.png';
const filename = "file/cityData.json";
const cachafile = "file/cachefile.json";

process.setMaxListeners(Infinity);
process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
    process.exit(1);
});

const program = new commander.Command(packageJson.name)
  .version(packageJson.version) // 设置版本号
  .arguments('<project-directory>') //获取输入参数
  .usage(`${chalk.green('<project-directory>')} [options]`)  // --help 时候输出的用例提示
  .action(name => {  //此处的name 就对应.arguments('<project-directory>') 中的参数
    projectName = name;
  })
  .option('--history', 'print history logs') //打印系统信息
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`Only ${chalk.green('<project-directory>')} is required.`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`
    );
    console.log(
      `      ${chalk.cyan(
        'https://github.com/freemenL/find-job/issues/new'
      )}`
    );
    console.log();
  })
  .parse(process.argv);

queue.tapAsync("getCity", (tag, task, result, next) => {
    const getCity = (url)=>{
        const existsFile = fs.existsSync(filename);
        if(existsFile){
            return setTimeout(()=>{
                next();
            })
        }
        fetchStream(url,filename,next,"getCityDataEnd");
    }
    if(program.history){
        jsonfile.readFile(cachafile, function (err, cache) {
            if(err){
                console.error(err);
            } 
            console.log(cache);
            process.exit(0);
        })
    }else{
        return getCity(address.getCity.url);
    }  
})

queue.tapAsync("readCityData", (tag, task, result, next) => {
    const readCityData = (url) => {
        jsonfile.readFile(filename, function (err, obj) {
            if (err){
                console.error(err);
            } 
            const cityList = obj.data.cityList;
            const result = analyticJSON(cityList,101010100)||{};
            next(result);
        })
    }
    return readCityData();
})

queue.tapAsync("readUserData", (tag, task, result, next) => {
    const readUserData = (cityData) => {
        inquirerPack({
            questions:[
                {
                    type: 'input',
                    name: 'username',
                    message: "place input your username!",
                },{
                    type: 'password',
                    name: 'password',
                    message: "place input your password!",
                },{
                    type: 'input',
                    name: 'position',
                    message: "Please enter a position!"
                },{
                    type:"list",
                    name:"stage",
                    message:"Please select the financing stage",
                    choices: stageOptions.map((items)=>items.stage),
                },{
                    type:"list",
                    name:"salary",
                    message:"Please select a salary range",
                    choices: salaryOptions.map((items)=>items.salary),
                }
            ],
            callback:function(userInput){

                modifyObjectValues(stageOptions,userInput,"stage","code");
                modifyObjectValues(salaryOptions,userInput,"salary","code");

                next({
                    userInput,
                    cityData
                });

            }
        })
    }
    return readUserData(result);
})

queue.tapAsync("searchPosition", (tag, task, result, next) => {
    const searchPosition = (options)=>{
        const query = qs.stringify({ 
            query: result.userInput.position,
            ka:`sel-stage-${result.userInput.stage}`
        });
        options.url = options.url.replace(`job_detail`,`c${result.cityData.code}/y_${result.userInput.salary}-t_${result.userInput.stage}`)
        options.url += "?"+query;
        fetch(options).then((data)=>{
            let jobDetail = [];
            let companyRegExp = /<a href="\/gongsi\/.*?" .*?>(.*?)<\/a>/g;
            let companyContent = data.match(companyRegExp).map((item)=>item.replace(/(<.*?>|<\/.*?>)/g,''));
            let salaryRegExp =/<span class="red">(.*?)<\/span>/g;
            let salaryContent = data.match(salaryRegExp).map((item)=>item.replace(/(<.*?>|<\/.*?>)/g,''));
            let regExp =  /\/job_detail\/.*?\.html"/gi;
            let taskArray = data.match(regExp).map((src)=>`https://www.zhipin.com${src}`);

            jobDetail = taskArray.map((item,index)=>({
                company: companyContent[index],
                salary: salaryContent[index],
                page: item
            }));

            next({taskArray,userInput:result.userInput,jobDetail});
        });
    }
    return searchPosition(address.search);
})

queue.tapAsync("getPage", (tag, task, result, next) => {
    const getPage = async (options) => {
        console.log("request...");
        const length = options.taskArray.length;
        let idx = 0;
            ! async function nexts(){
                let goOn = true;
                if(idx<length){
                    const target = options.taskArray[idx].replace(`"`,"");
                    const existsFile = await fs.existsSync(cachafile);
                    let writeConetnt;
                    if(existsFile){

                        const obj = await new Promise((resolve,reject)=>{
                            jsonfile.readFile(cachafile)
                            .then(datas => resolve(datas))
                            .catch(error => reject(error))
                        });

                        obj.forEach(function(elem,index){
                            if(elem.page == target.trim()){
                                goOn = false;
                            }
                        });

                        if(!goOn){
                            return nexts();
                        }

                        obj.push(options.jobDetail[idx]);
                        writeConetnt = JSON.stringify(obj).toString('utf8');
                        await writeFile(cachafile,writeConetnt,{encoding:"utf8"})

                    }else{
                        writeConetnt = JSON.stringify([options.jobDetail[idx]]).toString('utf8');
                        await writeFile(cachafile,writeConetnt,{encoding:"utf8"})
                    }
                    console.log(options.jobDetail[idx]);
                    try{
                        const browser = await puppeteer.launch({headless: false});
                        const page = await browser.newPage();
                        await page.setViewport({ width: 1440, height: 607 })
                        await page.goto(target);
                        await page.evaluate(() => {
                            Object.defineProperty(navigator, 'webdriver', {
                                get: () => undefined
                            });
                        });
                        
                        await page.evaluateOnNewDocument(() => {
                            const originalQuery = window.navigator.permissions.query;
                            return window.navigator.permissions.query = (parameters) => (
                            parameters.name === 'notifications' ?
                                Promise.resolve({ state: Notification.permission }) :
                                originalQuery(parameters)
                            );
                        });
        
                        await page.click(".btn-startchat");
                        await page.waitForSelector('.jconfirm > .jconfirm-scrollpane > .container > .row > .jconfirm-box-container > .jconfirm-box > .content-pane > .content > .sign-register > .sign-content > .inner-box > form > .text-tip > .link-signin');
                        await page.click('.jconfirm > .jconfirm-scrollpane > .container > .row > .jconfirm-box-container > .jconfirm-box > .content-pane > .content > .sign-register > .sign-content > .inner-box > form > .text-tip > .link-signin');
                        await page.waitForSelector('.jconfirm > .jconfirm-scrollpane > .container > .row > .jconfirm-box-container > .jconfirm-box > .content-pane > .content > .sign-form > .sign-content > .inner-box > form > .row-select > .ipt-wrap > .ipt-phone');
                        await page.type('.jconfirm > .jconfirm-scrollpane > .container > .row > .jconfirm-box-container > .jconfirm-box > .content-pane > .content > .sign-form > .sign-content > .inner-box > form > .row-select > .ipt-wrap > .ipt-phone', options.userInput.username);
                        await page.waitForSelector('.jconfirm > .jconfirm-scrollpane > .container > .row > .jconfirm-box-container > .jconfirm-box > .content-pane > .content > .sign-form > .sign-content > .inner-box > form > .form-row > .ipt-wrap > .ipt-pwd');
                        await page.type('.jconfirm > .jconfirm-scrollpane > .container > .row > .jconfirm-box-container > .jconfirm-box > .content-pane > .content > .sign-form > .sign-content > .inner-box > form > .form-row > .ipt-wrap > .ipt-pwd', options.userInput.password);
                        
                        const distance = 100;
                        
                        const button = await page.$('#nc_6_n1z');
                        const box = await button.boundingBox();
                        const axleX = Math.floor(box.x + box.width / 2);
                        const axleY = Math.floor(box.y + box.height / 2);

                        await page.waitFor(1200);
                        await page.mouse.move(axleX, axleY);
                        await page.mouse.down();
                        await timeout(200);
                        
                        await page.mouse.move(box.x + distance+getRandom(), axleY, { steps: 20 });
                        await page.waitFor(400);
                        await page.waitForSelector('.content > .sign-pwd > .sign-content > .inner-box > form > .form-btn > .btn');
                        await page.click('.content > .sign-pwd > .sign-content > .inner-box > form > .form-btn > .btn')
                        await page.waitForNavigation();
                        await page.goto(target);
        
                        await page.waitForSelector('#main > .job-banner > .inner > .job-primary > .job-op > .btn-container > .btn-startchat');
                        await page.click('#main > .job-banner > .inner > .job-primary > .job-op > .btn-container > .btn-startchat');
                        await timeout(500);

                        let PageRegExp =  /class="dialog-wrap greet-pop"/gi;
                        const content = await page.content();
                        const match = content.match(PageRegExp);

                        if(match!=null){
                            await page.waitForSelector('.dialog-wrap > .dialog-container > .dialog-footer > .btns > .btn-sure');
                            await page.click('.dialog-wrap > .dialog-container > .dialog-footer > .btns > .btn-sure');
                            await page.waitForNavigation();
                        }
                        console.log("-----send success-----")
                        await timeout(1200);
                        await page.screenshot({path: screenshot});
                        await page.close();
                    }catch(error){
                        console.log(error);
                    }
                    idx++;
                    nexts();
                }else{
                    next();
                    return false;
                }
            }()
    }
    return getPage(result);
})


queue.callAsync("login", () => {
    console.log("task end!");
    process.exit(0);
});
