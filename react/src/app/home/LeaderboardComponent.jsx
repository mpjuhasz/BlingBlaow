import React from 'react';
import PropTypes from "prop-types";

class LeaderboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.pollLeaderboard = this.pollLeaderboard.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.pollLeaderboard(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    pollLeaderboard() {
        this.props.pollLeaderboard();
    }

    render() {
        const listItems = this.props.leaderboard.map((lb, i) => <li key={'lb_element' + i}>{lb.userName} - {lb.score}</li>);
        return (
            <ol id="leaderboard">
                {listItems}
            </ol>
        );
    }
}

LeaderboardComponent.propTypes = {
    leaderboard: PropTypes.array.isRequired,
    pollLeaderboard: PropTypes.func.isRequired,
};

export default LeaderboardComponent;
