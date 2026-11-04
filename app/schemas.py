from datetime import date
from pydantic import BaseModel, Field


class EstudoCriar(BaseModel):
    materia: str
    minutos: int = Field(gt=0)
    observacao: str | None = None

class EstudoResposta(BaseModel):
    id: int
    materia: str
    minutos: int
    data: date
    observacao: str | None = None