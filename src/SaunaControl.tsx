import * as React from "react";
import H1 from "./components/H1";
import Row from "./components/Row";
import { connect } from "react-redux";
import { AppState } from "./reducer";
import * as authActions from "./auth/authActions";
import styled, { keyframes, css } from "styled-components";
import * as settingsActions from "./settings/settingsActions";
import { IoIosThermometer, IoIosLogOut } from "react-icons/io";

const BuriningAnimation = keyframes`
  0% {
    color: orange;
  }
  100% {
    color: red;
  }
`;

const Container = styled.div`
  color: #222;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(H1)`
  flex: 1;
`;

const Label = styled.label`
  color: #999;
  display: block;
  margin-bottom: 3px;
  font-size: 15px;
`;

const LogoutIcon = styled(IoIosLogOut).attrs({ size: "24px" })`
  margin-left: 20px;
  cursor: pointer;
`;

const OnOffRow = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

const OnOffCheckbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
  margin: 0;
  height: 24px;
`;

const OnOffLabel = styled(Label)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  flex: 1;
  margin-bottom: 0;
  cursor: pointer;
`;

const OnOffLabelText = styled.span`
  flex: 1;
`;

interface HeatIconProps {
  heating?: "true" | "false";
}

const HeatIcon = styled(IoIosThermometer).attrs({ size: "24px" }) <HeatIconProps>`
  margin-left: 20px;
  ${props => props.heating === "true" ? css`animation: ${BuriningAnimation} 3s ease-in-out infinite alternate;` : ""}
`;

const TemperatureRange = styled.input.attrs({ type: "range" })`
  width: 100%;
`;

interface Props {
  heating: boolean;
  loginRequired: boolean;
  temperature: number;
  humidity: number;
  maxTemperature: number;
  on: boolean;
  targetTemperature: number;
  changeTargetTemperature(targetTemperature: number): Promise<void>;
  changeOn(on: boolean): Promise<void>;
  logout(): Promise<void>;
}

class SettingsDetail extends React.Component<Props> {
  render() {
    const { targetTemperature, on, heating, maxTemperature, temperature, humidity, loginRequired } = this.props;

    return (
      <Container>
        <Head>
          <Title>jsSauna</Title>
          {loginRequired && <LogoutIcon onClick={this.logout} />}
        </Head>
        <OnOffRow>
          <OnOffCheckbox
            id="is-sauna-on"
            onChange={this.onOnOffChange}
            checked={on}
          />
          <OnOffLabel htmlFor="is-sauna-on">
            <OnOffLabelText>On / Off</OnOffLabelText>
            <HeatIcon heating={heating ? "true" : "false"} />
          </OnOffLabel>
        </OnOffRow>
        <Row>
          <div>{targetTemperature}°C</div>
          <TemperatureRange
            min="0"
            max={maxTemperature}
            onChange={this.onTargetTemperatureChange}
            value={targetTemperature.toString()}
          />
        </Row>
        <Row>
          <Label>Temperature</Label>
          <div>{temperature}°C</div>
        </Row>
        <Row>
          <Label>Humidity</Label>
          <div>{humidity}%</div>
        </Row>
      </Container>
    );
  }

  onTargetTemperatureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeTargetTemperature } = this.props;
    await changeTargetTemperature(parseFloat(e.currentTarget.value));
  }

  onOnOffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeOn } = this.props;
    await changeOn(e.currentTarget.checked);
  }

  logout = async () => {
    const { logout } = this.props;
    await logout();
  }
}

const mapStateToProps = (state: AppState) => ({
  heating: state.heating,
  loginRequired: state.loginRequired,
  humidity: state.humidity,
  temperature: state.temperature,
  maxTemperature: state.maxTemperature,
  on: state.on,
  targetTemperature: state.targetTemperature
});

const mapDispatchToProps = (dispatch) => ({
  changeTargetTemperature: (targetTemperature: number) => dispatch(settingsActions.changeTargetTemperature(targetTemperature)),
  changeOn: (on: boolean) => dispatch(settingsActions.changeOn(on)),
  logout: () => dispatch(authActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDetail);