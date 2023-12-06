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

        //Para establecer el IDProducto
       
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
            'Nombre' => $request->Nombre,
            'Lugar' => $request->Lugar,
            'Marca' => $request->Marca,
            'Descripcion' => $request->Descripcion,
        ]);

        return response()->json(['message' => "llegó exitosamente", 'data' => $datos], 201);
    }

    public function updateDesgloce(Request $request, $id)
    {
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
            'DesgloseOriginal'=> '' 
        );
        $CantidadTotal = $producto->TotalProducto + intval($request->CantidadTotal);
        $producto->TotalProducto = $CantidadTotal;
        $producto->push('Desgloce', $desgloceData);
        $producto->save();
        return response()->json(['message' => 'Producto actualizado con éxito'], 200);

    }

    public function editDesgloce(Request $request, $id, $idDes)
    {
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

                        $nDesgloce[$index] = [
                            'UuidProducto' => $Uuid['UuidProducto'],
                            'CantidadContenedor' => $cantidadContenedorRestante ,
                            'CantidadTotal' => $cantidadTotalRestante,
                            'ValorTotal' => $valorTotalRestante,
                            'FechaVencimiento' => $Uuid['FechaVencimiento'],
                            'Estado' => $Uuid['Estado'],
                            'Nombre' => $Uuid['Nombre'],
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
        return response()->json();
    }


    public function updateAsignacion(Request $request, $id)
    {
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
            return response()->json(['message' => $inventario, 'success' => true]);
        } else {
            // El producto no está en el inventarioBodega de la bodega
            $inventarioData = array(
            'IdProducto' => $id,
            'UuidDesgloce' =>  $request->IdDesgloce,
            'NombreProducto'=> $producto->Nombre,
            'CantidadAsignada' => intval($request->CantidadAsignada),
            );
            $bodega->push('Inventario', $inventarioData);
        }
        $bodega->save();
        return response()->json(['message' => 'Producto actualizado con éxito']);

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

    public function pocoProducto()
    {
        //
        $datos = Producto::where('TotalProducto', '<=', 25)->get();
        return response()->json($datos);
    }

    public function vencimientoProducto()
    {
        // Obtener todos los productos (o usar algún criterio para obtener los productos que necesitas)
        $productos = Producto::all('DesgloceProducto'); // Reemplaza "TuModelo" con el nombre correcto de tu modelo

        // Fecha actual
        $fechaActual = Carbon::now();

        // Recorrer cada producto
        foreach ($productos as $producto) {
            // Recorrer cada desglose del producto
            foreach ($producto->DesgloceProducto as $desglose) {
                $fechaVencimiento = Carbon::parse($desglose['FechaVencimientoProducto']);
                $diferenciaEnDias = $fechaVencimiento->diffInDays($fechaActual);

                // Determinar el estado del producto
                if ($diferenciaEnDias < 0 && $desglose['EstadoProducto'] !== 'Vencido') {
                    // Actualizar el estado del desglose a "Vencido"
                    $desglose->update(['EstadoProducto' => 'Vencido']);

                    // Puedes agregar más lógica aquí según sea necesario
                    $inventario['vencido'][] = [
                        'producto' => $producto,
                        'desglose' => $desglose,
                        'dias_restantes' => $diferenciaEnDias,
                    ];

                } elseif ($diferenciaEnDias <= 7) {
                    // Producto por vencer en los próximos 7 días
                    $inventario['por_vencer'][] = [
                        'producto' => $producto,
                        'desglose' => $desglose,
                        'dias_restantes' => $diferenciaEnDias,
                    ];
                } 
            }
        }

        // Ahora $inventario contiene la información organizada por estados
        return response()->json($inventario);
    }
}
