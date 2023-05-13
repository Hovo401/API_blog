Документация к эндпоинтам сервера:

**POST /login**
- Описание: Аутентификация пользователя по никнейму и паролю
- Тело запроса (JSON):
  ```
  {
    "nickname": "string",
    "password": "string"
  }
  ```
- Успешный ответ (HTTP статус: 200):
  ```
  {
    "error": false,
    "message": "",
    "body": {
      "token": "string",
      "user": {
        "userId": "number",
        "nickname": "string"
      }
    }
  }
  ```
- Ошибки:
  - HTTP статус: 401
    ```
    {
      "error": true,
      "message": "Ошибка аутентификации",
      "body": {}
    }
    ```

**POST /signup**
- Описание: Регистрация нового пользователя
- Тело запроса (JSON):
  ```
  {
    "nickname": "string",
    "password": "string"
  }
  ```
- Успешный ответ (HTTP статус: 200):
  ```
  {
    "error": false,
    "message": "",
    "body": {
      "token": "string",
      "user": {
        "userId": "number",
        "nickname": "string"
      }
    }
  }
  ```
- Ошибки:
  - HTTP статус: 226
    ```
    {
      "error": true,
      "message": "Никнейм уже занят",
      "body": {}
    }
    ```
  - HTTP статус: 400
    ```
    {
      "error": true,
      "message": "Отсутствует никнейм или пароль",
      "body": {}
    }
    ```
  - HTTP статус: 500
    ```
    {
      "error": true,
      "message": "Внутренняя ошибка сервера",
      "body": {}
    }
    ```

**POST /checkToken**
- Описание: Проверка валидности токена авторизации
- Заголовки:
  ```
  Authorization: Bearer <token>
  ```
- Успешный ответ (HTTP статус: 200):
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
- Ошибки:
  - HTTP статус: 401
    ```
    {
      "error": true,
      "message": "Ошибка авторизации",
      "body": {}
    }
    ```

