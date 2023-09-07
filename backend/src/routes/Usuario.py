from flask import Blueprint, jsonify, request
# Entities
from models.entities.Usuario import Usuario
# Modelos
from models.UsuarioModel import UsuarioModel

import uuid


main = Blueprint('usuario_blueprint', __name__)


@main.route('/')
def get_users():
    try:
        usuarios = UsuarioModel.get_usuarios()
        return jsonify(usuarios)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/<idUsuario>')
def get_usuario(idUsuario):
    try:
        usuario = UsuarioModel.get_usuario(idUsuario)
        if usuario != None:
            return jsonify(usuario)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/add', methods=['POST'])
def add_usuario():
    try:
        idUsuario = uuid.uuid4()
        nombre_usuario = request.json['nombre_usuario']
        rut = request.json['rut']
        contraseña = request.json['contraseña']
        correoElectronico = request.json['correoElectronico']
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        if nombre_usuario != '' and rut != '' and contraseña != '' and correoElectronico != '' and nombre != '' and apellido != '':
            usuario = Usuario(
                str(idUsuario),
                nombre_usuario,
                rut,
                contraseña,
                correoElectronico,
                nombre,
                apellido
            )
            affected_rows = UsuarioModel.add_usuario(usuario)
            if affected_rows == 1:
                return jsonify({'message': usuario.idUsuario})
            else:
                return jsonify({'message': "Error on insert"}), 500
        else:
            return jsonify({'message': "There're empty values"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete/<idUsuario>', methods=['DELETE'])
def delete_usuario(idUsuario):
    try:
        usuario = Usuario(idUsuario)
        affected_rows = UsuarioModel.delete_usuario(usuario)
        if affected_rows == 1:
            return jsonify(usuario.idUsuario)
        else:
            return jsonify({'message': "No user deleted"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/update/<idUsuario>', methods=['PUT'])
def update_usuario(idUsuario):
    try:
        nombre_usuario = request.json['nombre_usuario']
        rut = request.json['rut']
        contraseña = request.json['contraseña']
        correoElectronico = request.json['correoElectronico']
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        if nombre_usuario != '' and rut != '' and contraseña != '' and correoElectronico != '' and nombre != '' and apellido != '':
            usuario = Usuario(
                idUsuario,
                nombre_usuario,
                rut,
                contraseña,
                correoElectronico,
                nombre,
                apellido
                )
            affected_rows = UsuarioModel.update_usuario(usuario)
            if affected_rows == 1:
                return jsonify(usuario.nombre_usuario)
            else:
                return jsonify({'message': " No usuario updated"}), 500
        else:
            return jsonify({'message': "There're empty values"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
