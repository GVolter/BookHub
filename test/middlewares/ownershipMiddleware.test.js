const checkOwnership = require('../../src/middlewares/ownershipMiddleware');
const prisma = require('../../src/config/database');
const { mockDeep } = require('jest-mock-extended');

describe('ownershipMiddleware', () => {
  let req, res, next, prismaMock;

  beforeEach(() => {
    req = {
      user: {
        id: 1,
        role: 'user',
      },
      params: {
        id: '1',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    prismaMock = mockDeep();
    prisma.review = prismaMock.review;

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should call next if user is the owner', async () => {
    prismaMock.review.findUnique.mockResolvedValue({ userId: 1 });

    await checkOwnership(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should call next if user is an admin', async () => {
    req.user.role = 'admin';
    prismaMock.review.findUnique.mockResolvedValue({ userId: 2 });

    await checkOwnership(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user is not the owner and not an admin', async () => {
    prismaMock.review.findUnique.mockResolvedValue({ userId: 2 });

    await checkOwnership(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'You do not have permission to perform this action' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 404 if review is not found', async () => {
    prismaMock.review.findUnique.mockResolvedValue(null);

    await checkOwnership(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Review not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 if an error occurs', async () => {
    prismaMock.review.findUnique.mockRejectedValue(new Error('Database error'));

    await checkOwnership(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while checking ownership' });
    expect(next).not.toHaveBeenCalled();
  });
});
