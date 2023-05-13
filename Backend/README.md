Документация к эндпоинтам сервера:

 
Примечание:  ответ сервера на api/* всегда содержит эти три поля


```json
{
  "error": "boolean",
  "message": "string",
  "body": {}
}
```

Поля:
- **error**: Булевое значение, указывающее на наличие ошибки (true) или успешное выполнение (false).
- **message**: при error == true -> сообщение об ошибке пользователя.
- **body**: результат выполнения запроса в виде объекта или Дополнительная информация об ошибке связанные с сервером .

Пример ошибки:

```json
{
  "error": true,
  "message": "сообщение об ошибке пользователя",
  "body": {}
}
```

В случае успешного выполнения запроса, поле "error" будет равно false, а поле "body" будет содержать соответствующие данные.

Пожалуйста, обратите внимание, что каждый эндпоинт может иметь свои уникальные коды состояния и сообщения об ошибках, которые описаны в документации для каждого конкретного эндпоинта.


1. **POST /login**
   - Описание: Авторизация пользователя.
   - Тело запроса:
     ```json
     {
       "nickname": "string",
       "password": "string"
     }
     ```
   - Ответ:
     ```json
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
     ```json
     {
       "nickname": "string",
       "password": "string"
     }
     ```
   - Ответ:
     ```json
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
     ```json
     Authorization: "Bearer <токен>"
     ```
   - Ответ:
     ```json
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
     ```json
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
     ```json
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
     ```json
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
11. **PUT /updatePost

Описание: Обновляет существующий пост.

Параметры запроса:

- post_id (обязательное): Идентификатор поста, который требуется обновить.
- message (опционально): Новый текст сообщения поста.
- file (неопционально): Новый файл (изображение, видео и т. д.), прикрепленный к посту.

Успешный ответ:

```json
{
  "error": false,
  "message": "Post successfully updated",
  "body": {
    "post": {
      "post_id": 101,
      "user_id": 123,
      "message": "Updated post",
      "media_message": "example.jpg",
      "created_at": "2023-05-13T14:00:00Z",
      "updated_at": "2023-05-13T15:30:00Z"
    }
  }
}
```

---

12. ** DELETE /post/:post_id

Описание: Удаляет существующий пост.

Параметры запроса:

- post_id (обязательное): Идентификатор поста, который требуется удалить.

Успешный ответ:

```json
{
  "error": false,
  "message": "Post successfully deleted"
}
```

---

13. **Конечная точка: /*

Описание: Обработка несуществующих маршрутов.

ответ:

```json
{
  "error": true,
  "message": "Route not found",
  "body": {}
}
```
