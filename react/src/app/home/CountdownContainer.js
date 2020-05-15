import { connect } from 'react-redux';
import {countdown, submitGuess} from './duck/actions';
import CountdownComponent from "./CountdownComponent";
import {getNickname, getRoundTimestamp, getTimeRemaining} from "./duck/selectors";

const mapStateToProps = (state) => ({
    timeRemaining: getTimeRemaining(state),
    roundTimestamp: getRoundTimestamp(state),
    nickname: getNickname(state)
});

export default connect(
    mapStateToProps,
    { countdown, submitGuess },
)(CountdownComponent);
