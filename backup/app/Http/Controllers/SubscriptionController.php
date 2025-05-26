<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function checkSubscription(Request $request)
    {
        $user = $request->user();
        return response()->json(['has_subscription' => $user->hasSubscription()]);
    }

    public function subscriptionStatus(Request $request)
    {
        $subscription = $request->user()->subscription;
        if (!$subscription) {
            return response()->json(['message' => 'No active subscription'], 404);
        }

        return response()->json([
            'subscription_name' => $subscription->name,
            'price' => $subscription->price,
            'duration' => $subscription->duration,
        ]);
    }
}
