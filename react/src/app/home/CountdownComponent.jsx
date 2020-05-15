import React from 'react';
import PropTypes from "prop-types";

class CountdownComponent extends React.Component {
    constructor(props) {
        super(props);

        this.tick = this.tick.bind(this);
    }

    componentDidUpdate() {
        if (this.props.timeRemaining < 1) {
            this.props.submitGuess(this.props.nickname, '', this.props.roundTimestamp);
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.props.countdown(this.props.roundTimestamp);
    }

    render() {
        return (
            <div id="countdown">
                <span>{this.props.timeRemaining}</span>
            </div>
        );
    }
}

CountdownComponent.propTypes = {
    timeRemaining: PropTypes.number.isRequired,
    roundTimestamp: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    countdown: PropTypes.func.isRequired,
    submitGuess: PropTypes.func.isRequired
};

export default CountdownComponent;
