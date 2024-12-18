const Clip = require('../models/Clip');

// Загрузить клип
exports.uploadClip = async (req, res) => {
  try {
    const { title, url, description } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const newClip = new Clip({
      title,
      url,
      description,
      uploader: req.user.id, // Предполагается, что пользователь идентифицирован через middleware
    });

    await newClip.save();
    res.status(201).json(newClip);
  } catch (err) {
    res.status(500).json({ error: 'Error uploading clip', details: err.message });
  }
};

// Получить все клипы
exports.getAllClips = async (req, res) => {
  try {
    const clips = await Clip.find().populate('uploader', 'username');
    res.status(200).json(clips);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching clips', details: err.message });
  }
};

// Лайк клипа
exports.likeClip = async (req, res) => {
  try {
    const { id } = req.params;
    const clip = await Clip.findById(id);

    if (!clip) {
      return res.status(404).json({ error: 'Clip not found' });
    }

    if (clip.likes.includes(req.user.id)) {
      return res.status(400).json({ error: 'You already liked this clip' });
    }

    clip.likes.push(req.user.id);
    await clip.save();

    res.status(200).json({ message: 'Clip liked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error liking clip', details: err.message });
  }
};
