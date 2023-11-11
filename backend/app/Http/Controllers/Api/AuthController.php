<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $usuario = Usuario::where('usuario', $request->username)->first();
        $foo = Hash::check($request->password, $usuario->password);
        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response([
                'message' => ['Estas credenciales no coinciden con nuestros registros.']
            ], Response::HTTP_UNAUTHORIZED);
        }
        $response = [
            'usuarioId' => $usuario->_id,
            'usuario' => $usuario->rol,
            "sucess" => true,
        ];
        return response($response, Response::HTTP_OK);
    }
}