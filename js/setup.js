'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;

  var wizardPart = {
    FIREBALL: 'setup-fireball',
    EYES: 'wizard-eyes',
    COAT: 'wizard-coat'
  };

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
  var wizardCoatInput = setupContainer.querySelector('input[name="coat-color"]');
  var wizardEyesInput = setupContainer.querySelector('input[name="eyes-color"]');
  var wizardFireballInput = setupContainer.querySelector('input[name="fireball-color"]');
  var userWizardSetup = setupContainer.querySelector('.setup-player');

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
        setupCloseHandler();
      }
    }
  };

  var setupOpenHandler = function () {
    setupContainer.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscKeydown);
  };

  var setupCloseHandler = function () {
    setupContainer.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscKeydown);
  };

  var setFireballColor = function (array, clickedElement) {
    var clickedElementColor = getArrayElement(array);

    clickedElement.style.backgroundColor = clickedElementColor;
    wizardFireballInput.value = clickedElementColor;
  };

  var setEyesColor = function (array, clickedElement) {
    var clickedElementColor = getArrayElement(array);

    clickedElement.style.fill = clickedElementColor;
    wizardEyesInput.value = clickedElementColor;
  };

  var setCoatColor = function (array, clickedElement) {
    var clickedElementColor = getArrayElement(array);

    clickedElement.style.fill = clickedElementColor;
    wizardCoatInput.value = clickedElementColor;
  };

  var setupOpenButtonKeydownHandler = function () {
    if (event.keyCode === keyCode.ENTER) {
      setupOpenHandler();
    }
  };

  var setupOpenButtonClickHandler = function () {
    setupOpenHandler();
  };

  var setupCloseButtonClickHandler = function () {
    setupCloseHandler();
  };

  var setupCloseButtonKeydownHandler = function () {
    if (event.keyCode === keyCode.ENTER) {
      setupCloseHandler();
    }
  };

  var setupSaveButtonClickHandler = function () {
    setupCloseHandler();
  };

  var setupSaveButtonKeydownHandler = function () {
    if (event.keyCode === keyCode.ENTER) {
      setupCloseHandler();
    }
  };

  var userWizardSetupClickHandler = function (event) {
    var clickedElement = event.target;

    switch (clickedElement.classList.value) {
      case wizardPart.FIREBALL:
        setFireballColor(fireballColors, clickedElement);
        break;

      case wizardPart.EYES:
        setEyesColor(eyesColors, clickedElement);
        break;

      case wizardPart.COAT:
        setCoatColor(coatColors, clickedElement);
    }
  };

  renderSimilarWizards();
  setupContainer.querySelector('.setup-similar').classList.remove('hidden');

  setupOpenButton.addEventListener('click', setupOpenButtonClickHandler);
  setupOpenButton.addEventListener('keydown', setupOpenButtonKeydownHandler);
  setupCloseButton.addEventListener('click', setupCloseButtonClickHandler);
  setupCloseButton.addEventListener('keydown', setupCloseButtonKeydownHandler);
  setupSaveButton.addEventListener('click', setupSaveButtonClickHandler);
  setupSaveButton.addEventListener('keydown', setupSaveButtonKeydownHandler);
  userWizardSetup.addEventListener('click', userWizardSetupClickHandler);
})();
