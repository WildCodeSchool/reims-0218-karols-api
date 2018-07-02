# Mongo setup instructions

## Install mongo on your computer

Follow this [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Start MongoD as a service

## Run migrations to populate the db

Run in the console (in the backend dir):

```
./node_modules/.bin/mm
```

## Access the mongo-express page in your browser

[http://localhost:8000/mongo_express](http://localhost:8000/mongo_express)

admin/pass

## Add migrations

[doc](https://github.com/emirotin/mongodb-migrations#creating-migrations)

## prestations instructions

- add a migration file for prestations
- define a prestation model
- create a route prestations
