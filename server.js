import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/post", async (req, res) => {
  try {
    const ACCESS_TOKEN = "WPL_AP1.yAlkmJ73Q2J3EAIF.1PEpWw==";
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + ACCESS_TOKEN,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    res.status(response.status).send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
