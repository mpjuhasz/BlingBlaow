import {
    CHANGE_GUESS,
    SUBMIT_GUESS,
    CLEAR_GUESS,
    CHANGE_TOKEN,
    CHANGE_NICKNAME,
    SUBMIT_NICKNAME,
    NEW_ROUND, COUNTDOWN, CLEAR_ROUND, UPDATE_LEADERBOARD
} from './types';

const baseUrl = "https://blingblaow.com:8888"

export const changeGuess = (guess) => ({
    type: CHANGE_GUESS,
    payload: { guess },
})

export const submittedGuess = (timestamp) => {
    return {
        type: SUBMIT_GUESS,
        payload: { timestamp }
    }
}

export const clearGuess = () => ({
    type: CLEAR_GUESS
})

export const submitGuess = (nickname, guess, timestamp) => {
    return (dispatch) => {
        var request = new XMLHttpRequest()

        request.open('POST', baseUrl + '/game/submitAnswer', true)
        request.onload = function() {
            dispatch(submittedGuess(timestamp));
            if (request.status === 200) {
                console.log('submitted answer');
            } else {
                console.log('error');
            }
        }

        console.log(JSON.stringify({userName: nickname, guess, timestamp}));
        request.send(JSON.stringify({userName: nickname, guess, timestamp}));

    }
}

export const changeToken = (token) => ({
    type: CHANGE_TOKEN,
    payload: { token }
})

export const changeNickname = (nickname) => ({
    type: CHANGE_NICKNAME,
    payload: { nickname }
})

export const submittedNickname = (nickname) => ({
    type: SUBMIT_NICKNAME,
    payload: { nickname }
})

export const newRound = (round) => ({
    type: NEW_ROUND,
    payload: { round }
})

export const countdown = (timestamp) => ({
    type: COUNTDOWN,
    payload: { timestamp }
})

export const clearRound = () => {
    return {
        type: CLEAR_ROUND
    }
}

export const updateLeaderboard = (leaderboard) => ({
    type: UPDATE_LEADERBOARD,
    payload: {leaderboard}
})

export const submitNickname = (nickname) => {
    return (dispatch) => {
        var request = new XMLHttpRequest()

        request.open('POST', baseUrl + '/players/set', true)
        request.onload = function() {
            console.log(this.response)

            if (request.status === 200) {
                return dispatch(submittedNickname(nickname));
            } else {
                console.log('error')
            }
        }

        request.send(JSON.stringify({userName: nickname}));
    }
}

export const pollRound = () => {
    return (dispatch) => {
        var request = new XMLHttpRequest()

        request.open('GET', baseUrl + '/game/currentRound', true)
        request.onload = function() {
            const round = JSON.parse(this.response);

            console.log(round);

            if (request.status === 200) {
                return dispatch(newRound(round));
            } else {
                console.log('error')
            }
        }

        request.send();
    }
}

export const pollRoundSummary = () => {
    return (dispatch) => {
        var request = new XMLHttpRequest()

        request.open('GET', baseUrl + '/game/roundSummary', true)
        request.onload = function() {
            const summary = JSON.parse(this.response);

            console.log(summary);

            if (request.status === 200 && summary.complete) {
                return dispatch(clearRound());
            } else {
                console.log('error')
            }
        }

        request.send();
    }
}

export const pollLeaderboard = () => {
    return (dispatch) => {
        var request = new XMLHttpRequest()

        request.open('GET', baseUrl + '/leaderboard', true)
        request.onload = function() {
            const lb = JSON.parse(this.response);

            if (request.status === 200) {
                return dispatch(updateLeaderboard(lb));
            } else {
                console.log('error')
            }
        }

        request.send();
    }
}
