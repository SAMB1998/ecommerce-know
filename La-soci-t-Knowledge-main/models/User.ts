import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Username is required"],
    match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
    ],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: "Course" }, // Reference course model
        lessonId: [
          { type: Schema.Types.ObjectId, ref: "Lesson" }, // Reference lesson model (if applicable)
        ], // Reference lesson model (if applicable)
      },
    ],
  },
  orders: {
    type: [Schema.Types.ObjectId],
    ref: "Order",
  },
  validatedLessons: {
    type: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: "Course" },
        lessonId: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
      },
    ],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
