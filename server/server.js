import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// =====================================================
// CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://portfolio-1-seven-silk.vercel.app',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header, such as
      // server-to-server requests and local command-line tests.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json({ limit: '10kb' }));

// =====================================================
// MONGODB MODEL
// =====================================================

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model(
  'ContactMessage',
  contactMessageSchema
);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Contact API is running.',
  });
});

// =====================================================
// CONTACT FORM API
// =====================================================

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {};

  const normalizedName =
    typeof name === 'string' ? name.trim() : '';

  const normalizedEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : '';

  const normalizedMessage =
    typeof message === 'string' ? message.trim() : '';

  // Validate required fields
  if (!normalizedName || !normalizedEmail || !normalizedMessage) {
    return res.status(400).json({
      error: 'Name, email, and message are required.',
    });
  }

  // Validate field lengths
  if (
    normalizedName.length > 100 ||
    normalizedEmail.length > 254 ||
    normalizedMessage.length > 5000
  ) {
    return res.status(400).json({
      error: 'One or more fields exceed the allowed length.',
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    return res.status(400).json({
      error: 'Please provide a valid email address.',
    });
  }

  // Check database connection before attempting to save
  if (mongoose.connection.readyState !== 1) {
    console.error('MongoDB is not connected.');

    return res.status(503).json({
      error: 'Database is temporarily unavailable. Please try again later.',
    });
  }

  try {
    const savedMessage = await ContactMessage.create({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
    });

    console.log('Contact message saved:', savedMessage._id.toString());

    return res.status(201).json({
      message: 'Contact message saved.',
    });
  } catch (error) {
    console.error('Failed to save contact message:', error);

    return res.status(500).json({
      error: 'Unable to save your message. Please try again.',
    });
  }
});

// =====================================================
// ERROR HANDLING
// =====================================================

// Handle invalid JSON and request parsing errors
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      error: 'Invalid JSON request body.',
    });
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'Request is too large.',
    });
  }

  if (error.message === 'Origin not allowed by CORS') {
    return res.status(403).json({
      error: 'This website is not allowed to access the API.',
    });
  }

  console.error('Unexpected server error:', error);

  return res.status(500).json({
    error: 'An unexpected server error occurred.',
  });
});

// =====================================================
// CONNECT TO MONGODB AND START SERVER
// =====================================================

async function startServer() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is missing.');
    }

    await mongoose.connect(mongoUri);

    console.log('MongoDB connected successfully.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Contact API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the Contact API:', error);
    process.exit(1);
  }
}

startServer();