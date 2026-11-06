from datetime import date
from pydantic import BaseModel, Field, field_validator


class EstudoCriar(BaseModel):
    materia: str
    minutos: int = Field(gt=0)
    data: date | None = None
    observacao: str | None = None

    @field_validator("observacao")
    @classmethod
    def observacao_vazia_vira_none(cls, valor):
        if valor is not None and valor.strip() == "":
            return None
        return valor

    @field_validator("materia")
    @classmethod
    def padroniza_materia(cls, valor):
        return valor.strip().title()

class EstudoResposta(BaseModel):
    id: int
    materia: str
    minutos: int
    data: date
    observacao: str | None = None

class TotalMateria(BaseModel):
    materia: str
    total_minutos: int

class TotalDia(BaseModel):
    data: date
    total_minutos: int