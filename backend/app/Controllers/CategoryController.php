<?php

namespace App\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController
{
	public function index()
	{
		return Category::all();
	}

	public function create(Request $request)
	{
		$validated = $request->validate([
			'name' => 'required|unique:categories|max:255',
			'avatar' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
		]);

		if ($request->hasFile('avatar')) {
			$file = $request->file('avatar');
			$originalFilename = $file->getClientOriginalName();
			$filename = pathinfo($originalFilename, PATHINFO_FILENAME);
			$extension = $file->getClientOriginalExtension();
	
			$uniqueFilename = $filename . '_' . Str::random(16) . '.' . $extension;
			$pathname = 'categories/' . $uniqueFilename;
	
			Storage::putFileAs(
				'categories',
				$file,
				$uniqueFilename
			);
	
			$validated['avatar'] = $pathname;
		}
	
		$category = Category::create($validated);
	
		return response()->json($category, 201);
	}

	public function assign(Request $request)
	{
		$recipeId = $request->input('recipe_id');
		$categoryIds = $request->input('category_ids');
		$recipe = Auth::user()->recipes()->findOrFail($recipeId);
		$recipe->categories()->sync($categoryIds);
		$recipe->save();
		return $recipe->fresh();
	}

	public function delete($id) {
    $category = Category::findOrFail($id);

    if ($category->avatar && Storage::disk('public')->exists($category->avatar)) {
        Storage::disk('public')->delete($category->avatar);
    }

    $category->delete();

    return response()->json(['message' => 'Category deleted'], 200);
}

	public function recipesByCategory($categoryId) {
		$category = Category::findOrFail($categoryId);
		$recipes = $category->recipes;
		return response()->json($recipes, 200);
	}
}
