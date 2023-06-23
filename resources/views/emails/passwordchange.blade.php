@component('mail::message')

Hello  {{ $name }},<br/>

 Your password  has been changed successfully


Please Click on the button below to login with the new password
@component('mail::button', ['url' =>route('login'), 'color' => 'success'])
Login
@endcomponent

If this was not you please click here to reset your password and contact us at {{ config('app.email') }}<br/>
@component('mail::button', ['url' =>route('login'), 'color' => 'success'])
Login
@endcomponent

 @component('mail::panel')
 if the above button does not work, please copy and paste the link below to your browser.<br/>
{{ route('login') }}<br/>
@endcomponent


@component('mail::panel')
If you did not regitser  to our system, please ignore this email.
@endcomponent


if you have any questions, please contact us at {{ config('app.email') }}<br/>

Thanks,<br>
{{ config('app.name') }}


@endcomponent


