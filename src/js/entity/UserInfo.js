export default class UserInfo {

  _userName;
  _userEmail;
  _userPassword;
  _userApiToken;

  constructor() {
  }

  setUserName(value) {
    this._userName = value;
  }

  getUserName() {
    return this._userName;
  }

  getUserEmail() {
    return this._userEmail;
  }

  setUserEmail(value) {
    this._userEmail = value;
  }

  getUserPassword() {
    return this._userPassword;
  }

  setUserPassword(value) {
    this._userPassword = value;
  }

  getUserApiToken() {
    return this._userApiToken;
  }
  setUserApiToken(value) {
    this._userApiToken = value;
  }

}