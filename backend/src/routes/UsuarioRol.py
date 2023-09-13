from flask import Blueprint, jsonify, request
# Entities
from models.entities.UsuarioRol import UsuarioRol
# Modelos
from models.UsuarioRolModel import UsuarioRolModel 

import uuid


main = Blueprint('usuario_rol_blueprint', __name__)


@main.route('/')
def get_roles():
    try:
        usuariosRoles = UsuarioRolModel.get_usuarios_roles()
        return jsonify(usuariosRoles)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_usuario():
    rol = request.json('Rol')
    idUsuarioRol = str(uuid.uuid4())
    idUsuario = request.json('idUsuario')    
    usuariorol = UsuarioRol(idUsuario=idUsuario, idUsuarioRol=idUsuarioRol,
                            rol=rol)
    affected_rows = idUsuarioRol.add_usuario_rol(usuariorol)
    if affected_rows == 1:
            return jsonify({'message': usuariorol.idUsuario})
    else:
            return jsonify({'message': "Error on insert"}), 500
    pass
