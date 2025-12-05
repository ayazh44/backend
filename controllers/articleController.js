import { articleService } from "../business_logic/articleService.js";

export const getArticle = async (req, res) => {
    try {
        const articles = await articleService.getAll();
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: "internal sever error"});
    }
};

export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const articles = await articleService.getById(id);
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: "internal sever error"});
    }
};