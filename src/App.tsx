import * as React from "react";
import Login from "./auth/Login";
import * as actions from "./actions";
import { AppState } from "./reducer";
import { connect } from "react-redux";
import SaunaControl from "./SaunaControl";
import LoadingIndicator from "./components/LoadingIndicator";

interface Props {
  loading: boolean;
  sessionId: string;
  loginRequired: boolean;
  check(sessionId?: string): Promise<void>;
}

class App extends React.Component<Props> {
  async componentDidMount() {
    const { check, sessionId } = this.props;
    await check(sessionId);
  }

  render() {
    const { loginRequired, loading, sessionId } = this.props;
    if (loading) return <LoadingIndicator />;
    if (loginRequired && !sessionId) return <Login />;

    return (
      <SaunaControl />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  loginRequired: state.loginRequired,
  sessionId: state.sessionId,
  loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
  check: (sessionId?: string) => dispatch(actions.check(sessionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);