import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/index.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = getAuth(app).verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatarUrl: decoded.picture,
      });
      const sessionId = crypto.randomUUID();

      //store in redis
      await redis.set(
        `session:${sessionId}`,
        JSON.stringify({
          userId: user._id,
          name: user.name,
          email: user.email,
          avatar: user.picture,
        }),
        "EX",
        60 * 60 * 24 * 7,
      );
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { sessionId } = req.cookies;
    await redis.del(`session:${req.cookies.sessionId}`);
    res.clearCookie("sessionId");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
