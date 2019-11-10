# image-gallery
Сервер изображений, позволяющий зарегистрированным пользователям сохранять изображения в личные альбомы.

## Инструкция
#### 1. Установить зависимости
    npm i
#### 2. Подготовить базу данных MySQL
#### 3. Зарегистрировать приложение в Google API:
- 3.1 Создать проект https://console.developers.google.com
- 3.2 Включить "Google+ API"
- 3.3 Создать учетные данные: "Create credentials"
- 3.4 Введите URI источника: http://localhost:3000 
  и URI перенаправления: http://localhost:3000/auth/google/callback
- 3.5 Сохранить clientID и clientSecret
#### 4. Внести данные в файл config.json:
- Раздел mail - настройки сервера Email

Можно задать название сервиса или hosp и port
```
"host": "smtp.gmail.com",
"port": 465
```
для gmail.com
```
"host": "smtp.mail.ru",
"port": 465
```
для mail.ru
- Раздел database - настройки сервера БД
- Раздел google - учетные данные google
#### 5. Выполнить
    npm start
  
