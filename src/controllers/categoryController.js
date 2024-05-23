const prisma = require('../config/database');
const { validationResult } = require('express-validator');

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name }
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Category creation failed' });
  }
};

const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: 'Category not found' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Category not found' });
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
