<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class AApiPdfController extends Controller
{
    public function show($filename)
    {
        $filename = urldecode($filename); // Decodifica la URL
        $path = public_path('pdfs/' . $filename . '.pdf');
    
        if (!File::exists($path)) {
            abort(404);
        }
        error_log('Serving PDF: ' . $path);
    
        return response()->file($path);
    }
}