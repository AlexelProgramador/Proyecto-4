<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        // Contenido y Asunto del correo
        $contenidoCorreo = $request->input('contenido');
        $asuntoCorreo = $request->input('asunto');

        // El correo electrónico del destinatario
        $correoDestinatario = $request->input('correo');
        
        // Lógica para enviar el correo electrónico
        Mail::raw($contenidoCorreo, function ($message) use ($correoDestinatario, $asuntoCorreo) {
            $message->to($correoDestinatario)
                    ->subject($asuntoCorreo);
        });
        
        return response()->json(['message' => 'Correo electrónico enviado con éxito'], 200);
    }
}
