import {
    CHANGE_GUESS,
    SUBMIT_GUESS,
    CLEAR_GUESS,
    CHANGE_TOKEN,
    CHANGE_NICKNAME,
    SUBMIT_NICKNAME,
    NEW_ROUND,
    COUNTDOWN, CLEAR_ROUND, UPDATE_LEADERBOARD
} from './types';

const initialState = {
    confirmedNickname: '',
    guess: '',
    guessSubmitted: false,
    token: '',
    nickname: '',
    timeRemaining: 60,
    leaderboard: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_GUESS: {
            const { guess } = action.payload;
            return {
                ...state,
                guess
            };
        }
        case SUBMIT_GUESS: {
            const { timestamp } = action.payload;

            return {
                ...state,
                guessSubmitted: true,
                guessTimestamp: timestamp
            };
        }
        case CLEAR_GUESS: {
            return {
                ...state,
                guess: null,
                guessSubmitted: false
            }
        }
        case CHANGE_TOKEN: {
            const { token } = action.payload;
            return {
                ...state,
                token
            }
        }
        case CHANGE_NICKNAME: {
            const { nickname } = action.payload;
            return {
                ...state,
                nickname
            }
        }
        case SUBMIT_NICKNAME: {
            const { nickname } = action.payload;
            return {
                ...state,
                confirmedNickname: nickname
            }
        }
        case NEW_ROUND: {
            const { round } = action.payload;
            return {
                ...state,
                round
            }
        }
        case COUNTDOWN: {
            const { timestamp } = action.payload;
            const timeRemaining = Math.round(((timestamp + 60000) - Date.now()) / 1000);

            return {
                ...state,
                timeRemaining
            }
        }
        case CLEAR_ROUND: {
            return {
                ...state,
                round: {songId:'', timestamp: 0 },
                guess: '',
                guessSubmitted: false,
                timeRemaining: 60
            }
        }
        case UPDATE_LEADERBOARD: {
            const { leaderboard } = action.payload;
            return {
                ...state,
                leaderboard
            }
        }
        default:
            return state;
    }
}
