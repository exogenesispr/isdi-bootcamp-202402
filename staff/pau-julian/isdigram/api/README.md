# API

## endpoints

- register user

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name":"Pepito Grillo","birthdate":"2000-01-01","email":"pepito@grillo.com","username":"pepitogrillo","password":"123qwe123"}' http://localhost:8080/users -v
```

- login user

```sh
curl -X POST -H "Content-Type: application/json" -d '{"username":"pepitogrillo","password":"123qwe123"}' http://localhost:8080/users/auth -v
```

- retrieve user

```sh
curl http://localhost:8080/user/${userId}
```

- retrieve posts

```sh
curl http://localhost:8080/posts
```
