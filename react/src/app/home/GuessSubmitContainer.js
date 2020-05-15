import { connect } from 'react-redux';
import { submitGuess } from './duck/actions';
import GuessSubmitComponent from "./GuessSubmitComponent";
import { getGuess, getNickname, getTimestamp } from "./duck/selectors";

const mapStateToProps = (state) => ({
    guess: getGuess(state),
    timestamp: getTimestamp(state),
    nickname: getNickname(state)
});

export default connect(
    mapStateToProps,
    { submitGuess },
)(GuessSubmitComponent);
