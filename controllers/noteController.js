import { noteService } from '../business_logic/noteService.js';

export const createNote = async (req, res) => {
    try {
        const { articleId, userId, text } = req.body;
        if (!articleId || !userId || !text) {
            return res.status(400).json({ message: "Internal server error" });
        }
        const result = await noteService.createNote({ articleId, userId, text });
        return res.status(201).json({
            message: "Note successfully created",
            note: result
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getNoteByUserId = async (req, res) => {
    // try {
        const { userId } = req.params;
        const note = await noteService.getNoteByUserId(userId);
        return res.status(200).json({
            message: "Note successfully found",
            notes: note
        });

    // } catch (error) {
        // return res.status(500).json({ message: error.message });
    // }
}