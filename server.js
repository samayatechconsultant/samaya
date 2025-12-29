import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

/* ================= CONFIG ================= */

// 🔴 REPLACE THESE
const ACCESS_TOKEN = "PASTE_YOUR_LINKEDIN_ACCESS_TOKEN";
const AUTHOR_URN   = "urn:li:person:PASTE_YOUR_PERSON_ID";

// Change only if needed
const PORT = 3000;

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ================= HEALTH CHECK ================= */

app.get("/health", (req, res) => {
  res.status(200).send("Node.js backend is running ✅");
});

/* ================= LINKEDIN POST API ================= */

app.post("/api/post", async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).send("Post text is required");
    }

    const payload = {
      author: AUTHOR_URN,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: req.body.text
          },
          shareMediaCategory: "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    };

    const response = await fetch(
      "https://api.linkedin.com/v2/ugcPosts",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0"
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.text();
    res.status(response.status).send(result);

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/* ================= START SERVER ================= */

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
