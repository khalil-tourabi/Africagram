import { PrismaClient } from '@prisma/client';
import path from 'path';
const prisma = new PrismaClient();

export const getNewsfeed = async (req, res) => {
    const userId = req.user.id;

    try {
        const following = await prisma.follower.findMany({
            where: {
                follower_id: userId
            },
            select: {
                following_id: true
            }
        });

        const followingIds = following.map(f => f.following_id);

        const posts = await prisma.post.findMany({
            where: {
                utilisateur_id: {
                    in: followingIds
                }
            },
            include: {
                _count: {
                    select: {
                        Aime: true,
                        Commentaire: true,
                    },
                },
                Utilisateur: {
                    select: {
                        firstname: true,
                        lastname: true
                    }
                }
            },
            orderBy: {
                date_creation: 'desc'
            },
            take: 5 
        });

        const postsWithDetails = posts.map(post => {
            const photoUrl = path.resolve('../uploads/posts/', post.image_url).replace(/\\/g, '/');
            return {
                ...post,
                photoUrl,
                totalLikes: post._count.Aime,
                totalComments: post._count.Commentaire,
                user: {
                    firstname: post.Utilisateur.firstname,
                    lastname: post.Utilisateur.lastname
                }
            };
        });

        res.status(200).json(postsWithDetails);
    } catch (error) {
        console.error('Error fetching newsfeed:', error);
        res.status(500).json({ error: 'Failed to fetch newsfeed' });
    }
};
