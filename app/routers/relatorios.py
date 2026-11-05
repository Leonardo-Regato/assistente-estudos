from fastapi import APIRouter
from app.schemas import TotalMateria, TotalDia
from app.services.estudos import total_por_dia, total_por_materia

router = APIRouter(prefix="/relatorios", tags=["relátorios"])

@router.get("/materias", response_model=list[TotalMateria])
def por_materia(dias: int = 7):
    linhas = total_por_materia(dias)
    return [TotalMateria(materia=linha[0], total_minutos=linha[1]) for linha in linhas]

@router.get("/dias", response_model=list[TotalDia])
def por_dia(dias: int = 7):
    linhas = total_por_dia(dias)
    return [TotalDia(data=linha[0], total_minutos=linha[1]) for linha in linhas]