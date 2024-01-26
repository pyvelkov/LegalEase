import { Router } from "express";

const router = Router();

router.get("/testGet", (req, res) => {
    res.status(200).json({ test: "got test" });
});
router.post("/testPost", (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(200).send("success post");
});

export default router;
