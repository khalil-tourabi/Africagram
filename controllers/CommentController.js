import { PrismaClient } from "@prisma/client";
import { createCommentSchema, deleteCommentSchema, updateCommentSchema } from '../helpers/comment_validation_schema.js'; 
const prisma = new PrismaClient()


//post comment
export const createComment = async (req, res) => {
    const userId = req.params.id
    const message = req.body.message
    const postId = req.query.postId

    const { error } = createCommentSchema.validate({ message, postId });
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const commented = await prisma.commentaire.create({
            data:{
                utilisateur_id: parseInt(userId),
                post_id: parseInt(postId),
                message
            }
        })
        res.status(200).send(commented);
    } catch (error) {
        console.log(error);
        res.send(error);
    }

}

//modify

export const updateComment = async (req, res) => {
    const id = req.params.id;
    const updatedmessage = req.body.message;

    const { error } = updateCommentSchema.validate({ message });
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updatedComment = await prisma.commentaire.update({
            where: {
                id: parseInt(id)
            },
            data: {
                message: updatedmessage
            }
        })
        res.status(200).send(updatedComment)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

//delete

export const deleteComment = async (req, res) => {
    const id = req.params.id;

    const { error } = deleteCommentSchema.validate({ id });
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const deletedComment = await prisma.commentaire.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).send(deletedComment)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}