<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{User, Role, ClassModel, Payment, SubscriptionPackage};
use Illuminate\Http\Request;
use DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();

        $roles = Role::withCount('users')->get(['id', 'name_role']);

        $totalClasses = ClassModel::count();

        $totalPayments = Payment::count();
        $paidPayments = Payment::where('status', 'paid')->count();

        $mostUsedPackage = SubscriptionPackage::withCount('users')
            ->orderByDesc('users_count')
            ->first();

        return response()->json([
            'total_users' => $totalUsers,
            'users_per_role' => $roles,
            'total_classes' => $totalClasses,
            'total_payments' => $totalPayments,
            'paid_payments' => $paidPayments,
            'most_used_package' => $mostUsedPackage ? [
                'name' => $mostUsedPackage->name,
                'count' => $mostUsedPackage->users_count
            ] : null,
        ]);
    }
}
