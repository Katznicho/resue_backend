<?php

namespace Database\Seeders;

use App\Models\Configuration;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user =  new User();
        $user->name = 'Admin';
        $user->email = 'admin@example.com';
        $user->password = bcrypt('12345678');
        $user->title = "Mr";
        $user->role_id = 1;
        $user->save();

        // notification settinsg


        $notificationsConfigurations = config("constants.NOTIFICATIONS_CONFIG");

        foreach ($notificationsConfigurations as $config) {
            Configuration::create($config);
        }

        $deviceConfigurations = config("constants.DEVICE_CONFIG");

        foreach ($deviceConfigurations as $config) {
            Configuration::create($config);
        }

        $securityConfigurations = config("constants.SECURITY_CONFIG");

        foreach ($securityConfigurations as $config) {
            Configuration::create($config);
        }
    }
}
