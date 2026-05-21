const express = require('express');

const router = express.Router();

const Lead = require('../models/Lead');


// GET Leads

router.get('/', async (req, res) => {

  const leads = await Lead.find();

  res.json(leads);

});


// ADD Lead

router.post('/', async (req, res) => {

  const newLead = new Lead(req.body);

  await newLead.save();

  res.json(newLead);

});


// UPDATE Lead

router.put('/:id', async (req, res) => {

  const updatedLead =
    await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updatedLead);

});

module.exports = router;m