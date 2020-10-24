export default class InfoSection {

  _rootElementDOM;
  _userName;
  _cardsList;

  constructor(rootElementDOM, userName, cardsList) {
    this._rootElementDOM = rootElementDOM;
    this._userName = userName;
    this._cardsList = cardsList;

  }

  renderSection() {

    const keyWords = this._cardsList.getArticlesStat().keywords;
    const keyWordsStr = keyWords.length <= 3 ? `${keyWords.toString()}` : `${keyWords[0]}, ${keyWords[1]}`

    const sectionDOM = `<h2 class="saved-result__subtitle">Сохранённые статьи</h2>
    <p class="saved-result__title">${this._userName}, у вас ${this._cardsList.getCardsList().length} сохранённых статей</p>
    <p class="saved-result__words">`
    + (keyWords.length > 0 ? 'По ключевым словам:' : ``) +
    `<span class="saved-result__bold">${keyWordsStr}</span>`
    + (keyWords.length <= 3 ? '' : ` и `) + `<span class="saved-result__bold">`
    + (keyWords.length <= 3 ? '' : `${keyWords.length - 2} другим`)
    + `</span>
    </p>`;

    this._rootElementDOM.insertAdjacentHTML('afterbegin', sectionDOM);

  }

  clearSectionContent() {
    while (this._rootElementDOM.firstChild) {
      this._rootElementDOM.removeChild(this._rootElementDOM.firstChild);
    }
  }

  getCardsList() {
    return this._cardsList;
  }

  setCardsList(value) {
    this._cardsList = value;
  }

}