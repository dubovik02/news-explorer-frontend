import "./style.css";
import Header from './js/components/Header';
import Footer from './js/components/Footer';
import InfoSection from './js/components/InfoSection';
import CardsList from "./js/components/card/CardsList";
import Api from "./js/api/Api";
import Card from "./js/components/card/Card";
import SearchResults from './js/components/SearchResults';
import properties from './js/constants/Properties';

/*-----------------------------Константы------------------------- */

/*-----------------------------Переменные------------------------ */
const api = new Api(properties.connection.newsexplorer.url);

/*----Заголовок----*/
let header;
let buttonLogout;
let headerButton;
let mainMenu;

const pageSection = document.querySelector('.page');
const footerSection = document.querySelector('.footer');

/*-Информационная секция-*/
let infoSection;
const infoSectionDOM = document.querySelector('.saved-result');

/*-Секция сохраненного-*/
const favSectionDOM = document.querySelector('.favorits');
let favSection = new SearchResults(favSectionDOM);

/*-Сохраненные карточки-*/
const cardsList = new CardsList();

/*-Свойства страницы-*/
const pageProperties = {
  color: properties.pages.savedpage.color,
  isloggedin: localStorage.getItem('jwt') !== null ? true : false, //признак залогенности
  username: localStorage.getItem('username') !== null ? localStorage.getItem('username') : "",//имя пользователя
  active: properties.pages.savedpage.active//активная страница
};

/*-----------------------------Функции---------------------------- */
/**
 * Формирует хедер
 */
function makeHeader() {
  header = new Header(pageProperties);
  pageSection.insertAdjacentHTML('afterbegin', header.render());
  buttonLogout = document.querySelector('.main-menu__container-link-logout');
  buttonLogout.addEventListener('click', logout);
  headerButton = document.querySelector('.header__button');
  headerButton.addEventListener('click', showMenu);
  mainMenu = document.querySelector('.main-menu');

};

/**
 * Формирует футер
 */
function makeFooter() {
  const footer = new Footer();
  footerSection.insertAdjacentHTML('afterbegin', footer.render());
}

/**
 * Формирует содержательную часть
 */
function makeSections() {

  favSection.renderPreload();
  makeCardsList()
  .then((res) => {
    makeInfoSection();
    makeFavoritesSection();
  })
  .catch((err) => {
    favSection.clearSectionContent();
    favSection.renderError(err);
    alert(err);
  });
}

/**
 * Формирует секцию статистики сохраненного
 */
function makeInfoSection() {
  infoSection = new InfoSection(infoSectionDOM, localStorage.getItem('username'), cardsList);
  infoSection.renderSection();
}

/**
 * Формриует секцию сохраненного
 */
function makeFavoritesSection() {

  favSection.clearSectionContent();
  if (cardsList.getCardListLength() !== 0) {
    favSection.renderResults(cardsList, false);
  }
  else {
    favSection.renderEmptySaved();
  }

}

/**
 * Формирует список сохраненных карточек
 */
function makeCardsList() {

  cardsList.clear();
  return api.getCards(localStorage.getItem('userid'))
    .then((res) => {
      res.forEach((cardData) => {
        const resCardData = {
          _id: cardData._id,
          keyword: cardData.keyword,
          title: cardData.title,
          description: cardData.text,
          source: {
            name: cardData.source,
          },
          publishedAt: cardData.date,
          url: cardData.link,
          urlToImage: cardData.image
        }

        const cardProp = {
          cardData: resCardData,
          isLoggedIn: false,
          onClick: deleteCard,
          keyword: resCardData.keyword,
          style: properties.card.style.del,
          afterDelete: afterDeleteCard
        }
        cardsList.addCard(new Card(cardProp));
      });
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });

}

/**
 * Удаляет карточку(коллбэк удаления)
 */
function deleteCard(cardId) {
  return api.deleteCard(cardId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

/**
 * Функция выполняемая после удаления карточки
 */
function afterDeleteCard() {
  makeCardsList()
  .then(() => {
    infoSection.clearSectionContent();
    infoSection.setCardsList(cardsList);
    infoSection.renderSection();
    if (cardsList.getCardListLength() !== 0) {
      favSection.setCurrentCardIndex(favSection.getCurrentCardIndex() - 1);
    }
    else {
      favSection.renderEmptySaved();
    }

  })
  .catch((err) => {
    alert(err);
  });
}

/**
 * Выход
 */
function logout() {
  localStorage.removeItem('userid');
  localStorage.removeItem('username');
  localStorage.removeItem('jwt');
  document.location = './index.html';
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
  if (localStorage.getItem('jwt')) {
    makeHeader();
    makeFooter();
    makeSections();
  }
  else {
    document.location = './index.html'
  }
});