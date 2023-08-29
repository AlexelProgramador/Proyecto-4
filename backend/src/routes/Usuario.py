from flask import Blueprint, jsonify, request

# Entities
from models.entities.Usuario import Usuario

# Modelos
from models.UsuarioModel import UsuarioModel
main = Blueprint('usuario_blueprint', __name__)


@main.route('/')
def get_users():
    try:
        usuarios = UsuarioModel.get_usuarios()
        return jsonify(usuarios)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/<rut>')
def get_usuario(rut):
    try:
        usuario = UsuarioModel.get_usuario(rut)
        if usuario != None:
            return jsonify(usuario)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/add', methods=['POST'])
def add_usuario():
    try:
        rut = request.json['rut']
        nombre_usuario = request.json['nombre_usuario']
        contraseña = request.json['contraseña']
        Correo_Electronico = request.json['Correo_Electronico']
        Nombre_Completo = request.json['Nombre_Completo']
        if nombre_usuario != '' and rut != '' and contraseña != '' and Correo_Electronico != '' and Nombre_Completo != '':
            usuario = Usuario(rut, nombre_usuario, contraseña,
                              Correo_Electronico, Nombre_Completo)
            affected_rows = UsuarioModel.add_usuario(usuario)
            if affected_rows == 1:
                return jsonify({'message' :usuario.nombre_usuario})
            else:
                return jsonify({'message': "Error on insert"}), 500
        else:
            return jsonify({'message': "There're empty values"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete/<rut>', methods=['DELETE'])
def delete_usuario(rut):
    try:
        usuario = Usuario(rut)
        affected_rows = UsuarioModel.delete_usuario(usuario)
        if affected_rows == 1:
            return jsonify(usuario.rut)
        else:
            return jsonify({'message': "No user deleted"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/update/<rut>', methods=['PUT'])
def update_usuario(rut):
    try:
        rut = request.json['rut']
        nombre_usuario = request.json['nombre_usuario']
        contraseña = request.json['contraseña']
        Correo_Electronico = request.json['Correo_Electronico']
        Nombre_Completo = request.json['Nombre_Completo']
        if nombre_usuario != '' and rut != '' and contraseña != '' and Correo_Electronico != '' and Nombre_Completo != '':
            usuario = Usuario(rut, nombre_usuario, contraseña,
                              Correo_Electronico, Nombre_Completo)
            affected_rows = UsuarioModel.update_usuario(usuario)
            if affected_rows == 1:
                return jsonify(usuario.nombre_usuario)
            else:
                return jsonify({'message': " No usuario updated"}), 500
        else:
            return jsonify({'message': "There're empty values"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
