Deben crear un archivo .env que tenga las siguientes variables:
MYSQL_HOST=IPHOST
MYSQL_PORT=PORT
MYSQL_USER=USER
MYSQL_PASSWORD=PASSWORD
MYSQL_DB=DATABASE

Ademas dentro del entorno virtual debemos utilizar el siguiente comando:
    python -m pip install -r ../requirements.txt
Esto es para instalar los paquetes necesarios para que funcione el backend.

Para abrir backend de forma automatizada, deben instalar las librerias: PyGetWindow, PyAutoGUI 
(NO HACERLO EN EL ENTORNO VIRTUAL):
pip install PyAutoGUI PyGetWindow

Luego corren el archivo "flojera venv.py" y estará corriendo el backend.