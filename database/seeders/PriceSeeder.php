<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prices')->insert([
            'name' => 'Langganan 1 Bulan',
            'amount' => 2500000.00,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
