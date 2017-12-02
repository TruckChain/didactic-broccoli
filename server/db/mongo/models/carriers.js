/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const CarrierSchema = new mongoose.Schema({
  id: String,
  text: String,
  count: { type: Number, min: 0 },
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Carrier', CarrierSchema);

