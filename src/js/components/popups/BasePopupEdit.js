/**
 * Базовый класс попапа редактирования сущностей
 */

import BasePopup from './BasePopup';

export default class BaseEditPopup extends BasePopup {

    _form = null;
    _submitFunction = null;
    _formValidator = null;
    _buttonSubmit = null;
    _serverErrElement = null;
    _openNewWindowFunction = null;
    _newWindowElement = null;

    constructor(popupDOMElement, buttonOpen, buttonClose, buttonSubmit) {
        super(popupDOMElement, buttonOpen, buttonClose);
        this._buttonSubmit = buttonSubmit;
        this._setDefaultSubmitOperation();
    }

    _setDefaultSubmitOperation() {
        this._buttonSubmit.addEventListener('click', () => {
            this._submit();
        });

    }

    setFormValidator(formValidator) {
        this._formValidator = formValidator;
    }

    getFormValidator() {
        return this._formValidator;
    }

    setForm(form) {
        this._form = form;
        if (form) {
          this._form.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                if (!this._buttonSubmit.getAttribute('disabled')) {
                    this._submit();
                    event.preventDefault();
                }
            }
          });
        }
    }

    getForm() {
        return this._form;
    }

    setSubmitFunction(submitFunction) {
        this._submitFunction = submitFunction;
    }

    getSubmitFunction() {
        return this._submitFunction;
    }

    getServerErrElement() {
      return this._serverErrElement;
    }

    setServerErrElement(value) {
      this._serverErrElement = value;
    }

    _openNewWindow = () => {
      this._openNewWindowFunction.call(this);
      this.close();
    }

    setOpenNewWindowAction(newWindowElem, openNewWindowFunction) {
      this._newWindowElement = newWindowElem;
      this._openNewWindowFunction = openNewWindowFunction;

      if (this._newWindowElement) {
        this._newWindowElement.addEventListener('click', this._openNewWindow);
      }
     }

    /**
     * Функция сабмита переопределяемая в наследниках.
     */
    _submit() {
        //event.preventDefault();
        this.close();
    }

    // open() {
    //   this._form.reset();
    //   this._formValidator._checkValidity();
    //   super.open();
    // }

    close() {
      if (this.getForm()) {
        this._form.reset();
        this._formValidator._checkValidity();
      }
      super.close();
    }

}