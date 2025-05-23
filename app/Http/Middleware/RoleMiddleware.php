<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = auth()->user()->load('role');

        Log::info('Authenticated user:', ['user' => $user]);
        Log::info('User role:', ['role' => $user->role]);

        // Cek apakah user punya role
        if (!$user->role) {
            return response()->json(['message' => 'Role not found'], 403);
        }

        $userRole = $user->role->name_role;

        // Validasi apakah role pengguna termasuk dalam yang diizinkan
        if (!in_array($userRole, $roles)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
