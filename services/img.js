"use strict";

module.exports = function (width, height, bg, fc, callback) {
    var Canvas = require('canvas')
        , canvas = new Canvas(width, height)
        , ctx = canvas.getContext('2d');

    ctx.fillStyle = "#"+bg;
    ctx.fillRect(0, 0, width, height);


    if (width > 150) {
        // 设置字体
        ctx.font = "30px Arial";

    } else {
        ctx.font = "12px Arial";

    }

    // 设置对齐方式
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    // 设置填充颜色
    ctx.fillStyle = "#"+fc;
    // 设置字体内容，以及在画布上的位置
    ctx.fillText(width + 'x' + height, width / 2, height / 2);

    var buf = canvas.toBuffer();

    callback(null, buf);
};




