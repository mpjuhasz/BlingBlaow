import requests
from nltk.stem.snowball import SnowballStemmer
from app_resources.resources import contractions


url = 'https://api.spotify.com/v1/tracks/'
stemmer = SnowballStemmer('english')
auth_token = 'BQBPRJ0_9qECERL6pxVcFlju368hX0nIBQ55lNPgcBvtCLltv28FnhoMlGsoEW11rJqz4v5h6VB-9-mV9uaNWRBh4otzvf0neU4HzylePMshsB1Gh_As48wVWaurtX697Gwm0XNLxk3096EQREtYxKMtD9UNkn3LsPQAWfJfLvXg11g2qTAclRw'

def song_dealer(spotify_url):
    song_id = spotify_url.split('/')[-1]
    request_url = url + song_id
    auth = 'Bearer ' + auth_token
    song_data = requests.get(request_url,
                             headers={'Authorization': auth})
    print(song_data)
    return song_data.json()['name'], int(song_data.json()['album']['release_date'][:4])


def preprocess(song_string):
    stemmed_song = str(stemmer.stem(song_string)).lower()
    if '(feat' in stemmed_song:
        stemmed_song = stemmed_song[:stemmed_song.find('(feat')-1]
    if '- remastered' in stemmed_song:
        stemmed_song = stemmed_song[:stemmed_song.find('- remastered')-1]
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
        self.current_song_year = ''

    def __call__(self, user_id, user_answer, game_mode):
        if game_mode == 'title':
            return preprocess(user_answer) == preprocess(self.current_song)
        elif game_mode == 'year':
            return user_answer == self.current_song_year
        else:
            return 'Wrong game mode', 400

    def set_song(self, song_url):
        self.url = song_url
        self.current_song, self.current_song_year = song_dealer(song_url)
        return song_url.split('/')[-1]
