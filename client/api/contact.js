import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', contactMessageSchema);

async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured.');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!globalThis.mongoConnection) {
    globalThis.mongoConnection = mongoose.connect(process.env.MONGO_URI);
  }

  try {
    await globalThis.mongoConnection;
  } catch (error) {
    globalThis.mongoConnection = null;
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

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
    await connectToDatabase();
    await ContactMessage.create({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
    });

    return res.status(201).json({ message: 'Contact message saved.' });
  } catch (error) {
    console.error('Contact API failed:', error.message);
    return res.status(500).json({ error: 'Unable to save your message. Please try again.' });
  }
}
