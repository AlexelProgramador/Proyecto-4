<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ArchivosEtapas;
use Illuminate\Http\Request;
use App\Models\Etapa;
use Symfony\Component\HttpFoundation\Response;

class ArchivosController extends Controller
{
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
            $archivo->move(public_path('/pdfs'), $nombreArchivo . '.' . $archivo->getClientOriginalExtension());
            $nombresPdf[] = $nombreArchivo;
        }
        $archivoNuevo->nombresPdf = json_encode($nombresPdf);
        $archivoNuevo->idSolicitud = $id;
        // $archivoNuevo->foo = 'foo';
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
