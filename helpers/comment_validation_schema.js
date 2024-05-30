import Joi from 'joi';

export const createCommentSchema = Joi.object({
    message: Joi.string().required(),
    postId: Joi.number().integer().required(),
});

export const updateCommentSchema = Joi.object({
    message: Joi.string().required(),
});

export const deleteCommentSchema = Joi.object({
    id: Joi.number().integer().required(),
});

