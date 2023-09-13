from flask import Flask,request, jsonify
from flask_cors import CORS
from config import config

#Routes
from routes import Usuario
from routes import UsuarioRol
app = Flask(__name__)
stored_data = []
CORS(app, resources={"*":{"origins":"http://localhost:3000"}})


def page_not_found(error):
    return "<h1> Not found Page </h1>", 404

@app.route("/")
def index():
    print('Se ha establecido una conexion')
    return "Conexion establecida"

if __name__ == '__main__':
    app.config.from_object(config['development']) 
    
    # Blueprints
    app.register_blueprint(Usuario.main, url_prefix='/api/usuarios')
    app.register_blueprint(UsuarioRol.main, url_prefix='/api/usuarios/roles')

    # Manejo de errores
    app.register_error_handler(404, page_not_found)

    app.run()
