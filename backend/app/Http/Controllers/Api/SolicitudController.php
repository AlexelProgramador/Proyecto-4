<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Solicitud;
use App\Models\Usuario;
use Symfony\Component\HttpFoundation\Response;

class SolicitudController extends Controller
{
    public function index()
    {
        $solicitudes = Solicitud::all();
        return response()->json([
            "results" => $solicitudes
        ], Response::HTTP_OK);
    }
    public function store(Request $request, $idUsuario)
    {
        $solicitud = new solicitud();

        // Creamos unico identificador para la solicitud.
        date_default_timezone_set('America/Santiago'); // Establecer la zona horaria adecuada
        $solicitud->nroSolicitud = date('His') . '-SOL-' . date('dmY');
        $solicitud->tipoSolicitud = $request->tipoSolicitud;
        // Obtenemos el id, nombre y apellido de la persona que realizo la solicitud.
        $usuarioSolicitud = Usuario::select('_id', 'nombre', 'apellido')->where('_id', $idUsuario)->first()->toArray();
        // Flujo en caso de que no encuentre el usuario por el id.
        if ($usuarioSolicitud === null) {
            return response()->json(['error' => 'No se encontro el usuario'], Response::HTTP_CONFLICT);
        }
        $solicitud->usuarioInfo = $usuarioSolicitud;

        // Dependiendo de la solicitud, se deben entregar mas o menos campos y tambien adjuntar otro
        // tipo de informacion.
        $solicitud->infoSolicitud = $request->infoSolicitud;

        $solicitud->save();

        return response()->json(['result' => $solicitud], Response::HTTP_CREATED);
    }
    public function update(Request $request, $idUsuario)
    {
        $solicitud = Solicitud::findOrFail($request->id);

        // Obtenemos el id, nombre y apellido de la persona que realizo la solicitud.
        $usuarioSolicitud = Usuario::select('_id', 'nombre', 'apellido')->where('_id', $idUsuario)->first()->toArray();
        // Flujo en caso de que no encuentre el usuario por el id. -> VERIFICAR SI ES NECESARIO.
        if ($usuarioSolicitud === null) {
            return response()->json(['error' => 'No se encontro el usuario'], Response::HTTP_CONFLICT);
        }

        $solicitud->usuarioInfo = $usuarioSolicitud;

        // Dependiendo de la solicitud, se deben entregar mas o menos campos y tambien adjuntar otro
        // tipo de informacion.
        $solicitud->infoSolicitud = $request->infoSolicitud;

        $solicitud->save();

        return response()->json(['result' => $solicitud], Response::HTTP_CREATED);
    }
    public function destroy(Request $request)
    {
        $idsSolicitudes = $request->idsSolicitudes;
        if (empty($idsSolicitudes)) { // Flujo si se entrega arreglo vacio
            return response()->json(['result' => "No se han proporcionado IDs de solicitudes para eliminar"], Response::HTTP_BAD_REQUEST);
        }
        Solicitud::whereIn('_id', $idsSolicitudes)->delete(); // Eliminamos las solicitudes
        $idsString = implode(', ', $idsSolicitudes); // Separamos el arreglo con ", "
        return response()->json(['result' => "Se ha(n) eliminado la(s) solicitude(s) $idsString"], Response::HTTP_OK);
    }
}
