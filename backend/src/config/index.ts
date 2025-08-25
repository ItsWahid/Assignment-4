import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.join(process.cwd(), '.env')});

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 2000, // fallback port
  database_url: process.env.DATABASE_URL || ''
};