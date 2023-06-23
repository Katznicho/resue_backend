<?php
return [
    'ADMIN' => 'Admin',
    'USER' => 'User',
    'NOTIFICATIONS_CONFIG' => [
        [
            'category' => "NOTIFICATIONS_CONFIG",
            'user_id' => 1,
            'name' => "SMS NOTIFICATIONS",
            'description' => "These are sms notifications",
            'value' => "sms",
            'enabled' => 1
        ],
        [
            'category' => "NOTIFICATIONS_CONFIG",
            'user_id' => 1,
            'name' => "EMAIL NOTIFICATIONS",
            'description' => "These are sms notifications",
            'value' => "email",
            'enabled' => 1
        ],
        [
            'category' => "NOTIFICATIONS_CONFIG",
            'user_id' => 1,
            'name' => "WEB PUSH NOTIFICATIONS",
            'description' => "These are web push notifications",
            'value' => "web_push",
            'enabled' => 1
        ],
    ],
    "DEVICE_CONFIG" => [
        [
            'category' => "DEVICE_CONFIG",
            'user_id' => 1,
            'name' => "DEVICE CONFIGUTATIONS",
            'description' => "These are device notifications",
            'value' => "device",
            'enabled' => 1

        ]


    ],
    "SECURITY_CONFIG" => [
        [
            'category' => "SECURITY_CONFIG",
            'user_id' => 1,
            'name' => "2FA AUTHENTICATION",
            'description' => "This is a 2fa feature",
            'value' => "2fa",
            'enabled' => 0
        ],

    ],
    "SECURITY_CONFIGURATION" => "SECURITY_CONFIG",
    "DEVICE_CONFIGURATION" => "DEVICE_CONFIG",
    "NOTIFICATIONS_CONFIGURATION" => "NOTIFICATIONS_CONFIG"

];
