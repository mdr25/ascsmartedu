<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'phone_number' => 'required|string|max:15',
            'gender' => 'required|in:M,F',
            'address' => 'required|string|max:255',
            'roles_id' => 'required|exists:roles,id',
        ]);

        $user = User::create([
            ...$validated,
            'password' => bcrypt($validated['password'])
        ]);

        return response()->json(['message' => 'User Created Successfully', 'user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json(['message' => 'User Updated Successfully', 'user' => $user]);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->json(['message' => 'User Deleted Successfully']);
    }
}
