import { PrismaClient } from '@prisma/client';

const prismaInstance = new PrismaClient();

const seedBuyOrders = async () => {
  const buyOrders = await prismaInstance.buyOrders.findMany();
  if (buyOrders.length > 0) {
    console.log('Buy orders already seeded');
    return;
  }
  await prismaInstance.buyOrders.createMany({
    data: [
      { ingredient: 'tomato', quantityToBuy: 0 },
      { ingredient: 'lemon', quantityToBuy: 0 },
      { ingredient: 'potato', quantityToBuy: 0 },
      { ingredient: 'rice', quantityToBuy: 0 },
      { ingredient: 'ketchup', quantityToBuy: 0 },
      { ingredient: 'lettuce', quantityToBuy: 0 },
      { ingredient: 'onion', quantityToBuy: 0 },
      { ingredient: 'cheese', quantityToBuy: 0 },
      { ingredient: 'meat', quantityToBuy: 0 },
      { ingredient: 'chicken', quantityToBuy: 0 },
    ],
  });
};

const seedDb = async () => {
  await prismaInstance.buyOrders.deleteMany();
  await seedBuyOrders();
};

seedDb();
