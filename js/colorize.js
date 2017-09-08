'use strict';

(function () {
  var wizardPart = {
    FIREBALL: 'setup-fireball',
    EYES: 'wizard-eyes',
    COAT: 'wizard-coat'
  };

  var getRandomColor = function (colorsArray) {
    return colorsArray[Math.floor(colorsArray.length * Math.random())];
  };

  window.colorize = function (element, colorChangeHandler) {
    element.addEventListener('click', function () {
      var color = getRandomColor(window.data.coatColors);

      switch (element) {
        case wizardPart.EYES:
          color = getRandomColor(window.data.eyesColors);
          break;
        case wizardPart.FIREBALL:
          color = getRandomColor(window.data.fireballColors);
      }

      colorChangeHandler(color);
    });
  };
})();
