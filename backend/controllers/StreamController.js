const Stream = require('../models/Stream');

// Создание нового стрима
exports.createStream = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newStream = new Stream({
      title,
      description,
      streamer: req.user.id, // Предполагается, что пользователь идентифицирован через middleware
    });

    await newStream.save();
    res.status(201).json(newStream);
  } catch (err) {
    res.status(500).json({ error: 'Error creating stream', details: err.message });
  }
};

// Получить все стримы
exports.getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find().populate('streamer', 'username');
    res.status(200).json(streams);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching streams', details: err.message });
  }
};

// Завершить стрим
exports.endStream = async (req, res) => {
  try {
    const { id } = req.params;
    const stream = await Stream.findById(id);

    if (!stream) {
      return res.status(404).json({ error: 'Stream not found' });
    }

    stream.isLive = false;
    await stream.save();

    res.status(200).json({ message: 'Stream ended successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error ending stream', details: err.message });
  }
};
