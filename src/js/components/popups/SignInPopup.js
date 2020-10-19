import BaseEditPopup from "./BasePopupEdit";

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
    this._buttonSubmit.textContent = "Проверка ....";
    const email = this.getForm().elements.email.value;
    const pass = this.getForm().elements.password.value;
    this.getSubmitFunction().call(this, email, pass)
      .then((res) => {
        this._buttonSubmit.textContent = butText;
        super._submit();
        return res;
      })
      .catch((err) => {
        if (err !== 401) {
          this.getServerErrElement().textContent = `Ошибка выполнения. Код: ${err}`;
        } else {
          this.setDefaultError();
        }
        this.getServerErrElement().classList.add('popup__user-exists_is-visible');
        this._buttonSubmit.textContent = butText;
        return err;
      });
  }
}