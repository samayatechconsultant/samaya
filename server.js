import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).send("Node.js backend is running ✅");
}); 

app.listen(3000, () => console.log("Server running on port 3000"));
