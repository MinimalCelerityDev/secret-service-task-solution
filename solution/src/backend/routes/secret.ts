import express, { Request, Response, Router } from "express";
import { Secret } from "../models/Secret";

const router: Router = express.Router(); 

// creating (POST /api/secret) 
router.post("/", async (req: Request, res: Response) => {

  try {
    
    const { content, ttl, maxViews } = req.body;

    const secret = new Secret({
      content,
      ttl: new Date(Date.now() + ttl * 1000), // in second
      maxViews,
      views: 0,
    });

    await secret.save();

    res.status(201).json({ id: secret._id, message: "Secret created!" });
  } catch (error) {
    console.error("Error creating secret:", error);
    res.status(500).json({ error: "Failed to create secret." });
  }
});

// get secrets by Id (GET /api/secret/:id)
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {

  try {

    const { id } = req.params;

    const secret = await Secret.findById(id);

    if (!secret) {
      return res.status(404).json({ error: "Secret not found, try again" });
    }
    if (secret.views >= secret.maxViews) {
      return res.status(410).json({ error: "Secret has expired, try again" });
    }

    secret.views += 1;

    await secret.save();

    res.status(200).json({

      content: secret.content,
      ttl: secret.ttl,
      maxViews: secret.maxViews,
      views: secret.views,
    });

  } catch (error) {
    console.error("Error retrieving secret from the database:", error);
    res.status(500).json({ error: "Failed to retrieve secret, from the database" });
  }
});

export default router;
