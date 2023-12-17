<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Botiquin;
use App\Models\Producto;
use Carbon\Carbon;


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

    public function pocoProductoBotiquin($id)
    {
        $umbral = 20000;
        $botiquin = Botiquin::where('_id',$id)->first();
        $inventario = $botiquin->Inventario;
        
        $productoAgotandose = array();
        foreach ($inventario as $item)
        {
            if ($item['CantidadAsignada'] < $umbral){
                $inventarioData = array(
                'IdProducto' => $item['IdProducto'],
                'NombreProducto'=> $item['NombreProducto'],
                'CantidadAsignada' => $item['CantidadAsignada'],
                );
                $productoAgotandose[] = $inventarioData;
            }
        
        }
        return response()->json(['status' => 200, 'data' => $productoAgotandose]);
    }

    public function vencimientoProductoBotiquin($id){

        $bodega = Botiquin::where('_id', $id)->first();
        
        $fechaActual = Carbon::now();
        $fechaActualFormateada = $fechaActual->format('Y-m-d');
        $diasLimite = 7;
        $fechaEnElFuturo = $fechaActual->addDays($diasLimite);
        $fechaFuturoFormateada = $fechaEnElFuturo->format('Y-m-d');
        $inventario = $bodega->Inventario;
        $productosPorVencer = [];
        foreach($inventario as $ItemInventario){
            $producto = Producto::where('_id', $ItemInventario['IdProducto'])->first();
            $desgloses = $producto->Desgloce;

            //Inicializar variables para el desglose más próximo a vencerse
            $desgloseProximo = null;
            $diferenciaDiasProxima = PHP_INT_MAX;
        
            foreach ($desgloses as $desglose) {
                $fechaVencimiento = Carbon::parse($desglose['FechaVencimiento']);
                $fechaVencimientoFormateada = $fechaVencimiento;
                if ($fechaVencimientoFormateada->isBetween($fechaActualFormateada, $fechaFuturoFormateada, true, true)) {
                    $diferenciaEnDias = $fechaVencimientoFormateada->diffInDays(Carbon::parse($fechaActualFormateada));
                    if ($diferenciaEnDias < $diferenciaDiasProxima) {
                        // Actualizar el desglose más próximo a vencerse y su diferencia en días
                        $desgloseProximo = $desglose;
                        $diferenciaDiasProxima = $diferenciaEnDias;
                    }
                }
            }
            // Verificar si se encontró un desglose próximo y si está dentro del límite de días
            if ($desgloseProximo !== null && $diferenciaDiasProxima <= $diasLimite) {
                // Agregar el producto a la lista de productos por vencer
                $productosPorVencer[] = [
                    'Nombre' => $producto->Nombre,
                    'FechaVencimiento' => $fechaVencimiento->format('Y-m-d'),
                    'DiasRestantes' => $diferenciaDiasProxima,
                ];
            }  
        }
        return response()->json(['status' => 200, 'data' => $productosPorVencer]);
    }
}
