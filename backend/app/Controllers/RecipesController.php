<?php

namespace App\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipesController
{
    function index(Request $request)
    {

        $query = Recipe::with(['tags', 'coverImage', 'categories']);

		// filter
        $id = $request->input('id');
        if ($id)
            return $query->where('id', $id)->firstOrFail();

        $title = $request->input('title');
        if ($title)
            $query->where('title', 'like', "%$title%");

        $userId = $request->input('user_id');
        if ($userId)
            $query->where('user_id', $userId);

        $tagIds = $request->input('tag_ids');
        if ($tagIds) {
            $tagIds = explode(',', $tagIds);
            $query->whereHas(
                'tags',
                fn($q) => $q->whereIn('tag_id', $tagIds),
                '>=',
                count($tagIds)
            );
        }

        $orderBy = $request->input('order_by', 'created_at');
        $orderDir = $request->input('order_dir', 'desc'); // desc - new first
        $query->orderBy($orderBy, $orderDir);

        // limit, offset
        $limit = $request->input('limit');
        $offset = $request->input('offset');
        if ($limit)
            $query->limit($limit);
        if ($offset)
            $query->offset($offset);

		// filter by categories
		$categoryIds = $request->input('category_ids');
		if ($categoryIds) {
		$categoryIds = explode(',', $categoryIds);
		$query->whereHas(
		'categories',
		fn($q) => $q->whereIn('category_id', $categoryIds)
	);
}

        return $query->get();
    }

    function create(Request $request)
    {
        // Convert content JSON object to a string if it's an array
        if (is_array($request->input('content'))) {
            $request->merge([
                'content' => json_encode($request->input('content')),
            ]);
        }

        // Validate recipe
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'], // JSON
            'image_id' => ['nullable', 'integer', 'exists:images,id'],
			'servings' => ['nullable', 'integer', 'min:1'],
			'cooking_time' => ['nullable', 'integer', 'min:1'],
        ], [
            'title.required' => 'The title field is required.',
            'content.required' => 'The content field is required.',
            'content.json' => 'The content must be valid JSON.',
            'image_id.exists' => 'Invalid cover image ID.',
			'servings.integer' => 'The servings field must be an integer.',
			'cooking_time.integer' => 'The cooking_time field must be an integer.',
        ]);

        // Validate img
        if (!empty($validatedData['image_id'])) {
            $coverImage = Auth::user()->images()->find($validatedData['image_id']);
            if (!$coverImage) {
                return response()->json(['error' => 'You do not have permission to use this cover image.'], 403);
            }
        }

        $recipe = Auth::user()->recipes()->create([
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
            'image_id' => $validatedData['image_id'] ?? null,
			'servings' => $validatedData['servings'] ?? null,
			'cooking_time' => $validatedData['cooking_time'] ?? null,
        ]);

		if ($request->has('category_ids')) {
			$recipe->categories()->sync($request->input('category_ids'));
		}
		
		$recipe->load(['tags', 'coverImage', 'categories']);

        return response()->json(['recipe' => $recipe], 201);
    }

    function update(Request $request)
    {
        $id = $request->input('id');
        $recipe = Auth::user()->recipes()->findOrFail($id);

        if (is_array($request->input('content'))) {
            $request->merge([
                'content' => json_encode($request->input('content')),
            ]);
        }

        $validatedData = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'content' => ['sometimes', 'string'],
            'image_id' => ['nullable', 'integer', 'exists:images,id'],
			'servings' => ['nullable', 'integer', 'min:1'],
			'cooking_time' => ['nullable', 'integer', 'min:1'],
        ], [
            'title.max' => 'The title must not exceed 255 characters.',
            'content.string' => 'The content must be a valid string.',
            'image_id.exists' => 'Invalid cover image ID.',
			'servings.integer' => 'The servings field must be an integer.',
			'cooking_time.integer' => 'The cooking_time field must be an integer.',
        ]);

        if (!empty($validatedData['image_id'])) {
            $coverImage = Auth::user()->images()->find($validatedData['image_id']);
            if (!$coverImage) {
                return response()->json(['error' => 'You do not have permission to use this cover image.'], 403);
            }
        }

        $recipe->update([
            'title' => $validatedData['title'] ?? $recipe->title,
            'content' => $validatedData['content'] ?? $recipe->content,
            'image_id' => $validatedData['image_id'] ?? $recipe->image_id,
			'servings' => $validatedData['servings'] ?? $recipe->servings,
			'cooking_time' => $validatedData['cooking_time'] ?? $recipe->cooking_time
        ]);

		if ($request->has('category_ids')) {
			$recipe->categories()->sync($request->input('category_ids'));
		}
		
		$recipe->load(['tags', 'coverImage', 'categories']);

        return response()->json(['recipe' => $recipe], 200);
    }

    function destroy(Request $request)
    {
        $id = $request->input('id');
        $recipe = Auth::user()->recipes()->findOrFail($id);
        $recipe->delete();
        return $recipe;
    }
}