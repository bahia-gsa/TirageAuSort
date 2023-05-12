<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDrawsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('draws', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
            $table->unsignedBigInteger('user_id'); // Add this line to create the user_id column
            $table->unsignedBigInteger('game_id'); // Add this line to create the user_id column
            $table->foreign('user_id')->references('id')->on('users'); // Update the foreign key column name to 'user_id'
            $table->foreign('game_id')->references('id')->on('games'); // Update the foreign key column name to 'game_id'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('draws');
    }
}
