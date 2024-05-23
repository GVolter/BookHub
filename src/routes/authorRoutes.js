const express = require('express');
const { body } = require('express-validator');
const { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const authenticateToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         bio:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management endpoints
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 */
router.get('/', getAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 */
router.get('/:id', getAuthorById);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Invalid input
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticateToken, checkRole('admin'), [
  body('name').notEmpty().withMessage('Name is required'),
], createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Author not found
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticateToken, checkRole('admin'), [
  body('name').notEmpty().withMessage('Name is required'),
], updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticateToken, checkRole('admin'), deleteAuthor);

module.exports = router;
