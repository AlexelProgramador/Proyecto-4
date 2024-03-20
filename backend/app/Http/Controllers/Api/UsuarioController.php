<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator; // Agregar esta línea


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
            // 'correo' => 'email',
            'password' => 'required|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\\\\\\/])/',
            'rol' => 'required',
        ]);

        // Verificar si el usuario ya existe
        // $isCreated = Usuario::where('nombre', $request->nombre)
        //     ->where('apellido', $request->apellido)
        //     ->first();

        // if ($isCreated) {
        //     return response()->json(['Error' => "El usuario que intenta ingresar ya existe"], Response::HTTP_CONFLICT);
        // }

        // Generar un nombre de usuario
        $baseNombreUsuario = strtoupper(substr($request->nombre, 0, 1)) . $request->apellido;
        $nombreUsuario = $baseNombreUsuario;
        $contador = 2;
        while (Usuario::where('usuario', $nombreUsuario)->exists()) {
            // Si el nombre de usuario ya existe, agregar un sufijo al final
            $nombreUsuario = $baseNombreUsuario . $contador;
            $contador++;
        }

        $usuario = new Usuario();
        $usuario->nombre =  $request->nombre;
        $usuario->apellido =  $request->apellido;
        $usuario->correo = $request->correo;
        $usuario->usuario =  $nombreUsuario;
        $usuario->password =  Hash::make($request->password);
        $usuario->rol =  $request->rol;

        $usuario->save();

        return response()->json(['result' => $usuario], Response::HTTP_CREATED);
    }

    public function editarUsuario(Request $request, $id)
    {   
        // $usuario = Usuario::findOrFail($request->id);
        // $usuario = Usuario::where('_id', $request->id)->first();
        $usuario = Usuario::find($id);
    
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }
        // Validar los campos
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|regex:/^[a-zA-Z]+$/',
            'apellido' => 'required|string|regex:/^[a-zA-Z]+$/',
            // 'correo' => 'required|email',
            // 'correo' => 'required|email|unique:usuarios,correo,'.$id, // Agregar validación de correo único
            // 'password' => 'required|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\\\\\\/])/',
            // 'rol' => 'required',
        ]);
        // Validar el correo solo si se proporciona uno nuevo
        if ($request->correo != $usuario->correo) {
            $validator->addRules([
                'correo' => 'unique:usuarios,correo,'.$id,
            ]);
        }

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $usuario->nombre =  $request->nombre;
        $usuario->apellido =  $request->apellido;
        // $usuario->usuario =  $request->usuario;
        $usuario->correo = $request->correo;
        // Solo actualiza la contraseña si se proporciona una nueva
        if ($request->has('password')) {
            $validator->addRules([
                'password' => 'required|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\\\\\\/])/',
            ]);
            $usuario->password = Hash::make($request->password);
        }        
        // $usuario->rol =  $request->rol;

        // Indicamos los campos que son son requeridos( no deben ser espacios en blanco)

        $usuario->save();

        return response()->json(
            $usuario,
            Response::HTTP_OK
        );
    }
    public function destroy($id)
    {
        Usuario::destroy($id);
        return response()->json(['result' => "Usuario $id eliminado"], Response::HTTP_OK);
    }
}
