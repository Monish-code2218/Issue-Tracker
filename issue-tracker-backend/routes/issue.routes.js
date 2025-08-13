import express from 'express';
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue
} from '../controllers/issue.controller.js';
import protect from '../middleware/authMiddleware.js';
import Issue from '../models/Issue.js';
const router = express.Router();

router.post('/', protect, createIssue);         // Create
router.get('/', protect, getIssues);            // List all
router.get('/:id', protect, getIssueById);      // View one
router.put('/:id', protect, updateIssue);       // Edit/Assign/Close
router.delete('/:id', protect, deleteIssue);    // Delete
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["open", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
