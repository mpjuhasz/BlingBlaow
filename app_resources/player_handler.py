from flask import request
from flask_restful import Resource

player_list = list()


class SetPlayer(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        user_id = json['userName']
        player_list.append(user_id)
        return 'User set'


class GetPlayers(Resource):
    @staticmethod
    def get():
        return player_list
