<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    //
    public function uploadProfileImage(Request $request)
    {
        $request->validate(['avatar' => 'required']);

        $user_id =  $request->user()->id;
        //store user image
        $file = $request->file('avatar');
        $filename =    Str::random(10)."". $file->getClientOriginalName();
        $path = $file->storeAs('public/user_images', $filename);
        $path_url =  url(str_replace('public', '/storage', $path));
        //update  user profile
        User::where("id", $user_id)->update(['user_image'=>$path_url]);
        return response(['message' => 'success', 'data' => ['profile_image' => $path_url]], 201);
    }

    public function uploadCoverProductImage(Request $request){
        $request->validate(['cover_image' => 'required']);


        $destination_path = 'public/products/';
        $cover_image_upload = $request->cover_image->store($destination_path);
      
        if (!$cover_image_upload) {
            return response(['message' => 'failure', 'error' => 'Failed to upload cover image'], 400);
        }

        // Return only the ID name
        $cover_image =  str_replace($destination_path . '/', '', $cover_image_upload);
        return response(['message' => 'success', 'data' => ['cover_image' => $cover_image]], 201);

    }

    public function uploadProductImages(Request $request){
        $request->validate(['image_one' => 'required', 'image_two' => 'required', 'image_three' => 'required', 'image_four' => 'required']);

        $destination_path = 'public/products/';
        $product_images_upload_one = $request->image_one->store($destination_path);
        $product_images_upload_two = $request->image_two->store($destination_path);
        $product_images_upload_three = $request->image_three->store($destination_path);
        $product_images_upload_four = $request->image_four->store($destination_path);

      
        if (!$product_images_upload_one || !$product_images_upload_two || !$product_images_upload_three || !$product_images_upload_four) {
            return response(['message' => 'failure', 'error' => 'Failed to upload product images'], 400);
        }
        //return only image names
        $product_images = [
            'image_one' => str_replace($destination_path . '/', '', $product_images_upload_one),
            'image_two' => str_replace($destination_path . '/', '', $product_images_upload_two),
            'image_three' => str_replace($destination_path . '/', '', $product_images_upload_three),
            'image_four' => str_replace($destination_path . '/', '', $product_images_upload_four),
        ];


        return response(['message' => 'success', 'data' => ['product_images' => $product_images]], 201);

    }
}
