from app.database import get_connection

def inserir_estudo(materia, minutos, observacao=None, data=None):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO estudos (materia, minutos, data, observacao) 
                VALUES (%s, %s, COALESCE(%s, CURRENT_DATE), %s)
                RETURNING id
                """,
                (materia, minutos, data, observacao)
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


def total_por_materia(dias=7):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT materia, SUM(minutos) 
                FROM estudos 
                WHERE data >= CURRENT_DATE - %s
                GROUP BY materia 
                ORDER BY SUM(minutos) DESC
                """,
                (dias,),
            )
            resultado = cur.fetchall()
    return resultado


def total_por_dia(dias=7):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT data, SUM(minutos) 
                FROM estudos 
                WHERE data >= CURRENT_DATE - %s
                GROUP BY data 
                ORDER BY data 

                """,
                (dias,),
            )
            resultado = cur.fetchall()
    return resultado