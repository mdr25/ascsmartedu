<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function check(Request $request)
    {
        return response()->json([
            'has_subscription' => $request->user()->hasSubscription()
        ]);
    }

    public function status(Request $request)
    {
        $subscription = $request->user()->subscription;

        if (!$subscription) {
            return response()->json(['message' => 'Tidak ada langganan aktif'], 404);
        }

        return response()->json([
            'name' => $subscription->name,
            'price' => $subscription->price,
            'duration' => $subscription->duration,
        ]);
    }
}
