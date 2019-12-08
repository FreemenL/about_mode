
//分配长度为6个字节的buffer 

// 效率比较低  原因 先找内存 把数据改成想要的
// let buffer = Buffer.alloc(6);
// console.log(buffer);
// let buffer2 = Buffer.allocUnsafe(6);
// console.log(buffer2);
// let buffer3 = Buffer.from("夏江");
// console.log(buffer3);


// let buffer4 = Buffer.alloc(6);
// //fill  填充的值  填充的初始位置  填充的结束位置  
// buffer4.fill(3,1,4)
// buffer4.write("夏",0,3,'utf8');
// buffer4.write("江",3,3,'utf8');
// console.log(buffer4.toString());
// // 夏江 

// let buffer5 = Buffer.alloc(6);

// buffer5.writeInt8(0,0);
// buffer5.writeInt8(16,1);
// buffer5.writeInt8(32,2);

// console.log(buffer5)



// let buffer6 = Buffer.alloc(6);

//大头在前
// buffer6.writeInt16BE(256,0);
//小头在前
//buffer6.writeInt16LE(256,0);
 
// console.log(buffer6)

//Buffer 永远输出16进制 
// console.log(buffer6.toString())

// const buffer7 = Buffer.alloc(6);
// const buffer8 = buffer7.slice(2,4);

// console.log(buffer8);

// let buffer9 = Buffer.from("刘夏江");
// let buffer10 = buffer9.slice(0,5);
// let buffer11 = buffer9.slice(5);
// // console.log(buffer10.toString());
// //刘�    乱码  
// //解决乱码  
// const { StringDecoder } = require("string_decoder");
// sd = new StringDecoder; //专门用来解决乱码问题的 ；
// console.log(sd.write(buffer10)); //刘
// console.log(sd.write(buffer11)); //  夏江


//合并buffer
const buffer1 = Buffer.from("夏");
const buffer2 = Buffer.from("江");
Buffer.concat1 = function(list,total = list.reduce((len,item)=>len+item.length,0)){
    if(list.length==1){
        return list[0];
    }
    let result = Buffer.alloc(total);
    let index = 0;
    for(let buf of list){
        for(let b of buf){
            if(index<=total){
                result[index++] = b;
            }else{
                return result;
            }
        }
    }
    return result;
}

const result = Buffer.concat1([buffer1,buffer2]);

console.log(result.toString());