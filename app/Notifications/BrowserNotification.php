<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;

class BrowserNotification extends Notification
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
        return [WebPushChannel::class];
    }




    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toWebPush($notifiable, $notification)
    {
        return (new WebPushMessage)
            ->title("Hello $notifiable->name")
            //->icon('/approved-icon.png')
            ->body(" $this->subject has been uploaded")
            ->action("View $this->type",  $this->file_path)
            ->options(['TTL' => 1000])
           ->data([
            'id' => $notification->id,
            'file'=>$this->file_path
           ])
           ->vibrate(0);
        // ->badge()
        // ->dir()
        // ->image()
        // ->lang()
        // ->renotify()
        // ->requireInteraction()
        // ->tag()

    }
}
