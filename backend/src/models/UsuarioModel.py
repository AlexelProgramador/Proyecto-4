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
                    """
                    SELECT 
                        idUsuario,
                        nombre_usuario,
                        rut,
                        contraseña,
                        correoElectronico,
                        nombre,
                        apellido
                    FROM Usuario""")
                resultset = cursor.fetchall()

                for row in resultset:
                    usuario = Usuario(row[0],
                                      row[1],
                                      row[2],
                                      row[3],
                                      row[4],
                                      row[5],
                                      row[6]
                                      )
                    usuarios.append(usuario.to_JSON())
            connection.close()
            return usuarios

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_usuario(self, idUsuario):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT idUsuario, nombre_usuario, rut, contraseña, correoElectronico, nombre, apellido  FROM Usuario WHERE idUsuario = %s", (idUsuario,))
                row = cursor.fetchone()
                usuario = None
                if row != None:
                    usuario = Usuario(row[0],
                                      row[1],
                                      row[2],
                                      row[3],
                                      row[4],
                                      row[5],
                                      row[6]
                                      )
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
                cursor.execute("""INSERT INTO Usuario (idUsuario, nombre_usuario, rut, contraseña, correoElectronico, nombre, apellido)
                                VALUES (%s,%s,%s,%s,%s,%s,%s)""",
                               (usuario.idUsuario,
                                usuario.nombre_usuario,
                                usuario.rut,
                                usuario.contraseña,
                                usuario.correoElectronico,
                                usuario.nombre,
                                usuario.apellido))
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
                    "DELETE FROM Usuario WHERE idUsuario = %s", (usuario.idUsuario,))
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
                cursor.execute("""UPDATE Usuario 
                                SET 
                                    nombre_usuario = %s,
                                    rut = %s,
                                    contraseña = %s,
                                    correoElectronico = %s,
                                    nombre = %s,
                                    apellido = %s
                                WHERE idUsuario = %s
                            """,
                               (usuario.nombre_usuario,
                                usuario.rut,
                                usuario.contraseña,
                                usuario.correoElectronico,
                                usuario.nombre,
                                usuario.apellido,
                                usuario.idUsuario))

                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows

        except Exception as ex:
            raise Exception(ex)
