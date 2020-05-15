import React from 'react';
import PropTypes from "prop-types";
import GuessSubmitComponent from "./GuessSubmitContainer";
import CountdownComponent from "./CountdownContainer";

class GuessComponent extends React.Component {
    constructor(props) {
        super(props);

        this.changeGuess = this.changeGuess.bind(this);
        window.play('spotify:track:' + this.props.songId);
    }

    changeGuess(value) {
        this.props.changeGuess(value);
    }

    render() {
        return (
            <div id="guess-container" className="form-container">
                <CountdownComponent />
                <input onChange={(e) => this.changeGuess(e.target.value)}
                       value={this.props.guess}
                       type="text" name="guess" placeholder="What's your guess?" autoComplete="off" />
                <GuessSubmitComponent disabled={this.props.guess.length === 0} />
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
