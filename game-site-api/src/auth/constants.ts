import dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  // Secret must be in .env
  secret: process.env.JWT_SECRET,
};
