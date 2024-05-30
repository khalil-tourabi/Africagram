import Joi from 'joi';

const validFileExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const photoSchema = Joi.string().custom((value, helpers) => {
    const extension = value.split('.').pop().toLowerCase();
    if (!validFileExtensions.includes(extension)) {
        return helpers.message(`'photo' must be one of [${validFileExtensions.join(', ')}]`);
    }
    return value;
}, 'File Extension Validation');

// Schema for creating a post
export const createPostSchema = Joi.object({
    caption: Joi.string().required()
                          .min(2)
                          .max(180),
    photo: photoSchema.required()
});

// Schema for deleting a post
export const idSchema = Joi.number().integer().required();

// Schema for updating a post
export const updatePostSchema = Joi.object({
    caption: Joi.string().required(),
    photo: photoSchema.required()
});
