import { PrismaClient } from '@prisma/client'
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'
import { createPostSchema, idSchema, updatePostSchema } from '../helpers/post_validation_schema.js';
import BadRequestError from '../errors/bad-request.js';
import UnAuthenticatedError from '../errors/unauthenticated.js';

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Get all posts 
export const getPosts = async (req, res) => {
    let userId    
    userId = req.user.id

    console.log(userId)

    if (!userId){
        throw new UnAuthenticatedError("you must login first!!")
    }

    try {
        const posts = await prisma.post.findMany({
            include: {
                _count: {
                    select: {
                        Aime: true,
                        Commentaire: true,
                    },
                },
            },
        });

        const postsWithDetails = posts.map(post => {
            const photoUrl = path.join('../uploads/posts/', post.photo).replace(/\\/g, '/');
            return {
                ...post,
                photoUrl,
                totalLikes: post._count.Aime,
                totalComments: post._count.Commentaire,
            };
        });

        res.status(200).json(postsWithDetails);
        return postsWithDetails;
    } catch (error) {
        throw new BadRequestError('Failed to fetch posts');
    }
};

export const getPostPhoto = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const photoPath = join(__dirname, '..', 'uploads', 'posts', post.photo);
        const photoData = fs.readFileSync(photoPath);
        console.log(photoPath)
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(photoData, 'binary');
    } catch (error) {
        console.error('Error fetching post photo:', error);
        throw new BadRequestError('Failed to fetch post photo');    }
}


//get all post's comments
export const getPostComments = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await prisma.commentaire.findMany({
            where: {
                post_id: parseInt(postId)
            },
            select: {
                message: true,
                utilisateur: {
                    select: {
                        firstname: true,
                        lastname: true
                    }
                }
            }
        });

        const formattedComments = comments.map(comment => ({
            username: `${comment.utilisateur.firstname} ${comment.utilisateur.lastname}`,
            message: comment.message
        }));

        res.status(200).send(formattedComments);
    } catch (error) {
        console.log(error);
        throw new BadRequestError('Failed to fetch comments');    }
};


//get all post's likes

export const getPostLikes = async (req, res) => {
    const postId = req.params.id 
    try {
        const postLikes  = await prisma.aime.findMany({
            where :{
                post_id: parseInt(postId),
            }
        })
        res.status(200).send(postLikes)
    } catch (error) {
        console.log(error)
        throw new BadRequestError('Failed to fetch likes');
    }
}

// Create new post
export const createPost = async (req, res) => {
    const userId = req.user.id;
    const { caption } = req.body;
    const  photo  = req.file.filename;
    const photosize = req.file.size;

    if (photosize > 5 * 1024 * 1024) {
        return res.status(400).json({ error: 'Photo size must not exceed 5MB' });
    }

    const { error } = createPostSchema.validate({ caption, photo });
    if (error) return res.status(400).json({ error: error.details[0].message})

    try {
        const newPost = await prisma.post.create({
            data: {
                caption,
                photo,
                utilisateur_id: parseInt(userId) 
            }
        });

        res.status(200).json(newPost);
    } catch (error) {
        console.error(error);
        throw new BadRequestError('photo and caption are required');
    }
};



//delete post 

export const deletePost = async (req, res) => {

    const id = req.params.id 

    console.log("post id: ",id)

    const { error } = idSchema.validate(id);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: parseInt(id)
            }
        });
        
        res.status(200).send(deletedPost)
    } catch (error) {
        console.log(error);
        throw new BadRequestError('Failed to delete post');
    }
}

//modify post

export const updatePost = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const newCaption = req.body.caption;
    const newPhoto = req.file.filename;

    const { error } = updatePostSchema.validate({ caption: newCaption, photo: newPhoto})

    if (error) return res.status(400).json({ error: error.details[0].message});

    try{

        const existingPost = await prisma.post.findUnique({
            where:{
                id: parseInt(id)
            }
        })

        if(existingPost.utilisateur_id !== userId){
            return res.status(403).send("You don't have permetion to update this post.")
        }


        const updatedPost = await prisma.post.update({
            where:{
                id: parseInt(id)
            },
            data: {
                caption: newCaption,
                photo: newPhoto,
                date_modification: new Date()
            }
        });


        res.status(200).send("post updated..")
    }catch(error){
        console.log(error)
        throw new BadRequestError('Failed to update post');
    }
}