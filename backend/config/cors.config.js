const allowedOrigins = [
  'https://netlankatravels.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser tools or same origin
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

module.exports = corsOptions;
