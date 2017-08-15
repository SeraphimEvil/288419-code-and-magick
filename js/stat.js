'use strict';

var GZ_MESSAGE = 'Ура вы победили!';
var RESULT_LIST_MESSAGE = 'Список результатов:';
var HISTOGRAM_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var INDENT = 50 + HISTOGRAM_WIDTH;
var INITIAL_X = 150;
var INITIAL_Y = 240;
var RESULT_VIEW_NAME_COEFFICIENT = 20;
var RESULT_VIEW_TIME_COEFFICIENT = 10;

var resultField = {
  positionX: 100,
  positionY: 10,
  width: 420,
  height: 270
};

var resultFieldShadow = {};

for (var value in resultField) {
    resultFieldShadow[value] = resultField[value];
}

resultFieldShadow.positionX += 10;
resultFieldShadow.positionY += 10;


var drawResultFieldShadow = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

  ctx.beginPath();
  ctx.moveTo(resultFieldShadow.positionX, resultFieldShadow.positionY);
  ctx.lineTo(resultFieldShadow.positionX + resultFieldShadow.width, resultFieldShadow.positionY);
  ctx.lineTo(resultFieldShadow.positionX + resultFieldShadow.width, resultFieldShadow.positionY + resultFieldShadow.height);
  ctx.lineTo(resultFieldShadow.positionX, resultFieldShadow.positionY + resultFieldShadow.height);
  ctx.closePath();
  ctx.fill();
};

var drawResultField = function (ctx) {
  ctx.fillStyle = '#fff';

  ctx.beginPath();
  ctx.moveTo(resultField.positionX, resultField.positionY);
  ctx.lineTo(resultField.positionX + resultField.width, resultField.positionY);
  ctx.lineTo(resultField.positionX + resultField.width, resultField.positionY + resultField.height);
  ctx.lineTo(resultField.positionX, resultField.positionY + resultField.height);
  ctx.closePath();
  ctx.fill();
};

var typeMessageField = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '16px PT Mono';

  ctx.fillText(GZ_MESSAGE, 120, 40);
  ctx.fillText(RESULT_LIST_MESSAGE, 120, 60);
};

var findMax = function (times) {
  return Math.max.apply(Math, times);
};

var drawHistogram = function (ctx, index, step, time) {
  ctx.beginPath();
  ctx.moveTo(INITIAL_X + INDENT * index, INITIAL_Y);
  ctx.lineTo(INITIAL_X + HISTOGRAM_WIDTH + INDENT * index, INITIAL_Y);
  ctx.lineTo(INITIAL_X + HISTOGRAM_WIDTH + INDENT * index, INITIAL_Y - step * time);
  ctx.lineTo(INITIAL_X + INDENT * index, INITIAL_Y - step * time);
  ctx.closePath();
  ctx.fill();
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

        ctx.fillText(names[index], INITIAL_X + INDENT * index, INITIAL_Y + RESULT_VIEW_NAME_COEFFICIENT);
        ctx.fillText(time, INITIAL_X + INDENT * index, INITIAL_Y - (step * time) - RESULT_VIEW_TIME_COEFFICIENT);

        ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';

        if (names[index] === 'Вы') {
          ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        }

        drawHistogram(ctx, index, step, time);
      });
};

window.renderStatistics = function (ctx, names, times) {
  drawResultFieldShadow(ctx);
  drawResultField(ctx);
  typeMessageField(ctx);
  drawStatistic(ctx, names, times);
};
