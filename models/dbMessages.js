import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  receiver: Boolean
});

export default mongoose.model('messagecontents', whatsappSchema);
