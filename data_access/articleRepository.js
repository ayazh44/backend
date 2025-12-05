import Article from '../models/article.js';


export const articleRepository = {
    getAll: () => Article.findAll(),
    getById: (id) => Article.findByPk(id),
};