'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var fragment = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setup = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setup.querySelector('.setup-close');
  var setupSaveButton = setup.querySelector('.setup-submit');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var userNameInput = setup.querySelector('.setup-user-name');
  var userWizardSetup = setup.querySelector('.setup-player');

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

  var onSetupEscPress = function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      closeSetup();
    }
  };

  var openSetup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
  };

  userNameInput.onfocus = function () {
    document.removeEventListener('keydown', onSetupEscPress);
  };

  userNameInput.onblur = function () {
    document.addEventListener('keydown', onSetupEscPress);
  };

  setupOpenButton.addEventListener('click', function () {
    openSetup();
  });

  setupOpenButton.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      openSetup();
    }
  });

  setupCloseButton.addEventListener('click', function () {
    closeSetup();
  });

  setupCloseButton.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      closeSetup();
    }
  });

  setupSaveButton.addEventListener('click', function () {
    closeSetup();
  });

  setupSaveButton.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      closeSetup();
    }
  });

  userWizardSetup.addEventListener('click', function (event) {
    var thisTarget = event.target;
    var thisFireballColor = getArrayElement(fireballColors);
    var thisEyesColor = getArrayElement(eyesColors);
    var thisCoatColor = getArrayElement(coatColors);

    switch (thisTarget.classList.value) {
      case 'setup-fireball':
        thisTarget.style.backgroundColor = thisFireballColor;
        setup.querySelector('input[name="fireball-color"]').value = thisFireballColor;
        break;

      case 'wizard-eyes':
        thisTarget.style.fill = thisEyesColor;
        setup.querySelector('input[name="eyes-color"]').value = thisEyesColor;
        break;

      case 'wizard-coat':
        thisTarget.style.fill = thisCoatColor;
        setup.querySelector('input[name="coat-color"]').value = thisCoatColor;
    }
  });

  for (var i = 0; i < SIMILAR_WIZARDS_COUNT; i++) {
    fragment.appendChild(renderWizard(getWizardParams()));
  }

  similarListElement.appendChild(fragment);
  setup.querySelector('.setup-similar').classList.remove('hidden');
})();
