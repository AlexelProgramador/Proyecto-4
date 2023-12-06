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
        $datos = SolicitudBodega::where("_id", $id)->update([
            'EstadoSolicitud' => 'Aceptado',
            'ComentarioSolicitud' => $request->ComentarioSolicitud,
        ]);

        // Buscar la bodega por su ID
        $botiquin = Botiquin::findOrFail($request->IdBotiquin);

        // Iterar sobre los elementos en el arreglo InventarioSolicitud
        foreach ($request->InventarioSolicitud as $item) {
            $idProducto = $item['IdProducto'];
            $nombreProducto = $item['NombreProducto'];
            $cantidadSolicitud = $item['CantidadSolicitud'];

            // Verificar si el producto está en el inventario del botiquín
            $productoEncontrado = collect($botiquin['Inventario'])->first(function ($producto) use ($idProducto) {
                return $producto['IdProducto'] == $idProducto;
            });

            if ($productoEncontrado) {
                // Actualizar la cantidad si el producto ya está en el inventario.
                $inventario = $botiquin->Inventario;
                foreach ($inventario as $index => $producto) {
                    if ($producto['IdProducto'] == $idProducto) {
                        $inventario[$index]['CantidadAsignada'] += intval($cantidadSolicitud);
                        break;
                    }
                }
                $botiquin->InventarioBotiquin = $inventario;
            } else {
                // Agregar el producto al inventario si no está presente.
                $inventarioData = [
                    'IdProducto' => $idProducto,
                    'NombreProducto' => $nombreProducto,
                    'CantidadAsignada' => intval($cantidadSolicitud),
                ];
                $botiquin->push('Inventario', $inventarioData);
            }
        
        $bodega = Bodega::findOrFail($request->IdBodega);
        // Iterar sobre los elementos en el arreglo InventarioSolicitud
        foreach ($request->InventarioSolicitud as $item) {
            $idProducto = $item['IdProducto'];
            $cantidadSolicitud = $item['CantidadSolicitud'];

            // Verificar si el producto está en el inventario de la bodega
            $productoEncontrado = collect($bodega['Inventario'])->first(function ($producto) use ($idProducto) {
                return $producto['IdProducto'] == $idProducto;
            });

            if ($productoEncontrado) {
                // Restar la cantidad si el producto ya está en el inventario.
                $inventario = $bodega->Inventario;
                foreach ($inventario as $index => $producto) {
                    if ($producto['IdProducto'] == $idProducto) {
                        // Asegurarse de que la cantidad a restar no sea mayor que la cantidad actual
                        $cantidadRestante = max(0, $producto['CantidadAsignada'] - intval($cantidadSolicitud));
                        $inventario[$index]['CantidadAsignada'] = $cantidadRestante;
                        break;
                    }
                }
                $bodega->Inventario = $inventario;
            } else {
                // Manejar el caso en que el producto no se encuentra en el inventario de la bodega.
                return response()->json(['error' => 'El producto no está en el inventario de la bodega.']);
            }
        }
    }

    // Guardar los cambios en el botiquín después de procesar todos los elementos
    $botiquin->save();
    $bodega->save();

    return response()->json(['message' => $cantidadRestante]);
    }


}
