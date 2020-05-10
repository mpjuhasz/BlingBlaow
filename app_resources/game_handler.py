from flask import request, Response
from flask_restful import Resource
from app_resources.song_broker import *
from app_resources.game_broker import Game, Round
import time

SB = SongBroker()
current_game = Game()
current_round = Round()


def get_timestamp():
    return int(round(time.time()*1000))


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
                outcome = SB(user_id, answer)
                current_round.num_answers += 1
                if outcome:
                    current_round.user_scores[user_id] = submission_time - timestamp
                else:
                    current_round.user_scores[user_id] = 0
                resp = Response(outcome)
            else:
                resp = Response("Answer was too late")
        else:
            resp = Response("Answer is not for the current round")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


class NewRound(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        song_id = SB.set_song(json['song'])
        current_round.new_round(get_timestamp(), song_id)
        resp = Response("Song set")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


class CurrentRound(Resource):
    @staticmethod
    def get():
        song_id = current_round.song_id if '?' not in current_round.song_id else current_round.song_id.split('?')[0]
        resp = Response({'songId': song_id, 'timestamp': current_round.timestamp})
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


class RoundSummary(Resource):
    @staticmethod
    def get():
        request_time = get_timestamp()
        is_complete = current_round.is_round_complete(request_time)
        if is_complete:
            current_round.write_round_data(current_game)
        resp = Response({'complete': is_complete, 'summary': current_round.user_scores})
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


class Leaderboard(Resource):
    @staticmethod
    def get():
        resp = Response(current_game.get_scores())
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
