@component('mail::message')

Hello  {{ $name }},<br/>

 A new {{$type}} has been uploaded successfully


Please Click on the button below to login to view the video
@component('mail::button', ['url' =>route('login'), 'color' => 'success'])
Login
@endcomponent

 @component('mail::panel')
 if the above button does not work, please copy and paste the link below to your browser.<br/>
{{ route('login') }}<br/>
@endcomponent

If you want to view the {{$type}} directly, please click on the button below
@component('mail::button', ['url' =>$file_path, 'color' => 'success'])
 View {{$type}}
@endcomponent

@component('mail::panel')
if the above button does not work, please copy and paste the link below to your browser.<br/>
{{$file_path}}
@endcomponent

@component('mail::panel')
If you did not regitser  to our system, please ignore this email.
@endcomponent


if you have any questions, please contact us at {{ config('app.email') }}<br/>

Thanks,<br>
{{ config('app.name') }}


@endcomponent


