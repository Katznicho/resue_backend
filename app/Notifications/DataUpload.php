<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class DataUpload extends Notification
{
    use Queueable;


    private $name;
    private $type;
    private $file_path;
    private $subject;
    private $importance_level;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($name, string $type, string $file_path, string $subject, string $importance_level)
    {
        //
        $this->name = $name;
        $this->type = $type;
        $this->file_path = $file_path;
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
            ->markdown('emails.dataupload', [
                'name' => $this->name,
                'type' => $this->type,
                'file_path' => $this->file_path,
                'subject' => $this->subject,
                'importance_level' => $this->importance_level,

            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'user_name' => $notifiable->name,
            'user_email' => $notifiable->email,
            'type' => $this->type,
            'file_path' => $this->file_path,
            'user_id' => $notifiable->id,
            'subject' => $this->subject,
            'importance_level' => $this->importance_level,
            "description" => "A new data file has been uploaded Notification",

        ];
    }


}
