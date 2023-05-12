<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\Participant;
use App\Models\Draw;


class apiController extends Controller
{
    public function storeGame(Request $request){
        $product = new Game;
        $product->name = $request->name;
        $product->user_id = $request->user_id;
        $product->save();

        if ($product->save()) {
            return response()->json(['success' => 'Game created successfully'], 201);
        } else {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function getAllGames($id){
        $games = Game::where('user_id', $id)->get();
        if ($games->count() > 0) {
            return response()->json($games, 200);
        } else {
            return response()->json(['error' => 'No games found for the given user ID'], 404);
        }
    }

    public function deleteGame($id) {
        $game = Game::find($id);
        if ($game) {
            $game->delete();
            return response()->json(['success' => 'Game deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Game not found'], 404);
        }
    }

    public function storeParticipant(Request $request){
        $Participant = new Participant;
        $Participant->name = $request->name;
        $Participant->drawn = $request->drawn;
        $Participant->user_id = $request->user_id;
        $Participant->game_id = $request->game_id;
        $Participant->save();

        if ($Participant->save()) {
            return response()->json(['success' => 'Participant created successfully'], 201);
        } else {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }


    public function getAllParticipants($id, $game_id){
        $participants = Participant::where('user_id', $id)
                                    ->where('game_id', $game_id)
                                    ->get();
    
        if ($participants->count() > 0) {
            return response()->json($participants, 200);
        } else {
            return response()->json(['error' => 'No participants found for the given user ID and game ID'], 404);
        }
    }

    public function deleteParticipant($id, $game_id) {
        $Participant = Participant::where('id', $id)
                            ->where('game_id', $game_id)
                            ->first();
        if ($Participant) {
            $Participant->delete();
            return response()->json(['success' => 'Participant deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'Participant not found'], 404);
        }
    }

    public function draw($id, $game_id) {
        $this->checkParticipants($id, $game_id);
        $participant = Participant::where('drawn', 0)
            ->where('user_id', $id)
            ->where('game_id', $game_id)
            ->inRandomOrder()
            ->limit(1)
            ->get(['id','name']);
    
        if ($participant->count() > 0) {
            $this->updateParticipantStatus($participant[0]->id);
            $this->storeDraw($participant[0]->name, $id, $game_id);
            return response()->json($participant, 200);
        } else {
            return response()->json(['error' => 'No participants found for the given user ID and game ID'], 404);
        }
    }
    
    private function updateParticipantStatus($id){
        Participant::where('id', $id)
            ->update(['drawn' => 1]);
    }
    
    private function storeDraw($name, $id, $game_id){
        Draw::create([
            'name' => $name,
            'user_id' => $id,
            'game_id' => $game_id
        ]);
    }

    private function checkParticipants($id, $game_id){
        $count = Participant::where('drawn', 0)
                            ->where('user_id', $id)
                            ->where('game_id', $game_id)
                            ->count();
        if ($count == 0) {
            Participant::where('drawn', 1)
                        ->where('user_id', $id)
                        ->where('game_id', $game_id)
                        ->update(['drawn' => 0]);
        }
    }


    public function getDraws($id, $game_id){
        $draws = Draw::where('user_id', $id)
                    ->where('game_id', $game_id)
                    ->get();
    
        if ($draws->count() > 0) {
            return response()->json($draws, 200);
        } else {
            return response()->json(['error' => 'No draws found for the given user ID and game ID'], 404);
        }
    }
}
