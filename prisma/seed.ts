import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function seed() {

    const users = await prisma.user.createMany({
        data: [
            {
                name: 'alan',
                email: 'alan@gmail.com'
            },
            {
                name: 'alan2',
                email: 'alan2@gmail.com'
            },
        ]
    });

    
}

export default seed;
