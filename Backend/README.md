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

---

7. **GET /getPostsByUserId**

Описание: Возвращает список постов пользователя по указанному идентификатору пользователя.

Параметры запроса:
- user_id (обязательный): Идентификатор пользователя.

Успешный ответ:
```json
{
  "error": false,
  "message": "",
  "body": {
    "posts": [
      {
        "post_id": 1,
        "user_id": 123,
        "message": "Hello world!",
        "media_message": "example.jpg",
        "created_at": "2023-05-13T12:00:00Z",
        "updated_at": "2023-05-13T12:30:00Z"
      },
      {
        "post_id": 2,
        "user_id": 123,
        "message": "Another post",
        "media_message": null,
        "created_at": "2023-05-13T13:00:00Z",
        "updated_at": "2023-05-13T13:30:00Z"
      }
    ]
  }
}
```

---

8. **GET /getPostByPost_id**

Описание: Возвращает информацию о посте по указанному идентификатору поста.

Параметры запроса:
- post_id (обязательный): Идентификатор поста.

Успешный ответ:
```json
{
  "error": false,
  "message": "",
  "body": {
    "post": {
      "post_id": 1,
      "user_id": 123,
      "message": "Hello world!",
      "media_message": "example.jpg",
      "created_at": "2023-05-13T12:00:00Z",
      "updated_at": "2023-05-13T12:30:00Z"
    }
  }
}
```

---

9. **GET /getPostLength**

Описание: Возвращает общее количество постов.

Успешный ответ:
```json
{
  "error": false,
  "message": "",
  "body": {
    "Length": 100
  }
}
```

---

10. **POST /createPost**

Описание: Создает новый пост.

Тело запроса:
- message (обязательное): Текст сообщения поста.
- file (опционально): Файл (изображение, видео и т. д.), прикрепленный к посту.

Успешный ответ:
```json
{
  "error": false,
  "message": "Post successfully created",
  "body": {
    "post": {
      "post_id": 101,
      "user_id": 123,
      "message": "New post",
      "media_message": "example.jpg",
      "created_at": "2023-05-13T14:00:00Z",
      "updated_at": "2023-05-13T14:00:00Z"
    }
  }
}
```

---

