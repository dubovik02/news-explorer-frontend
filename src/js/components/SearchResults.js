export default class SearchResults {

  _rootElement;

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

  clearSectionContent() {
    while (this._rootElement.firstChild) {
      this._rootElement.removeChild(this._rootElement.firstChild);
    }
  }

}