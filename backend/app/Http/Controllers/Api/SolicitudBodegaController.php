<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SolicitudBodega;
use App\Models\Bodega;
use App\Models\Botiquin;

class SolicitudBodegaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $datos = SolicitudBodega::all();
        return response()->json($datos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $solicitud_bodega = new SolicitudBodega();
       
        //Insercción de datos
        $solicitud_bodega->VariableSolicitud = $request->VariableSolicitud;
        $solicitud_bodega->NombreBotiquin = $request->NombreBotiquinSolicitud;
        $solicitud_bodega->NombreBodega = $request->NombreBodegaSolicitud;
        $solicitud_bodega->IdBotiquin = $request->IdBotiquin;
        $solicitud_bodega->IdBodega = $request->IdBodega;
        $solicitud_bodega->NombreSolicitanteSolicitud = $request->NombreSolicitanteSolicitud;
        $solicitud_bodega->FechaSolicitud = $request->FechaSolicitud;
        $solicitud_bodega->EstadoSolicitud = 'Pendiente';
        $solicitud_bodega->InventarioSolicitud = $request->InventarioSolicitud;
        
        //Subir Datos
        $solicitud_bodega->save();

        //Respuesta del Backend
        return response()->json(['data' => $solicitud_bodega], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $datos = SolicitudBodega::where("_id", $id)->first();
        return response()->json(['message' => "envio de datos exitoso", 'data' => $datos], 201);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function aceptarSolicitud(request $request, $id)
    {
        //
        $datos = SolicitudBodega::where("_id", $id)->update([
            'EstadoSolicitud' => 'Aceptado',
            'ComentarioSolicitud' => $request->ComentarioSolicitud,
        ]);

        // Buscar la bodega por su ID
        $botiquin = Botiquin::findOrFail($request->IdBotiquin);
        //$botiquin = Bodega::findOrFail($request->IdBodega);
        // Verificar si el producto está en el inventarioBodega de la bodega
        $productoEncontrado = collect($botiquin['InventarioSolicitud'])->first(function ($producto) use ($id) {
            return $producto['IdProducto'] == $id;
        });
        //creo que el while podría ir aqui
        //foreach...
        if ($productoEncontrado) {
            $inventario = $botiquin->InventarioBotiquin;
            foreach ($inventario as $index => $producto) {
                if ($producto['IdProducto'] == $id) {
                    $inventario[$index]['CantidadAsignadaBotiquin'] += intval($request->CantidadAsignadaProducto);
                    break;
                }
            }
            $botiquin->InventarioBotiquin = $inventario;
            $botiquin->save();
            return response()->json(['message' => $inventario, 'success' => true]);
        } else {
            // El producto no está en el inventarioBodega de la bodega
            $inventarioData = array(
            'IdProducto' => $request->IdBotiquin,
            'NombreProducto'=> $request->NombreProducto,
            'CantidadAsignadaBotiquin' => intval($request->CantidadAsignadaProducto),
            );
            $botiquin->push('InventarioBotiquin', $inventarioData);
        }
        $botiquin->save();
        return response()->json(['message' => 'Solicitud Aceptada']);

    }

    public function rechazarSolicitud(request $request, $id)
    {
        $datos = SolicitudBodega::where("_id", $id)->update([
            'EstadoSolicitud' => 'Rechazado',
            'ComentarioSolicitud' => $request->ComentarioSolicitud,
        ]);
        return response()->json(['message' => "Solicitud Rechazada", 'data' => $datos], 201);
    }
}
