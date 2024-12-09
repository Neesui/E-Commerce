import Category from '../models/categoryModel.js';

// Insert a new category
export const postCategory = async (req, res) => {
    try {
        // Check for unique category name
        const existingCategory = await Category.findOne({ categoryName: req.body.categoryName });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category name must be unique' });
        }

        // Create a new category
        const category = new Category({
            categoryName: req.body.categoryName,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        });

        const savedCategory = await category.save();
        if (!savedCategory) {
            return res.status(400).json({ error: 'Something went wrong while saving the category' });
        }

        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve all categories
export const categoryList = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({ error: 'No categories found' });
        }
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View category details
export const categoryDetails = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                categoryName: req.body.categoryName,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            },
            { new: true, runValidators: true } // Return the updated document and validate fields
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category with that ID not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
