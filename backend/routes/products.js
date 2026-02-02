import express from "express";
import prisma from "../prismaClient.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const authHeader = req.headers.authorization;
    let userId = null;

    if(authHeader) {
        try {
            const token = authHeader.split(" ")[1];
            const payload = JSON.parse(
                Buffer.from(token.split(".")[1], "base64").toString()
            );
            userId = payload.userId;
        } catch{}
    }

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {userId: null},
                ...(userId ? [{ userId }] : [])
            ]
        }
    })

    res.json(products);
});

router.post("/", auth, async (req, res) => {
    const { name, spec } = req.body;

    if(!name || !spec) {
        return res.status(400).json({ error: "Missing name" });
    }

    const product = await prisma.product.create({
        data: {
            name,
            spec,
            userId: req.userId,
        }
    });

    res.json(product);
})

router.put("/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const { name, spec } = req.body;

    const product = await prisma.product.findUnique({where: { id }});

    if(!product || product.userId !== req.userId) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await prisma.product.update({
        where: { id },
        data: { name, spec},
    })

    res.json(updated);
})

router.delete("/:id", auth, async (req, res) => {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({where: { id }});

    if(!product || product.userId !== req.userId) {
        return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.product.delete({ where: { id }});

    res.json({ ok: true });
})