<?php

namespace App\Controllers;

use App\Models\Image;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserProfileController {
	function index(Request $request) {
		$user = Auth::user(); 
		$profile = UserProfile::where('user_id', $user->id)->firstOrFail();
		return response()->json($profile);
	}

	function update(Request $request) {
		$user = Auth::user();
		$profile = UserProfile::where('user_id', $user->id)->firstOrFail();

		$validatedData = UserProfile::validate($request);

		if (isset($validatedData['bio'])) {
			$profile->bio = $validatedData['bio'];
		}

		if ($request->hasFile('avatar')) {
			if ($profile->avatar && Storage::disk('public')->exists($profile->avatar)) {
				Storage::disk('public')->delete($profile->avatar);
			}

			$file = $request->file('avatar');
			$originalFilename = $file->getClientOriginalName();
			$filename = pathinfo($originalFilename, PATHINFO_FILENAME);
			$extension = $file->getClientOriginalExtension();

			$uniqueFilename = $filename . '_' . Str::random(16) . '.' . $extension;
			$pathname = 'avatars/' . $user->id . '/' . $uniqueFilename;

			Storage::putFileAs(
				'avatars/' . $user->id,
				$file,
				$uniqueFilename
			);

			$profile->avatar = $pathname;
		}

		$profile->save();

		return response()->json($profile);
	}

	// Profile Image delete
	function destroy() {
		$user = Auth::user();
		$profile = UserProfile::where('user_id', $user->id)->firstOrFail();

		if ($profile->avatar && Storage::disk('public')->exists($profile->avatar)) {
			Storage::disk('public')->delete($profile->avatar);
			$profile->avatar = null;
			$profile->save();

			return response()->json(['message' => 'Avatar deleted successfully.'], 200);
		}

		return response()->json(['message' => 'No avatar to delete.'], 404);
	}
}
