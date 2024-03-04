<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        // El correo electrónico del destinatario
        $correoDestinatario = $request->input('correo');
        // Contenido y Asunto del correo
        $asuntoCorreo = $request->input('asunto');
        $contenidoCorreo = $request->input('contenido');
        
        // Lógica para enviar el correo electrónico
        // Mail::raw($contenidoCorreo, function ($message) use ($correoDestinatario, $asuntoCorreo) {
        //     $message->to($correoDestinatario)
        //             ->subject($asuntoCorreo);
        // });
        
        // Lógica para enviar el correo electrónico
        Mail::send([], [], function ($message) use ($correoDestinatario, $asuntoCorreo, $contenidoCorreo) {
            // $htmlPart = new HtmlPart($contenidoCorreo);
            $message->to($correoDestinatario)
                    ->subject($asuntoCorreo)
                    ->html($contenidoCorreo); // Establece el tipo de contenido como HTML
        });

        return response()->json(['message' => 'Correo electrónico enviado con éxito'], 200);
    }
}
