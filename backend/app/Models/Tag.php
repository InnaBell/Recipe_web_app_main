<?php

namespace App\Models;

use Bootstrap\Column;
use Bootstrap\Model;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model {
  use HasFactory;

  #[Column] public int $id;
  #[Column] public string $name;
  #[Column] public string $created_at;
  #[Column] public string $updated_at;

  public function recipes() {
    return $this->belongsToMany(Recipe::class); // many-to-many
  }

  static function validate(Request $request) {
    return $request->validate([
      'name' => ['required', 'min:1', 'max: 99', 'unique:tags,name'],
    ]);
  }
}
