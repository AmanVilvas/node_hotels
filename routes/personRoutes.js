const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// POST route to add a person
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    console.log('Person data saved successfully:', savedPerson);
    res.status(200).json(savedPerson);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.mobile) {
      console.error('Duplicate mobile number detected:', error);
      res.status(400).json({ error: 'Mobile number already exists. Please use a unique number.' });
    } else {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
});

// GET route to fetch all persons
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// GET route to fetch persons by work type
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (['chef', 'manager', 'waiter'].includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log('Response fetched successfully');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// PUT route to update a person's details
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's ID
    const updatedPersonData = req.body; // Updated data for the person
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // return the updated documents
      runValidators: true, // checks if all the parameters e.g required in mongoose are correct or not
    });
    
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data updated successfully');
    res.status(200).json(response);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// DELETE route to delete a person
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's ID
    const response = await Person.findByIdAndRemove(personId);
    
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person deleted successfully');
    res.status(200).json({ message: 'Person Deleted Successfully' });
    
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
