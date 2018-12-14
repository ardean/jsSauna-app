import authApi from "./authApi";
import session from "../services/session";

class AuthService {
  async login(username: string, password: string) {
    const sessionId = await authApi.login(username, password);
    if (sessionId === false) return false;

    session.setSessionId(sessionId);
    return sessionId;
  }

  async logout() {
    session.removeSessionId();
  }
}

export default new AuthService();