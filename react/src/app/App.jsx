/* global window */
import React from 'react';
import '../assets/styles.css';
import GuessComponent from './home/GuessContainer';
import InitializerComponent from "./home/InitializerContainer";
import { connect } from "react-redux";
import {getConfirmedNickname, getGuessTimestamp, getRound, isGuessSubmitted} from "./home/duck/selectors";
import WaitingRoomComponent from "./home/WaitingRoomContainer";

function App(props) {
    let component = <InitializerComponent />;
    if (props.confirmedNickname.length > 0) {
        component = <WaitingRoomComponent />;
    }
    if (props.round != null && !props.guessSubmitted && props.guessTimestamp !== props.round.timestamp && props.round.songId.length > 0) {
        component = <GuessComponent />;
    }
    return (
        <div>
            { component }
        </div>
    );
}

const mapStateToProps = (state) => ({
    confirmedNickname: getConfirmedNickname(state),
    guessSubmitted: isGuessSubmitted(state),
    guessTimestamp: getGuessTimestamp(state),
    round: getRound(state)
});

export default connect(mapStateToProps)(App);
