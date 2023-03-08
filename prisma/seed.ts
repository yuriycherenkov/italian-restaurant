import { PrismaClient, Role } from '@prisma/client';
import { encodePassword } from '../src/lib/password';

const prisma = new PrismaClient();

const USERS = [
  {
    email: 'owen@prisma.io',
    firstName: 'Owen',
    lastName: 'Lars',
    role: Role.VISITOR,
  },
  {
    email: 'alice@prisma.io',
    firstName: 'Alice',
    lastName: 'Dou',
    role: Role.VISITOR,
  },
  {
    email: 'ben@prisma.io',
    firstName: 'Ben',
    lastName: 'Solo',
    role: Role.WORKER,
  },
  {
    email: 'luke@prisma.io',
    firstName: 'Luke',
    lastName: 'Skywalker',
    role: Role.WORKER,
  },
  {
    email: 'leia@prisma.io',
    firstName: 'Leia',
    lastName: 'Organa',
    role: Role.MANAGER,
  },
];

async function main() {
  for (const user of USERS) {
    const password = await encodePassword('123');
    await prisma.user.create({
      data: { ...user, password },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
