const router = require('express').Router();
const Answer = require('../models/answers.model');


router.get('/', async (req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error retrieving answers: ${err.message}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const { answers, userId } = req.body;

    
    let existingAnswer = await Answer.findOne({ userId });

    if (existingAnswer) {
      
      existingAnswer.answers.push(...answers);
      await existingAnswer.save();
      res.status(200).json(existingAnswer);
    } else {
      
      const newAnswer = await Answer.create({ userId, answers });
      res.status(201).json(newAnswer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error creating answer: ${err.message}` });
  }
});

module.exports = router;
