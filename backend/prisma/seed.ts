import { mockItems, mockUserProfiles } from '@hiram/shared';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed users
  for (const u of mockUserProfiles) {
    const passwordHash = await bcrypt.hash('password', 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        studentId: u.studentId ?? undefined,
        avatarUrl: u.avatarUrl ?? null,
        passwordHash,
      },
      create: {
        id: u.id,
        email: u.email,
        name: u.name,
        studentId: u.studentId ?? undefined,
        avatarUrl: u.avatarUrl ?? null,
        passwordHash,
        createdAt: u.createdAt ? new Date(u.createdAt) : undefined,
      },
    });
  }

  // Seed items
  for (const it of mockItems) {
    const imageUrls = it.image ? [it.image] : [];
    await prisma.item.upsert({
      where: { id: it.id },
      update: {
        title: it.title,
        description: it.description ?? '',
        category: it.category,
        condition: it.condition,
        imageUrls,
        isAvailable: it.isAvailable ?? true,
      },
      create: {
        id: it.id,
        title: it.title,
        description: it.description ?? '',
        category: it.category,
        condition: it.condition,
        imageUrls,
        isAvailable: it.isAvailable ?? true,
        ownerId: it.ownerId!,
        createdAt: it.createdAt ? new Date(it.createdAt) : undefined,
      },
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
