<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bodega;
use App\Models\Producto;
use Carbon\Carbon;

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
        $rules = [
            'Nombre' => 'required',
            'Lugar' => 'required',
        ];
    
        $request->validate($rules);
        //Crear Nueva Bodega
        $bodega = new Bodega();

        //Insercción de datos
        $bodega->Nombre = $request->Nombre;
        $bodega->Lugar = $request->Lugar;
        $bodega->Inventario = $request->Inventario;
        $bodega->Tipo = $request->Tipo;
        
        //Subir Datos
        $bodega->save();

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
        $datos = Bodega::where("_id", $id)->first();
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
        $datos = Bodega::where("_id", $id)->first();
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
        $datos = Bodega::where("_id", $id)->update([
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
        Bodega::destroy($id);
        return response()->json(['status' => 204]);
    }

    public function pocoProductoBodega($id)
    {
        $umbral = 20000;
        $bodega = Bodega::where('_id',$id)->first();
        $inventario = $bodega->Inventario;
        
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
    public function elimProd($id, $idProd)
    {
        $bodega = Bodega::where('_id', $id)->first();

        if (!$bodega) {
            return response()->json(['status' => 404, 'message' => 'Bodega no encontrada'], 404);
        }

        $inventario = $bodega->Inventario;

        foreach ($inventario as $key => $item) {
            if ($item['IdProducto'] == $idProd) {
                unset($inventario[$key]);
            }
        }
    
        // Actualizar el inventario en el modelo Bodega
        $bodega->Inventario = array_values($inventario);
    
        // Guardar los cambios en la base de datos
        $bodega->save();

        return response()->json(['status' => 200, 'data' => $inventario]);
    }
    public function vencimientoProductoBodega($id){

        $bodega = Bodega::where('_id', $id)->first();
        
        $fechaActual = Carbon::now();
        $fechaActualFormateada = $fechaActual->format('Y-m-d');
        $diasLimite = 23;
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
