// наименование для нашего хранилища кэша
const CACHE_NAME = 'SolarSunrise';
// ссылки на кэшируемые файлы
const cacheUrls = [
    '/',
    'd.ts',
    'config/Config.ts',
    'locales/ru.json',
    'locales/en.json',
    'views/BoardChangeView/BoardChangeView.scss',
    'views/BoardChangeView/BoardChangeView.hbs',
    'views/BoardChangeView/BoardChangeView.ts',
    'views/PinView/PinView.scss',
    'views/PinView/PinView.hbs',
    'views/PinView/PinView.ts',
    'views/BaseView/BaseView.ts',
    'views/SignUpView/SignUpView.ts',
    'views/SignUpView/SignUpView.hbs',
    'views/SignUpView/SignUpView.scss',
    'views/CreateBoardView/CreateBoardView.ts',
    'views/CreateBoardView/CreateBoardView.hbs',
    'views/CreateBoardView/CreateBoardView.scss',
    'views/BoardView/BoardView.hbs',
    'views/BoardView/BoardView.scss',
    'views/BoardView/BoardView.ts',
    'views/UserView/UserView.hbs',
    'views/UserView/UserView.ts',
    'views/UserView/UserView.scss',
    'views/ProfileView/ProfileView.scss',
    'views/ProfileView/ProfileView.ts',
    'views/ProfileView/ProfileView.hbs',
    'views/SettingsView/SettingsView.hbs',
    'views/SettingsView/SettingsView.scss',
    'views/SettingsView/SettingsView.ts',
    'views/CreatePinView/CreatePinView.hbs',
    'views/CreatePinView/CreatePinView.scss',
    'views/CreatePinView/CreatePinView.ts',
    'views/LoginView/LoginView.hbs',
    'views/LoginView/LoginView.scss',
    'views/LoginView/LoginView.ts',
    'views/IndexView/IndexView.hbs',
    'views/IndexView/IndexView.scss',
    'views/IndexView/IndexView.ts',
    'views/PinEditingView/PinEditingView.ts',
    'views/PinEditingView/PinEditingView.hbs',
    'views/PinEditingView/PinEditingView.scss',
    'views/DialogView/DialogView.hbs',
    'views/DialogView/DialogView.ts',
    'views/DialogView/DialogView.scss',
    'views/SearchView/SearchView.scss',
    'views/SearchView/SearchView.hbs',
    'views/SearchView/SearchView.ts',
    'utils/readFile.ts',
    'utils/handlebarsHelpers/i18n.ts',
    'utils/chatModule.ts',
    'utils/fetchModule.ts',
    'utils/router.ts',
    'utils/validation.ts',
    'utils/i18n.ts',
    'utils/deleteCookies.ts',
    'utils/bus.ts',
    'html/index.html',
    'components/Header/Header.scss',
    'components/Header/Header.hbs',
    'components/Header/Header.ts',
    'components/BoardForUserView/BoardForUserView.scss',
    'components/BoardForUserView/BoardForUserView.hbs',
    'components/BoardForUserView/BoardForUserView.ts',
    'components/PinForUserView/PinForUserView.ts',
    'components/PinForUserView/PinForUserView.scss',
    'components/PinForUserView/PinForUserView.hbs',
    'components/UserForSearch/UserForSearch.hbs',
    'components/UserForSearch/UserForSearch.scss',
    'components/UserForSearch/UserForSearch.ts',
    'components/DialogComponent/Dialog1ViewComponent/Dialog1ViewComponent.hbs',
    'components/DialogComponent/Dialog1ViewComponent/Dialog1ViewComponent.ts',
    'components/DialogComponent/Dialog1ViewComponent/Dialog1ViewComponent.scss',
    'components/DialogComponent/Dialog3ViewComponent/Dialog3ViewComponent.ts',
    'components/DialogComponent/Dialog3ViewComponent/Dialog3ViewComponent.hbs',
    'components/DialogComponent/Dialog3ViewComponent/Dialog3ViewComponent.scss',
    'components/PinForIndex/PinForIndex.ts',
    'components/PinForIndex/PinForIndex.scss',
    'components/PinForIndex/PinForIndex.hbs',
    'components/PinComment/PinComment.hbs',
    'components/PinComment/PinComment.ts',
    'components/PinComment/PinComment.scss',
    'components/PinForBoardEditing/PinForBoardEditing.ts',
    'components/PinForBoardEditing/PinForBoardEditing.hbs',
    'components/PinForBoardEditing/PinForBoardEditing.scss',
    'components/Message/Message.hbs',
    'components/Message/Message.scss',
    'components/Message/Message.ts',
    'components/BoardForCreatePin/BoardForCreatePin.ts',
    'components/BoardForCreatePin/BoardForCreatePin.hbs',
    'components/BoardForCreatePin/BoardForCreatePin.scss',
    'components/Button/Button.scss',
    'components/Button/Button.ts',
    'components/Button/Button.hbs',
    'images/logo.jpg',
    'images/nophoto.png',
    'images/sunrise_town.jpg',
    'images/sunrise_sea.jpg',
    'images/grey-pen.png',
    'images/more.png',
    'images/plus2.png',
    'images/search.svg',
    'images/themes.svg',
    'images/arrow.png',
    'images/sunrise_flowers.jpg',
    'images/question.png',
    'images/bell.png',
    'images/chat.svg',
    'images/closeicon.svg',
    'images/signupbg.png',
    'images/zoom.png',
    'images/bg.png',
    'images/loginbg1.jpg',
    'images/question2.svg',
    'images/sunrise_ocean.jpg',
    'images/logo.png',
    'images/notifications.svg',
    'images/graypen.svg',
    'images/logo.ico',
    'images/dilog.png',
    'images/sunrise_van.jpg',
    'images/grayplus.svg',
    'images/sunrise_kuinji.jpg',
    'images/edit.svg',
    'images/plus.svg',
    'images/account.svg',
    'images/plus.png',
    'images/message.svg',
    'scss/base.scss',
    'index.ts',
];

self.addEventListener('install', function(event) {
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
            .then(function(cache) {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
    );
});

// this.addEventListener('fetch', function(event) {

// (<any>event).respondWith(
// // ищем запрашиваемый ресурс в хранилище кэша
// caches.match((<any>event).request).then(function(cachedResponse) {

// // выдаём кэш, если он есть
// if (cachedResponse && !navigator.onLine) {
// return cachedResponse;
// }

// // иначе запрашиваем из сети как обычно
// return fetch((<any>event).request);
// })
// );
// });
