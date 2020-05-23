from flask import Flask, request
from flask_restful import Api, Resource
from app_resources.game_handler import *
from app_resources.player_handler import *
import argparse

app = Flask('BlingBlaow')
api = Api(app)


class GetHandler(Resource):
    @staticmethod
    def get():
        return 'TASTES GOOD STILL'


api.add_resource(NewRound, "/game/newRound")
api.add_resource(GetHandler, "/get")
api.add_resource(SubmitAnswer, "/game/submitAnswer")
api.add_resource(CurrentRound, "/game/currentRound")
api.add_resource(RoundSummary, "/game/roundSummary")
api.add_resource(SetGameMode, "/game/setGameMode")
api.add_resource(ClearGame, "/game/clear")
api.add_resource(CorrectAnswer, "/game/getAnswer")
api.add_resource(Leaderboard, "/leaderboard")
api.add_resource(SetPlayer, "/players/set")
api.add_resource(Players, "/players/all")


@app.after_request
def apply_cors(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--prod', action='store_true')

if parser.parse_args().prod:
    app.run(host='0.0.0.0', debug=False, port=8888, ssl_context=('/root/www/certificate.pem', '/root/www/key.pem'))
else:
    app.run(host='0.0.0.0', debug=False, port=8888)


# if __name__ == '__main__':
#     current_song = sys.argv[1]
#     answer = sys.argv[2]
#     SB = SongBroker()
#
#     SB.set_song(current_song)
#     outcome = SB(0, answer)
#     print(outcome)
