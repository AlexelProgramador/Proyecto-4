"""
Esta es una forma alternativa de iniciar la aplicacion, para ellos usar:
    python -m app
Estando en la carpeta de .env
"""

from . import app  # Importa el objeto "app" desde el módulo "app" en la carpeta "src"

if __name__ == "__main__":
    app.run()