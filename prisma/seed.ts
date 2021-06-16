import { Post, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient({
    log: ['error', 'info', 'query', 'warn']
})
async function seed() {


    const users: User[] = [];

    for(let i = 0; i < 10; i++) {
        const user = await prisma.user.create({
            data: {
                name: `User ${i}`,
                email: `user${i}@mjv.com.br`,
            },
        });

        users.push(user);
    }

    const posts: Post[] = [];

    for(let i = 0; i < 3; i++) {
        const post = await prisma.post.create({
            data: {
                title: `Post ${i}`,
                authorId: users[i].id,
                content: `Content ${i}`,
                comments: {
                    createMany: {
                        data: [
                            {
                                authorId: users[i].id,
                                comment: `Comment 1 Post ${i}`,
                            },
                            {
                                authorId: users[i].id,
                                comment: `Comment 2 Post ${i}`,
                            },
                        ]
                    }
                }
            }
        });

        posts.push(post);
    }
}

seed()
    .then(() => {
        console.log('seeded db');
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(0);
    });
