import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: {
    type: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: "Course" }, // Reference course model
        lessons: [
          { type: Schema.Types.ObjectId, ref: "Lesson" }, // Reference lesson model (if applicable)
        ], // Reference lesson model (if applicable)
      },
    ],
  },
  currency: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
