import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function adminExists() {
  try {
    await connectToDB();
    const user = await User.find({ role: "admin" });
    console.log(user);
    if (user.length === 0 || !user) {
      const name: any = process.env.DEFAULT_ADMIN_NAME;
      const password: any = process.env.DEFAULT_ADMIN_PASSWORD;
      const email: any = process.env.DEFAULT_ADMIN_EMAIL;
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });
    }
    return user;
  } catch (error) {
    console.error(error);
  }
}
