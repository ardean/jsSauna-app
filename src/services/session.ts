import * as store from "store2";

class Session {
  setSessionId(sessionId: string) {
    store.set("sessionId", sessionId);
  }

  getSessionId() {
    return store.get("sessionId");
  }

  removeSessionId() {
    store.remove("sessionId");
  }
}

export default new Session();
