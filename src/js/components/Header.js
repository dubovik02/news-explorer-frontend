import properties from '../constants/Properties';

export default class Header {

  /**
   * Свойства хедера
   */
  _props;

  _headerDOM;

  /**
   * DOM-объект блока пользователь
   */
  _userDOM;

  /**
   * Кнопка показа меню на разрешениях до 500
   */
  _headerButton;

  /**
   *
   * @param {Object} props свойства хедера
   */
  constructor(props) {
    this._props = props;
  }

  getHeaderDOM() {
    return this._headerDOM;
  }

  getUserDOM() {
    return this._userDOM;
  }

  /**
   * Возвращает DOM-элемент хедера
   */
  render() {

    const selected = this._props.active;
    const activeItem = `<li class="main-menu__item main-menu__item_selected main-menu__item_theme_${this._props.color}">`;
    const unactiveItem = `<li class="main-menu__item">`;

    this._headerDOM = `<header class="header header_theme_${this._props.color}">
              <p class="header__label header__label header__label_theme_${this._props.color}">NewsExplorer</p>
              <nav class="main-menu main-menu_theme_${this._props.color}">
                <ul class="main-menu__list main-menu__list_theme_${this._props.color}">`
                + (selected === properties.pages.mainpage.active ? activeItem : unactiveItem) +
                    `<a class="link main-menu__link" href="./index.html">Главная</a>
                  </li>`
                  + (selected === properties.pages.savedpage.active ? activeItem : unactiveItem) +
                    `<a class="link main-menu__link main-menu__link-saved`
                    + (this._props.isloggedin ? '"' : ' main-menu__link_is-hide"') +
                    ` href="./saved.html">Сохраненные статьи</a>
                  </li>`
                  + this._renderUsersBlock() +
                `</ul>
              </nav>
              <button class="header__button header__icon header__icon_theme_${this._props.color}_show"></button>
            </header>`;
    return this._headerDOM;

  }

  _renderUsersBlock() {

    const icoSrc = `./images/logout_${this._props.color}.png`;
    let userName = this._props.username;

    this._userDOM = `<li class="main-menu__item">
              <ul class="main-menu__container main-menu__container_theme_${this._props.color}">
                <li class="main-menu__item">
                  <a class="link main-menu__link main-menu__container-link main-menu__container-link-auth`
                  + (this._props.isloggedin ? ' main-menu__link_is-hide' : '') + `" href="#"">
                    <p class="main-menu__username">Авторизоваться</p>
                  </a>
                </li>
                <li class="main-menu__item">
                <a class="link main-menu__link main-menu__container-link main-menu__container-link-logout`
                + (this._props.isloggedin ? '' : ' main-menu__link_is-hide') + `" href="#"">
                    <p class="main-menu__username main-menu__username-loggedin">${userName}</p>
                    <img src="${icoSrc}" alt="выход" class="main-menu__ico"></img>
                  </a>
                </li>
              </ul>
            </li>`;

    return this._userDOM;
  }
}
