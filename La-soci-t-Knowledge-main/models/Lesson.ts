import { Schema, model, models } from "mongoose";

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
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
  video: {
    type: String,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Lesson = models.Lesson || model("Lesson", lessonSchema);

export default Lesson;
