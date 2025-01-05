<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Recipe extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'content', // JSON
        'user_id',
        'image_id',
		'servings',
		'cooking_time', 
    ];

    protected $casts = [
        'content' => 'array', // Cast content as array (JSON)
		'servings' => 'integer',
		'cooking_time' => 'integer',
    ];

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

	public function favourites() {
		return $this->hasMany(Favourite::class);
	}

    public function coverImage() {
        return $this->belongsTo(Image::class, 'image_id');
    }

	public function categories() {
		return $this->belongsToMany(Category::class);
	}

	public function comments() {
		return $this->hasMany(Comment::class);
	}

    // Remove 'images' from $with if the relationship is unnecessary
    protected $with = ['tags', 'coverImage', 'categories'];

    static function validate(Request $request) {
        $post = $request->method() === 'POST';
        return $request->validate([
            'title' => [$post ? 'required' : 'sometimes', 'min:1', 'max:200'],
            'content' => [$post ? 'required' : 'sometimes', 'json'],
            'image_id' => ['nullable', 'exists:images,id'],
			'servings' => ['nullable', 'integer', 'min:1'],
			'cooking_time' => ['nullable', 'integer', 'min:1'],
        ]);
    }
}