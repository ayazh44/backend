import { db } from '../models/index.js'


export const articleRepository = {
    getAll: () => db.Article.findAll(),
    getById: (id) => db.Article.findByPk(id),
};