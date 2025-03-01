-- Create database
CREATE DATABASE IF NOT EXISTS marketplace;
USE marketplace;

-- Users
CREATE TABLE users IF NOT EXISTS users (
                       user_ID INT PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password_hash VARCHAR(255) NOT NULL,
                       user_type ENUM('student', 'organization') NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Users
CREATE TABLE students IF NOT EXISTS students(
                          student_id INT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          school_year ENUM('freshman', 'sophomore', 'junior', 'senior', 'graduate'),
                          major VARCHAR(100),
                          FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Organization Users
CREATE TABLE organizations (
                               org_id INT PRIMARY KEY,
                               name VARCHAR(255) NOT NULL,
                               org_type ENUM('club', 'university', 'business') NOT NULL,
                               description TEXT,
                               FOREIGN KEY (org_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Listings
CREATE TABLE listings (
                          listing_id INT AUTO_INCREMENT PRIMARY KEY,
                          user_id INT NOT NULL,
                          title VARCHAR(255) NOT NULL,
                          description TEXT,
                          category ENUM('sell', 'rent', 'trade') NOT NULL,
                          price DECIMAL(10,2), -- NULL if trade
                          image_url VARCHAR(255),
                          status ENUM('available', 'pending', 'sold', 'rented') DEFAULT 'available',
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Inventory Table
CREATE TABLE inventory (
                           inventory_id INT AUTO_INCREMENT PRIMARY KEY,
                           org_id INT NOT NULL,
                           item_name VARCHAR(255) NOT NULL,
                           description TEXT,
                           quantity INT NOT NULL,
                           rental_price DECIMAL(10,2),
                           sale_price DECIMAL(10,2),
                           image_url VARCHAR(255),
                           status ENUM('available', 'rented', 'sold') DEFAULT 'available',
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (org_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Transactions
CREATE TABLE transactions (
                              transaction_id Int PRIMARY KEY,
                              buyer_id INT NOT NULL,
                              seller_id INT NOT NULL,
                              listing_id INT, -- Used when purchasing from a student
                              inventory_id INT, -- Used when renting from an organization
                              transaction_type ENUM('purchase', 'rental', 'trade') NOT NULL,
                              status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending',
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE CASCADE,
                              FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE,
                              FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE,
                              FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id) ON DELETE CASCADE
);

-- Messages Table (For communication between users)
CREATE TABLE messages (
                          message_id INT AUTO_INCREMENT PRIMARY KEY,
                          sender_id INT NOT NULL,
                          receiver_id INT NOT NULL,
                          listing_id INT,
                          message TEXT NOT NULL,
                          sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
                          FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
                          FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE
);

-- Favorites Table (For saving listings)
CREATE TABLE favorites (
                           favorite_id INT AUTO_INCREMENT PRIMARY KEY,
                           user_id INT NOT NULL,
                           listing_id INT NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                           FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE
);