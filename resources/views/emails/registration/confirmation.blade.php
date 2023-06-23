@component('mail::message')

Hello  {{ $name }},<br/>

 You have successfully registered to our system.
 Your account details are as below:<br/>
 Email : {{ $email }}<br/>
Password : {{ $password }}<br/>


Please Click on the button below to login
@component('mail::button', ['url' =>route('login'), 'color' => 'success'])
Login
@endcomponent

 if the above button does not work, please copy and paste the link below to your browser.<br/>
{{ route('login') }}<br/>

@component('mail::panel')
If you did not register to our system, please ignore this email.
@endcomponent


if you have any questions, please contact us at {{ config('app.email') }}<br/>

Thanks,<br>
{{ config('app.name') }}


@endcomponent
