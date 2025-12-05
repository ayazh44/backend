import express from 'express';
import {
    getArticle,
    getArticleById 
} from '../controllers/articleController.js';

const router = express.Router();
router.get('/all', getArticle);
router.get('/:id', getArticleById);

export default router;