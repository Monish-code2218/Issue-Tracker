import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  const { content } = req.body;
  const { issueId } = req.params;

  try {
    const comment = await Comment.create({
      content,
      issue: issueId,
      author: req.user._id,
      createdAt: new Date()
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  const { issueId } = req.params;

  try {
    const comments = await Comment.find({ issue: issueId })
      .populate('author', 'email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
