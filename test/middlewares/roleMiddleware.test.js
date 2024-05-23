const checkRole = require('../../src/middlewares/roleMiddleware');

describe('roleMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        role: 'user',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if user has the correct role', () => {
    const middleware = checkRole('user');
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user does not have the correct role', () => {
    const middleware = checkRole('admin');
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });
});
