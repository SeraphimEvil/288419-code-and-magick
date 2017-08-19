'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var getArrayPos = function (array) {
    var arrayPos = Math.floor(Math.random() * array.length);
    return arrayPos;
  };

  var getArrayElement = function (array) {
    var arrayListPos = getArrayPos(array);
    var arrayElement = array[arrayListPos];
    return arrayElement;
  };

  var wizards = [
    {
      name: `${getArrayElement(WIZARD_NAMES)} ${getArrayElement(WIZARD_LAST_NAMES)}`,
      coatColor: `${getArrayElement(COAT_COLORS)}`,
      eyesColor: `${getArrayElement(EYES_COLORS)}`
    },
    {
      name: `${getArrayElement(WIZARD_NAMES)} ${getArrayElement(WIZARD_LAST_NAMES)}`,
      coatColor: `${getArrayElement(COAT_COLORS)}`,
      eyesColor: `${getArrayElement(EYES_COLORS)}`
    },
    {
      name: `${getArrayElement(WIZARD_NAMES)} ${getArrayElement(WIZARD_LAST_NAMES)}`,
      coatColor: `${getArrayElement(COAT_COLORS)}`,
      eyesColor: `${getArrayElement(EYES_COLORS)}`
    },
    {
      name: `${getArrayElement(WIZARD_NAMES)} ${getArrayElement(WIZARD_LAST_NAMES)}`,
      coatColor: `${getArrayElement(COAT_COLORS)}`,
      eyesColor: `${getArrayElement(EYES_COLORS)}`
    }
  ];

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  wizards
      .forEach(function (wizard) {
        fragment.appendChild(renderWizard(wizard));
      });
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
