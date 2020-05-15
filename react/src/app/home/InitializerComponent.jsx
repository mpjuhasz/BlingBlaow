import React from 'react';
import PropTypes from "prop-types";

class InitializerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.changeToken = this.changeToken.bind(this);
        this.changeNickname = this.changeNickname.bind(this);
        this.initialize = this.initialize.bind(this);
    }

    changeToken(value) {
        this.props.changeToken(value);
        window.token = value;
    }

    changeNickname(value) {
        this.props.changeNickname(value);
    }

    initialize() {
        window.token = this.props.token;
        this.props.submitNickname(this.props.nickname);

        var spotifyPlayer = document.createElement('script');
        spotifyPlayer.setAttribute('src','https://sdk.scdn.co/spotify-player.js');
        document.head.appendChild(spotifyPlayer);
    }

    render() {
        return (
            <div id="initializer-container" className="form-container">
                <input onChange={(e) => this.changeToken(e.target.value)}
                       value={this.props.guess}
                       type="text" name="token" placeholder="Spotify token" autoComplete="off" />
                <input onChange={(e) => this.changeNickname(e.target.value)}
                       value={this.props.guess}
                       type="text" name="nickname" placeholder="Nickname" autoComplete="off" />
                <button type="button" className="submit-guess" onClick={this.initialize} disabled={this.props.disabled}>
                    Start game
                </button>
            </div>
        );
    }
}

InitializerComponent.propTypes = {
    token: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    changeToken: PropTypes.func.isRequired,
    changeNickname: PropTypes.func.isRequired,
    submitNickname: PropTypes.func.isRequired
};

export default InitializerComponent;
