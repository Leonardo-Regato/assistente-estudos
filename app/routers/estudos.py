from fastapi import APIRouter, HTTPException
from app.schemas import EstudoCriar, EstudoResposta
from app.services.estudos import listar_estudos, inserir_estudo, excluir_estudo

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
    novo_id = inserir_estudo(
        materia=estudo.materia, 
        minutos=estudo.minutos, 
        observacao=estudo.observacao,
        data=estudo.data,
    )
    return {"id": novo_id}

@router.delete("/{id_materia}", status_code=204)
def excluir_materia(id_materia: int):
    resultado = excluir_estudo(id_materia)
    if not resultado:
        raise HTTPException(status_code=404, detail="O id não foi encontrado.")
