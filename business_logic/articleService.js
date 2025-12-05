import { articleRepository } from "../data_access/articleRepository.js";

export const articleService = {
    async getAll() {
        return await articleRepository.getAll();
    },

    async getById(id) {
        const article = await articleRepository.getById(id);
        if (!article) throw new Error("Article not found");
        return article;
    },
}