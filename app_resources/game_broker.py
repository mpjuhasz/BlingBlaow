from app_resources.player_handler import players


class Game:
    def __init__(self):
        self.round_data = dict()

    def get_scores(self):
        leaderboard = list()
        for player in players.player_list:
            player_score = 0
            for round_id in self.round_data.keys():
                if player in self.round_data[round_id].keys():
                    if self.round_data[round_id][player] != 0:
                        player_score += int(round(100 + (60000 - self.round_data[round_id][player])/600))
            leaderboard.append({'userName': player, 'score': player_score})

        sorted_leaderboard = sorted(leaderboard, key=lambda k: k['score'], reverse=True)

        return sorted_leaderboard


class Round:
    def __init__(self):
        self.timestamp = 0
        self.users = list()
        self.num_answers = 0
        self.song_id = ''
        self.user_scores = dict()

    def set_user(self, user):
        self.users.append(user)

    def is_correct_round(self, timestamp):
        return timestamp == self.timestamp

    def acceptable_answer(self, timestamp):
        return timestamp <= self.timestamp + 60000

    def is_user(self, user):
        return user in self.users

    def is_round_complete(self, timestamp):
        if self.num_answers == len(self.users) or timestamp > self.timestamp + 60000:
            return True
        return False

    def new_round(self, timestamp, song_id):
        self.song_id = song_id
        self.timestamp = timestamp
        self.users = players.player_list
        self.num_answers = 0
        self.user_scores = dict()

    def write_round_data(self, game):
        game.round_data[self.timestamp] = self.user_scores
