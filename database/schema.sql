CREATE TABLE estudos (
    id SERIAL PRIMARY KEY,
    materia VARCHAR(100) NOT NULL,
    minutos INTEGER NOT NULL CHECK (minutos > 0),
    data DATE NOT NULL DEFAULT CURRENT_DATE,
    observacao TEXT,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);