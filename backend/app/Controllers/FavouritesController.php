<?php

namespace App\Controllers;

use App\Models\Favourite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavouritesController {

	// Add or remove recipe from fav
	public function toggle(Request $request) {
		$user = Auth::user();
		$recipeId = $request->input('recipe_id');

		$favourite = Favourite::where('user_id', $user->id)
							->where('recipe_id', $recipeId)
							->first();

		if ($favourite) {
			$favourite->delete();
			return response()->json(['message' => 'Recipe removed from favourites'], 200);
		} else {
			$favourite = Favourite::create([
				'user_id' => $user->id,
				'recipe_id' => $recipeId,
			]);
			return response()->json(['message' => 'Recipe added to favourites', 'favourite' => $favourite], 201);
		}
	}

	public function index(Request $request) {
	$user = Auth::user();

	// Get all fav for the user
	$favourites = Favourite::where('user_id', $user->id)
		 ->with(['recipe' => function($query) {
			$query->select('id', 'title', 'content', 'image_id', 'image_id', 'servings', 'cooking_time'); 
		}])
		->get();

	return response()->json([
		'user_id' => $user->id,
		'favourites' => $favourites,
	], 200);
}

	// Get count of fav for a recipe
	public function countFavouritesForRecipe(Request $request, $recipeId) {
		$count = Favourite::where('recipe_id', $recipeId)->count();
		return response()->json(['recipe_id' => $recipeId, 'favourites_count' => $count], 200);
	}
}


