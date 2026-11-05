from fastapi import FastAPI
from app.routers import estudos, relatorios

app = FastAPI()
app.include_router(estudos.router)
app.include_router(relatorios.router)