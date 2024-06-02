import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const getTotalUsers = async (req, res) => {    
    try {
        const totalUsers = await prisma.utilisateur.count();
        res.json({ totalUsers: totalUsers });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getTotalUsersByCountry = async (req, res) => {
    try {
        const usersPerCountry = await prisma.profile.groupBy({
            by: ["pays"],
            _count: true,
        });
        
        res.send(usersPerCountry);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getAVGPostsPerUser = async (req, res) => {
    try {
        const totalPosts = await prisma.post.count();
        const totalUsers = await prisma.utilisateur.count();
        const averagePostsPerUser = totalPosts / totalUsers;
        console.log("Average number of posts per user:", averagePostsPerUser);
        res.json({ averagePostsPerUser: averagePostsPerUser })
    } catch (error) {
        console.log(error)
        res.send((error))
    }
}

export const getGenderDistribution = async (req, res) =>{
    try {
        const genderDistribution = await prisma.profile.groupBy({
            by: ["sexe"],
            _count: true,
          });
        res.send(genderDistribution)          
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

