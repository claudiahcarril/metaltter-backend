# Metaltter (Backend)

Deploy:
```sh
npm install
```

Load initial data to database:
```sh
npm run init-db
```

Start the application in production with:
```sh
npm start
```

Start the application in development with:
```sh
npm run dev
```

# Endpoints
## USERS:
[GET] /api/users
```
http://localhost:3000/api/users
```

[GET] /api/users/:id
```
http://localhost:3000/api/users/:id
```

[GET] /api/users/:username
```
http://localhost:3000/api/users/:username
```

[POST] /api/users
```
http://localhost:3000/api/users
```

[DELETE] /api/users/:id
```
http://localhost:3000/api/users/:id
```


## METS:
[GET] /api/mets
```
http://localhost:3000/api/mets
```
Parameters:
- word= filter by word
- &skip= 
- &limit=

[GET] /api/mets/:id
```
http://localhost:3000/api/mets/:id
```

[GET] /api/mets/postedBy/:id
```
http://localhost:3000/api/mets/postedBy/:id
```

[POST] /api/mets
```
http://localhost:3000/api/mets
```

[DELETE] /api/mets/:id
```
http://localhost:3000/api/mets/:id
```


## KUDOS:
[GET] /api/kudos
```
http://localhost:3000/api/kudos
```

[POST] /api/kudos
```
http://localhost:3000/api/kudos
```

[DELETE] /api/kudos/:id
```
http://localhost:3000/api/kudos/:id
```


## FOLLOW:
[GET] /api/follow
```
http://localhost:3000/api/follow
```

[GET] /api/follow/mets
```
http://localhost:3000/api/follow/mets
```

[POST] /api/follow
```
http://localhost:3000/api/follow
```

[DELETE] /api/follow/:id
```
http://localhost:3000/api/follow/:id
```