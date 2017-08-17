'use strict';

var GLORY_MESSAGE = 'Ура вы победили!';
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
  HEIGHT: 270,
  COLOR: '#fff'
};

var getShadowRect = function (object) {
  var rectangleShadow = Object.assign({}, object);
  rectangleShadow.POSITION_X += 10;
  rectangleShadow.POSITION_Y += 10;
  rectangleShadow.COLOR = 'rgba(0, 0, 0, 0.7)';
  return rectangleShadow;
};

var drawRectangle = function (ctx, object) {
  ctx.fillStyle = object.COLOR;

  ctx.beginPath();
  ctx.moveTo(object.POSITION_X, object.POSITION_Y);
  ctx.lineTo(object.POSITION_X + object.WIDTH, object.POSITION_Y);
  ctx.lineTo(object.POSITION_X + object.WIDTH, object.POSITION_Y + object.HEIGHT);
  ctx.lineTo(object.POSITION_X, object.POSITION_Y + object.HEIGHT);
  ctx.closePath();
  ctx.fill();
};

var typeMessage = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '16px PT Mono';

  ctx.fillText(GLORY_MESSAGE, 120, 40);
  ctx.fillText(RESULT_LIST_MESSAGE, 120, 60);
};

var findMax = function (times) {
  return Math.max.apply(null, times);
};

var drawHistogramItemDescription = function (ctx, names, index, time, step) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

  ctx.fillText(names[index], INITIAL_X + INDENT * index, INITIAL_Y + RESULT_VIEW_NAME_CORRECTION);
  ctx.fillText(time, INITIAL_X + INDENT * index, INITIAL_Y - (step * time) - RESULT_VIEW_TIME_CORRECTION);
};

var drawHistogramItem = function (ctx, index, step, time, randomOpacity, names) {
  ctx.fillStyle = (names[index] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + randomOpacity + ')';

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

        drawHistogramItemDescription(ctx, names, index, time, step);
        drawHistogramItem(ctx, index, step, time, randomOpacity, names);
      });
};

window.renderStatistics = function (ctx, names, times) {
  drawRectangle(ctx, getShadowRect(rectangle));
  drawRectangle(ctx, rectangle);
  typeMessage(ctx);
  drawStatistic(ctx, names, times);
};
