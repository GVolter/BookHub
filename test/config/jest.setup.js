const { mockDeep } = require('jest-mock-extended');
const prisma = require('../../src/config/database');

jest.mock('../../src/config/database', () => {
  const prismaMock = mockDeep();
  return {
    __esModule: true,
    default: prismaMock,
  };
});

global.prismaMock = prisma;
