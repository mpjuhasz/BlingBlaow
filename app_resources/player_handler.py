from flask import request, Response, jsonify
from flask_restful import Resource


class Playersclass:
    def __init__(self):
        self.player_list = list()

    def set(self, player):
        if player not in self.player_list:
            self.player_list.append(player)
            return 'Player set', 200
        else:
            return 'ERROR: name already in use', 400

    def clear(self):
        self.player_list = list()


players = Playersclass()


class SetPlayer(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        user_id = json['userName']
        message, code = players.set(user_id)
        return message, code


class Players(Resource):
    @staticmethod
    def get():
        return players.player_list

    @staticmethod
    def delete():
        players.clear()
        return 'Player list cleared'
