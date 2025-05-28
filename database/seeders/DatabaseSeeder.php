<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            JenjangSeeder::class,
        ]);

        // Admin
        User::firstOrCreate([
            'email' => 'admin@example.com'
        ], [
            'name' => 'Admin',
            'password' => bcrypt('password123'),
            'phone_number' => '08123456789',
            'gender' => 'M',
            'address' => 'Kantor',
            'roles_id' => Role::where('name_role', 'Admin')->first()->id,
        ]);
    }
}
