import mysql from 'mysql2/promise';

export type ConnectionOptions = mysql.PoolOptions;

export async function connectToDb(connectionOptions: ConnectionOptions) {
  const db = mysql.createPool(connectionOptions);

  try {
    // Create the users table
    await db.query(createUsersTable);
    console.log('Users table created successfully');
  } catch (err) {
    console.error('Error creating users table:', err);
  }

  return db;
}

export const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
