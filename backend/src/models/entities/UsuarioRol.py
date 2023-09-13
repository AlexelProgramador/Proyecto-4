# NO LO USO ES PARA QUE NO SE ME OLVIDE
from utils.DateFormat import DateFormat


class UsuarioRol():
    def __init__(self,
                 rol = None,
                 nombre_usuario = None,
                 idUsuario = None,
                 idUsuarioRol = None, # RECORDAR ESTO SE MODIFICA SEGUN LO QUE SE QUIERE ENVIAR AL FRONTEND EN LA CONSULTA SQL
                 ) -> None:
        self.idUsuarioRol = idUsuarioRol
        self.idUsuario = idUsuario
        self.nombre_usuario = nombre_usuario
        self.rol = rol
    def to_JSON(self):
        return {
            'rol': self.rol,
            'nombre_usuario': self.nombre_usuario,
            'idUsuarioRol': self.idUsuarioRol,
            'idUsuario': self.idUsuario,
        }
