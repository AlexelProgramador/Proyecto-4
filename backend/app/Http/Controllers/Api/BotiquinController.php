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
        //
        //Faltaría ver que pasa si son iguales
        //Nueva Forma de ver la ID (o quitarla)

        //Crear Nuevo Botiquin
        $botiquin = new Botiquin();

        //Para establecer el IDBotiquin
        $datos = Botiquin::all()->count();
       
        //Insercción de datos
        $botiquin->IDBotiquin = $datos;
        $botiquin->NombreBotiquin = $request->NombreBotiquin;
        $botiquin->LugarBotiquin = $request->LugarBotiquin;
        $botiquin-> InventarioBotiquin = $request->InventarioBotiquin;
        
        //Subir Datos
        $botiquin->save();

        //Respuesta del Backend
        return response()->json(['message' => $datos, 'data' => $botiquin], 201);
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
        $datos = Botiquin::where("_id", $id)->first();
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
        $datos = Botiquin::where("_id", $id)->update([
            'NombreBotiquin' => $request->NombreBotiquin,
            'LugarBotiquin' => $request->LugarBotiquin
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
        Botiquin::destroy($id);
        return response()->json(['message' =>  'Borrado']);
    }
}
