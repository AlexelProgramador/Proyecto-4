<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Botiquin;

class BotiquinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $datos = Botiquin::all();
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
        $rules = [
            'Nombre' => 'required',
            'Lugar' => 'required',
        ];
    
        $request->validate($rules);

        //Crear Nuevo Botiquin
        $botiquin = new Botiquin();
       
        //Insercción de datos
        $botiquin->Nombre = $request->Nombre;
        $botiquin->Lugar = $request->Lugar;
        $botiquin->Inventario = $request->Inventario;
        $botiquin->Tipo = $request->Tipo;
        
        //Subir Datos
        $botiquin->save();

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
        $datos = Botiquin::where("_id", $id)->first();
        return response()->json(['status' => 200, 'data' => $datos]);
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
        $datos = Botiquin::where("_id", $id)->first();
        return response()->json(['status' => 200]);
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
        $datos = Botiquin::where("_id", $id)->update([
            'Nombre' => $request->Nombre,
            'Lugar' => $request->Lugar
        ]);


        return response()->json(['status' => 200]);
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
        Botiquin::destroy($id);
        return response()->json(['status' => 204]);
    }
}
