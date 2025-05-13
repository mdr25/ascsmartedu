<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Database\Seeders\ClassesSeeder;
use Database\Seeders\JenjangKelasSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (Role::count() == 0) {
            Role::insert([
                [
                    "name_role" => "admin",
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now()
                ],
                [
                    "name_role" => "siswa",
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now()
                ],
                [
                    "name_role" => "pengajar",
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now()
                ],
            ]);

            $this->call([
            JenjangKelasSeeder::class,
            ClassesSeeder::class,  // Menambahkan seeder ke dalam DatabaseSeeder
         ]);
        }

        // Ambil role berdasarkan name untuk relasi
        $adminRole = Role::where('name_role', 'admin')->first();
        $siswaRole = Role::where('name_role', 'siswa')->first();
        $pengajarRole = Role::where('name_role', 'pengajar')->first();

        // Buat user dengan role tertentu
        User::create([
            "id_role"      => $adminRole->id, 
            "nama"         => 'Admin',
            "email"        => 'admin@gmail.com',
            "password"     => Hash::make('admin123'),
            "no_telepon"   => '081234567890',
            "gender"       => 'male',
            "alamat"       => 'Jalan Merdeka No.1',
        ]);

        User::create([
            "id_role"      => $pengajarRole->id,
            "nama"         => 'Pengajar',
            "email"        => 'pengajar@gmail.com',
            "password"     => Hash::make('pengajar123'),
            "no_telepon"   => '081333333333',
            "gender"       => 'male',
            "alamat"       => 'Jalan Guru No.3',
        ]);
    }
}
