import { prismaClient } from '@prisma/client';
const prisma = prismaClient;

// Follow a user

export const followUser = async (req, res) => {
    const userId = req.user.id;
    const { followUserId } = req.body;

    if(!followUserId) {
        return res.status(400).send("user ID to follow is required");
    }

    try {
        const follow = await prisma.follower.create({
            data: {
                follower_id: parseInt(userId),
                following_id: parseInt(followUserId)
            }
        });
        res.send(200).send("you followed this user");
    } catch (error) {
        console.log(error);
        res.status(500).send("an error occurred while following the user");
    }
};

//unfollow a user 

export const unfollowUser = async (req, res) => {
    const userId = req.user.id;
    const { followUserId } = req.body;

    if (!followUserId) {
        return res.status(400).send("user ID to unfollow is required");
    }

    try {
        const unfollow = await prisma.follower.delete({
            where: {
                follower_id_following_id: {
                    follower_id: parseInt(userId),
                    following_id: parseInt(followUserId)
                }
            }
        });
        res.status(200).send("You unfollowed this user");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while unfollowing the user");
    }

}

//Get following 
export const getFollowing = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is stored in req.user.id

    try {
        const following = await prisma.follower.findMany({
            where: {
                follower_id: userId
            },
            include: {
                Following: true // Including the user details of those being followed
            }
        });

        const followingList = following.map(f => f.Following);

        res.status(200).json(followingList);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while retrieving the following list");
    }
};

// get followers
export const getFollowers = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is stored in req.user.id

    try {
        const followers = await prisma.follower.findMany({
            where: {
                following_id: userId
            },
            include: {
                Follower: true // Including the user details of the followers
            }
        });

        const followersList = followers.map(f => f.Follower);

        res.status(200).json(followersList);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while retrieving the followers list");
    }
};