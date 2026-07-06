import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = getAuth(app).verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatarUrl: decoded.picture,
      });
      const sessionId = crypto.randomUUID();
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
      res
        .status(200)
        .json({ user: { name: decoded.name, email: decoded.email } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
