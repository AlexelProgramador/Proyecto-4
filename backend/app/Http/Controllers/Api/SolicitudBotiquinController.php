<?php

namespace App\Http\Controllers\Api;

use App\Models\SolicitudBotiquin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

        //Respuesta del Backend
        return response()->json(['data' => $solicitud_botiquin], 201);
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
