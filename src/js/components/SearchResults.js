import CardsList from "./card/CardsList";

export default class SearchResults {

  _rootElement;
  _buttonResult;
  _resultGrid;
  _cardsList;
  _gridStep = 3;
  _currentCardIndex;

  constructor(rootElement) {
    this._rootElement = rootElement;
  }

  showSection() {
    this._rootElement.classList.add('result_is-visible');
  }

  hideSection() {
    this._rootElement.classList.remove('result_is-visible');
  }

  renderPreload() {

    const preloader = document.createElement('i');
    preloader.classList.add('circle-preloader');

    const message = document.createElement('p');
    message.classList.add('result__search-msg');
    message.textContent = 'Идет поиск новостей...';

    this._rootElement.appendChild(preloader);
    this._rootElement.appendChild(message);

  }

  renderNoFound() {

    const noFound = `<div class="result__icon result__icon_notfound"></div>
                    <p class="result__title-search-msg">Ничего не найдено</p>
                    <p class="result__search-msg">К сожалению по вашему запросу ничего не найдено</p>`;
    this._rootElement.insertAdjacentHTML('afterbegin', noFound);
  }

  renderEmptySaved() {

    const noResult = `<p class="result__search-msg">К сожалению у вас нет сохраненных статей</p>`;
    this._rootElement.insertAdjacentHTML('afterbegin', noResult);
  }

  renderError(errMsg) {
    const errMessage = `<div class="result__icon result__icon_notfound"></div>
                        <p class="result__title-search-msg">Ошибка</p>
                        <p class="result__search-msg">
                          Во время запроса произошла ошибка.
                          Возможно, проблема с соединением или сервер недоступен.
                          Подождите немного и попробуйте ещё раз (${errMsg})
                        </p>`;
    this._rootElement.insertAdjacentHTML('afterbegin', errMessage);
  }

  renderResults(cardsList, showTitle) {

    this._currentCardIndex = 0;

    this._cardsList = cardsList;

    if (showTitle) {
      const title = `<h2 class="result__title">Результаты поиска</h2>`;
      this._rootElement.insertAdjacentHTML('afterbegin', title);
    }


    this._resultGrid = document.createElement('div');
    this._resultGrid.classList.add('result__grid');

    this._addCardsToGrid();

    this._rootElement.appendChild(this._resultGrid);

    if (this._cardsList.getCardsList().length > this._gridStep) {

      const form = document.createElement('form');
      form.classList.add('result__form');

      this._buttonResult = document.createElement('button');
      this._buttonResult.setAttribute('type', 'button');
      this._buttonResult.classList.add('button');
      this._buttonResult.classList.add('button_color_white');
      this._buttonResult.classList.add('result__button');
      this._buttonResult.textContent = 'Показать еще';
      this._setButtonResultListener();

      form.appendChild(this._buttonResult);
      this._rootElement.appendChild(form);
    }

  }

  setGridStep(value) {
    this._gridStep = value;
  }

  /**
   * Добавляет в грид определенное количество карточек из списка,
   * начиная с определенной позиции
   */
  _addCardsToGrid = () => {
    for (let i = this._currentCardIndex; (i < this._cardsList.getCardsList().length && i < this._currentCardIndex + this._gridStep); i++) {
      this._resultGrid.appendChild(this._cardsList.getCardsList()[i].renderCard());
    }
    this._currentCardIndex = this._currentCardIndex + this._gridStep;

    if (this._currentCardIndex >= this._cardsList.getCardsList().length && this._buttonResult instanceof Element) {
      this._buttonResult.remove();
      this._removeButtonResultListener();
    }
  }

  clearSectionContent() {
    while (this._rootElement.firstChild) {
      this._rootElement.removeChild(this._rootElement.firstChild);
    }
  }


  getCurrentCardIndex() {
    return this._currentCardIndex;
  }

  setCurrentCardIndex(value) {
    this._currentCardIndex = value;
  }

  getCardsList() {
    return this._cardsList;
  }

  setCardsList(cardsList) {
    this._cardsList = cardsList;
  }

  _setButtonResultListener() {
    this._buttonResult.addEventListener('click', this._addCardsToGrid);
  };

  _removeButtonResultListener() {
    this._buttonResult.removeEventListener('click', this._addCardsToGrid);
  }

}