<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bodega;

class BodegaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $datos = Bodega::all();
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
        //Faltaría ver que pasa si son iguales
        //Nueva Forma de ver la ID (o quitarla)

        //Crear Nueva Bodega
        $bodega = new Bodega();

        //Para establecer el IDBodega
        $datos = Bodega::all()->count();
       
        //Insercción de datos
        $bodega->IDBodega = $datos;
        $bodega->NombreBodega = $request->NombreBodega;
        $bodega->LugarBodega = $request->LugarBodega;
        $bodega-> InventarioBodega = $request->InventarioBodega;
        
        //Subir Datos
        $bodega->save();

        //Respuesta del Backend
        return response()->json(['message' => $datos, 'data' => $bodega], 201);

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
        $datos = Bodega::where("_id", $id)->first();
        return response()->json(['message' => "envio de datos exitorso", 'data' => $datos], 201);
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
        $datos = Bodega::where("_id", $id)->update([
            'NombreBodega' => $request->NombreBodega,
            'LugarBodega' => $request->LugarBodega
        ]);


        return response()->json(['message' => "llegó exitosamente", 'data' => $datos], 201);
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
        Bodega::destroy($id);
        return response()->json(['message' =>  'Borrado']);
    }
}
