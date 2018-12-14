import transport from "../transport";

class AuthApi {
  async login(username: string, password: string) {
    return await transport.call(`login`, {
      username,
      password
    }) as false | string;
  }
}

export default new AuthApi();