import express from 'express';
import {
    getNoteByUserId,
createNote
} from '../controllers/noteController.js';

const router = express.Router();
router.post('/new', createNote);
router.get('/:userId', getNoteByUserId);

export default router;