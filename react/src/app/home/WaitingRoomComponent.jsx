import React from 'react';
import PropTypes from "prop-types";

class WaitingRoomComponent extends React.Component {
    constructor(props) {
        super(props);

        this.pollRound = this.pollRound.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.pollRound(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    pollRound() {
        this.props.pollRound();
        //this.props.pollRoundSummary();
    }

    render() {
        let text = 'Waiting for other players...';
        if (this.props.guessSubmitted) {
            text = 'Waiting for next round to start...';
        }
        let subtext = '';
        if (this.props.correctAnswer) {
            subtext = 'Your guess: ' + this.props.guess + '. Correct answer: ' + this.props.correctAnswer;
        }
        return (
            <div id="waiting-room">
                <p id='waiting-text'>{text}</p>
                <p id='correct-answer'>{subtext}</p>
            </div>
        );
    }
}

WaitingRoomComponent.propTypes = {
    guessSubmitted: PropTypes.bool.isRequired,
    pollRound: PropTypes.func.isRequired,
    pollRoundSummary: PropTypes.func.isRequired,
    pollLeaderboard: PropTypes.func.isRequired,
};

export default WaitingRoomComponent;
