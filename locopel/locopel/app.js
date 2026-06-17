const express = require("express");
const path = require("path");
const session = require("express-session");
const db = require('./src/db');

const mainRoutes = require("./src/routes/mainRoutes");
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// сессии
app.use(session({
  secret: "super-secret-key-for-locopelo",  
  resave: false,
  saveUninitialized: false
}));
app.use(require("./src/middlewares/sessionMiddleware"));

// статика
app.use(express.static(path.join(__dirname, "public")));

// парсинг тела запросов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// роуты
app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//другие роуты
app.use("/admin", require("./src/routes/adminRoutes"));



app.get("/debug-routes", (req, res) => {
  res.json({
    adminRoutes: typeof require("./src/routes/adminRoutes"),
    adminRoutesPath: require("path").resolve("./src/routes/adminRoutes.js")
  });
});

// запуск сервера + синхронизация БД
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await db.sequelize.sync();
  
  // импорт модели после синхронизации
  require('./src/models/User');
  require('./src/models/Product');
  require('./src/models/Appointment');
  console.log("✅ Все модели загружены!");
});
