<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class MataPelajaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('mata_pelajaran')->insert([
            ['nama_mapel' => 'Matematika'],
            ['nama_mapel' => 'Fisika'],
            ['nama_mapel' => 'Kimia'],
            ['nama_mapel' => 'Biologi'],
            ['nama_mapel' => 'Bahasa Indonesia'],
            ['nama_mapel' => 'Bahasa Inggris'],
        ]);
    }
}
