<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BankSoal;

class BankSoalSeeder extends Seeder
{
    public function run(): void
    {
        $soalData = [
            [
                'nama_materi' => 'Matematika Dasar',
                'soal'        => 'Berapakah hasil dari 2 + 2?',
                'materi'      => 'Penjumlahan dasar untuk siswa tingkat awal.',
                'level'       => 'easy',
                'classes_id'  => 1, // Pastikan ID ini sesuai dengan data classes yang ada
            ],
            [
                'nama_materi' => 'Bahasa Indonesia',
                'soal'        => 'Apa sinonim dari kata "indah"?',
                'materi'      => 'Kosakata dasar Bahasa Indonesia.',
                'level'       => 'medium',
                'classes_id'  => 2,
            ],
            [
                'nama_materi' => 'IPA',
                'soal'        => 'Apa yang dimaksud dengan fotosintesis?',
                'materi'      => 'Proses dasar tumbuhan dalam membuat makanan.',
                'level'       => 'hard',
                'classes_id'  => 1,
            ],
        ];

        foreach ($soalData as $soal) {
            BankSoal::create($soal);
        }
    }
}
