import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', `warn`, `error`],
})

async function main() {
    const users = await prisma.user.findMany({
            include: {
                comments: {
                    select: {
                        id: true,
                        childComments: true,
                    },
                },
                posts: {
                    select: {
                        id: true,
                        title: true,
                        comments: {
                            where: {
                                parentComment: null,
                            }
                        },
                    }
                },
            },
            orderBy: [{
                createdAt: 'desc'
            }]
        });
        
        const user = await prisma.user.create({ //
            data: {
                name: 'Alan',
                email: 'email'
            },
            select: {
                id: true,
            }
        });
        
        const agregate = await prisma.user.aggregate({
            _count: {
                _all: true,
            },
        });
        agregate._count._all
        
        const x = Prisma.validator<Prisma.UserCreateInput>();
}

// Function definition that returns a partial structure
async function getUsersWithPosts() {
    const users = await prisma.user.findMany({ include: { posts: true } })
    return users;
}

main()
    .then(() => {
        console.log('finished');
    })
    .catch((err) => {
        console.error(err);
    })
    ;
