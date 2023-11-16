<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return response()->json([
            "results" => $usuarios
        ], Response::HTTP_OK);
    }
    public function store(Request $request)
    {
        // Validar los campos
        $request->validate([
            'nombre' => 'required|string|regex:/^[a-zA-Z]+$/',
            'apellido' => 'required|string|regex:/^[a-zA-Z]+$/',
            'password' => 'required|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[^\s]+$/',
            'rol' => 'required',
        ]);

        // Verificar si el usuario ya existe
        $isCreated = Usuario::where('nombre', $request->nombre)
            ->where('apellido', $request->apellido)
            ->first();

        if ($isCreated) {
            return response()->json(['Error' => "El usuario que intenta ingresar ya existe"], Response::HTTP_CONFLICT);
        }

        $usuario = new Usuario();
        $usuario->nombre =  $request->nombre;
        $usuario->apellido =  $request->apellido;
        $usuario->usuario =  strtoupper(substr($request->nombre, 0, 1)) . $request->apellido;
        $usuario->password =  Hash::make($request->password);
        $usuario->rol =  $request->rol;

        $usuario->save();

        return response()->json(['result' => $usuario], Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($request->id);
        // Validar los campos
        $request->validate([
            'nombre' => 'required|string|regex:/^[a-zA-Z]+$/',
            'apellido' => 'required|string|regex:/^[a-zA-Z]+$/',
            'password' => 'required|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[^\s]+$/',
            'rol' => 'required',
        ]);

        $usuario->nombre =  $request->newNombre;
        $usuario->apellido =  $request->newApellido;
        $usuario->usuario =  $request->newUsuario;
        $usuario->password =  Hash::make($request->newPassword);
        $usuario->rol =  $request->rol;

        // Indicamos los campos que son son requeridos( no deben ser espacios en blanco)


        $usuario->save();

        return response()->json(['result' => $usuario], Response::HTTP_OK);
    }
    public function destroy($id)
    {
        Usuario::destroy($id);
        return response()->json(['result' => "Usuario $id eliminado"], Response::HTTP_OK);
    }
}