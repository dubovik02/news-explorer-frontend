export default class Footer {

  construct() {
  }

  render() {

    const icoGit = `./images/github.png`;
    const icoFb = `./images/facebook.png`;

    return `<p class="footer__copyright">&copy;2020 Supersite, Powered by News API</p>
            <nav class="footer__nav">
              <ul class="footer__menu">
                <li class="footer__menu-item footer__menu-item_normal">
                  <a href="./index.html" class="link footer__link">Главная</a>
                </li>
                <li class="footer__menu-item footer__menu-item_normal">
                  <a href="https://praktikum.yandex.ru" class="link footer__link" target="_blank">Яндекс.Практикум</a>
                </li>
              </ul>
              <ul class="footer__icon-container">
                <li class="footer__menu-item footer__menu-item_icon">
                  <a href="https://github.com/dubovik02/news-explorer-frontend" class="link footer__link" target="_blank">
                    <img src="${icoGit}" alt="https://github.com" class="footer__icon">
                  </a>
                </li>
                <li class="footer__menu-item footer__menu-item_icon">
                  <a href="https://facebook.com" class="link footer__link" target="_blank">
                    <img src="${icoFb}" alt="https://facebook.com" class="footer__icon">
                  </a>
                </li>
              </ul>
            </nav>`;
  }
}