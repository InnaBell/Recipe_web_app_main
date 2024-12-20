<?php

namespace App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Image;

class UploadsController {
   function index(Request $request) {
        $request->validate([
            'image_id' => ['required', 'integer', 'exists:images,id'],
        ], [
            'image_id.required' => 'The image_id query parameter is required.',
            'image_id.integer' => 'The image_id must be an integer.',
            'image_id.exists' => 'The specified image_id does not exist.',
        ]);

        $image = Image::findOrFail($request->query('image_id'));
        return response()->json($image, 200);
    }

    function create(Request $request) {
        $user = Auth::user();

        $request->validate([
            'files.*' => ['required', 'file', 'max:5120'], // max 5MB
            'files' => ['required', 'array', 'max:5'],
        ], [
            'files.*.max' => 'Each file may not exceed 5 MB',
            'files.max' => 'You may not upload more than 5 files',
        ]);

        $title = $request->post('title');

        if (empty($title) || strlen($title) > 255) {
            return response()->json(['message' => 'The title field is invalid.'], 422);
        }

        $uploadedImages = [];

        foreach ($request->file('files') as $file) {
            $originalFilename = $file->getClientOriginalName();
            $filename = pathinfo($originalFilename, PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();

            $uniqueFilename = $filename . '_' . Str::random(16) . '.' . $extension;
            $pathname = 'uploads/' . $user->id . '/' . $uniqueFilename;

            Storage::putFileAs(
                'uploads/' . $user->id,
                $file,
                $uniqueFilename
            );

            $image = Image::create([
                'title' => $title, 
                'pathname' => $pathname,
                'user_id' => $user->id,
            ]);

            $uploadedImages[] = $image;
        }

        return response()->json(['images' => $uploadedImages], 201);
    }

    function destroy(Request $request, $id) {
        $user = Auth::user();
        $image = Image::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $pathname = $image->pathname;

        if (Storage::exists($pathname)) {
            Storage::delete($pathname);
        }

        $image->delete();
        return response()->json(['deleted' => $pathname, 'id' => $id], 200);
    }
}