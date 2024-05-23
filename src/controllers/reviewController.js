const prisma = require('../config/database');
const { validationResult } = require('express-validator');

const getReviewsByBookId = async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { bookId: parseInt(bookId) },
      include: { user: true }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, rating, bookId } = req.body;
  const userId = req.user.id; 
  try {
    const review = await prisma.review.create({
      data: {
        content,
        rating,
        book: { connect: { id: bookId } },
        user: { connect: { id: userId } }
      }
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Review creation failed', details: error.message });
  }
};

const updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { content, rating } = req.body;
  try {
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { content, rating }
    });
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Review not found', details: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Review not found', details: error.message });
  }
};

module.exports = { getReviewsByBookId, createReview, updateReview, deleteReview };
