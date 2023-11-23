
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, " title required"],
    unique: true,
  },

  content: {
    type: String,
    required: [true, "Content is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
