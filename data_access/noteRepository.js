import { db } from '../models/index.js'

export const noteRepository = {
    create: (data) => db.Note.create(data),
    getByUserId: (userId) => db.Note.findAll({ 
        where: { userId: userId }, 
        include: [
            { 
                model: db.User,
                attributes: ['id']
            },
            { 
                model: db.Article,
                attributes: ['id', 'title', 'url', 'description', 'content']
            },
        ] }),
    delete: (id) => db.Note.destroy({ where: { id } }),
};
