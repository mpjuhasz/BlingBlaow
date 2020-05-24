import { connect } from 'react-redux';
import {pollLeaderboard, pollRound, pollRoundSummary} from './duck/actions';
import WaitingRoomComponent from "./WaitingRoomComponent";
import {getCorrectAnswer, getGuess, isGuessSubmitted} from "./duck/selectors";

const mapStateToProps = (state) => ({
    guessSubmitted: isGuessSubmitted(state),
    correctAnswer: getCorrectAnswer(state),
    guess: getGuess(state),
});

export default connect(
    mapStateToProps,
    { pollRound, pollRoundSummary, pollLeaderboard },
)(WaitingRoomComponent);
