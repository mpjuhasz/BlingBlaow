from flask import request, Response, jsonify
from flask_restful import Resource
from .song_broker import *
from .game_broker import Game, Round
from .resources import game_modes
import time


SB = SongBroker()
current_game = Game()
current_round = Round()


def get_timestamp():
    return int(round(time.time()*1000))


class SetGameMode(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        game_mode = json['gameMode']
        if game_mode in game_modes:
            Game.game_mode = game_mode
            return 'Game mode set', 200
        else:
            return 'Incorrect game mode', 400


class SubmitAnswer(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        submission_time = get_timestamp()
        user_id = json['userName']
        answer = json['guess']
        timestamp = json['timestamp']
        if current_round.is_correct_round(timestamp):
            if current_round.acceptable_answer(submission_time):
                outcome = SB(user_id, answer, current_game.game_mode)
                current_round.num_answers += 1
                if outcome:
                    current_round.user_scores[user_id] = submission_time - timestamp
                else:
                    current_round.user_scores[user_id] = 0
                return outcome, 200
            else:
                return "Answer was too late", 400
        else:
            return "Answer is not for the current round", 400


class NewRound(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        song_id = SB.set_song(json['song'], json['correctAnswer'])
        current_round.new_round(get_timestamp(), song_id)
        return "Song set"


class CurrentRound(Resource):
    @staticmethod
    def get():
        request_time = get_timestamp()
        is_complete = current_round.is_round_complete(request_time)
        if is_complete:
            current_round.write_round_data(current_game)
        song_id = current_round.song_id if '?' not in current_round.song_id else current_round.song_id.split('?')[0]
        return {'songId': song_id, 'timestamp': current_round.timestamp, 'correctAnswer': SB.correct_answer.title()}


class RoundSummary(Resource):
    @staticmethod
    def get():
        request_time = get_timestamp()
        is_complete = current_round.is_round_complete(request_time)
        return {'complete': is_complete, 'summary': current_round.user_scores}


class Leaderboard(Resource):
    @staticmethod
    def get():
        return current_game.get_scores()


class ClearGame(Resource):
    @staticmethod
    def delete():
        current_game.clear_game()
        return 'Game cleared', 200


class CorrectAnswer(Resource):
    @staticmethod
    def get():
        return SB.correct_answer, 200
