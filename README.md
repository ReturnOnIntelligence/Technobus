This is Technopolis Shuttle Bus application

Allows to find a way to Technopolis office center in St. Petersburg Russia
https://www.technopolis.fi/russia/

Create by Return On Intelligence
http://www.returnonintelligence.com/


# Инструкция по установке и запуску проекта.

Скачиваем директорию develop и уже в ней производим все действия

### Установка Node.js и npm.

#### Для Unix систем.
- Открываем терминал и прописываем такую последовательность команд:
```
git clone https://github.com/joyent/node.git
cd node
./configure
make
make install
```
- Проверяем, что установилась:
```sh
node -v
```
- Далее устанавливаем NPM:
```
sudo npm install npm –g
```

#### Для Windows.

>Для установки нам потребуется установочный дистрибутив, который Вы должны скачать с [официального сайта Node.js](https://nodejs.org/en/download/) в разделе Downloads. Пакет называется Windows Installer (.msi), не забудьте правильно выбрать пакет под разрядность вашей операционной системы. Установить скаченный пакет.


### Установка gulp.
- Unix:
```
sudo npm install gulp –g
```
- Windows:
```
npm install gulp –g
```

### Установка модулей
- Открываем терминал, убеждаемся, что мы находимся внутри директории с проектом, и прописываем команду:
```
npm i
```
Данная команда подгружает все необходимые для проекта модули

### Команды сборщика
- Запуск локального просмотра default = watch
```
gulp watch
gulp
```
>После этого стартует локальный сервер на localhost:3000 c отслеживанием изменений в файлах
- Сборка проекта
```
gulp build
```
>По окончанию сборки, в директории /dist будут находиться собранный набор файлов

# Инструкция по подключению Google Sheets к проекту.
## Создание и настройка Google Sheets.
>Войдите в совой аккаунт [Google](https://www.google.ru/), перейдите в [Google Drive](https://drive.google.com/drive/my-drive) -> Создать(Create) -> Google Таблицы(Google Sheets)

- Название таблицы произвольное
- Создать 3 листа(Sheet) с названиеями:
To Technopolis
From Technopolis
Info
- Первые две страницы содержат расписание в виде:
Строка 1: Время	Понедельник	Вторник	Среда	Четверг	Пятница	Суббота	Воскресенье
Столбец А: Время в формате HH:MM (к примеру 11:09, 09:01)
Пересечение времени и дня недели: если * - есть рейс в этот день недели, пустая клетка - отсутствие
- Третья страница (Info):
Строка 1: Title	Info
Столбцы A и B уведомления
Пользователю отображается только уведомление из B1
- Настройки доступа(Share) -> Просматривать могут все, у кого есть ссылка(доступ на чтение по ссылке)
[Пример таблицы](https://docs.google.com/spreadsheets/d/10db0NtOmOC5TLw0WBuzFCGtoVa1GaFYDeUqIADh6p1E/edit#gid=0)
## Включение Api, получение api key
>Войдите в совой аккаунт [Google](https://www.google.ru/), перейти на [Google Api Console](https://console.developers.google.com/apis)
- Включить Api и сервисы -> Google Sheets Api -> Включить
- [Учетные данные(Credentials)](https://console.developers.google.com/apis/credentials) -> Создать учётные данные(Create credentials) -> Ключ API (Api key)
- В таблице Ключи Api (Api keys) ищем ключ и в поле Ключ (Key) находим последовательность символов - api key
## Установка параметров.
>Открываем app/js/common.js
- Копируем api_key из [Google Api Console](https://console.developers.google.com/apis) в переменную **key**
- Из ссылки на Google Таблицу вытаскиваем **spreadsheetId** таблицы
> docs.google.com/ spreadsheets / d / **spreadsheetId** /edit#gid=0
- Копируем **spreadsheetId** в переменную **spreadsheetId**
## Android-приложение
APK находится в ветке adnroid, путь: android/app-debug.apk


