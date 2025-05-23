<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('subscription_packages')->insert([
            ['name' => 'Paket 1 Bulan', 'price' => 250000, 'duration' => 30],
        ]);
    }
}
