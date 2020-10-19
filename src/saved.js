import "./style.css";
import Header from './js/components/Header';
import Footer from './js/components/Footer';
import ActivePages from './js/constants/ActivePages';

/*-----------------------------Константы------------------------- */

/*-----------------------------Переменные------------------------ */
let buttonLogout;
const pageSection = document.querySelector('.page');
const footerSection = document.querySelector('.footer');

const pageProperties = {
  color: "white", //цвет
  isloggedin: localStorage.getItem('jwt') !== null ? true : false, //признак залогенности
  username: localStorage.getItem('username') !== null ? localStorage.getItem('username') : "",//имя пользователя
  active: ActivePages.ACTIVE_PAGE_SAVED //активная страница
};

/*-----------------------------Функции---------------------------- */
function makeHeader() {
  const header = new Header(pageProperties);
  pageSection.insertAdjacentHTML('afterbegin', header.render());
  buttonLogout = document.querySelector('.main-menu__container-link-logout');
  buttonLogout.addEventListener('click', logout);

};

function makeFooter() {
  const footer = new Footer();
  footerSection.insertAdjacentHTML('afterbegin', footer.render());
}

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('jwt');
  document.location = './index.html';
}

/*-----------------------------Обработчики событий------------------*/
/**
 * Загрузка страницы
 */
document.addEventListener('DOMContentLoaded', () => {
  makeHeader();
  makeFooter();
});