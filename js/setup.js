'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupContainer = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setupContainer.querySelector('.setup-close');
  var setupSaveButton = setupContainer.querySelector('.setup-submit');
  var similarListElement = setupContainer.querySelector('.setup-similar-list');
  var userNameInput = setupContainer.querySelector('.setup-user-name');
  var wizardCoatElement = setupContainer.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatInput = setupContainer.querySelector('input[name="coat-color"]');
  var wizardEyesElement = setupContainer.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInput = setupContainer.querySelector('input[name="eyes-color"]');
  var wizardFireballElement = setupContainer.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = setupContainer.querySelector('input[name="fireball-color"]');

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
    var wizardElement = similarWizardTemplate.cloneNode(true);

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

  var onSetupEscKeydown = function (event) {
    if (event.keyCode === keyCode.ESC) {
      if (document.activeElement !== userNameInput) {
        onSetupClose();
      }
    }
  };

  var onSetupOpen = function () {
    setupContainer.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscKeydown);
  };

  var onSetupClose = function () {
    setupContainer.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscKeydown);
  };

  setupOpenButton.addEventListener('click', function () {
    onSetupOpen();
  });

  setupOpenButton.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode.ENTER) {
      onSetupOpen();
    }
  });

  setupCloseButton.addEventListener('click', function () {
    onSetupClose();
  });

  setupCloseButton.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode.ENTER) {
      onSetupClose();
    }
  });

  setupSaveButton.addEventListener('click', function () {
    onSetupClose();
  });

  setupSaveButton.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode.ENTER) {
      onSetupClose();
    }
  });

  wizardCoatElement.addEventListener('click', function () {
    var coatColor = getArrayElement(coatColors);
    wizardCoatElement.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
  });

  wizardEyesElement.addEventListener('click', function () {
    var eyesColor = getArrayElement(eyesColors);
    wizardEyesElement.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
  });

  wizardFireballElement.addEventListener('click', function () {
    var fireballColor = getArrayElement(fireballColors);
    wizardFireballElement.style.backgroundColor = fireballColor;
    wizardFireballInput.value = fireballColor;
  });

  renderSimilarWizards();
  setupContainer.querySelector('.setup-similar').classList.remove('hidden');
})();
