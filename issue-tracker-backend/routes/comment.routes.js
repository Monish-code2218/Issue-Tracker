import express from 'express';
import { addComment, getComments } from '../controllers/comment.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:issueId', protect, addComment);      // Add comment to issue
router.get('/:issueId', protect, getComments);      // Get all comments for issue

export default router;
