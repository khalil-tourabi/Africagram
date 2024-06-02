import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//like a post 

export const likePost = async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).send("Post ID is required");
    }

    try {
        const likedPost = await prisma.aime.create({
            data: {
                utilisateur_id: parseInt(userId),
                post_id: parseInt(postId)
            }
        });
        res.status(200).send("You liked this post");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while liking the post");
    }
};

//unlike a post
export const unlikePost = async (req, res) => {
    const userId = req.user.id; 
    const { likeId } = req.body;

    if (!likeId) {
        return res.status(400).send("like ID is required");
    }

    try {
        const unlikedPost = await prisma.aime.deleteMany({
            where: {
                    id: likeId
            }
        });
        res.status(200).send("You unliked this post");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while unliking the post");
    }
};
