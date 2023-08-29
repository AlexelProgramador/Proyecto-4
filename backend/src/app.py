from flask import Flask,request, jsonify
from flask_cors import CORS
from config import config

#Routes
from routes import Usuario
from routes import Etapa
app = Flask(__name__)
stored_data = []
CORS(app, resources={"*":{"origins":"http://localhost:3000"}})


def page_not_found(error):
    return "<h1> Not found Page </h1>", 404

@app.route("/")
def index():
    print('Se ha establecido una conexion')
    return "Conexion establecida"
@app.route("/pro")
def pro():
    return {"pro": ["a", "b", "c"]}



@app.route('/post_data', methods=['POST'])
def post_data():
    data = request.get_json()  # Obtén los datos JSON enviados desde la solicitud POST
    
    # Almacena los datos en la lista en memoria
    stored_data.append(data)
    
    # Imprime la lista actualizada en la consola (esto es solo para fines de demostración)
    print("Datos almacenados:", stored_data)
    
    # Responde al cliente con un mensaje de confirmación
    response_data = {'message': 'Datos recibidos y almacenados con éxito'}
    return jsonify(response_data), 200

if __name__ == '__main__':
    app.config.from_object(config['development']) 
    
    # Blueprints
    app.register_blueprint(Usuario.main, url_prefix='/api/usuarios')
    app.register_blueprint(Etapa.main, url_prefix='/api/etapa')

    # Manejo de errores
    app.register_error_handler(404, page_not_found)

    app.run()
