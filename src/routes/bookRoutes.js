const express = require('express');
const { body } = require('express-validator');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const authenticateToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - authorId
 *       properties:
 *         title:
 *           type: string
 *         authorId:
 *           type: integer
 *         categories:
 *           type: array
 *           items:
 *             type: integer
 *         reviews:
 *           type: array
 *           items:
 *             type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management endpoints
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title]
 *         description: Sort books by field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order of sorting
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter books by category name
 *     responses:
 *       200:
 *         description: List of all books
 */
router.get('/', getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Invalid input
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticateToken, checkRole('admin'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('authorId').isInt().withMessage('Author ID must be an integer'),
  body('categories').isArray({ min: 1 }).withMessage('Categories must be an array of integers'),
], createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticateToken, checkRole('admin'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('authorId').isInt().withMessage('Author ID must be an integer'),
  body('categories').isArray({ min: 1 }).withMessage('Categories must be an array of integers'),
], updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticateToken, checkRole('admin'), deleteBook);

module.exports = router;
