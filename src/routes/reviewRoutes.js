const express = require('express');
const { body } = require('express-validator');
const { getReviewsByBookId, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const checkOwnership = require('../middlewares/ownershipMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - content
 *         - rating
 *         - bookId
 *         - userId
 *       properties:
 *         content:
 *           type: string
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         bookId:
 *           type: integer
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management endpoints
 */

/**
 * @swagger
 * /reviews/book/{bookId}:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: List of all reviews for a book
 */
router.get('/book/:bookId', getReviewsByBookId);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Invalid input
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticateToken, [
  body('content').notEmpty().withMessage('Content is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
  body('bookId').isInt().withMessage('Book ID must be an integer')
], createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Review not found
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticateToken, checkOwnership, [
  body('content').notEmpty().withMessage('Content is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5')
], updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticateToken, checkOwnership, deleteReview);

module.exports = router;
