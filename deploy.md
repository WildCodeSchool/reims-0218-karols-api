# deploiement

## Dokku

[dokku ?](https://medium.com/nycplanninglabs/deploying-with-dokku-f00339d1a37f)

- création de l'application api

```
dokku apps:create api
dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
dokku mongo:create karolsdb
dokku mongo:expose karolsdb 4242 4243 4244 4245
dokku mongo:info karolsdb
dokku config:set api ME_CONFIG_MONGODB_URL=mongodb://karolsdb:33b1ede1ae58adab80a615a79b256585@karolsresa.fr:4242/karolsdb
dokku run api ./node_modules/.bin/mm
```

dsn: mongodb://karolsdb:33b1ede1ae58adab80a615a79b256585@karolsresa.fr:4242/karolsdb

- deploiement de l'application api

```
git push dokku master
```

## TODO

change mongo dsn
