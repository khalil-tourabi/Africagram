import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assume the user ID is set in the request (e.g., from a previous auth middleware)
        const user = await prisma.utilisateur.findUnique({ where: { id: userId } });

        if (user && user.isAdmin) {
            next(); 
        } else {
            res.status(403).json({ error: "Access denied. Admins only." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default isAdmin;
