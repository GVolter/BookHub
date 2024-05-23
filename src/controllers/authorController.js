const prisma = require('../config/database');
const { validationResult } = require('express-validator');

const getAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};

const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({ where: { id: parseInt(id) } });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author' });
  }
};

const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, bio } = req.body;
  try {
    const author = await prisma.author.create({
      data: { name, bio }
    });
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: 'Author creation failed' });
  }
};

const updateAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    const author = await prisma.author.update({
      where: { id: parseInt(id) },
      data: { name, bio }
    });
    res.json(author);
  } catch (error) {
    res.status(404).json({ error: 'Author not found' });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.author.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Author deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Author not found' });
  }
};

module.exports = { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
