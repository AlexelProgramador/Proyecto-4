<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Bodega;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $datos = Producto::all();
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
        //Crear Nuevo Producto
        $producto = new Producto();

        //Para establecer el IDProducto
       
        //Insercción de datos
        $producto->NombreProducto = $request->NombreProducto;
        $producto->MarcaProducto = $request->MarcaProducto;
        $producto->DescripcionProducto = $request->DescripcionProducto;
        $producto->ContenedorProducto = $request->ContenedorProducto;
        $producto->DesgloceProducto = $request->DesgloceProducto;
        $producto->UbicacionProducto = $request->UbicacionProducto;
       
        $producto->CantidadProducto = intval($request->CantidadProducto);
        
        

        $producto->ValorUnitarioProducto = intval($request->ValorUnitarioProducto);
        //$producto->EstadoProducto = $request->EstadoProducto;
        //$producto->FechaProducto = $request->FechaProducto;
         //$producto->CantidadContenedorProducto = intval($request->CantidadContenedorProducto);
        //$ProductoTotal = $request->CantidadContenedorProducto * $request->CantidadProducto;
        //$producto->CantidadTotalProducto = $ProductoTotal;
        //$ValorTotal = $request->ValorUnitarioProducto * $ProductoTotal;

        //$producto->ValorTotalProducto = $ValorTotal;
        
        //Subir Datos
        $producto->save();

        //Respuesta del Backend
        return response()->json(['data' => $producto], 201);
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
        $datos = Producto::where("_id", $id)->first();
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
        $datos = Producto::where("_id", $id)->first();
        return response()->json(['message' => "envio de datos exitoso", 'data' => $datos], 201);
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
        $datos = Producto::where("_id", $id)->update([
            'NombreProducto' => $request->NombreProducto,
            'LugarProducto' => $request->LugarProducto,
            'MarcaProducto' => $request->MarcaProducto,
            'DescripcionProducto' => $request->DescripcionProducto,

        ]);

        return response()->json(['message' => "llegó exitosamente", 'data' => $datos], 201);
    }

    public function updateDesgloce(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $desgloceData = array(
            'CantidadContenedorProducto' => $request->CantidadContenedorProducto,
            'CantidadTotalProducto' => $request->CantidadTotal,
            'ValorTotalProducto' => $request->ValorTotal,
            'CantidadActualProducto' => $request->ValorTotal,
            'FechaVencimientoProducto' => $request->FechaVencimientoProducto,
            'EstadoProducto' => $request->EstadoProducto
        );
        
        $producto->push('DesgloceProducto', $desgloceData);
        $producto->save();
        return response()->json(['message' => 'Producto actualizado con éxito', 'data' => $producto], 200);

    }

    public function updateAsignacion(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $asignacionData = array(
            'TipoProcesoProducto' => $request->TipoProcesoProducto,
            'UbicacionProducto' => $request->UbicacionProducto,
            'CantidadAsignadaProducto' => $request->CantidadAsignadaProducto,
            'FechaProcesoProducto' => $request->FechaProcesoProducto
        );
        
        $producto->push('UbicacionProducto', $asignacionData);
        $producto->save();

        $bodega = Bodega::findOrFail($request->IdBodegaProducto);

        $inventarioData = array(
            'NombreProducto'=> $producto->NombreProducto,
            'TipoProcesoProducto' => $request->TipoProcesoProducto,
            'UbicacionProducto' => $request->UbicacionProducto,
            'CantidadAsignadaProducto' => $request->CantidadAsignadaProducto,
            'FechaProcesoProducto' => $request->FechaProcesoProducto
        );
        $bodega->push('InventarioBodega', $inventarioData);
        $bodega->save();

        return response()->json(['message' => 'Producto actualizado con éxito', 'data' => $producto], 200);

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
        Producto::destroy($id);
        return response()->json(['message' =>  'Borrado']);
    }
}
