import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log("API running on http://localhost:3000");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);