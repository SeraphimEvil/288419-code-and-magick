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

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content;
  var setupContainerElement = document.querySelector('.setup');
  var setupOpenButtonElement = document.querySelector('.setup-open');
  var setupCloseButtonElement = setupContainerElement.querySelector('.setup-close');
  var setupSaveButtonElement = setupContainerElement.querySelector('.setup-submit');
  var similarListElement = setupContainerElement.querySelector('.setup-similar-list');
  var userNameInputElement = setupContainerElement.querySelector('.setup-user-name');
  var wizardCoatInputElement = setupContainerElement.querySelector('input[name="coat-color"]');
  var wizardEyesInputElement = setupContainerElement.querySelector('input[name="eyes-color"]');
  var wizardFireballInputElement = setupContainerElement.querySelector('input[name="fireball-color"]');
  var userWizardSetupElement = setupContainerElement.querySelector('.setup-player');

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

  var onSetupEscKeydown = function (event) {
    if (event.keyCode === keyCode.ESC) {
      if (document.activeElement !== userNameInputElement) {
        setupCloseHandler();
      }
    }
  };

  var setupOpenHandler = function () {
    setupContainerElement.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscKeydown);
  };

  var setupCloseHandler = function () {
    setupContainerElement.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscKeydown);
  };

  var setFireballColor = function (array, clickedElement) {
    var clickedElementColor = getArrayElement(array);

    clickedElement.style.backgroundColor = clickedElementColor;
    wizardFireballInputElement.value = clickedElementColor;
  };

  var setEyesColor = function (array, clickedElement) {
    var clickedElementColor = getArrayElement(array);

    clickedElement.style.fill = clickedElementColor;
    wizardEyesInputElement.value = clickedElementColor;
  };

  var setCoatColor = function (array, clickedElement) {
    var clickedElementColor = getArrayElement(array);

    clickedElement.style.fill = clickedElementColor;
    wizardCoatInputElement.value = clickedElementColor;
  };

  var setupOpenButtonElementKeydownHandler = function () {
    if (event.keyCode === keyCode.ENTER) {
      setupOpenHandler();
    }
  };

  var setupOpenButtonElementClickHandler = function () {
    setupOpenHandler();
  };

  var setupCloseButtonElementClickHandler = function () {
    setupCloseHandler();
  };

  var setupCloseButtonElementKeydownHandler = function () {
    if (event.keyCode === keyCode.ENTER) {
      setupCloseHandler();
    }
  };

  var setupSaveButtonElementClickHandler = function () {
    setupCloseHandler();
  };

  var setupSaveButtonElementKeydownHandler = function () {
    if (event.keyCode === keyCode.ENTER) {
      setupCloseHandler();
    }
  };

  var userWizardSetupElementClickHandler = function (event) {
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
  setupContainerElement.querySelector('.setup-similar').classList.remove('hidden');

  setupOpenButtonElement.addEventListener('click', setupOpenButtonElementClickHandler);
  setupOpenButtonElement.addEventListener('keydown', setupOpenButtonElementKeydownHandler);
  setupCloseButtonElement.addEventListener('click', setupCloseButtonElementClickHandler);
  setupCloseButtonElement.addEventListener('keydown', setupCloseButtonElementKeydownHandler);
  setupSaveButtonElement.addEventListener('click', setupSaveButtonElementClickHandler);
  setupSaveButtonElement.addEventListener('keydown', setupSaveButtonElementKeydownHandler);
  userWizardSetupElement.addEventListener('click', userWizardSetupElementClickHandler);
})();
