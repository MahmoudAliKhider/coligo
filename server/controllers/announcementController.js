const Announcement = require('../models/announcementModel');

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createAnnouncement = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();
    res.json(newAnnouncement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAnnouncementById = async (req, res) => {
  const { announcementId } = req.params;

  try {
    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateAnnouncement = async (req, res) => {
  const { announcementId } = req.params;
  const { title, content } = req.body;

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json(updatedAnnouncement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  const { announcementId } = req.params;

  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

    if (!deletedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
