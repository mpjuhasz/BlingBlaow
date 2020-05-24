import React from 'react';
import PropTypes from "prop-types";
import CountdownComponent from "./CountdownContainer";

class GuessComponent extends React.Component {
    constructor(props) {
        super(props);

        this.changeGuess = this.changeGuess.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.submitGuess = this.submitGuess.bind(this);
        window.play('spotify:track:' + this.props.songId);
    }

    componentDidMount() {
        this.props.clearGuess();
    }

    changeGuess(value) {
        this.props.changeGuess(value);
    }

    onKeyDown(event) {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.submitGuess();
        }
    }

    submitGuess() {
        this.props.submitGuess(this.props.nickname, this.props.guess, this.props.timestamp);
    }

    render() {
        return (
            <div id="guess-container" className="form-container">
                <CountdownComponent />
                <input onChange={(e) => this.changeGuess(e.target.value)}
                       onKeyDown={this.onKeyDown}
                       value={this.props.guess}
                       type="text" name="guess" placeholder="What's your guess?" autoComplete="off" autoFocus />
                <div id="guess-submit-container">
                    <button type="button" className="submit-guess" onClick={this.submitGuess} disabled={this.props.guess.length === 0}>
                        Submit My Guess!
                    </button>
                </div>
            </div>
        );
    }
}

GuessComponent.propTypes = {
    guess: PropTypes.string,
    guessSubmitted: PropTypes.bool.isRequired,
    songId: PropTypes.string.isRequired
};

export default GuessComponent;
