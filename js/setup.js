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

  var getWizarnName = function (names) {
    var wizardName = names[Math.floor(Math.random() * names.length)];
    return wizardName;
  };

  var getWizardLastName = function (lastNames) {
    var wizardLasnName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return wizardLasnName;
  };

  var getWizardCoatColor = function (coatColors) {
    var coatColor = coatColors[Math.floor(Math.random() * coatColors.length)];
    return coatColor;
  };

  var getWizardEyesColor = function (eyesColors) {
    var eyesColor = eyesColors[Math.floor(Math.random() * eyesColors.length)];
    return eyesColor;
  };


  var wizards = [
    {
      name: '' + getWizarnName(WIZARD_NAMES) + ' ' + getWizardLastName(WIZARD_LAST_NAMES) + '',
      coatColor: getWizardCoatColor(COAT_COLORS),
      eyesColor: getWizardEyesColor(EYES_COLORS)
    },
    {
      name: '' + getWizarnName(WIZARD_NAMES) + ' ' + getWizardLastName(WIZARD_LAST_NAMES) + '',
      coatColor: getWizardCoatColor(COAT_COLORS),
      eyesColor: getWizardEyesColor(EYES_COLORS)
    },
    {
      name: '' + getWizarnName(WIZARD_NAMES) + ' ' + getWizardLastName(WIZARD_LAST_NAMES) + '',
      coatColor: getWizardCoatColor(COAT_COLORS),
      eyesColor: getWizardEyesColor(EYES_COLORS)
    },
    {
      name: '' + getWizarnName(WIZARD_NAMES) + ' ' + getWizardLastName(WIZARD_LAST_NAMES) + '',
      coatColor: getWizardCoatColor(COAT_COLORS),
      eyesColor: getWizardEyesColor(EYES_COLORS)
    }
  ];


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  var fragment = document.createDocumentFragment();
  wizards
      .forEach(function (wizard) {
        fragment.appendChild(renderWizard(wizard));
      })
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();
