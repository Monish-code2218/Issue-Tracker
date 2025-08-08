import Issue from '../models/Issue.js';

export const createIssue = async (req, res) => {
  const { title, description, tag, assignedTo } = req.body;

  try {
    const issue = await Issue.create({
      title,
      description,
      tag,
      assignedTo,
      createdAt: new Date()
    });

    res.status(201).json(issue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getIssues = async (req, res) => {
  try {
    const { tag, status, assignedTo, search } = req.query;
    const filter = {};

    if (tag) filter.tag = tag;
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const issues = await Issue.find(filter)
      .populate('assignedTo', 'email')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('assignedTo', 'email');
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    const { title, description, status, tag, assignedTo } = req.body;

    issue.title = title ?? issue.title;
    issue.description = description ?? issue.description;
    issue.status = status ?? issue.status;
    issue.tag = tag ?? issue.tag;
    issue.assignedTo = assignedTo ?? issue.assignedTo;

    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    await issue.remove();
    res.json({ message: 'Issue deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
