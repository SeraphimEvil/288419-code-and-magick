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

var rectangle = {
  POSITION_X: 100,
  POSITION_Y: 10,
  WIDTH: 420,
  HEIGHT: 270
};

var rectangleShadow = {
  POSITION_X: 110,
  POSITION_Y: 20,
  WIDTH: 420,
  HEIGHT: 270
};

var getShadowRect = function (ctx, object) {
  ctx.beginPath();
  ctx.moveTo(object.POSITION_X, object.POSITION_Y);
  ctx.lineTo(object.POSITION_X + object.WIDTH, object.POSITION_Y);
  ctx.lineTo(object.POSITION_X + object.WIDTH, object.POSITION_Y + object.HEIGHT);
  ctx.lineTo(object.POSITION_X, object.POSITION_Y + object.HEIGHT);
  ctx.closePath();
  ctx.fill();
};

var drawRectangleShadow = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

  getShadowRect(ctx, rectangleShadow);
};

var drawRectangle = function (ctx) {
  ctx.fillStyle = '#fff';

  getShadowRect(ctx, rectangle);
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
