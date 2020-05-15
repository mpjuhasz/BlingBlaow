import { connect } from 'react-redux';
import { getToken, getNickname } from './duck/selectors';
import { changeToken, changeNickname, submitNickname } from './duck/actions';
import InitializerComponent from "./InitializerComponent";

const mapStateToProps = (state) => ({
    token: getToken(state),
    nickname: getNickname(state)
});

export default connect(
    mapStateToProps,
    { changeToken, changeNickname, submitNickname },
)(InitializerComponent);
