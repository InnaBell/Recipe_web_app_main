<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    Schema::create('recipes', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->json('content');
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->foreignId('image_id')->nullable()->constrained('images')->cascadeOnDelete();
	  $table->integer('servings')->nullable();
	  $table->integer('cooking_time')->nullable();
      $table->timestamp('created_at');
      $table->timestamp('updated_at');
  });
}

  function down() {
    Schema::dropIfExists('recipes');
  }
};
