import express from 'express';
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue
} from '../controllers/issue.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createIssue);         // Create
router.get('/', protect, getIssues);            // List all
router.get('/:id', protect, getIssueById);      // View one
router.put('/:id', protect, updateIssue);       // Edit/Assign/Close
router.delete('/:id', protect, deleteIssue);    // Delete

export default router;
