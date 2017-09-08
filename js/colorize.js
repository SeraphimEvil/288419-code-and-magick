'use strict';

(function () {
  var wizardPart = {
    FIREBALL: 'setup-fireball',
    EYES: 'wizard-eyes',
    COAT: 'wizard-coat'
  };

  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  var getRandomColor = function (colorsArray) {
    return colorsArray[Math.floor(colorsArray.length * Math.random())];
  };

  window.colorize = function (element, colorChangeHandler) {
    element.addEventListener('click', function () {
      var color = getRandomColor(coatColors);

      switch (element) {
        case wizardPart.EYES:
          color = getRandomColor(eyesColors);
          break;
        case wizardPart.FIREBALL:
          color = getRandomColor(fireballColors);
      }

      colorChangeHandler(color);
    });
  };
})();
