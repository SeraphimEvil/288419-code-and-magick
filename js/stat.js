'use strict';

window.renderStatistics = function (ctx, names, times) {
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


  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var j = 0; j < times.length; j++) {
    var time = times[j];
    if (time > max) {
      max = time;
    }
  }

  var histogramWidth = 40;
  var barHeigth = 150;
  var step = barHeigth / (max - 0);
  var indent = 50 + histogramWidth;
  var initialX = 150;
  var initialY = 250;
  var resultViewСoefficient = 20;
  var randomOpacity;


  for (var i = 0; i < times.length; i++) {
    times[i] = Math.floor(times[i]);
    randomOpacity = Math.random();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

    ctx.fillText(names[i], initialX + indent * i, initialY + resultViewСoefficient);
    ctx.fillText(times[i], initialX + indent * i, (step * times[i]) - resultViewСoefficient);

    ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.beginPath();
    ctx.moveTo(initialX + indent * i, initialY);
    ctx.lineTo((initialX + histogramWidth) + indent * i, initialY);
    ctx.lineTo((initialX + histogramWidth) + indent * i, step * times[i]);
    ctx.lineTo(initialX + indent * i, step * times[i]);
    ctx.closePath();
    ctx.fill();
  }
};
