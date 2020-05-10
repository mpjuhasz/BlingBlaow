from flask import request, Response
from flask_restful import Resource

player_list = list()


class SetPlayer(Resource):
    @staticmethod
    def post():
        json = request.get_json(force=True)
        user_id = json['userName']
        player_list.append(user_id)
        resp = Response('User set')
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


class GetPlayers(Resource):
    @staticmethod
    def get():
        return player_list
