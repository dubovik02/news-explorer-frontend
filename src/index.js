import "./style.css";
import Header from './js/components/Header';
import Footer from './js/components/Footer';
import ActivePages from './js/constants/ActivePages';
import UserPopup from './js/components/popups/UserPopup';
import InvitePopup from './js/components/popups/InvitePopup';
import SignInPopup from './js/components/popups/SignInPopup';
import SearchResults from './js/components/SearchResults';
import FormInputsValidator from './js/validators/FormInputsValidator';
//import UserInfo from "./js/entity/UserInfo";
import Api from './js/api/Api';
import NewsApi from './js/api/NewsApi'

/*-----------------------------Константы------------------------- */

/*-Настройка поиска новостей-*/
const USER_NEWS_API_TOKEN = '065f57bbb65d4e54b4f78c012bc3cffd';
const NEWS_API_SERVER = 'https://newsapi.org';
const NEWS_PERIOD = 7;

/*-Настройка сервера news-explorer-*/
const API_SERVER = 'http://127.0.0.1:3000';

/*-----------------------------Переменные------------------------ */
//const currentUser = new UserInfo();

const api = new Api(API_SERVER, null);
const newsApi = new NewsApi(NEWS_API_SERVER, USER_NEWS_API_TOKEN);
const mainSection = document.querySelector('.main-section');
const footerSection = document.querySelector('.footer')
/*----Заголовок----*/
let header;
let buttonAuth;
let buttonLogout;
let menuSaved;

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

const pageProperties = {
  color: "black", //цвет
  isloggedin: localStorage.getItem('jwt') !== null ? true : false, //признак залогенности
  username: localStorage.getItem('username') !== null ? localStorage.getItem('username') : "",//имя пользователя
  active: ActivePages.ACTIVE_PAGE_MAIN //активная страница
};

/*-----------------------------Функции---------------------------- */
function makeHeader() {
  if (header) {
    //mainSection.firstChild.remove();
    document.querySelector('.main-menu__container-link-auth').classList.toggle('main-menu__link_is-hide');
    document.querySelector('.main-menu__container-link-logout').classList.toggle('main-menu__link_is-hide');
    document.querySelector('.main-menu__username-loggedin').textContent = pageProperties.username;
    menuSaved.classList.toggle('main-menu__link_is-hide');
  }
  else {
    header = new Header(pageProperties);
    mainSection.insertAdjacentHTML('afterbegin', header.render());
    menuSaved = document.querySelector('.main-menu__link-saved');
  }

};

function makeFooter() {
  const footer = new Footer();
  footerSection.insertAdjacentHTML('afterbegin', footer.render());
};

/**
 * Инициация попапов
 */
function setPopups() {

  /*----вход----*/
  popupSignIn = new SignInPopup(popupSignInDOM, null, butSignInClose, butSignIn);
  popupSignIn.setOpenNewWindowAction(signInSignUpLink, showSignUp);

  /*----регистрация---- */
  buttonAuth = document.querySelector('.main-menu__container-link-auth');
  buttonLogout = document.querySelector('.main-menu__container-link-logout');
  buttonLogout.addEventListener('click', logout);
  popupSignUp = new UserPopup(popupSignUpDOM, buttonAuth, butSignUpClose, butSignUp);
  popupSignUp.setPostSubmitFunction(showInvitePopup);
  popupSignUp.setOpenNewWindowAction(signUpSignInLink, showSignIn);

  /*----приглашение к входу---- */
  popupInvite = new InvitePopup(popupInviteDOM, butInviteClose, butInviteLogin);
  popupInvite.setOpenNewWindowAction(inviteSignInLink, showSignIn);

};

/**
 * Настройка всех попапов
 */
function initPopups() {
  initPopup(popupSignUp, { form: signUpForm, submitFunction: signUp, serverErrElement: popupSignUpErrElement});
  initPopup(popupInvite, { form: null, submitFunction: signIn});
  initPopup(popupSignIn, { form: signInForm, submitFunction: signIn, serverErrElement: popupSignInErrElement});
}

/**
 * Настройка одного попапа
 */
function initPopup(popup, objProp) {
  popup.setForm(objProp.form);
  popup.setServerErrElement(objProp.serverErrElement);
  const msgObj = {
    SizeErrMessage: 'Должно быть от 2 до 30 символов',
    MissingErrMessage: 'Это обязательное поле',
    LinkErrMessage: 'Здесь должна быть ссылка',
    EmailErrMessage: 'Укажите валидный e-mail',
    PasswordLengthErrMessage: 'Должно быть не менее 8 символов'
  };
  popup.setFormValidator(new FormInputsValidator(popup.getForm(), msgObj));
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
      // currentUser.setUserName(res.name);
      // currentUser.setUserEmail(res.email);
      localStorage.setItem('username', res.name);
      localStorage.setItem('jwt', res.jwt);
      pageProperties.isloggedin = true;
      pageProperties.username = localStorage.getItem('username');
      makeHeader();
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

/**
 * Показ popup
 */
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
 * Выход
 */
function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('jwt');
  pageProperties.isloggedin = false;
  pageProperties.username = "";
  makeHeader();
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
  toDate.setDate(toDate.getDate() - NEWS_PERIOD);
  const toDateStr = parseDateToYMDString(toDate);

  searchButton.setAttribute('disabled', true);
  searchResults.showSection();
  searchResults.clearSectionContent();
  searchResults.renderPreload();

  newsApi.getNews(keyWord, fromDateStr, toDateStr)
    .then((res) => {

      searchResults.clearSectionContent();
      searchResults.hideSection();
      searchButton.removeAttribute('disabled');

    })
    .catch((err) => {
      console.log(err.message);
    });
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

/*-----------------------------Обработчики событий------------------*/

document.addEventListener('DOMContentLoaded', () => {
  makeHeader();
  makeFooter();
  setPopups();
  initPopups();
});

searchButton.addEventListener('click', (event) => {
  searchNews();
});

/**
 * Обработка ошибок в диалогах
 * Константы - см. сообщения валидатора
 * Запрос логаута переды выходом
 */