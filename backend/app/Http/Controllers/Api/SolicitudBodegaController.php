<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SolicitudBodega;
use Ramsey\Uuid\Uuid;
use App\Models\Bodega;
use App\Models\Botiquin;
use App\Models\Producto;

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

    public function indexBotiquin($id){
        $datos = SolicitudBodega::where('IdBotiquin', $id)->get();
        return response()->json($datos);
    }

    public function indexBodega($id){
        $datos = SolicitudBodega::where('IdBodega', $id)->get();
        return response()->json($datos);
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

        $rules = [
            'NombreBotiquinSolicitud' => 'required',
            'NombreBodegaSolicitud' => 'required',
            'IdBotiquin' => 'required',
            'IdBodega' => 'required',
            'NombreSolicitanteSolicitud' => 'required',
            'FechaSolicitud' => 'required',
            'InventarioSolicitud'=> 'required'
        ];
    
        $request->validate($rules);
       
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
        return response()->json(['status' => 201]);
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
        return response()->json(['status' => 200, 'data' => $datos]);
        
    }

    public function aceptarSolicitud(request $request, $id)
    {
        $datos = SolicitudBodega::where("_id", $id)->update([
            'EstadoSolicitud' => 'Aceptado',
            'ComentarioSolicitud' => $request->ComentarioSolicitud,
        ]);

        return response()->json(['status' => 200]);
    }

    public function aceptarSolicitudBotiquin(request $request, $id)
    {
        $datos = SolicitudBodega::where("_id", $id)->update([
            'EstadoSolicitud' => 'Recibido',
        ]);

        //Buscar la bodega por su ID
        $botiquin = Botiquin::where("_id", $request->IdBotiquin)->first();

        // Agregar Items a Botiquin
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
                $botiquin->Inventario = $inventario;
            } else {
                // Agregar el producto al inventario si no está presente.
                $inventarioData = [
                    'IdProducto' => $idProducto,
                    'NombreProducto' => $nombreProducto,
                    'CantidadAsignada' => intval($cantidadSolicitud),
                ];
                $botiquin->push('Inventario', $inventarioData);
            }
        }
        $botiquin->save();

        $bodega = Bodega::where("_id", $request->IdBodega)->first();
        // Restar Items de Bodega
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
        $bodega->save();
        //Agregar Ubicacion de producto a botiquin
        
        foreach ($request->InventarioSolicitud as $item){
            $idProducto = $item['IdProducto'];
            $uuid1 = Uuid::uuid4()->toString();
            $producto = Producto::where('_id', $idProducto)->first();
            $asignacionData = [
                'UuidAsignacion' => $uuid1,
                'TipoAsignacion' => 'A Botiquín',
                'NombreUbicacion' => $request->NombreBotiquin,
                'CantidadAsignada' => $item['CantidadSolicitud'],
                'FechaProceso' => $request->FechaSolicitud
            ]; 
            $producto->push('Ubicacion', $asignacionData);
        }

        // Guardar los cambios en el botiquín después de procesar todos los elementos
        $producto->save();
        
        

        return response()->json(200);
    }

    
    

    public function rechazarSolicitud (request $request, $id)
    {
        $datos = SolicitudBodega::where("_id", $id)->update([
            'EstadoSolicitud' => 'Rechazado',
            'ComentarioSolicitud' => $request->ComentarioSolicitud,
        ]);

        return response()->json(['status' => 200]);

    }

    public function rechazarSolicitudBotiquin(request $request, $id)
    {
        $datos = SolicitudBodega::where("_id", $id)->update([
            'EstadoSolicitud' => 'Pendiente',
            'ComentarioSolicitud' => $request->ComentarioSolicitud,
        ]);

        return response()->json(['status' => 200]);

    }

    public function contarPendiente(){
        $datos = SolicitudBodega::where('EstadoSolicitud', 'Pendiente')->get();
        return response()->json($datos);

    }
    public function retiro(Request $request)
    {

        $solicitud_bodega = new SolicitudBodega();

        $rules = [
            'NombreBodegaSolicitud' => 'required',
            'IdBodega' => 'required',
            'NombreSolicitanteSolicitud' => 'required',
            'FechaSolicitud' => 'required',
            'InventarioSolicitud'=> 'required'
        ];
    
        $request->validate($rules);
       
        //Insercción de datos
        $solicitud_bodega->VariableSolicitud = $request->VariableSolicitud;
        $solicitud_bodega->NombreBodega = $request->NombreBodegaSolicitud;
        $solicitud_bodega->IdBodega = $request->IdBodega;
        $solicitud_bodega->NombreSolicitanteSolicitud = $request->NombreSolicitanteSolicitud;
        $solicitud_bodega->FechaSolicitud = $request->FechaSolicitud;
        $solicitud_bodega->EstadoSolicitud = 'Retirado';
        $solicitud_bodega->InventarioSolicitud = $request->InventarioSolicitud;
        
        //Subir Datos
        $solicitud_bodega->save();
        
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
        $bodega->save();
        return response()->json(['status' => 201]);
    }

    public function solicitudPendiente($id){
        $datos = SolicitudBodega::where('IdBodega', $id)->where('EstadoSolicitud', 'Pendiente')->get();
        return response()->json($datos);
    }
    public function solicitudPendienteAdmin(){
        $datos = SolicitudBodega::where('EstadoSolicitud', 'Pendiente')->get();
        return response()->json($datos);
    }
}
