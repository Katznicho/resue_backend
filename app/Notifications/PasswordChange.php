<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordChange extends Notification
{
    use Queueable;


    private $name;
    private $subject;
    private $importance_level;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $name, string $subject, string $importance_level)
    {
        //
         $this->name = $name;
        $this->subject = $subject;
        $this->importance_level = $importance_level;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                ->subject($this->subject)
               ->markdown('emails.passwordchange', [
                     'name' => $this->name,
                ]);

    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'user_name' => $notifiable->name,
            'user_email' => $notifiable->email,
            'type' =>null,
            'file_path' => null,
            'user_id' => $notifiable->id,
            'subject' => $this->subject,
            'importance_level' => $this->importance_level,
            "description" => "Password Change Notification",
        ];
    }
}
