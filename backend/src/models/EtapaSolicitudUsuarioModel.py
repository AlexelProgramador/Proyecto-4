from database.db import get_connection
from .entities.EtapaSolicitudUsuario import EtapaSolicitudUsuario


class EtapaSolicitudUsuario():

    @classmethod
    def etapasolicitudusuario(self, rut):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"""
                               SELECT
                                Comentario,rut,idSolicitud,idEtapa
                               FROM
                                etapa_usuario_solicitud eus
                """
                )
                row = cursor.fetchone()
                usuario = None
                if row != None:
                    usuario = EtapaSolicitudUsuario(row[0], row[1], row[2], row[3], row[4])
                    usuario = usuario.to_JSON()
            connection.close()
            return usuario

        except Exception as ex:
            raise Exception(ex)
