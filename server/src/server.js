import express from "express";
import path from "path";

const app = express();

app.get("/api/test", (req, res) => {
  res.json({ response: "From Server" });
});

app.use(express.static(path.join(__dirname, "../../client/build/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
