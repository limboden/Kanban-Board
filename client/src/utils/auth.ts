import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) {
        return true;
      }
      return Date.now() >= exp * 5000;
    } catch (err) {
      return true;
    }
  }

  getToken(): string | null {
    // return the token
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // set the token to localStorage
    if (!this.loggedIn) {
      localStorage.setItem('id_token', idToken);
      // redirect to the home page
      window.open("/", "_self")
    }
  }

  logout() {
    // remove the token from localStorage
    if (this.loggedIn()) {
      localStorage.removeItem("id_token");
      // redirect to the login page
      window.open("/login", "_self");
    }
  }
}

export default new AuthService();
