import React from 'react';
import PropTypes from "prop-types";

class WaitingRoomComponent extends React.Component {
    constructor(props) {
        super(props);

        this.pollRound = this.pollRound.bind(this);
    }

    componentDidMount() {
        console.log("Mount");
        this.timerID = setInterval(
            () => this.pollRound(),
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    pollRound() {
        this.props.pollRound();
        this.props.pollRoundSummary();
    }

    render() {
        let text = 'Waiting for other players...';
        if (!this.props.guessSubmitted) {
            text = 'Waiting for next round to start...';
        }
        return (
            <div id="waiting-room">
                <span>{text}</span>
            </div>
        );
    }
}

WaitingRoomComponent.propTypes = {
    guessSubmitted: PropTypes.bool.isRequired,
    pollRound: PropTypes.func.isRequired,
    pollRoundSummary: PropTypes.func.isRequired
};

export default WaitingRoomComponent;
