import os
import requests
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("DISCORD_WEBHOOK_URL")

resposta = requests.post(url, json={"content": "Hora de beber água 💧"})
print(resposta.status_code)