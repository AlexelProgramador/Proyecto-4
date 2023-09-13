from database.db import get_connection


from .entities.UsuarioRol import UsuarioRol


class UsuarioRolModel():
    @classmethod
    def get_usuarios_roles(self):
        try:
            connection = get_connection()
            usuariosRoles = []

            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT 
                        ur.Rol,
                        u.nombre_usuario
                    FROM 
                        Usuario_Rol ur, Usuario u
                    WHERE
                        u.idUsuario = ur.idUsuario
                    """)
                resultset = cursor.fetchall()

                for row in resultset:
                    usuarioRol = UsuarioRol(row[0],
                                      row[1])
                    usuariosRoles.append(usuarioRol.to_JSON())
            connection.close()
            return usuariosRoles

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_usuario_rol(self, usuarioRol):
        try:
            connection = get_connection()

            row = None

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT idUsuario FROM Usuario WHERE idUsuario = %s", (usuarioRol.idUsuario)
                )
                
                row = cursor.fetchone()
                if row != None:
                    cursor.execute(
                        """
                        INSERT INTO Usuario_Rol ur (ur.Rol, ur.idUsuarioRol, ur.idUsuario)
                        VALUES (%s, %s, %s) 
                        """, (usuarioRol.Rol, usuarioRol.idUsuarioRol, usuarioRol.idUsuario)) 
                    affected_rows = cursor.rowcount
                    connection.commit()

                else:
                    return {"Error": "Usuario ingresado no existe"}
                connection.close()
                return affected_rows

        except Exception as ex:
            raise Exception(ex)
