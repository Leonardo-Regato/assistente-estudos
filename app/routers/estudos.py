from fastapi import APIRouter
from app.schemas import EstudoCriar, EstudoResposta
from app.services.estudos import listar_estudos, inserir_estudo

router = APIRouter(prefix="/estudos", tags=["estudos"])

@router.get("", response_model=list[EstudoResposta])
def listar():
    linhas = listar_estudos()
    return [
        EstudoResposta(id=linha[0], materia=linha[1], minutos=linha[2], data=linha[3], observacao=linha[4])
        for linha in linhas
    ]


@router.post("", status_code=201)
def criar(estudo: EstudoCriar):
    novo_id = inserir_estudo(estudo.materia, estudo.minutos, estudo.observacao)
    return {"id": novo_id}