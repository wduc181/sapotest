CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          price DECIMAL(15, 2) NOT NULL,
                          stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE orders (
                        id VARCHAR(50) PRIMARY KEY,
                        user_id BIGINT NOT NULL,
                        product_id BIGINT NOT NULL REFERENCES products(id),
                        quantity INT NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);