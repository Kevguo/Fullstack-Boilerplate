import express from "express";

const app = express();

const PORT = 5000;

app.get("/api/test", (req, res) => {
  res.json({ response: "From Server" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
