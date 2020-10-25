import BaseEditPopup from "./BasePopupEdit";

/**
 * Попап входа
 */
export default class SignInPopup extends BaseEditPopup {

  constructor(popupDOMElement, buttonOpen, buttonClose, buttonSubmit) {
    super(popupDOMElement, buttonOpen, buttonClose, buttonSubmit);
  }

  setDefaultError() {
    this.getServerErrElement().textContent = `Неверный логин или пароль`;
  }

  open() {
    this.setDefaultError();
    this.getServerErrElement().classList.remove('popup__user-exists_is-visible');
    super.open();
  }

  _submit() {
    const butText = this._buttonSubmit.textContent;
    this._setButtonSubmitStatus("Проверка ....", true);
    const email = this.getForm().elements.email.value;
    const pass = this.getForm().elements.password.value;
    this.getSubmitFunction().call(this, email, pass)
      .then((res) => {
        this._setButtonSubmitStatus(butText, false);
        super._submit();
        return res;
      })
      .catch((err) => {
        err.json()
        .then((errRes) => {
          this._handleError(errRes, butText);
        });
      });
  }
}