import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//like a post 

export const likePost = async (req, res) => {
    const userId = req.params.id
    const aimer = true
    const postId = req.query.postId 
    try {
        const likedPost = await prisma.aime.create({
            data : {
                aimer,
                utilisateur_id: parseInt(userId),
                post_id: parseInt(postId)
            }
        })
        res.status(200).send("you liked this post")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//unlike a post
export const unlikePost = async (req, res) => {
    const likeId = req.params.id
    const aimer = false
    try {
        const unlikedPost = await prisma.aime.update({
            where :{
                id: parseInt(likeId)
            },
            data: {
                aimer
            }
        }) 
        res.send("you unlikes this post")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
