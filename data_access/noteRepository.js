import Note from '../models/note.js';

export const noteRepository = {
    create: (data) => Note.create(data),
    getByUserId: (userId) => Note.findAll({ where: { userId: userId } }),
    delete: (id) => Note.destroy({ where: { id } }),
};