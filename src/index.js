import "./style.css";
import Header from './js/components/Header';
import Footer from './js/components/Footer';
import SignUpPopup from './js/components/popups/SignUpPopup';
import InvitePopup from './js/components/popups/InvitePopup';
import SignInPopup from './js/components/popups/SignInPopup';
import SearchResults from './js/components/SearchResults';
import FormInputsValidator from './js/validators/FormInputsValidator';
import Api from './js/api/Api';
import NewsApi from './js/api/NewsApi'
import Card from './js/components/card/Card';
import CardList from './js/components/card/CardsList';
import properties from './js/constants/Properties';

/*-----------------------------Константы------------------------- */

/*-----------------------------Переменные------------------------ */
const api = new Api(properties.connection.newsexplorer.url);
const newsApi = new NewsApi(properties.connection.newsapi.url, properties.connection.newsapi.token);
const mainSection = document.querySelector('.main-section');
const footerSection = document.querySelector('.footer');

/*----Заголовок----*/
let header;
let menuSaved;
let buttonAuth;
let buttonLogout;
let headerButton;
let mainMenu;

/*-Popups-*/
/*-Регистрация-*/
let popupSignUp;
const popupSignUpDOM = document.querySelector('.popup-signup');
const butSignUp = document.querySelector('.button__signup');
const butSignUpClose = document.querySelector('.popup-signup__close');
const signUpForm = document.getElementsByName('form-signup')[0];
const popupSignUpErrElement = signUpForm.querySelector('.popup__user-exists');
const signUpSignInLink = document.querySelector('.popup-signup__login');

/*-Успешная регистрация-*/
let popupInvite;
const popupInviteDOM = document.querySelector('.popup-invite');
const butInviteClose = document.querySelector('.popup-invite__close');
const butInviteLogin = document.querySelector('.popup-invite__login');
const inviteSignInLink = document.querySelector('.popup-invite__login');

/*-Вход-*/
let  popupSignIn;
const popupSignInDOM = document.querySelector('.popup-signin');
const butSignIn = document.querySelector('.popup__button-signin');
const butSignInClose = document.querySelector('.popup-signin__close');
const signInForm = document.getElementsByName('form-signin')[0];
const popupSignInErrElement = signInForm.querySelector('.popup__user-exists');
const signInSignUpLink = document.querySelector('.popup-signin__signup')

/*-Поиск-*/
const searchButton = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');

/*-Результаты поиска-*/
const resultsSection = document.querySelector('.result');
const searchResults = new SearchResults(resultsSection);

/*-Свойства страницы-*/
const pageProperties = {
  color: properties.pages.mainpage.color,
  isloggedin: localStorage.getItem('jwt') !== null ? true : false, //признак залогенности
  username: localStorage.getItem('username') !== null ? localStorage.getItem('username') : "",//имя пользователя
  active: properties.pages.mainpage.active//активная страница
};

/*-----------------------------Функции---------------------------- */

/**
 * Формирование хедера
 */
function makeHeader() {
  if (header) {
    document.querySelector('.main-menu__container-link-auth').classList.toggle('main-menu__link_is-hide');
    document.querySelector('.main-menu__container-link-logout').classList.toggle('main-menu__link_is-hide');
    document.querySelector('.main-menu__username-loggedin').textContent = pageProperties.username;
    menuSaved.classList.toggle('main-menu__link_is-hide');
  }
  else {
    header = new Header(pageProperties);
    mainSection.insertAdjacentHTML('afterbegin', header.render());
    menuSaved = document.querySelector('.main-menu__link-saved');
    headerButton = document.querySelector('.header__button');
    headerButton.addEventListener('click', showMenu);
    mainMenu = document.querySelector('.main-menu');
  }
};

/**
 * формирование футера
 */
function makeFooter() {
  const footer = new Footer();
  footerSection.insertAdjacentHTML('afterbegin', footer.render());
};

/**
 * Инициация попапов
 */
function initPopups() {

  /*----вход----*/
  popupSignIn = new SignInPopup(popupSignInDOM, null, butSignInClose, butSignIn);
  popupSignIn.setOpenNewWindowAction(signInSignUpLink, showSignUp);

  /*----регистрация---- */
  buttonAuth = document.querySelector('.main-menu__container-link-auth');
  buttonLogout = document.querySelector('.main-menu__container-link-logout');
  buttonLogout.addEventListener('click', logout);
  popupSignUp = new SignUpPopup(popupSignUpDOM, buttonAuth, butSignUpClose, butSignUp);
  popupSignUp.setPostSubmitFunction(showInvitePopup);
  popupSignUp.setOpenNewWindowAction(signUpSignInLink, showSignIn);

  /*----приглашение к входу---- */
  popupInvite = new InvitePopup(popupInviteDOM, butInviteClose, butInviteLogin);
  popupInvite.setOpenNewWindowAction(inviteSignInLink, showSignIn);

};

/**
 * Настройка всех попапов
 */
function setUpPopups() {
  SetUpPopup(popupSignUp, { form: signUpForm, submitFunction: signUp, serverErrElement: popupSignUpErrElement});
  SetUpPopup(popupInvite, { form: null, submitFunction: signIn});
  SetUpPopup(popupSignIn, { form: signInForm, submitFunction: signIn, serverErrElement: popupSignInErrElement});
}

/**
 * Настройка одного попапа
 */
function SetUpPopup(popup, objProp) {
  popup.setForm(objProp.form);
  popup.setServerErrElement(objProp.serverErrElement);
  popup.setFormValidator(new FormInputsValidator(popup.getForm(), properties.popupErrMsg));
  popup.setSubmitFunction(objProp.submitFunction);
}

/**
 * Регистрация
 */
function signUp(userName, userPass, userEmail) {
  return api.signUp(userName, userPass, userEmail)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

/**
 * Вход
 */
function signIn(userEmail, userPass) {
  return api.signIn(userEmail, userPass)
    .then((res) => {
      localStorage.setItem('userid', res.id);
      localStorage.setItem('username', res.name);
      localStorage.setItem('jwt', res.jwt);
      pageProperties.isloggedin = true;
      pageProperties.username = localStorage.getItem('username');
      makeHeader();
      searchResults.clearSectionContent();
      searchResults.hideSection();
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

/**
 * Выход
 */
function logout() {
  localStorage.removeItem('userid');
  localStorage.removeItem('username');
  localStorage.removeItem('jwt');
  pageProperties.isloggedin = false;
  pageProperties.username = "";
  makeHeader();
  searchResults.clearSectionContent();
  searchResults.hideSection();
}

/**
 * Поиск новостей
 */
function searchNews() {

  const keyWord = searchInput.value;
  if (!checkSearchInput(keyWord)) {
    alert('Введите ключевое слово для поиска новостей!');
    return;
  }

  const fromDateStr = parseDateToYMDString(new Date());
  const toDate = new Date();
  toDate.setDate(toDate.getDate() - properties.connection.newsapi.newsPeriod);
  const toDateStr = parseDateToYMDString(toDate);

  searchButton.setAttribute('disabled', true);
  searchResults.showSection();
  searchResults.clearSectionContent();
  searchResults.renderPreload();

  newsApi.getNews(keyWord, fromDateStr, toDateStr)
    .then((res) => {

      searchResults.clearSectionContent();
      if (res.totalResults === 0) {
        searchResults.renderNoFound();
      }
      else {
        const cardList = new CardList();
        res.articles.forEach((item) => {
          const cardProp = {
            cardData: item,
            isLoggedIn: (localStorage.getItem('jwt') ? true : false),
            onClick: addToSavedList,
            keyword: keyWord,
            style: properties.card.style.add,
            afterDelete: null
          }
          cardList.addCard(new Card(cardProp));
        });
        searchResults.renderResults(cardList, true);
      }
      searchButton.removeAttribute('disabled');

    })
    .catch((err) => {
      searchResults.clearSectionContent();
      searchResults.renderError(err);
      searchButton.removeAttribute('disabled');
    });
}

/**
 * Добавление карточки в избранное
 */
function addToSavedList(cardData) {

  return api.addCard(cardData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });

}


/*-Показ popup-ов-*/
function showInvitePopup() {
  popupInvite.open();
}

function showSignIn() {
  popupSignIn.open();
}

function showSignUp() {
  popupSignUp.open();
}

/**
 * Проверка введенного для поиска слова
 */
function checkSearchInput(value) {
  let result = true;
  if (value === "") {
    result = false;
  }

  if(value.trim().length === 0) {
    result = false;
  }

  if(value.trim().length === 1) {
    result = false;
  }

  return result;
}

/**
 * Преобразование даты в строку гггг-мм-дд
 */
function parseDateToYMDString(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * Показ меню в мобильной версии
 */

function showMenu() {
  if (mainMenu.style.display === '' || mainMenu.style.display === 'none') {
    mainMenu.style.display = 'block';
  }
  else {
    mainMenu.style.display = 'none';
  }
}

/*-----------------------------Обработчики событий------------------*/

document.addEventListener('DOMContentLoaded', () => {
  makeHeader();
  makeFooter();
  initPopups();
  setUpPopups();
});

searchButton.addEventListener('click', (event) => {
  searchNews();
});