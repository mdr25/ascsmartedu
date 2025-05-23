<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    /**
     * Daftar exception yang tidak dilaporkan.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * Daftar input yang tidak boleh dilaporkan kembali pada session ketika validasi gagal.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Report atau log exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render exception menjadi HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        
        if ($exception instanceof ValidationException && $request->expectsJson()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $exception->errors(),
            ], 422);
        }

        if ($request->expectsJson()) {
            return response()->json([
                'message' => $exception->getMessage(),
                'errors' => method_exists($exception, 'errors') ? $exception->errors() : null,
            ], 422);
        }

        return parent::render($request, $exception);
    }
}
