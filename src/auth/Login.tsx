import * as React from "react";
import H1 from "../components/H1";
import H3 from "../components/H3";
import Row from "../components/Row";
import { keyCodeMap } from "../util";
import { connect } from "react-redux";
import { AppState } from "../reducer";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import * as authActions from "./authActions";

const Container = styled.div`
  color: #222;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
`;

const Title = styled(H1)``;
const SubTitle = styled(H3)``;

const Form = styled.form``;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

const Flex = styled.div`
  flex: 1;
`;

const ButtonRow = styled(Row)`
  display: flex;
  flex-direction: row;
`;

interface Props {
  error: string;
  login(username: string, password: string): Promise<void>;
}

interface State {
  username: string;
  password: string;
}

class Login extends React.Component<Props, State> {
  state: State = {
    username: "",
    password: ""
  };

  render() {
    const { error } = this.props;

    return (
      <Container>
        <Title>jsSauna</Title>
        <SubTitle>Login</SubTitle>
        <Form>
          <Row>
            <Input
              type="text"
              placeholder="Username"
              autoComplete="username"
              onChange={this.onUsernameChange}
              onKeyUp={this.onKeyUp}
              id="login-username"
            />
          </Row>
          <Row>
            <Input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={this.onPasswordChange}
              onKeyUp={this.onKeyUp}
              id="login-pw"
            />
          </Row>
          {error &&
            <Row>
              <ErrorMessage>{error}</ErrorMessage>
            </Row>
          }
          <ButtonRow>
            <Flex />
            <Button type="submit" onClick={this.login} onKeyUp={this.onKeyUp}>Login</Button>
          </ButtonRow>
        </Form>
      </Container>
    );
  }

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.currentTarget.value
    });
  }

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.currentTarget.value
    });
  }

  onKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyCodeMap[e.keyCode] === "enter") {
      await this.login(e);
    }
  }

  login = async (e: { preventDefault(): void }) => {
    e.preventDefault();

    const { login } = this.props;
    const { username, password } = this.state;

    await login(username, password);
  }
}

const mapStateToProps = (state: AppState) => ({
  error: state.loginError
});

const mapDispatchToProps = (dispatch) => ({
  login: (username: string, password: string) => dispatch(authActions.login(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);