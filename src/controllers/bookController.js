const prisma = require('../config/database');
const { validationResult } = require('express-validator');

const getBooks = async (req, res) => {
  const { sortBy, order, category } = req.query;

  // Construct the query object
  let query = {
    include: {
      author: true,
      categories: {
        include: {
          category: true
        }
      },
      reviews: true,
    }
  };

  // Apply sorting
  if (sortBy) {
    query.orderBy = {
      [sortBy]: order === 'desc' ? 'desc' : 'asc'
    };
  }

  // Apply filtering by category
  if (category) {
    query.where = {
      categories: {
        some: {
          category: {
            name: category
          }
        }
      }
    };
  }

  try {
    const books = await prisma.book.findMany(query);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        categories: {
          include: {
            category: true
          }
        },
        reviews: true,
      },
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

const createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, authorId, categories } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author: { connect: { id: authorId } },
        categories: {
          create: categories.map(categoryId => ({
            category: { connect: { id: categoryId } }
          }))
        }
      }
    });
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Book creation failed', details: error.message });
  }
};

const updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, authorId, categories } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author: { connect: { id: authorId } },
        categories: {
          deleteMany: {},
          create: categories.map(categoryId => ({
            category: { connect: { id: categoryId } }
          }))
        }
      }
    });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Book not found', details: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.bookCategory.deleteMany({
      where: { bookId: parseInt(id) }
    });

    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Book not found', details: error.message });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
