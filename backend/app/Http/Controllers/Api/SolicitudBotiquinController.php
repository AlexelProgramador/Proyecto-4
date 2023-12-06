<?php

namespace App\Http\Controllers\Api;

use App\Models\SolicitudBotiquin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Botiquin;

class SolicitudBotiquinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        //Aquí hay que buscar por id del botiquinero para que solo se muestre ahí
        $datos = SolicitudBotiquin::all();
        return response()->json($datos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $solicitud_botiquin = new SolicitudBotiquin();
       
        //Insercción de datos
        $solicitud_botiquin->VariableSolicitud = $request->VariableSolicitud;
        $solicitud_botiquin->NombreBotiquin = $request->NombreBotiquinSolicitud;
        $solicitud_botiquin->IdBotiquin = $request->IdBotiquin;
        $solicitud_botiquin->NombreSolicitanteSolicitud = $request->NombreSolicitanteSolicitud;
        $solicitud_botiquin->FechaSolicitud = $request->FechaSolicitud;
        $solicitud_botiquin->InventarioSolicitud = $request->InventarioSolicitud;
        
        //Subir Datos
        $solicitud_botiquin->save();

        $botiquin = Botiquin::findOrFail($request->IdBotiquin);
        // Iterar sobre los elementos en el arreglo InventarioSolicitud
        foreach ($request->InventarioSolicitud as $item) {
            $idProducto = $item['IdProducto'];
            $cantidadSolicitud = $item['CantidadSolicitud'];

            // Verificar si el producto está en el inventario de la bodega
            $productoEncontrado = collect($botiquin['Inventario'])->first(function ($producto) use ($idProducto) {
                return $producto['IdProducto'] == $idProducto;
            });

            if ($productoEncontrado) {
                // Restar la cantidad si el producto ya está en el inventario.
                $inventario = $botiquin->Inventario;
                foreach ($inventario as $index => $producto) {
                    if ($producto['IdProducto'] == $idProducto) {
                        // Asegurarse de que la cantidad a restar no sea mayor que la cantidad actual
                        $cantidadRestante = max(0, $producto['CantidadAsignada'] - intval($cantidadSolicitud));
                        $inventario[$index]['CantidadAsignada'] = $cantidadRestante;
                        break;
                    }
                }
                $botiquin->Inventario = $inventario;
            } else {
                // Manejar el caso en que el producto no se encuentra en el inventario de la bodega.
                return response()->json(['error' => 'El producto no está en el inventario de la bodega.']);
            }
            $botiquin->save();
        }

        //Respuesta del Backend
        return response()->json(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SolicitudBotiquin  $solicitudBotiquin
     * @return \Illuminate\Http\Response
     */
    public function show(SolicitudBotiquin $solicitudBotiquin)
    {
        
        $datos = SolicitudBotiquin::where("_id", $id)->first();
        return response()->json(['message' => "envio de datos exitoso", 'data' => $datos], 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SolicitudBotiquin  $solicitudBotiquin
     * @return \Illuminate\Http\Response
     */
    public function edit(SolicitudBotiquin $solicitudBotiquin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SolicitudBotiquin  $solicitudBotiquin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SolicitudBotiquin $solicitudBotiquin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SolicitudBotiquin  $solicitudBotiquin
     * @return \Illuminate\Http\Response
     */
    public function destroy(SolicitudBotiquin $solicitudBotiquin)
    {
        //
    }

}
