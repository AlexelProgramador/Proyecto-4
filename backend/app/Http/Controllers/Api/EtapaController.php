<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Etapa;
use App\Models\Solicitud;
use App\Models\Usuario;
use Symfony\Component\HttpFoundation\Response;

class EtapaController extends Controller
{
    public function index()
    {
        $etapas = Etapa::all();
        return response()->json(
            $etapas,
            Response::HTTP_OK
        );
    }

    public function avanzarEtapa(Request $request)
    {
        $etapa = Etapa::where('_id', $request->idEtapa)->first();
        if (!$etapa) {
            return response()->json(['error' => $request], Response::HTTP_CONFLICT);
        }
        $etapa->nroEtapa = $request->nroEtapa;
        switch (true) {
            case $request->has('procesosEtapa1'):
                $etapa->procesosEtapa1 = $request->procesosEtapa1;
                break;
            case $request->has('procesosEtapa2'):
                $etapa->procesosEtapa2 = $request->procesosEtapa2;
                break;
            case $request->has('procesosEtapa3'):
                $etapa->procesosEtapa3 = $request->procesosEtapa3;
                break;
            case $request->has('procesosEtapa4'):
                $etapa->procesosEtapa4 = $request->procesosEtapa4;
                break;
            case $request->has('procesosEtapa5'):
                $etapa->procesosEtapa5 = $request->procesosEtapa5;
                break;
            case $request->has('procesosEtapa6'):
                $etapa->procesosEtapa6 = $request->procesosEtapa6;
                break;
            case $request->has('procesosEtapa7'):
                $etapa->procesosEtapa7 = $request->procesosEtapa7;
                break;
            case $request->has('procesosEtapa8'):
                $etapa->procesosEtapa8 = $request->procesosEtapa8;
                break;
        }

        $etapa->save();

        return response()->json(
            $etapa,
            Response::HTTP_OK
        );
    }
    public function verEtapa(Request $request)
    {
        $etapa = Etapa::where('solicitudInfo.nroSolicitud', $request->nroSolicitud)->first();
        if (!$etapa) {
            return response()->json(['error' => $request], Response::HTTP_CONFLICT);
        }

        return response()->json(
            $etapa,
            Response::HTTP_OK
        );
    }

    public function crearEtapa(Request $request)
    {
        $etapa = new Etapa();

        // Variables correspondientes a la etapa.
        $etapa->nroEtapa = $request->nroEtapa;
        $etapa->completado = $request->completado;
        // Etapas 
        $etapa->procesosEtapa1 = $request->procesosEtapa1;
        $etapa->procesosEtapa2 = $request->procesosEtapa2;
        $etapa->procesosEtapa3 = $request->procesosEtapa3;
        $etapa->procesosEtapa4 = $request->procesosEtapa4;
        $etapa->procesosEtapa5 = $request->procesosEtapa5;
        $etapa->procesosEtapa6 = $request->procesosEtapa6;
        $etapa->procesosEtapa7 = $request->procesosEtapa7;
        $etapa->procesosEtapa8 = $request->procesosEtapa8;

        // variable correspondientes de una solicitud.
        $etapa->solicitudInfo = $request->infoSolicitud;
        $etapa->infoUsuario = $request->infoUsuario;
        $etapa->save();
        return response()->json(
            $etapa,
            Response::HTTP_OK
        );
    }
    public function update(Request $request, $idUsuario, $idEtapa)
    {
        $etapa = Etapa::findOrFail($idEtapa);

        // Variables correspondientes a la etapa.
        $etapa->nroEtapa = $request->nroEtapa;
        $etapa->Aprobado = $request->Aprobado;

        // Etapas 
        $etapa->procesosEtapa1 = $request->procesosEtapa1;
        $etapa->procesosEtapa2 = $request->procesosEtapa2;
        $etapa->procesosEtapa3 = $request->procesosEtapa3;
        $etapa->procesosEtapa4 = $request->procesosEtapa4;
        $etapa->procesosEtapa5 = $request->procesosEtapa5;
        $etapa->procesosEtapa6 = $request->procesosEtapa6;
        $etapa->procesosEtapa7 = $request->procesosEtapa7;
        $etapa->procesosEtapa8 = $request->procesosEtapa8;

        // Usuario que atiende la etapa.
        $usuarioEtapa = Usuario::select('_id', 'nombre', 'apellido')->where('_id', $idUsuario)->first()->toArray();

        // Flujo en caso de que no encuentre el usuario por el id.
        if ($usuarioEtapa === null) {
            return response()->json(['error' => 'No se encontro el usuario'], Response::HTTP_CONFLICT);
        }
        $etapa->usuarioEtapa = $usuarioEtapa;

        $etapa->save();

        return response()->json(['result' => $etapa], Response::HTTP_OK);
    }
    public function destroy(Request $request)
    {
        $idsEtapas = $request->idsEtapas;
        if (empty($idsEtapas)) { // Flujo si se entrega arreglo vacio
            return response()->json(['result' => "No se han proporcionado IDs de Etapas para eliminar"], Response::HTTP_BAD_REQUEST);
        }
        Etapa::whereIn('_id', $idsEtapas)->delete(); // Eliminamos las Etapas
        $idsString = implode(', ', $idsEtapas); // Separamos el arreglo con ", "
        return response()->json(['result' => "Se ha(n) eliminado la(s) etapa(s) $idsString"], Response::HTTP_OK);
    }
}
