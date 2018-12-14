import transport from "./transport";
import Status from "./status/Status";
import Settings from "./settings/Settings";

class Api {
  async check(sessionId?: string) {
    return await transport.call(`check`, sessionId) as { status: Status, settings: Settings };
  }
}

export default new Api();