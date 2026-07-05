import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();

const PORT = process.env.PORT ?? 8000;
const app = express();
app.use(express.json());

app.use("/auth", proxy(process.env.AUTH_SERVICE_URL));

app.get("/", (req, res) => {
  res.json({ message: "Gateway route is OK" });
});

app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
