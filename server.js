import express from "express";
import router from "./routes/index.js";
import { initDb } from "./config/db.js";
import { HTTP } from "./util/const.js";
import dotenv from "dotenv";
import { passport } from "./config/passport.js";
import session from "express-session";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
export const version = "0.0.3";

app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Generate JWT token after successful authentication
    const user = req.user;
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  }
);

app.get("/auth/failure", (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
});

// Routes
app.use("/", router);

// Middleware to handle 404 URL errors
app.use((req, res) => {
  const error = new Error("Not Found URL");
  error.status = HTTP.NOT_FOUND;
  error.controller = "NotFoundURL";
  throw error;
});

// Initialize the database
initDb((error) => {
  if (error) {
    console.error("Failed to initialize database:", error);
  } else {
    console.log("Database initialized successfully");
  }
});

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let message;
  console.error(`Error at: "${err.controller}": ${err.message}`);
  message = err.message || "Internal Server Error";
  res.status(err.status || 500).json({
    status: "error",
    code: err.status || 500,
    message: message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} - Version: ${version}`);
});
