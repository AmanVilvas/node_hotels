const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuitem');

// POST route to add a menu item
router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const savedMenuItem = await newMenuItem.save();
      console.log('Menu item saved successfully:', savedMenuItem);
      res.status(200).json(savedMenuItem);
    } catch (error) {
      console.error('Error saving menu item:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
  // GET route to fetch all menu items
  router.get('/', async (req, res) => {
    try {
      const menuItems = await MenuItem.find(); // Fetch all menu items from the database
      res.status(200).json(menuItems); // Send back the menu items data
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  })

  router.get('/:taste', async (req, res) => {
    try {
      const taste = req.params.taste;
      if (['savory', 'spicy', 'sour'].includes(taste)) {
        const response = await menuItems.find({ work: tatse });
        console.log('Response fetched successfully');
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Invalid taste' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

  module.exports = router;
