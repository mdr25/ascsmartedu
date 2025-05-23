<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ClassModel;
use App\Models\Payment;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // **Users CRUD**
    public function listUsers()
    {
        return response()->json(User::all());
    }

    public function createUser(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone_number' => 'required|string|max:15',
            'gender' => 'required|in:M,F',
            'address' => 'required|string|max:255',
            'roles_id' => 'required|integer|exists:roles,id',
        ]);

        $user = User::create(array_merge($validatedData, ['password' => bcrypt($validatedData['password'])]));

        return response()->json(['message' => 'User Created Successfully', 'user' => $user]);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json(['message' => 'User Updated Successfully', 'user' => $user]);
    }

    public function deleteUser($id)
    {
        User::findOrFail($id)->delete();

        return response()->json(['message' => 'User Deleted Successfully']);
    }

    // **Classes CRUD**
    public function listClasses()
    {
        return response()->json(ClassModel::all());
    }

    public function createClass(Request $request)
    {
        $validatedData = $request->validate([
            'class_name' => 'required|string|max:255',
            'jenjang_kelas_id' => 'required|integer|exists:jenjang_kelas,id',
        ]);

        $class = ClassModel::create($validatedData);

        return response()->json(['message' => 'Class Created Successfully', 'class' => $class]);
    }

    public function updateClass(Request $request, $id)
    {
        $class = ClassModel::findOrFail($id);
        $class->update($request->all());

        return response()->json(['message' => 'Class Updated Successfully', 'class' => $class]);
    }

    public function deleteClass($id)
    {
        ClassModel::findOrFail($id)->delete();

        return response()->json(['message' => 'Class Deleted Successfully']);
    }

    // **Payments Management**
    public function listPayments()
    {
        return response()->json(Payment::all());
    }

    public function updatePaymentStatus(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->update(['status' => $request->status]);

        if ($request->status === 'paid') {
            $user = $payment->user;
            $user->subscription_id = $payment->subscription_id;
            $user->save();
        }

        return response()->json([
            'message' => 'Payment Status Updated Successfully',
            'payment' => $payment
        ]);
    }

    public function getTeachers()
    {
        $pengajar = User::whereHas('role', function ($q) {
            $q->where('name_role', 'Pengajar');
        })->get();

        return response()->json($pengajar);
    }

    // public function createClass(Request $request)
    // {
    //     $validated = $request->validate([
    //         'class_name' => 'required|string|max:45',
    //         'jenjang_kelas_id' => 'required|exists:jenjang_kelas,id',
    //         'users_id' => 'required|exists:users,id'
    //     ]);

    //     // Cek user tsb role-nya Pengajar
    //     $pengajar = User::where('id', $validated['users_id'])->whereHas('role', function ($q) {
    //         $q->where('name', 'Pengajar');
    //     })->first();

    //     if (!$pengajar) {
    //         return response()->json(['message' => 'User tersebut bukan pengajar'], 400);
    //     }

    //     // Buat kelas
    //     $kelas = ClassModel::create([
    //         'class_name' => $validated['class_name'],
    //         'jenjang_kelas_id' => $validated['jenjang_kelas_id'],
    //     ]);

    //     // Assign pengajar ke kelas (update field `classes_id` di table `users`)
    //     $pengajar->classes_id = $kelas->id;
    //     $pengajar->save();

    //     return response()->json([
    //         'message' => 'Kelas berhasil dibuat dan pengajar di-assign',
    //         'kelas' => $kelas,
    //         'pengajar' => $pengajar
    //     ]);
    // }

    // public function listClasses()
    // {
    //     $kelas = ClassModel::with(['pengajar'])->get();
    //     return response()->json($kelas);
    // }



    // public function updatePaymentStatus(Request $request, $id)
    // {
    //     $payment = Payment::findOrFail($id);
    //     $payment->update(['status' => $request->status]);

    //     return response()->json(['message' => 'Payment Status Updated Successfully', 'payment' => $payment]);
    // }
}
