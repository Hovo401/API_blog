Документация к эндпоинтам сервера:

1. **POST /login**
   - Описание: Авторизация пользователя.
   - Тело запроса:
     ```
     {
       "nickname": "string",
       "password": "string"
     }
     ```
   - Ответ:
     ```
     {
       "error": false,
       "message": "",
       "body": {
         "tokin": "string",
         "user": {
           "userId": "number",
           "nickname": "string"
         }
       }
     }
     ```

2. **POST /signup**
   - Описание: Регистрация нового пользователя.
   - Тело запроса:
     ```
     {
       "nickname": "string",
       "password": "string"
     }
     ```
   - Ответ:
     ```
     {
       "error": false,
       "message": "",
       "body": {
         "tokin": "string",
         "user": {
           "userId": "number",
           "nickname": "string"
         }
       }
     }
     ```

3. **POST /checkToken**
   - Описание: Проверка валидности токена авторизации.
   - Заголовки запроса:
     ```
     Authorization: "Bearer <токен>"
     ```
   - Ответ:
     ```
     {
       "error": false,
       "message": "",
       "body": {
         "user": {
           "userId": "number",
           "nickname": "string"
         }
       }
     }
     ```

4. **GET /getUsers** (только для разработчика)
   - Описание: Получение списка всех пользователей.
   - Ответ:
     ```
     {
       "error": false,
       "message": "",
       "body": {
         "users": [
           {
             "id": "number",
             "nickname": "string"
           },
           ...
         ]
       }
     }
     ```

5. **GET /getOneUser**
   - Описание: Получение информации о конкретном пользователе по ID или никнейму.
   - Параметры запроса (выбрать один):
     - `id`: ID пользователя (number)
     - `nickname`: Никнейм пользователя (string)
   - Ответ:
     ```
     {
       "error": false,
       "message": "",
       "body": {
         "user": {
           "id": "number",
           "nickname": "string"
         }
       }
     }
     ```

6. **GET /getPosts**
   - Описание: Получение списка всех постов.
   - Параметры запроса (необязательные):
     - `start`: Начальный индекс (number)
     - `max`: Максимальное количество постов (number)
   - Ответ:
     ```
     {
       "error": false,
       "message": "",
       "body": {
         "posts": [
           {
             "postId": "number",
             "userId": "number",
             "message": "string",
             "media": "string"
           },
           ...
         ]
       }
     }
     ```

