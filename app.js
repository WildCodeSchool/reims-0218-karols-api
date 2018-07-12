const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")

const mongoose = require("mongoose")
const mongo_express = require("mongo-express/lib/middleware")
const mongo_express_config = require("./mongo_express_config")

const urlMongo =
  "mongodb://karolsdb:33b1ede1ae58adab80a615a79b256585@karolsresa.fr:4242/karolsdb"
mongoose.connect(urlMongo)
const db = mongoose.connection
db.on("error", console.error.bind(console, "Erreur lors de la connexion"))
db.once("open", () => {
  console.log("Connexion à la base OK")
})

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

app.use("/", indexRouter)
app.use("/users", usersRouter)

app.use("/mongo_express", mongo_express(mongo_express_config))

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
}) // Juste pour autoriser l'adresse des prestations.json sur l'autre port (8000)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
