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
        $producto->NombreProducto = $request->NombreProducto;
        $producto->MarcaProducto = $request->MarcaProducto;
        $producto->DescripcionProducto = $request->DescripcionProducto;
        $producto->ContenedorProducto = $request->ContenedorProducto;
        $producto->DesgloceProducto = $request->DesgloceProducto;
        $producto->UbicacionProducto = $request->UbicacionProducto;
        $producto->CantidadProducto = intval($request->CantidadProducto);
        $producto->TotalProducto = intval($request->CantidadTotalProducto);
        $producto->ValorUnitarioProducto = intval($request->ValorUnitarioProducto);
 
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
        $uuid = Uuid::uuid4()->toString();
        $desgloceData = array(
            'UuidProducto' => $uuid,
            'CantidadContenedorProducto' => $request->CantidadContenedorProducto,
            'CantidadTotalProducto' => $request->CantidadTotal,
            'ValorTotalProducto' => $request->ValorTotal,
            'FechaVencimientoProducto' => $request->FechaVencimientoProducto,
            'EstadoProducto' => $request->EstadoProducto,
            'NombreDesgloceProducto' => $request->NombreDesgloceProducto
        );
        $CantidadTotal = $producto->TotalProducto + intval($request->CantidadTotal);
        $producto->TotalProducto = $CantidadTotal;
        $producto->push('DesgloceProducto', $desgloceData);
        $producto->save();
        return response()->json(['message' => 'Producto actualizado con éxito'], 200);

    }

    public function updateAsignacion(Request $request, $id)
    {
        $uuid1 = Uuid::uuid4()->toString();
        $producto = Producto::findOrFail($id);
        $asignacionData = array(
            'UuidAsignacion' => $uuid1,
            'TipoProcesoProducto' => $request->TipoProcesoProducto,
            'NombreUbicacionBodega' => $request->NombreUbicacionBodega,
            'CantidadAsignadaProducto' => $request->CantidadAsignadaProducto,
            'FechaProcesoProducto' => $request->FechaProcesoProducto
        );
        $producto->push('UbicacionProducto', $asignacionData);
        $producto->save();

        // Buscar la bodega por su ID
        $bodega = Bodega::findOrFail($request->IdUbicacionProducto);
        // Verificar si el producto está en el inventarioBodega de la bodega
        $productoEncontrado = collect($bodega['InventarioBodega'])->first(function ($producto) use ($id) {
            return $producto['IdProducto'] == $id;
        });
        if ($productoEncontrado) {
            $inventario = $bodega->InventarioBodega;
            foreach ($inventario as $index => $producto) {
                if ($producto['IdProducto'] == $id) {
                    $inventario[$index]['CantidadAsignadaProducto'] += intval($request->CantidadAsignadaProducto);
                    break;
                }
            }
            $bodega->InventarioBodega = $inventario;
            $bodega->save();
            return response()->json(['message' => $inventario, 'success' => true]);
        } else {
            // El producto no está en el inventarioBodega de la bodega
            $inventarioData = array(
            'IdProducto' => $id,
            'UuidDesgloce' =>  $request->IdDesgloceProducto,
            'NombreProducto'=> $producto->NombreProducto,
            'CantidadAsignadaProducto' => intval($request->CantidadAsignadaProducto),
            );
            $bodega->push('InventarioBodega', $inventarioData);
        }
        $bodega->save();
        return response()->json(['message' => 'Producto actualizado con éxito']);

        // $inventarioData = array(
        //     'NombreProducto'=> $producto->NombreProducto,
        //     'TipoProcesoProducto' => $request->TipoProcesoProducto,
        //     'UbicacionProducto' => $request->UbicacionProducto,
        //     'CantidadAsignadaProducto' => $request->CantidadAsignadaProducto,
        //     'FechaProcesoProducto' => $request->FechaProcesoProducto
        // );
        // $bodega->push('InventarioBodega', $inventarioData);
        // $bodega->save();

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
