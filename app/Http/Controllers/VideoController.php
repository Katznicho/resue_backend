<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\LogTrait;

class VideoController extends Controller
{
    use LogTrait;
    private $isAdmin = false;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
             $role_name = $request->user()->role->name;
                if($role_name == config("constants.ADMIN")){
                    $this->isAdmin = true;
                }
                else{
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

        $videos= Data::when(!$this->isAdmin, function ($query) use ($request) {
            return $query->where('user_id', auth()->user()->id);
        })
        ->where('type', 'video')
        ->with('user','baby')
        ->get()
        ->map(function ($video) {
            return [
                'id' => $video->id,
                'title' => $video->title,
                'description' => $video->description,
                'baby'=>$video->baby,
                'user'=>$video->baby->user ?? null,
                'filepath'=>url(str_replace('public', '/storage', $video->filepath)),
                // 'filepath' =>asset("storage/data/{$video->filename}"),
                'duration'=>$video->duration,
                'size'=>$video->size,
                'created_at'=>$video->created_at,
                'updated_at'=>$video->updated_at

            ];
        });
        return Inertia::render('Videos/Index', ['videos' =>$videos ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $video = Data::find($id);

        return Inertia::render('Videos/Show', [
            'video' => [
                'id' => $video->id,
                'title' => $video->title,
                'description' => $video->description,
                'baby'=>$video->baby,
                'user'=>$video->baby->user,
                'filepath'=>$video->filepath,
                'duration'=>$video->duration,
                'size'=>$video->size,
                'filepath'=>$video->filepath,
                'created_at'=>$video->created_at,
                'updated_at'=>$video->updated_at
            ]
        ]);
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
         $data = Data::find($id);
         $data->delete();

        return redirect()->route('videos.index')->with('success', 'Video deleted successfully');
    }
}
