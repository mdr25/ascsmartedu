<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bab;

class BabSeeder extends Seeder
{
    public function run(): void
    {
        Bab::insert([
            [
                'nama_bab' => 'Pengenalan Bilangan',
                'pelajaran_id' => 1, // ID pelajaran Matematika
            ],
            [
                'nama_bab' => 'Operasi Penjumlahan',
                'pelajaran_id' => 1,
            ],
            [
                'nama_bab' => 'Mengenal Teks Narasi',
                'pelajaran_id' => 2, // ID pelajaran Bahasa Indonesia
            ],
            [
                'nama_bab' => 'Tata Bahasa Dasar',
                'pelajaran_id' => 2,
            ],
        ]);
    }
}
