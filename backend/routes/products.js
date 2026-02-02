import express from "express";
import prisma from "../prismaClient.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await prisma.product.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

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

    if (!name || !spec) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        return res.status(404).json({ error: "Not found" });
    }

    if (product.userId !== req.userId) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await prisma.product.update({
        where: { id },
        data: { name, spec },
    });

    res.json(updated);
});


router.delete("/:id", auth, async (req, res) => {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({where: { id }});

    if(!product || product.userId !== req.userId) {
        return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.product.delete({ where: { id }});

    res.json({ ok: true });
})

export default router;