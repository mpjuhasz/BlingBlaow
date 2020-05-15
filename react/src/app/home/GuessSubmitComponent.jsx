import React from 'react';
import PropTypes from "prop-types";

class GuessSubmitComponent extends React.Component {
    constructor(props) {
        super(props);

        this.submitGuess = this.submitGuess.bind(this);
    }

    submitGuess() {
        this.props.submitGuess(this.props.nickname, this.props.guess, this.props.timestamp);
    }

    render() {
        return (
            <div id="guess-submit-container">
                <button type="button" className="submit-guess" onClick={this.submitGuess} disabled={this.props.disabled}>
                    Submit My Guess!
                </button>
            </div>
        );
    }
}

GuessSubmitComponent.propTypes = {
    nickname: PropTypes.string.isRequired,
    guess: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    submitGuess: PropTypes.func.isRequired
};

export default GuessSubmitComponent;
