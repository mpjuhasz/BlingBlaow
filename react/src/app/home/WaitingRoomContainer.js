import { connect } from 'react-redux';
import {pollRound, pollRoundSummary} from './duck/actions';
import WaitingRoomComponent from "./WaitingRoomComponent";
import { isGuessSubmitted } from "./duck/selectors";

const mapStateToProps = (state) => ({
    guessSubmitted: isGuessSubmitted(state)
});

export default connect(
    mapStateToProps,
    { pollRound, pollRoundSummary },
)(WaitingRoomComponent);
