import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

app.use(express.json({ limit: '10kb' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {};
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim() : '';
  const normalizedMessage = typeof message === 'string' ? message.trim() : '';

  if (!normalizedName || !normalizedEmail || !normalizedMessage) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (
    normalizedName.length > 100 ||
    normalizedEmail.length > 254 ||
    normalizedMessage.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return res.status(400).json({ error: 'Please provide valid contact details.' });
  }

  try {
    await ContactMessage.create({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
    });

    return res.status(201).json({ message: 'Contact message saved.' });
  } catch (error) {
    console.error('Failed to save contact message:', error);
    return res.status(500).json({ error: 'Unable to save your message. Please try again.' });
  }
});

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Contact API listening on port ${port}`);
  });
} catch (error) {
  console.error('Failed to connect to MongoDB:', error);
  process.exitCode = 1;
}