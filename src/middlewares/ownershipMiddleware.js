const prisma = require('../config/database');

const checkOwnership = async (req, res, next) => {
  const userId = req.user.id; 
  const { id } = req.params; 

  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while checking ownership' });
  }
};

module.exports = checkOwnership;
