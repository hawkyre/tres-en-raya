import mongoose from 'mongoose';
let schema;

if (!mongoose.models.scores) {
  console.log('Creating Scores schema');
  schema = new mongoose.Schema({
    winner: String,
    final_board: String,
  });
}

export const Scores =
  mongoose.models.scores || mongoose.model('scores', schema);
