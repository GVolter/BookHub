const authenticateToken = require('../../src/middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer token',
      },
    };
    res = {
      sendStatus: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if token is valid', () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: 1, username: 'testuser', role: 'user' });
    });

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', () => {
    req.headers.authorization = null;

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
