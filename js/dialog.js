'use strict';

(function () {
  var setupContainerElement = document.querySelector('.setup');
  var setupOpenButtonElement = document.querySelector('.setup-open');
  var setupCloseButtonElement = setupContainerElement.querySelector('.setup-close');
  var setupSaveButtonElement = setupContainerElement.querySelector('.setup-submit');
  var userNameInputElement = setupContainerElement.querySelector('.setup-user-name');

  var setupOpenButtonElementClickHandler = function () {
    setupOpenHandler();
  };

  var setupCloseButtonElementClickHandler = function () {
    setupCloseHandler();
  };

  var setupSaveButtonElementClickHandler = function () {
    setupCloseHandler();
  };

  var setupOpenButtonElementKeydownHandler = function () {
    window.util.isEnterEvent(event, setupOpenHandler);
  };

  var setupCloseButtonElementKeydownHandler = function () {
    window.util.isEnterEvent(event, setupCloseHandler);
  };

  var setupSaveButtonElementKeydownHandler = function () {
    window.util.isEnterEvent(event, setupCloseHandler);
  };

  var onSetupEscKeydown = function (event) {
    if (document.activeElement !== userNameInputElement) {
      window.util.isEscEvent(event, setupCloseHandler);
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

  setupOpenButtonElement.addEventListener('click', setupOpenButtonElementClickHandler);
  setupOpenButtonElement.addEventListener('keydown', setupOpenButtonElementKeydownHandler);
  setupCloseButtonElement.addEventListener('click', setupCloseButtonElementClickHandler);
  setupCloseButtonElement.addEventListener('keydown', setupCloseButtonElementKeydownHandler);
  setupSaveButtonElement.addEventListener('click', setupSaveButtonElementClickHandler);
  setupSaveButtonElement.addEventListener('keydown', setupSaveButtonElementKeydownHandler);
})();
