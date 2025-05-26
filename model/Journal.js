import mongoose from 'mongoose';
const { Schema } = mongoose;

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    allowedViewers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    tags: [
      {
        type: String
      }
    ],
    mood: {
      type: String
    },
    location: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Journal = mongoose.model('Journal', journalSchema, 'journals');
export default Journal;
