'use strict';

var GRATZ_MESSAGE = 'Ура вы победили!';
var RESULT_LIST_MESSAGE = 'Список результатов:';
var HISTOGRAM_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var INDENT = 50 + HISTOGRAM_WIDTH;
var INITIAL_X = 150;
var INITIAL_Y = 240;
var RESULT_VIEW_NAME_CORRECTION = 20;
var RESULT_VIEW_TIME_CORRECTION = 10;

var Rectangle = {
  positionX: 100,
  positionY: 10,
  width: 420,
  height: 270
};


// var getShadowRect = function () {

// };
var RectangleShadow = {};

for (var value in Rectangle) {
  if (Rectangle.hasOwnProperty(value)) {
    RectangleShadow[value] = Rectangle[value];
  }
}

RectangleShadow.positionX += 10;
RectangleShadow.positionY += 10;


var drawRectangleShadow = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

  ctx.beginPath();
  ctx.moveTo(RectangleShadow.positionX, RectangleShadow.positionY);
  ctx.lineTo(RectangleShadow.positionX + RectangleShadow.width, RectangleShadow.positionY);
  ctx.lineTo(RectangleShadow.positionX + RectangleShadow.width, RectangleShadow.positionY + RectangleShadow.height);
  ctx.lineTo(RectangleShadow.positionX, RectangleShadow.positionY + RectangleShadow.height);
  ctx.closePath();
  ctx.fill();
};

var drawRectangle = function (ctx) {
  ctx.fillStyle = '#fff';

  ctx.beginPath();
  ctx.moveTo(Rectangle.positionX, Rectangle.positionY);
  ctx.lineTo(Rectangle.positionX + Rectangle.width, Rectangle.positionY);
  ctx.lineTo(Rectangle.positionX + Rectangle.width, Rectangle.positionY + Rectangle.height);
  ctx.lineTo(Rectangle.positionX, Rectangle.positionY + Rectangle.height);
  ctx.closePath();
  ctx.fill();
};

var typeMessageField = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '16px PT Mono';

  ctx.fillText(GRATZ_MESSAGE, 120, 40);
  ctx.fillText(RESULT_LIST_MESSAGE, 120, 60);
};

var findMax = function (times) {
  return Math.max.apply(Math, times);
};

var drawHistogramItem = function (ctx, index, step, time) {
  ctx.beginPath();
  ctx.moveTo(INITIAL_X + INDENT * index, INITIAL_Y);
  ctx.lineTo(INITIAL_X + HISTOGRAM_WIDTH + INDENT * index, INITIAL_Y);
  ctx.lineTo(INITIAL_X + HISTOGRAM_WIDTH + INDENT * index, INITIAL_Y - step * time);
  ctx.lineTo(INITIAL_X + INDENT * index, INITIAL_Y - step * time);
  ctx.closePath();
  ctx.fill();
};

var drawHistogramItemName = function (ctx, names, index) {
  ctx.fillText(names[index], INITIAL_X + INDENT * index, INITIAL_Y + RESULT_VIEW_NAME_CORRECTION);
};

var drawHistogramItemTime = function (ctx, time, index, step) {
  ctx.fillText(time, INITIAL_X + INDENT * index, INITIAL_Y - (step * time) - RESULT_VIEW_TIME_CORRECTION);
};

var drawStatistic = function (ctx, names, times) {
  var max = findMax(times);
  var randomOpacity;
  var step = HISTOGRAM_HEIGHT / max;


  times
      .forEach(function (time, index) {
        time = Math.floor(time);
        randomOpacity = Math.random();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        drawHistogramItemName(ctx, names, index);
        drawHistogramItemTime(ctx, time, index, step);

        ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';

        if (names[index] === 'Вы') {
          ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        }

        drawHistogramItem(ctx, index, step, time);
      });
};

window.renderStatistics = function (ctx, names, times) {
  drawRectangleShadow(ctx);
  drawRectangle(ctx);
  typeMessageField(ctx);
  drawStatistic(ctx, names, times);
};
