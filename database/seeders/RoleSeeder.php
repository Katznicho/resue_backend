<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

         $pers = ['create user', 'delete user', 'edit user', 'create role', 'delete role', 'edit role', 'create baby', 'delete baby', 'edit baby'];
        Role::create([
            'name' => 'Admin',
            'permissions' =>json_encode($pers),
            'description' => 'Default role for admin users',
        ]);
    }
}
