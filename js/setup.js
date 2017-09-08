'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;

  var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content;
  var setupContainerElement = document.querySelector('.setup');
  var similarListElement = setupContainerElement.querySelector('.setup-similar-list');

  var userWizardSetupElement = setupContainerElement.querySelector('.setup-player');
  var userWizardCoatElement = userWizardSetupElement.querySelector('.wizard-coat');
  var userWizardEyesElement = userWizardSetupElement.querySelector('.wizard-eyes');
  var userWizardFireballElement = userWizardSetupElement.querySelector('.setup-fireball');
  var wizardCoatInputElement = setupContainerElement.querySelector('input[name="coat-color"]');
  var wizardEyesInputElement = setupContainerElement.querySelector('input[name="eyes-color"]');
  var wizardFireballInputElement = setupContainerElement.querySelector('input[name="fireball-color"]');

  var getRandomArrayPos = function (arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  };

  var getArrayElement = function (array) {
    var arrayLength = array.length;
    var arrayListPos = getRandomArrayPos(arrayLength);
    var arrayElement = array[arrayListPos];
    return arrayElement;
  };

  var getWizardParams = function () {
    return {
      name: getArrayElement(wizardNames) + ' ' + getArrayElement(wizardLastNames),
      coatColor: getArrayElement(coatColors),
      eyesColor: getArrayElement(eyesColors)
    };
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderSimilarWizards = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < SIMILAR_WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(getWizardParams()));
    }

    similarListElement.appendChild(fragment);
  };

  window.colorize(userWizardCoatElement, function (color) {
    userWizardCoatElement.style.fill = color;
    wizardCoatInputElement.value = color;
  });

  window.colorize(userWizardEyesElement, function (color) {
    userWizardEyesElement.style.fill = color;
    wizardEyesInputElement.value = color;
  });

  window.colorize(userWizardFireballElement, function (color) {
    userWizardFireballElement.style.backgroundColor = color;
    wizardFireballInputElement.value = color;
  });

  renderSimilarWizards();
  setupContainerElement.querySelector('.setup-similar').classList.remove('hidden');
})();
