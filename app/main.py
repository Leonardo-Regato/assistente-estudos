from fastapi import FastAPI
from app.routers import estudos

app = FastAPI()
app.include_router(estudos.router)