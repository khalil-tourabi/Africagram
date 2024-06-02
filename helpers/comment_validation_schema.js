import Joi from 'joi';

export const createCommentSchema = Joi.object({
    message: Joi.string().required(),
    postId: Joi.number().integer().required(),
});

export const updateCommentSchema = Joi.object({
    commentId: Joi.number().integer().required(),
    updatedmessage: Joi.string().required(),
});

export const deleteCommentSchema = Joi.object({
    commentId: Joi.number().integer().required(),
});

