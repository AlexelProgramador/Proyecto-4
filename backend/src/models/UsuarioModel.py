from database.db import get_connection
from .entities.Usuario import Usuario


class UsuarioModel():
    @classmethod
    def get_usuarios(self):
        try:
            connection = get_connection()
            usuarios = []

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT rut, nombre_usuario,  contraseña, Correo_Electronico, Nombre_Completo FROM usuario")
                resultset = cursor.fetchall()

                for row in resultset:
                    usuario = Usuario(row[0],
                                      row[1],
                                      row[2],
                                      row[3],
                                      row[4],)
                    usuarios.append(usuario.to_JSON())
            connection.close()
            return usuarios

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_usuario(self, rut):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT rut, nombre_usuario, contraseña, Correo_Electronico, Nombre_Completo FROM usuario WHERE rut = %s", (rut,))
                row = cursor.fetchone()
                usuario = None
                if row != None:
                    usuario = Usuario(row[0], row[1], row[2], row[3], row[4])
                    usuario = usuario.to_JSON()
            connection.close()
            return usuario

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_usuario(self, usuario):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO usuario (rut, nombre_usuario, contraseña, Correo_Electronico, Nombre_Completo)
                               VALUES (%s,%s,%s,%s,%s)""", (usuario.rut, usuario.nombre_usuario, usuario.contraseña, usuario.Correo_Electronico, usuario.Nombre_Completo))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_usuario(self, usuario):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    "DELETE FROM usuario WHERE rut = %s", (usuario.rut,))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_usuario(self, usuario):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""UPDATE usuario SET nombre_usuario = %s, contraseña = %s, 
                               Correo_Electronico = %s, Nombre_Completo = %s WHERE rut = %s
                              """, (usuario.nombre_usuario, usuario.contraseña, usuario.Correo_Electronico, usuario.Nombre_Completo, usuario.rut,))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows

        except Exception as ex:
            raise Exception(ex)
