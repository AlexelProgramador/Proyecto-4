from utils.DateFormat import DateFormat # NO LO USO ES PARA QUE NO SE ME OLVIDE

class Usuario():

    def __init__(self, rut,nombre_usuario=None, contraseña=None, Correo_Electronico=None, Nombre_Completo=None) -> None:
        self.rut = rut
        self.nombre_usuario = nombre_usuario
        self.contraseña = contraseña
        self.Correo_Electronico = Correo_Electronico
        self.Nombre_Completo = Nombre_Completo

    def to_JSON(self):
        return {
            'rut': self.rut, 
            'nombre_usuario': self.nombre_usuario,
            'contraseña': self.contraseña,
            'Correo_Electronico': self.Correo_Electronico,
            'Nombre_Completo': self.Nombre_Completo
            # 'fecha': DateFormat.convert_date(self.fecha) 
        }