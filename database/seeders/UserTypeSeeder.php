<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userTypes = [
            ['name' => 'Admin'],
            ['name' => 'Reseller'],
            ['name' => 'Donator'],
        ];

        DB::table('user_types')->insert($userTypes);
    }
}
