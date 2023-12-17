<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Bodega;
use Ramsey\Uuid\Uuid;
use Carbon\Carbon;

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

        $rules = [
            'Nombre' => 'required',
            'Marca' => 'required',
            'Cantidad' => 'required',
            'ValorUnitario' => 'required',
        ];
    
        $request->validate($rules);
       
        //Insercción de datos
        $producto->Nombre = $request->Nombre;
        $producto->Marca = $request->Marca;
        $producto->Descripcion = $request->Descripcion;
        $producto->Contenedor = $request->Contenedor;
        $producto->Desgloce = $request->Desgloce;
        $producto->Ubicacion = $request->Ubicacion;
        $producto->Cantidad = $request->Cantidad;
        $producto->CantidadTotal = $request->CantidadTotal;
        $producto->CantidadAsignada = $request->CantidadAsignada;
        $producto->ValorUnitario = $request->ValorUnitario;
 
        $producto->save();

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
        $datos = Producto::where("_id", $id)->first();
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
        $rules = [
            'Nombre' => 'required',
            'Marca' => 'required',
        ];
        $request->validate($rules);
        //
        $datos = Producto::where("_id", $id)->update([
            'Nombre' => $request->Nombre,
            'Lugar' => $request->Lugar,
            'Marca' => $request->Marca,
            'Descripcion' => $request->Descripcion,
        ]);

        return response()->json(['status' => 200]);
    }

    public function updateDesgloce(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $uuid = Uuid::uuid4()->toString();

        $rules = [
            'CantidadContenedor' => 'required',
            'CantidadTotal' => 'required',
            'ValorTotal' => 'required',
            'FechaVencimiento' => 'required',
        ];
    
        $request->validate($rules);

        $desgloceData = array(
            'UuidProducto' => $uuid,
            'CantidadContenedor' => $request->CantidadContenedor,
            'CantidadTotal' => $request->CantidadTotal,
            'ValorTotal' => $request->ValorTotal,
            'FechaVencimiento' => $request->FechaVencimiento,
            'Estado' => $request->Estado,
            'Nombre' => $request->Nombre,
            'CantidadAsignada' => 0,
            'DesgloseOriginal'=> '' 
        );
        $CantidadTotal = $producto->TotalProducto + intval($request->CantidadTotal);
        $producto->CantidadTotal = $CantidadTotal;
        $producto->push('Desgloce', $desgloceData);
        $producto->save();
        return response()->json(['status' => 200]);

    }

    public function editDesgloce(Request $request, $id, $idDes)
    {

        $rules = [
            'UuidProducto' => 'required',
            'CantidadContenedor' => 'required',
            'CantidadTotal' => 'required',
            'ValorTotal' => 'required',
            'FechaVencimiento' => 'required',
            'Estado' => 'required',
            'Nombre' => 'required',
        ];
    
        $request->validate($rules);
        $producto = Producto::findOrFail($id);
        $uuid = Uuid::uuid4()->toString();
        
        $desgloceData = array(
            'UuidProducto' => $uuid,
            'CantidadContenedor' => $request->CantidadContenedor,
            'CantidadTotal' => $request->CantidadTotal,
            'ValorTotal' => $request->ValorTotal,
            'FechaVencimiento' => $request->FechaVencimiento,
            'Estado' => $request->Estado,
            'Nombre' => $request->Nombre,
            'CantidadAsignada' => 0,
            'DesgloseOriginal'=> $idDes
        );
        $producto->push('Desgloce', $desgloceData);
        $producto->save();

        $producto2 = Producto::findOrFail($id);
        $desgloceEncontrado = collect($producto2['Desgloce'])->first(function ($desgloce) use ($idDes) {
            return $desgloce['UuidProducto'] == $idDes;
        });
        if ($desgloceEncontrado) {
            $nDesgloce = $producto2->Desgloce;
                foreach ($nDesgloce as $index => $Uuid) {
                    if ($Uuid['UuidProducto'] == $idDes) {
                        // Asegurarse de que la cantidad a restar no sea mayor que la cantidad actual
                        $cantidadContenedorRestante = max(0, intval($Uuid['CantidadContenedor']) - intval($request->CantidadContenedor));
                        $cantidadTotalRestante = max(0, intval($Uuid['CantidadTotal']) - intval($request->CantidadTotal));
                        $valorTotalRestante = max(0, intval($Uuid['ValorTotal']) - intval($request->ValorTotal));
                        $cantidadAsignada= max(0, intval($Uuid['CantidadAsignada']));

                        $nDesgloce[$index] = [
                            'UuidProducto' => $Uuid['UuidProducto'],
                            'CantidadContenedor' => $cantidadContenedorRestante,
                            'CantidadTotal' => $cantidadTotalRestante,
                            'ValorTotal' => $valorTotalRestante,
                            'FechaVencimiento' => $Uuid['FechaVencimiento'],
                            'Estado' => $Uuid['Estado'],
                            'Nombre' => $Uuid['Nombre'],
                            'CantidadAsignada' => $cantidadAsignada,
                            'DesgloseOriginal' => $Uuid['DesgloseOriginal']
                            // Otros campos si los tienes
                        ];
                        break;
                    }
                    
                }
                $producto2->Desgloce = $nDesgloce;
            
                
        } else {
            // El producto con el UuidProducto especificado no se encontró
        }
        $producto2->save();
        return response()->json(['status' => 200]);
    }


    public function updateAsignacion(Request $request, $id)
    {

        $rules = [
            'TipoAsignacion' => 'required',
            'NombreUbicacion' => 'required',
            'CantidadAsignada' => 'required',
            'FechaProceso' => 'required',
        ];
    
        $request->validate($rules);
        $uuid1 = Uuid::uuid4()->toString();
        $producto = Producto::findOrFail($id);
        $asignacionData = array(
            'UuidAsignacion' => $uuid1,
            'TipoAsignacion' => $request->TipoAsignacion,
            'NombreUbicacion' => $request->NombreUbicacion,
            'CantidadAsignada' => $request->CantidadAsignada,
            'FechaProceso' => $request->FechaProceso
        );
        $producto->push('Ubicacion', $asignacionData);
        $producto->save();

        // Buscar la bodega por su ID
        $bodega = Bodega::findOrFail($request->IdUbicacion);
        // Verificar si el producto está en el inventarioBodega de la bodega
        $productoEncontrado = collect($bodega['Inventario'])->first(function ($producto) use ($id) {
            return $producto['IdProducto'] == $id;
        });
        if ($productoEncontrado) {
            $inventario = $bodega->Inventario;
            foreach ($inventario as $index => $producto) {
                if ($producto['IdProducto'] == $id) {
                    $inventario[$index]['CantidadAsignada'] += intval($request->CantidadAsignada);
                    break;
                }
            }
            $bodega->Inventario = $inventario;
            $bodega->save();

            $producto2 = Producto::findOrFail($id);
            $IdDesglose = $request->IdDesgloce;
            $desgloseEncontrado = collect($producto2['Desgloce'])->first(function ($item) use ($IdDesglose) {
                return $item['UuidProducto'] == $IdDesglose;
            });
            if ($desgloseEncontrado) {
                $desglose = $producto2->Desgloce;
                foreach ($desglose as $index => $Uuid) {
                    if ($Uuid['UuidProducto'] == $IdDesglose) {
                        $desglose[$index]['CantidadTotal'] -= intval($request->CantidadAsignada);
                        break;
                    }
                }
                $producto2->Desgloce = $desglose;
                $producto2->save();
            }
             
        return response()->json(['status' => 200]);
        } else {
            // El producto no está en el inventarioBodega de la bodega
            $inventarioData = array(
            'IdProducto' => $id,
            'UuidDesgloce' =>  $request->IdDesgloce,
            'NombreProducto'=> $producto->Nombre,
            'CantidadAsignada' => intval($request->CantidadAsignada),
            );
            $bodega->push('Inventario', $inventarioData);

            $producto2 = Producto::findOrFail($id);
            $IdDesglose = $request->IdDesgloce;
            $desgloseEncontrado = collect($producto2['Desgloce'])->first(function ($item) use ($IdDesglose) {
                return $item['UuidProducto'] == $IdDesglose;
            });
            if ($desgloseEncontrado) {
                $desglose = $producto2->Desgloce;
                foreach ($desglose as $index => $Uuid) {
                    if ($Uuid['UuidProducto'] == $IdDesglose) {
                        $desglose[$index]['CantidadTotal'] -= intval($request->CantidadAsignada);
                        break;
                    }
                }
                $producto2->Desgloce = $desglose;
                $producto2->save();
            }
        }
        $bodega->save();

        $producto1 = Producto::findOrFail($id);
        $cantidadAsig = $producto1->CantidadAsignada + intval($request->CantidadAsignada);
        $producto1->CantidadAsignada = $cantidadAsig;
        $producto1->save();

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
        Producto::destroy($id);
        return response()->json(['status' => 204]);
    }

    public function pocoProducto()
    {
        //
        $datos = Producto::where('CantidadTotal', '<=', 75)->get();
        return response()->json(['status' => 200, 'data' => $datos]);
    }

    public function vencimientoProducto()
    {
        // Obtener todos los productos (o usar algún criterio para obtener los productos que necesitas)
        $productos = Producto::all(); // Reemplaza "TuModelo" con el nombre correcto de tu modelo

        // Fecha actual
        $fechaActual = Carbon::now();
        $fechaActualFormateada = $fechaActual->format('Y-m-d');
        $diasLimite = 7;
        $fechaEnElFuturo = $fechaActual->addDays($diasLimite);
        $fechaFuturoFormateada = $fechaEnElFuturo->format('Y-m-d');

        $productosPorVencer = [];

        foreach ($productos as $producto) {
            $desgloses = $producto->Desgloce;
        
            // Inicializar variables para el desglose más próximo a vencerse
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
        // Ahora $inventario contiene la información organizada por estados
        return response()->json(['status' => 200, 'data' => $productosPorVencer]);
    }
}
