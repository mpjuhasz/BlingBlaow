import { connect } from 'react-redux';
import { getLeaderboard } from "./duck/selectors";
import LeaderboardComponent from "./LeaderboardComponent";
import {pollLeaderboard} from "./duck/actions";

const mapStateToProps = (state) => ({
    leaderboard: getLeaderboard(state)
});

export default connect(
    mapStateToProps,
    {pollLeaderboard}
)(LeaderboardComponent);
