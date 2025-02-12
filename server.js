const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serves static files from 'public' folder

// Database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change to your MySQL username
    password: "srinjoy1234",  // Change to your MySQL password
    database: "brainwee" // Change to your database name
});

connection.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// Serve index.html by default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Fake database for storing users
const users = [];

// Signup endpoint
app.post("/api/signup", (req, res) => {
    const { full_name, email, registration_number, password } = req.body;
  
    if (!full_name || !email || !registration_number || !password) {
        console.log("Received Data:", req.body);  // Debugging line
      return res.status(400).json({ error: "All fields are required" });
    }
  
    // Check if user already exists in MySQL
    connection.query(
      "SELECT * FROM doctors WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Error checking user:", err);
          return res.status(500).json({ error: "Database error" });
        }
  
        if (results.length > 0) {
          return res.status(400).json({ error: "Email already registered" });
        }
  
        // Insert user into MySQL
        connection.query(
          "INSERT INTO doctors (full_name, email, registration_number, password) VALUES (?, ?, ?, ?)",
          [full_name, email, registration_number, password],
          (err, result) => {
            if (err) {
              console.error("Error inserting user:", err);
              return res.status(500).json({ error: "Database error" });
            }
            res.json({ success: true, message: "Signup successful" });
          }
        );
      }
    );
  });
  
// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  res.json({ success: true, message: "Login successful" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
