'use strict';

var createResultField = (ctx) => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(110, 20);
  ctx.lineTo(530, 20);
  ctx.lineTo(530, 290);
  ctx.lineTo(110, 290);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();


  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(100, 10);
  ctx.lineTo(520, 10);
  ctx.lineTo(520, 280);
  ctx.lineTo(100, 280);
  ctx.closePath();
  ctx.fill();
};

var typeMessageOnField = (ctx) => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '16px PT Mono';

  var GZ_MESSAGE = 'Ура вы победили!';
  var RESULT_LIST_MESSAGE = 'Список результатов:';

  ctx.fillText(GZ_MESSAGE, 120, 40);
  ctx.fillText(RESULT_LIST_MESSAGE, 120, 60);
};

var findMax = (times) => {
  return Math.max.apply(null, times);
};

window.renderStatistics = function (ctx, names, times) {
  createResultField(ctx);
  typeMessageOnField(ctx);

  var max = findMax(times);
  var HISTOGRAM_WIDTH = 40;
  var HISTOGRAM_HEIGHT = 150;
  var INDENT = 50 + HISTOGRAM_WIDTH;
  var INITIAL_X = 150;
  var INITIAL_Y = 250;
  var RESULT_VIEW_COEFFICIENT = 20;

  var randomOpacity;
  var step = HISTOGRAM_HEIGHT / (max - 0);


  for (var i = 0; i < times.length; i++) {
    times[i] = Math.floor(times[i]);
    randomOpacity = Math.random();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

    ctx.fillText(names[i], INITIAL_X + INDENT * i, INITIAL_Y + RESULT_VIEW_COEFFICIENT);
    ctx.fillText(times[i], INITIAL_X + INDENT * i, (step * times[i]) - RESULT_VIEW_COEFFICIENT);

    ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.beginPath();
    ctx.moveTo(INITIAL_X + INDENT * i, INITIAL_Y);
    ctx.lineTo((INITIAL_X + HISTOGRAM_WIDTH) + INDENT * i, INITIAL_Y);
    ctx.lineTo((INITIAL_X + HISTOGRAM_WIDTH) + INDENT * i, step * times[i]);
    ctx.lineTo(INITIAL_X + INDENT * i, step * times[i]);
    ctx.closePath();
    ctx.fill();
  }
};
