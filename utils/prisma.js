const { PrismaClient } = require('@prisma/client');

const prisma =  new PrismaClient();

// if (process.env.NODE_ENV === 'development') global.prisma = prisma;

module.exports = prisma;