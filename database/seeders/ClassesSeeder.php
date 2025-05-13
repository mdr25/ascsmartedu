<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classes;

class ClassesSeeder extends Seeder
{
    public function run()
    {
        Classes::create([
            'class_name' => 'Kelas 1',
            'total_student' => 30,
            'jenjang_kelas_id' => 1 
        ]);

        Classes::create([
            'class_name' => 'Kelas 2',
            'total_student' => 25,
            'jenjang_kelas_id' => 1
        ]);
    }
}
