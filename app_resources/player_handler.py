from flask import request, Response, jsonify
from flask_restful import Resource

class playersClass:
    def __init__(self):
        self.player_list = list()

    def set(self, player):
        self.player_list.append(player)

    def clear(self):
        self.player_list = list()


players = playersClass()


class SetPlayer(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        user_id = json['userName']
        players.set(user_id)
        return 'User set'


class Players(Resource):
    @staticmethod
    def get():
        return players.player_list

    @staticmethod
    def delete():
        players.clear()
        return 'Player list cleared'
