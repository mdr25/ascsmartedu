<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenjangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('jenjang_kelas')->insert([
            ['nama_jenjang' => 'SD'],
            ['nama_jenjang' => 'SMP'],
            ['nama_jenjang' => 'SMA'],
        ]);
    }
}
