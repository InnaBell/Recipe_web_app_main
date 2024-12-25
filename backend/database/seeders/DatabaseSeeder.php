<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\User;
use App\Models\Image;
use App\Models\UserProfile;

class DatabaseSeeder extends Seeder {
  function run() {

	// User + profile
    ////////////////////////////////////////////////////////////////////////////
	$user = User::create([
		'email' => 'inna@mail.com',
		'password' => '12345678',
	]);

	UserProfile::create([
		'user_id' => $user->id, // Connect user_id to user
		'bio' => 'Kulinarik-Liebhaberin, die gerne neue Rezepte ausprobiert. Ich koche mit Leidenschaft und genieße jeden Moment in der Küche!',
		'avatar' => 'avatars/1/aiony-haust-3TLl_97HNJo-unsplash.jpg',
	]);

  
	  // articles
	  ////////////////////////////////////////////////////////////////////////////
	//   for ($i = 0; $i < 10; $i++) {
	// 	Article::create([
	// 	  'title' => fake()->word(),
	// 	  'content' => fake()->sentence(),
	// 	  'user_id' => 1,
	// 	]);
	//   }
  
	  // comments
	  ////////////////////////////////////////////////////////////////////////////////
	//   for ($i = 0; $i < 20; $i++) {
	// 	Comment::create([
	// 	  'text' => fake()->sentence(3),
	// 	  'article_id' => random_int(1, 10),
	// 	  'user_id' => random_int(1, 3),
	// 	]);
	//   }
  
	//   // tags
	//   ////////////////////////////////////////////////////////////////////////////////
	//   for ($i = 0; $i < 10; $i++) {
	// 	Tag::create(['name' => fake()->word()]);
	//   }
  }
}
