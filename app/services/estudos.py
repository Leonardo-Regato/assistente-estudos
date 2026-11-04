from app.database import get_connection

def inserir_estudo(materia, minutos, observacao=None):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO estudos (materia, minutos, observacao) VALUES (%s, %s, %s) RETURNING id",
                (materia, minutos, observacao)
            )
            novo_id = cur.fetchone()[0]
    return novo_id

def listar_estudos():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, materia, minutos, data, observacao FROM estudos ORDER BY data DESC, id DESC"
            )
            lista = cur.fetchall()
    return lista