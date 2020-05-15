import { connect } from 'react-redux';
import GuessComponent from './GuessComponent.jsx';
import { getGuess, isGuessSubmitted, getSongId } from './duck/selectors';
import { changeGuess } from './duck/actions';

const mapStateToProps = (state) => ({
    guess: getGuess(state),
    guessSubmitted: isGuessSubmitted(state),
    songId: getSongId(state)
});

export default connect(
    mapStateToProps,
    { changeGuess },
)(GuessComponent);
