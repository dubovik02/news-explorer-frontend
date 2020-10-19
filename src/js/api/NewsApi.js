import BaseApi from './BaseApi';
/**
 * Класс настроек взаимодействия с сервером новостей
 * '065f57bbb65d4e54b4f78c012bc3cffd'
 * https://newsapi.org/v2/everything?q=отчетность&from=2020-10-13&to=2020-10-19&apiKey=065f57bbb65d4e54b4f78c012bc3cffd
 */

export default class NewsApi extends BaseApi {

  constructor(serverHttp, userToken) {
    super(serverHttp, userToken)
  }

  /**
   * Запрос новостей
   */
  getNews(keyWord, fromDate, toDate) {

    return this.parseResponse(fetch(
      `${this._serverHttp}/v2/everything?q=${keyWord}&from=${fromDate}&to=${toDate}&apiKey=${this._userToken}`,
      {
        method: 'GET',

        headers: {
          authorization: `${this._userToken}`
        }
      }));
  }

  /**------------------------------------------------------------------------------- */

  /**
   * Загрузка данных автора с сервера
   */
  loadAuthorData() {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/users/me`,
      {
        headers: {
          authorization: `${this._userToken}`
        }
      }));
  }

  /**
   * Загрузка данных карточек с сервера
   */
  loadCards() {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards`,
      {
        headers: {
          authorization: `${this._userToken}`
        }
      }));

  }

  /**
   * Обновляет данные автора
   * @param {string} userName имя пользователя
   * @param {string} userDesc описание пользователя
   */
  updateUserInfo(userName, userDesc) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/users/me`,
      {
        method: 'PATCH',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: userName,
          about: userDesc
        })
      }));
  }


  /**
   * Удаляет карточку с сервера
   * @param {string} cardId идентификатор карточки
   */
  deleteCard(cardId) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards/${cardId}`,
      {
        method: 'DELETE',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        }
      }));

  }

  /**
   * Like карточки
   * @param {string} cardId id карточки
   */
  likeCard(cardId) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards/like/${cardId}`,
      {
        method: 'PUT',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        }
      }));
  }

  /**
  * Dislike карточки
  * @param {string} cardId id карточки
  */

  dislikeCard(cardId) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards/like/${cardId}`,
      {
        method: 'DELETE',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        }
      }));

  }

  /**
   * Обновляет аватар
   * @param {string} newAvatarlink ссылка на аватар
   */
  updateAvatar(newAvatarlink) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/users/me/avatar`,
      {
        method: 'PATCH',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          avatar: newAvatarlink
        })
      }));
  }


  /**
   * Разбор ответа сервера
   * @param {Promise} resPromise первичный ответ
   * @returns {Promise} ошибка или ответ в формате json
   */
  parseResponse(resPromise) {

    return resPromise
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status)
        }
        else {
          return res.json();
        }
      });
  }

}
