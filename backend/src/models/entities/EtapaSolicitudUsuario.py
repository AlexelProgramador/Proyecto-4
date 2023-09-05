
class EtapaSolicitudUsuario():

    def __init__(self, rut, idSolicitud, idEtapa, comentario=None) -> None:
        self.rut = rut
        self.idSolicitud = idSolicitud
        self.idEtapa = idEtapa
        self.comentario = comentario

    def to_JSON(self):
        return {
            'rut': self.rut,
            'idSolicitud': self.idSolicitud,
            'idEtapa': self.idEtapa,
            'comentario': self.comentario
        }
