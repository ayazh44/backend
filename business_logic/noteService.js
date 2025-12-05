import {noteRepository} from '../data_access/noteRepository.js';

export const noteService = {
    async createNote(data) {
        return await noteRepository.create(data);
    },
    async getNoteByUserId(userId) {
        const note = await noteRepository.getByUserId(userId);
        if (!note) throw new Error ("Note not found");
        return note;
    },
}