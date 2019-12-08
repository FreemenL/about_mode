const { cloneDeep } = require("lodash");
const merge = require("lodash.merge");
const inquirer = require('inquirer');
const fs = require("fs");


const mergeObj = function(current,target){
    return merge(cloneDeep(current), target);
}

const inquirerPack = ({questions,callback})=>{
    inquirer
      .prompt(questions)
      .then(callback);
}


const writeFileStream = (function(){
    let isFirst = false;
    return function(filename,content,next,options={flag:"a"}){
        if(!isFirst){
            appendFile(filename,content,next);
        }else{
            isFirst = true;
            writeFile(filename,content,options,next);
        }
    }
})();

const writeFile = function(filename,content,options,callback){
    fs.writeFile(filename,content,{...options},function (err) {
        if(err){
            console.log(err);
        }else {
            callback&&callback();
        }
    })
};

const appendFile = function(filename,content,callback){
    fs.appendFile(filename,content,function(error){
        if(error){
            console.log(error)
        }else{
            callback&&callback();
        }
    })
} 

const analyticJSON = (cityList,cityCode)=>{
    let find = false;
    let result = null;
    let index = 0;
    let basecode = String(cityCode).slice(0,5);
    while(!find){
        let currentCity = cityList[index++];
        if(typeof currentCity=="undefined"){
            break;
        }
        let code = currentCity["code"];
        let currentCode = String(code);
        let matching = currentCode.startsWith(basecode);
        if(matching && currentCode == cityCode){
            result =  currentCity;
            find = true;
        }else if(matching&&currentCity["subLevelModelList"]){
            result = analyticJSON(currentCity["subLevelModelList"],cityCode);
            find = true; 
        }
    }
    return result;
}

/**
 * 
 * @param {*} array  数组
 * @param {*} object 目标对象
 * @param {*} field  修改的对象的字段名称
 * @param {*} changeField  从数组的哪个字段上取值
 */
const modifyObjectValues =  (array,object,field,changeField) => {
    const current = object[field];
    array.forEach((items)=>{
        if(items[field]==current){
            object[field]=items[changeField];
        }
    })
}
let timeout = function (delay) {
    return new Promise((resolve, reject) => {   
          setTimeout(() => {   
                 try {
                     resolve(1)
                 } catch (e) {
                     reject(0)
                  }
          }, delay);
    })
}

const getRandom = () => {
    return 200+Math.floor(Math.random()*100);
}

exports.getRandom = getRandom;
exports.timeout = timeout;
exports.analyticJSON = analyticJSON;
exports.writeFileStream = writeFileStream;
exports.mergeObj = mergeObj;
exports.appendFile = appendFile;
exports.writeFile = writeFile;
exports.inquirerPack = inquirerPack;
exports.modifyObjectValues = modifyObjectValues;