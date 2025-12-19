const allowedOrigins = [
    process.env.DEVELOPMENT_WEB_URL, 
    process.env.PRODUCTION_WEB_URL, 
  ].filter(Boolean);
  
  module.exports = allowedOrigins;
  