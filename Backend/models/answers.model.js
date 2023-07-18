const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
    unique: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
},
{timestamps:true}
);

module.exports = mongoose.model('Answer', answerSchema);
