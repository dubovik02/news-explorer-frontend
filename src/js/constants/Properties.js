export default {

  card: {
    /*-стиль: для добавления, для удаления-*/
    style: {
      add: '1',
      del: '2'
    },
    /*-Картинка по умолчнию-*/
    defaultImage: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    saveMessage: 'Войдите, чтобы сохранять статьи',
    delMessage: 'Убрать из сохраненных',
    monthesStr:
    [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ],
  },

  /*-Настройка подключения-*/
  connection: {

    newsapi: {
      token: '065f57bbb65d4e54b4f78c012bc3cffd',
      url: 'https://newsapi.org',
      newsPeriod: 7,
    },

    newsexplorer: {
      url: 'http://localhost:3000',
    }
  },

  /*-Настройка страниц-*/
  pages: {

    mainpage: {
      color: 'black',
      active: 'main',
    },

    savedpage: {
      color: 'white',
      active: 'saved',
    }

  },

  /*-Сообщения об ошибках в полях попапов-*/
  popupErrMsg: {
    SizeErrMessage: 'Должно быть от 2 до 30 символов',
    MissingErrMessage: 'Это обязательное поле',
    LinkErrMessage: 'Здесь должна быть ссылка',
    EmailErrMessage: 'Укажите валидный e-mail',
    PasswordLengthErrMessage: 'Должно быть не менее 8 символов',
    AllowLettersMessage: 'Используйте только буквы и дефис'
  },

}