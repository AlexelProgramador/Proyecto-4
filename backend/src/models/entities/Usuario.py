# NO LO USO ES PARA QUE NO SE ME OLVIDE
from utils.DateFormat import DateFormat


class Usuario():

    def __init__(self,
                 idUsuario,
                 nombre_usuario=None,
                 rut=None,
                 contraseña=None,
                 correoElectronico=None,
                 nombre=None,
                 apellido=None) -> None:
        self.idUsuario = idUsuario
        self.nombre_usuario = nombre_usuario
        self.rut = rut
        self.contraseña = contraseña
        self.correoElectronico = correoElectronico
        self.nombre = nombre
        self.apellido = apellido

    def to_JSON(self):
        return {
            'idUsuario' : self.idUsuario,
            'nombre_usuario' : self.nombre_usuario,
            'rut' : self.rut,
            'contraseña' : self.contraseña,
            'correoElectronico' : self.correoElectronico,
            'nombre' : self.nombre,
            'apellido' : self.apellido

        }
