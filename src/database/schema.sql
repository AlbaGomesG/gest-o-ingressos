CREATE DATABASE tickets;

\c tickets;

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) UNIQUE NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO tickets (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
    ('Existe vida após o casamento', 'Teatro Polytheama', '2025-04-17', 'Camarote', 100.00, 57),
    ('Murilo Couto', 'Teatro Oficina do Estudante Iguatemi', '2025-04-17', 'Arquibancada', 80.00, 25),
    ('Jorge e Mateus', 'Parque de Exposições Dr. Fernando Costa (Posto de Monta)', '2025-04-30', 'Pista VIP', 350.00, 13);