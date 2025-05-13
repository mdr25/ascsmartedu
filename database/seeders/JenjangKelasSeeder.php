<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JenjangKelas;

class JenjangKelasSeeder extends Seeder
{
    public function run(): void
    {
        $jenjangKelas = [
            'Dasar',
            'Menengah',
            'Lanjut',
        ];

        foreach ($jenjangKelas as $nama) {
            JenjangKelas::firstOrCreate(['nama_jenjang' => $nama]);
        }

        
    }
    
}
