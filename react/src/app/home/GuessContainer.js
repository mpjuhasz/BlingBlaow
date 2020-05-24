import { connect } from 'react-redux';
import GuessComponent from './GuessComponent.jsx';
import {getGuess, isGuessSubmitted, getSongId, getTimestamp, getNickname} from './duck/selectors';
import {changeGuess, clearGuess, submitGuess} from './duck/actions';

const mapStateToProps = (state) => ({
    guess: getGuess(state),
    guessSubmitted: isGuessSubmitted(state),
    songId: getSongId(state),
    timestamp: getTimestamp(state),
    nickname: getNickname(state)
});

export default connect(
    mapStateToProps,
    { changeGuess, submitGuess, clearGuess },
)(GuessComponent);
