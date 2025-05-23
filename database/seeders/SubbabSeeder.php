<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubbabSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('subbab')->insert([
            ['bab_id' => 1, 'judul_subbab' => 'Penjumlahan Bilangan Kecil'],
            ['bab_id' => 1, 'judul_subbab' => 'Pengurangan Sederhana'],
            ['bab_id' => 2, 'judul_subbab' => 'Jenis Kata dalam Bahasa Indonesia'],
            ['bab_id' => 7, 'judul_subbab' => 'Hukum Newton 1'],
            ['bab_id' => 7, 'judul_subbab' => 'Hukum Newton 2'],
            ['bab_id' => 10, 'judul_subbab' => 'Jenis Reaksi Kimia'],
            ['bab_id' => 10, 'judul_subbab' => 'Reaksi Eksoterm & Endoterm'],
        ]);
    }
}
