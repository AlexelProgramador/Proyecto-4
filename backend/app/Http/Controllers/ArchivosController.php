<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ArchivosEtapas;
use Illuminate\Http\Request;
use App\Models\Etapa;
use Symfony\Component\HttpFoundation\Response;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;

class ArchivosController extends Controller
{
    public function verArchivos(Request $request)
    {
        $archivo = ArchivosEtapas::where('idSolicitud', '=', $request->idSolicitud)
            ->where('etapa', '=', $request->etapa)
            ->first();
        if (!$archivo) {
            return response()->json(['error' => 'No se encontro el archivo'], Response::HTTP_CONFLICT);
        }
        return response()->json(
            $archivo,
            Response::HTTP_OK
        );
    }

    public function subirArchivos(Request $request)
    {
        $id = $request->input('_id');
        $nombreEtapa = $request->input('nombreEtapa');
        $nroSolicitud = $request->input('nroSolicitud');
        $archivos = $request->allFiles();

        $archivoNuevo = new ArchivosEtapas();

        $etapa = Etapa::where('_id', '=', $id)->first();
        if (!$etapa) {
            return response()->json(['error' => $request], Response::HTTP_CONFLICT);
        }
        $nombresPdf = [];
        foreach ($archivos as $archivo) {
            $nombreArchivo =  $nroSolicitud . '_' .  $archivo->getClientOriginalName() . '_' . $nombreEtapa;
            $nombresPdf[] = $nombreArchivo;
        }
        $archivoNuevo->nombresPdf = $nombresPdf;
        $archivoNuevo->idSolicitud = $id;
        $archivoNuevo->etapa = $nombreEtapa;
        $archivoNuevo->save();
        return response()->json(
            $archivoNuevo,
            Response::HTTP_OK
        );
        return response()->json(
            [$id, $nombreEtapa, $nroSolicitud, $archivos],
            Response::HTTP_OK
        );
    }
}
