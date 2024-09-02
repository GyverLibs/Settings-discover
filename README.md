# Settings-discover
Приложение для поиска устройств с библиотекой [Settings](https://github.com/GyverLibs/Settings)
- [Скачать .apk](https://github.com/GyverLibs/Settings-discover/releases/latest/download/Settings.apk
) последней версии
- [Скачать .html](https://github.com/GyverLibs/Settings-discover/releases/latest/download/index.html) последней версии

Для поиска смартфон/ПК должны быть в одной локальной сети с устройством. В приложении должна быть указана корректная маска подсети (настраивается в роутере). Если в роутере она не менялась - то она там стандартная *255.255.255.0*, как и в приложении по умолчанию.

> Требуется версия библиотеки v1.0.13+

## Как собрать
- Установить [VS Code](https://code.visualstudio.com/download)
- Установить [Node JS](https://nodejs.org/en/download/prebuilt-installer)
- Открыть папку в VS Code
- Консоль **Ctrl + `**
- `npm install`, дождаться установки зависимостей
- `npm run build` или запустить скрипт *build.bat*
- Проект соберётся в папку dist

## Разработка и отладка
`npm run dev` или скрипт *dev.bat* запустит dev сервер и откроет браузер, будет обновлять сайт при изменениях в коде. Чтобы закрыть - `Ctrl+C` в консоли, затем `y`

## Android
Приложение собарно в конструкторе Kodular, просто открывает собранный index.html в WebView