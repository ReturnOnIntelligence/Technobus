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







