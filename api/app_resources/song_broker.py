import requests
from nltk.stem.snowball import SnowballStemmer
from app_resources.resources import contractions


url = 'https://api.spotify.com/v1/tracks/'
stemmer = SnowballStemmer('english')
auth_token = 'BQBKnNwd5r_EFZHbqQMXzd7xK3_dA3WIDSZLF2HLn4r5EDwRhiwLs8fcf4DdsMEGI5mkwIsKR_3Y9qqBEmo_JC9-bV9ACnUzoIi3WN8brCcyZbLvfh2ZqiUc51OVTXtmqcCqg1VyIUds1i6KKcsyr-H4kVQuwQWYAeHVPmQpxVIGkXJIrOh2nqQ'


def song_dealer(spotify_url):
    song_id = spotify_url.split('/')[-1]
    request_url = url + song_id
    auth = 'Bearer ' + auth_token
    song_data = requests.get(request_url,
                             headers={'Authorization': auth})
    print(song_data)
    return song_data.json()['name']


def preprocess(song_string):
    stemmed_song = stemmer.stem(song_string)
    processed_song = ''
    for word in stemmed_song.split():
        if word in contractions.keys():
            processed_song += contractions[word]
        else:
            processed_song += word
        processed_song += ' '
    processed_song = processed_song.lower()[:-1]
    return processed_song


class SongBroker:
    def __init__(self):
        self.url = ''
        self.current_song = ''

    def __call__(self, user_id, user_answer):
        if preprocess(user_answer) == preprocess(self.current_song):
            return True
        else:
            return False

    def set_song(self, song_url):
        self.url = song_url
        self.current_song = song_dealer(song_url)
        return song_url.split('/')[-1]
