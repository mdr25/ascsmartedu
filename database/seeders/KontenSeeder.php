<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KontenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('konten')->insert([
            ['subbab_id' => 1, 'judul_konten' => 'Video: Cara Penjumlahan Cepat', 'durasi' => '5min', 'is_free' => true],
            ['subbab_id' => 1, 'judul_konten' => 'Latihan Soal Penjumlahan', 'durasi' => 'N/A', 'is_free' => true],
            ['subbab_id' => 2, 'judul_konten' => 'Video: Pengurangan Bilangan', 'durasi' => '6min', 'is_free' => false],
            ['subbab_id' => 7, 'judul_konten' => 'Simulasi Hukum Newton 1', 'durasi' => '4min', 'is_free' => true],
            ['subbab_id' => 10, 'judul_konten' => 'Reaksi Eksoterm & Endoterm', 'durasi' => '7min', 'is_free' => false],
        ]);
    }
}
