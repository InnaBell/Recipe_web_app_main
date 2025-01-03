<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	function up() {
	Schema::create('user_profiles', function (Blueprint $table) {
		$table->id();
		$table->foreignId('user_id')->constrained()->onDelete('cascade');
		$table->string('avatar')->nullable();
		$table->string('bio')->nullable();
		$table->timestamps();
	});
	}

	function down() {
	Schema::dropIfExists('user_profiles');
	}
};

