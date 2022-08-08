# Тестовое задание для Инсайд

Сервис представляет собой мультиконтейнерное приложение: backend (node.js) и mysql-сервер.

# Начало работы

Запуск приложения производится выполнением скрипта start из корневой папки проекта. При этом будет произведено скачивание двух docker-образов и произведен их запуск. 

Сервер для запросов от пользователей работает на 8128 порту.

# Описание

## Аутентификация:

POST http://host:8128/login

где host - адрес машины, с развернутым приложением.

Реквизиты пользователя содержатся в полях
{
    name: "имя отправителя"
    password: "пароль" 
}

Ответом за запрос будет json-объект с jwt вида:
{
    token: "сгенерированный токен" 
}

Зарегистрированные пользователи в демонстрационной БД:
test@test
John@passwd

## Сообщения

Получение запросов от пользователей доступно только для авторизованных пользователей, для этого нужно использовать jwt, полученный при аутентификации:

POST http://host:8128/messages

Формат сообщения:
{
    name: "имя отправителя"
    message: "текст сообщения" 
}

Все входящие сообщения логируются.

## Поддерживаемые команды

history <кол-во сообщений>
Возвращает последние N сообщений, отправленных пользователями.

# База данных

Структура базы данных описана в файле начальной	инициализации mysql/init_db.sql

# Автоматическое тестирование

Запуск тестов производится командой npm test из папки backend.

# Ручное тестирование

Скрипт curl/login делает запрос с попыткой аутентификации. 
