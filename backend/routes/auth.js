import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import auth from "../middleware/auth.js";

const router =express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.post("/register", async(req, res) => {
    const {username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({error: "Missing fields"});
    }

    const existing = await prisma.user.findUnique({
        where: {username},
    })

    if(existing) {
        return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username, password: hashedPassword
        }
    });

    res.json({id: user.id, username: user.username});
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {username},
    })

    if(!user) {
        return res.status(401).json({error: "Invalid credentials"});
    }

    const valid = await bcrypt.compare(password, user.password);

    if(!valid) {
        return res.status(401).json({error: "Invalid credentials"});
    }

    const token = jwt.sign(
        {userId: user.id},
        JWT_SECRET,
        {expiresIn: "7d"},
    );

    res.json({ token });
});

router.get("/me", auth, async(req,res) => {
    const user = await prisma.user.findUnique({
        where: {id: req.userId},
        select: {id:true, username: true},
    })

    res.json(user);
})

export default router;