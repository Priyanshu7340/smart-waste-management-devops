const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;
const SECRET = "mysecretkey";

app.use(cors());
app.use(express.json());

/* ================= MongoDB ================= */
mongoose.connect("mongodb://127.0.0.1:27017/wasteDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ================= MODELS ================= */

// User Model
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  role: { type: String, default: "user" },
});
const User = mongoose.model("User", userSchema);

// Complaint Model
const complaintSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  description: String,
  status: { type: String, default: "Pending" },
  image: String,
  latitude: String,
  longitude: String,
  time: { type: Date, default: Date.now },
});
const Complaint = mongoose.model("Complaint", complaintSchema);

/* ================= STATIC ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ================= AUTH MIDDLEWARE ================= */
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "No token" });

  try {
    const token = authHeader.split(" ")[1]; // ✅ Bearer fix
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= ROUTES ================= */

// Home
app.get("/", (req, res) => {
  res.send("API Running");
});

/* ===== REGISTER ===== */
app.post("/register", async (req, res) => {
  const { name, phone, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    phone,
    password: hashedPassword,
    role,
  });

  await user.save();

  res.json({ message: "User Registered" });
});

/* ===== LOGIN ===== */
app.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
});

/* ===== GET COMPLAINTS (ADMIN ONLY) ===== */
app.get("/complaints", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const data = await Complaint.find().sort({ time: -1 });
  res.json(data);
});

/* ===== ADD COMPLAINT ===== */
app.post("/complaints", upload.single("image"), async (req, res) => {
  const { name, location, type, description, latitude, longitude } = req.body;

  const newComplaint = new Complaint({
    name,
    location,
    type,
    description,
    image: req.file ? req.file.filename : null,
    latitude,
    longitude,
  });

  await newComplaint.save();

  res.json({ message: "Complaint Saved" });
});

/* ===== UPDATE STATUS ===== */
app.put("/complaints/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  await Complaint.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });

  res.json({ message: "Updated" });
});

/* ===== DELETE ===== */
app.delete("/complaints/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  await Complaint.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted successfully" });
});

/* ================= START ================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
