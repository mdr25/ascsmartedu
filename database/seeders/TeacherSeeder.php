<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $teachers = [
            [
                'name' => 'Ahmad Fauzi',
                'email' => 'ahmad.fauzi@gmail.com',
                'gender' => 'M',
                'phone_number' => '081234567890',
                'address' => 'Jl. Melati No.12, Jakarta',
            ],
            [
                'name' => 'Siti Nurhaliza',
                'email' => 'siti.nurhaliza@gmail.com',
                'gender' => 'F',
                'phone_number' => '081298765432',
                'address' => 'Jl. Kenanga No.4, Bandung',
            ],
            [
                'name' => 'Budi Santoso',
                'email' => 'budi.santoso@gmail.com',
                'gender' => 'M',
                'phone_number' => '081377788899',
                'address' => 'Jl. Merpati No.10, Surabaya',
            ],
            [
                'name' => 'Dewi Lestari',
                'email' => 'dewi.lestari@gmail.com',
                'gender' => 'F',
                'phone_number' => '081223344556',
                'address' => 'Jl. Mawar No.6, Yogyakarta',
            ],
            [
                'name' => 'Andi Wijaya',
                'email' => 'andi.wijaya@gmail.com',
                'gender' => 'M',
                'phone_number' => '081155566677',
                'address' => 'Jl. Anggrek No.21, Medan',
            ],
        ];

        foreach ($teachers as $teacher) {
            DB::table('users')->insert([
                'name' => $teacher['name'],
                'email' => $teacher['email'],
                'password' => Hash::make('password123'),
                'phone_number' => $teacher['phone_number'],
                'gender' => $teacher['gender'],
                'address' => $teacher['address'],
                'roles_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
