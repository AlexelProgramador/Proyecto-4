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
            case $request->has('procesosEtapaDea'):
                $etapa->procesosEtapaDea = $request->procesosEtapaDea;
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
        $etapa = Etapa::where('_id', $request->_id)->first();
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
        $data = json_decode($request->get('data'), true);
        $archivos = $request->allFiles();

        // Variables correspondientes a la etapa.
        $etapa->nroEtapa = $data['nroEtapa'];
        $etapa->completado = $data['completado'];
        $etapa->procesosEtapa1 = $data['procesosEtapa1'];
        $etapa->procesosEtapa2 = $data['procesosEtapa2'];
        $etapa->procesosEtapa3 = $data['procesosEtapa3'];
        $etapa->procesosEtapa4 = $data['procesosEtapa4'];
        $etapa->procesosEtapa5 = $data['procesosEtapa5'];
        $etapa->procesosEtapaDea = $data['procesosEtapaDea'];
        $etapa->solicitudInfo = $data['infoSolicitud'];
        $etapa->infoUsuario = $data['infoUsuario'];
        $nombresPdf = [];
        $destino = public_path('/pdfs');
        foreach ($archivos as $archivo) {
            $nombrePdf = $data['infoSolicitud']['nroSolicitud'] . '_' . $archivo->getClientOriginalName() . '_'  .
                $data['nroEtapa'] .  '.' . $archivo->getClientOriginalExtension();
            $archivo->move($destino, $nombrePdf);
            $nombresPdf[] = $nombrePdf;
        }
        $etapa->nombrePdf = $nombresPdf;

        $etapa->save();
        return response()->json(
            $etapa,
            Response::HTTP_OK
        );
    }
    public function rechazarEtapa(Request $request)
    {
        // Buscar la etapa actual
        $etapa = Etapa::where('_id', $request->idEtapa)->first();
        if (!$etapa) {
            return response()->json(['error' => 'No se encontró la etapa actual'], 404);
        }
        $etapa->nroEtapa = "Rechazado";
        $etapa->motivoRechazo = $request->motivoRechazo;
        // Guardar los cambios

        try {
            $etapa->save();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        return response()->json(
            $etapa,
            Response::HTTP_OK
        );
    }

    public function eliminarEtapa(Request $request)
    {
        // Buscar la etapa actual
        $etapa = Etapa::where('_id', $request->idEtapa)->first();
        if (!$etapa) {
            return response()->json(['error' => 'No se encontró la etapa actual'], 404);
        }

        // Eliminar los archivos asociados con la etapa
        $nombresPdf = $etapa->nombrePdf;
        foreach ($nombresPdf as $nombrePdf) {
            $rutaArchivo = public_path('/pdfs/' . $nombrePdf);
            if (file_exists($rutaArchivo)) {
                unlink($rutaArchivo);
            }
        }

        $etapa->delete();

        return response()->json(
            ['message' => 'Etapa eliminada correctamente'],
            Response::HTTP_OK
        );
    }
}
