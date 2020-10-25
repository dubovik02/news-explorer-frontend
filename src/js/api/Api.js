import BaseApi from './BaseApi';

/**
 * Класс настроек взаимодействия с бэкенд частью
 */

export default class Api extends BaseApi {

  constructor(serverHttp) {
    super(serverHttp, null);
  }

  /**
   * Регистрация пользоваателя
   */
  signUp(userName, userPass, userEmail) {

    return this.parseResponse(fetch(`${this._serverHttp}/signup`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: userName,
          password: userPass,
          email: userEmail
        })
      }));
  }

  /**
   * Вход пользоваателя
   */
  signIn(userEmail, userPass) {

    return this.parseResponse(fetch(`${this._serverHttp}/signin`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          password: userPass,
          email: userEmail
        })
      }));
  }

  /**
   * Добавление карточки
   */
  addCard(cardData) {

    return this.parseResponse(fetch(`${this._serverHttp}/articles`,
      {
        credentials: 'include',

        method: 'POST',

        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          keyword: cardData.keyword,
          title: cardData.title,
          text: cardData.description,
          source: cardData.source.name,
          date: cardData.publishedAt,
          link: cardData.url,
          image: cardData.urlToImage
        })

      }));
  }

  /**
   * Получение списка карточек пользователя
   */
  getCards(userId) {

    return this.parseResponse(fetch(`${this._serverHttp}/articles/${userId}`,
      {
        credentials: 'include',

        method: 'GET',

        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }

      }));
  }

  /**
   * Удаляет карточку с сервера
   */
  deleteCard(cardId) {

    return this.parseResponse(fetch(`${this._serverHttp}/articles/${cardId}`,
      {
        credentials: 'include',

        method: 'DELETE',

        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      }));

  }

}
