import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
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
    // TODO: return the token
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
  }
}

export default new AuthService();
