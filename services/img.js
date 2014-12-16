"use strict";

module.exports = function (width, height, callback) {
    var Canvas = require('canvas')
        , canvas = new Canvas(width, height)
        , ctx = canvas.getContext('2d');

    ctx.fillStyle="#ccc";
    ctx.fillRect(0,0,width,height);


    // 设置字体
    ctx.font = "30px Arial";
    // 设置对齐方式
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    // 设置填充颜色
    ctx.fillStyle = "#008600";
    // 设置字体内容，以及在画布上的位置
    ctx.fillText(width+'x'+height, width/2, height/2);


    var buf = canvas.toBuffer();

    callback(null, buf);
};




