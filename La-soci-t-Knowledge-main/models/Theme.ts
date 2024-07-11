import { Schema, model, models } from "mongoose";

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Theme = models.Theme || model("Theme", ThemeSchema);

export default Theme;
