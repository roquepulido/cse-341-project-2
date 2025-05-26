import express from "express";
import router from "./routes/index.js";
import { initDb } from "./config/db.js";
import { HTTP } from "./util/const.js";

const app = express();
const PORT = process.env.PORT || 3000;
export const version = "0.0.2";

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
