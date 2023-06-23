<?php

namespace App\Http\Controllers;

use App\Models\Notifications;
use App\Traits\LogTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Notifications\DatabaseNotification;



class NotificationController extends Controller
{
    use LogTrait;
    private $isAdmin = false;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $role_name = $request->user()->role->name;
            if ($role_name == config("constants.ADMIN")) {
                $this->isAdmin = true;
            } else {
                $this->isAdmin = false;
            }
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {


        if ($this->isAdmin) {
            // Retrieve all stored notifications
            $notifications = DatabaseNotification::orderBy('created_at', 'desc')->get();
            return Inertia::render('Notifications/Index', ['notifications' => $notifications]);
        } else {
            // Retrieve notifications specific to the authenticated user
            $userId = $request->user()->id;
            $notifications = DatabaseNotification::where('data->user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->get();
            return Inertia::render('Notifications/Index', ['notifications' => $notifications]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return Inertia::render('Notifications/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'type' => ['required', 'string'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'message' => ['required', 'string'],
            'importance_level' => ['required', 'integer'],
            'status' => ['required', 'string'],
            'subject' => ['required', 'string'],
        ]);

        $notification = Notifications::create($validatedData);

        return redirect()->route('notifications.show', $notification->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Retrieve a specific notification by its ID
        $notification = DatabaseNotification::find($id);

        return Inertia::render('Notifications/Show', ['notification' => $notification]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validatedData = $request->validate([
            'type' => ['required', 'string'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'message' => ['required', 'string'],
            'importance_level' => ['required', 'integer'],
            'status' => ['required', 'string'],
            'subject' => ['required', 'string'],
        ]);

        $notification = Notifications::findOrFail($id);

        $notification->update($validatedData);

        return redirect()->route('notifications.show', $notification->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $notification = Notifications::findOrFail($id);

        $notification->delete();

        return redirect()->route('notifications.index');
    }




    public function getUnreadNotifications(Request $request)
    {

        if ($this->isAdmin) {
            $unreadNotifications = DatabaseNotification::whereNull('read_at')
                ->orderBy('created_at', 'desc')
                ->get();
            return Inertia::render('Notifications/UnRead', ['notifications' => $unreadNotifications]);
        } else {
            $userId = $request->user()->id;
            $unreadNotifications = DatabaseNotification::where('data->user_id', $userId)
                ->whereNull('read_at')
                ->orderBy('created_at', 'desc')
                ->get();
            return Inertia::render('Notifications/UnRead', ['notifications' => $unreadNotifications]);
        }
    }

    public function getReadNotifications(Request $request)
    {
        if ($this->isAdmin) {
            $readNotifications = DatabaseNotification::whereNotNull('read_at')
                ->orderBy('created_at', 'desc')
                ->get();
            return Inertia::render('Notifications/ReadNotifications', ['notifications' => $readNotifications]);
        } else {
            $userId = $request->user()->id;
            $readNotifications = DatabaseNotification::where('data->user_id', $userId)
                ->whereNotNull('read_at')
                ->orderBy('created_at', 'desc')
                ->get();
            return Inertia::render('Notifications/ReadNotifications', ['notifications' => $readNotifications]);
        }
    }

    /**
     * Mark a notification as unread.
     *
     * @param  int  $notificationId
     * @return void
     */
    public function markNotificationAsUnread(Request $request,  $notificationId)
    {
        // Retrieve the authenticated user
        $user = $request->user();
        // Find the notification by ID and mark it as unread
        $notification = $user->notifications()->findOrFail($notificationId);
        $notification->markAsUnread();
    }

    /**
     * Mark a notification as read.
     *
     * @param  int  $notificationId
     * @return void
     */
    public function markNotificationAsRead(Request $request,  $notificationId)
    {
        // Retrieve the authenticated user
        $user = $request->user();
        // Find the notification by ID and mark it as read
        $notification = $user->notifications()->findOrFail($notificationId);
        $notification->markAsRead();
        $this->createActivityLog("Read Notification", 'Marked Notification as Read', 'web', 'Informational', 200);
        //return back
        return redirect()->back()->with("success", "Updated notification successfully");
    }
}
