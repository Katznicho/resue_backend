<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Verify your email address</title>
    <style>
        /* Email body styles */
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: #f1f1f1;
        }

        /* Main content container */
        .container {
            max-width: 600px;
            margin: 10px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        }

        /* Header styles */
        .header {
            background-color: #282F3B;
            color: #fff;
            padding: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        /* Body content styles */
        .body {
            padding: 20px;
        }

        /* Call to action button styles */
        .cta-button {
            display: inline-block;
            background-color: #4CAF50;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }

        .otp-code {
            font-size: 35px;
            font-weight: bold;
            margin-top: 20px;
            letter-spacing: 10px;
            color: #282F3B;
        }

        /* Footer styles */
        .footer {
            background-color: #f2f2f2;
            color: #666;
            font-size: 14px;
            padding: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Verify your email address</h1>
        </div>

        <div class="body">
            <p>Hello {{ $user->first_name }},</p>

            <p>Thank you for registering as a new {{ $userType }} on our platform. To verify your email address,
                please use
                the following one-time verification code:</p>

            <p class="otp-code">{{ $otp }}
            </p>

            <p>Please enter this code on the verification screen in your app to complete your registration.
                This code will <strong>expire in 5 minutes</strong>.
            </p>

            {{-- <a href="#" class="cta-button">Verify email address</a> --}}

            <span>Best regards,</span>
            <br>
            <span>{{ env('APP_NAME') }}</span>
        </div>

        <div class="footer">
            <p>If you did not register on our platform, please ignore this email.</p>
        </div>
    </div>
</body>

if you have any questions, please contact us at {{ config('app.email') }}<br/>

</html>
