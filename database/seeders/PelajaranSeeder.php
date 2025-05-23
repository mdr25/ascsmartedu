<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pelajaran;

class PelajaranSeeder extends Seeder
{
    public function run(): void
    {
        // Contoh data pelajaran untuk beberapa kelas
        Pelajaran::insert([
            [
                'nama_pelajaran' => 'Matematika',
                'classes_id' => 1,
            ],
            [
                'nama_pelajaran' => 'Bahasa Indonesia',
                'classes_id' => 1,
            ],
            [
                'nama_pelajaran' => 'IPA',
                'classes_id' => 2,
            ],
            [
                'nama_pelajaran' => 'IPS',
                'classes_id' => 2,
            ],
        ]);
    }
}
