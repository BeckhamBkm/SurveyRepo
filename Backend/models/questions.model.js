const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true,
  },
  question_text: {
    type: String,
    required: true,
  },
  input_type: {
    type: String,
    enum: ['numerical', 'free_text', 'multiple_select'],
    required: true,
  },
  options: {
    type: [String],
    validate: {
      validator: function (options) {
        if (this.input_type === 'multiple_select' && options.length < 2) {
          return false;
        }
        return true;
      },
      message: 'Multiple select questions must have at least 2 options',
    },
  },
});

const Question = mongoose.model('Question', questionSchema,'Questions');

module.exports = Question;
