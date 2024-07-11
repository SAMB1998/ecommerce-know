import { Schema, model, models } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
