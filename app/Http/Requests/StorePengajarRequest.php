<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengajarRequest extends FormRequest
{
    public function authorize()
    {
        // Hanya admin boleh menambah pengajar
        return auth()->user() && auth()->user()->hasRole('admin');
    }

    public function rules()
    {
        return [
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'jenjang_kelas_id' => 'nullable|exists:jenjang_kelas,id',
            'no_telepon' => 'nullable|string',
            'gender' => 'nullable|in:male,female',
            'alamat' => 'nullable|string',
        ];
    }
}