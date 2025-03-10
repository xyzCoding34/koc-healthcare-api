import jwt from "jsonwebtoken"; // jwt modülünü import et
import bcrypt from "bcryptjs"; // bcrypt modülünü import et
import dotenv from "dotenv"; // dotenv'i import et
import { getUserByUsername } from "./db.js"; // db dosyasından getUserByUsername fonksiyonunu import et

dotenv.config(); // dotenv'i yükle

// verification for tokeen
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "secretkey"
    );
    return decoded;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Geçersiz token");
    }
    if (error.name === "TokenExpiredError") {
      throw new Error("Token süresi dolmuş");
    }
    throw new Error("Sunucu hatası");
  }
};

// if token exists check userId from token
export const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "secretkey"
    );

    if (!decoded.user_id) {
      throw new Error("User id bulunamadı.");
    }

    return decoded.user_id;
  } catch (error) {
    console.log("getUserIdFromToken hatası", error.message);
    return null;
  }
};

export const loginUser = async (user_name, password) => {
  const user = await getUserByUsername(user_name);

  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Geçersiz parola");
  }

  const token = jwt.sign(
    {
      user_id: user.id,
      user_name: user.user_name,
      first_name: user.first_name,
      profile_group: user.profile_group,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return {
    token,
    first_name: user.first_name,
    profile_group: user.profile_group,
  };
};
