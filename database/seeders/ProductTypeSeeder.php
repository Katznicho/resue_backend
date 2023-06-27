<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $productTypes = [
            ['name' => 'Reselling'],
            ['name' => 'Donation'],
        ];

        DB::table('product_types')->insert($productTypes);
    }
}
