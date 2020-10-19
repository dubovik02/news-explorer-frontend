import BaseEditPopup from './BasePopupEdit';

export default class UserPopup extends BaseEditPopup {

  _postSubmitFunction;
  _name;
  _password;
  _email;

  constructor(popupDOMElement, buttonOpen, buttonClose, buttonSubmit) {
    super(popupDOMElement, buttonOpen, buttonClose, buttonSubmit);
  }

  getName() {
    return this._name;
  }

  setName(value) {
    this._name = value;
  }

  getPassword() {
    return this._password;
  }
  setPassword(value) {
    this._password = value;
  }

  getEmail() {
    return this._email;
  }
  setEmail(value) {
    this._email = value;
  }

  _setUserInfoToForm() {
    this.getForm().elements.name.value = this.getName();
    this.getForm().elements.password.value = this.getPassword();
    this.getForm().elements.email.value = this.getEmail();

  }

  _getUserInfoFromForm() {
    this.setName(this.getForm().elements.name.value);
    this.setPassword(this.getForm().elements.password.value);
    this.setEmail(this.getForm().elements.email.value);
  }

  setPostSubmitFunction(value) {
    this._postSubmitFunction = value;
  }

  getPostSubmitFunction() {
    return this._postSubmitFunction;
  }

  setDefaultError() {
    this.getServerErrElement().textContent = `Такой пользователь уже есть`;
  }

  open() {
    this.setDefaultError();
    this.getServerErrElement().classList.remove('popup__user-exists_is-visible');
    super.open();
  }

  _submit() {
    const butText = this._buttonSubmit.textContent;
    this._buttonSubmit.textContent = "Регистрация ....";
    this._getUserInfoFromForm();
    this.getSubmitFunction().call(this, this.getName(), this.getPassword(), this.getEmail())
      .then((res) => {
        this._buttonSubmit.textContent = butText;
        super._submit();
        this.getPostSubmitFunction().call(this);
        return res;
      })
      .catch((err) => {
        if (err !== 409) {
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