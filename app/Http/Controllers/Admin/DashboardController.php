<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\{User, Role, ClassModel, Payment};
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();

        $roles = Role::withCount('users')->get(['id', 'name_role']);

        $totalClasses = ClassModel::count();

        $totalPayments = Payment::count();
        $paidPayments = Payment::where('status', 'paid')->count();

        // Kelas terlaris (paling banyak dibeli)
        $bestSellingClass = DB::table('class_user')
            ->select('class_id', DB::raw('count(*) as total'))
            ->groupBy('class_id')
            ->orderByDesc('total')
            ->first();

        $bestSellingClassData = null;
        if ($bestSellingClass) {
            $class = ClassModel::find($bestSellingClass->class_id);
            $bestSellingClassData = [
                'class_name' => $class ? $class->class_name : null,
                'total_buyer' => $bestSellingClass->total
            ];
        }

        return response()->json([
            'total_users' => $totalUsers,
            'users_per_role' => $roles,
            'total_classes' => $totalClasses,
            'total_payments' => $totalPayments,
            'paid_payments' => $paidPayments,
            'best_selling_class' => $bestSellingClassData,
        ]);
    }
}
