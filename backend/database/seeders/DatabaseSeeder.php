<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfile;

class DatabaseSeeder extends Seeder {
  function run() {

	// User + profile
	$user = User::create([
		'email' => 'inna@mail.com',
		'password' => '12345678',
	]);

	UserProfile::create([
		'user_id' => $user->id, 
		'bio' => 'Kulinarik-Liebhaberin, die gerne neue Rezepte ausprobiert. Ich koche mit Leidenschaft und genieße jeden Moment in der Küche!',
		'avatar' => 'avatars/1/aiony-haust-3TLl_97HNJo-unsplash.jpg',
	]);

	// Comments
	// $comments = [
	// 	[
	// 		'text' => 'This recipe is amazing! My family loved it.',
	// 		'recipe_id' => 1,
	// 		'user_id' => 1,
	// 	],
	// 	[
	// 		'text' => 'I tried this yesterday, and it turned out great. Thanks!',
	// 		'recipe_id' => 2,
	// 		'user_id' => 2,
	// 	],
	// 	[
	// 		'text' => 'Added some extra spices, and it was perfect. Highly recommend!',
	// 		'recipe_id' => 3,
	// 		'user_id' => 3,
	// 	],
	// 	[
	// 		'text' => 'Not bad, but I think it needs more salt.',
	// 		'recipe_id' => 4,
	// 		'user_id' => 4,
	// 	],
	// 	[
	// 		'text' => 'This is now my go-to recipe for breakfast. Thanks for sharing!',
	// 		'recipe_id' => 5,
	// 		'user_id' => 5,
	// 	],
	// 	[
	// 		'text' => 'I had trouble finding one ingredient, but it still tasted great.',
	// 		'recipe_id' => 6,
	// 		'user_id' => 1,
	// 	],
	// 	[
	// 		'text' => 'Delicious and easy to make. Perfect for a quick meal.',
	// 		'recipe_id' => 7,
	// 		'user_id' => 2,
	// 	],
	// 	[
	// 		'text' => 'I doubled the recipe and it was still perfect. Thanks!',
	// 		'recipe_id' => 8,
	// 		'user_id' => 3,
	// 	],
	// 	[
	// 		'text' => 'This dish reminded me of my childhood. So nostalgic!',
	// 		'recipe_id' => 9,
	// 		'user_id' => 4,
	// 	],
	// 	[
	// 		'text' => 'A bit too sweet for my taste, but my kids loved it.',
	// 		'recipe_id' => 10,
	// 		'user_id' => 5,
	// 	],
	// ];

	// foreach ($comments as $comment) {
	// 	Comment::create($comment);
	// }

	// Tags
	$tags = [
		'Gesund',
		'Schnell',
		'Familie',
		'Kinder',
		'Airfryer',
		'One-Pot-Gerichte',
		'Einfach',
		'Fingerfood',
		'Gourmetküche',
		'Budgetfreundlich',
		'Street Food',
		'Grillen',
	];

	foreach ($tags as $tagName) {
		Tag::create(['name' => $tagName]);
	}

	// Categories
	$categories = [
		'Vorspeise',
		'Hauptspeise',
		'Desserts',
		'Snacks',
		'Getränke',
		'Mittagessen',
		'Abendessen',
		'Frühstück',
		'Vegan',
		'Vegetarisch',
		'Beilagen',
		'Salate',
		'Saucen & Dips',
		'Backwaren',
		'Glutenfrei',
		'Laktosefrei',
		'Paleo',
		'Keto',
		'Low Carb',
		'High-Protein',
		'Zukerfrei',
		'Festtagsküche',
	];

	foreach ($categories as $categoryName) {
		Category::create(['name' => $categoryName]);
	}
  }
}
