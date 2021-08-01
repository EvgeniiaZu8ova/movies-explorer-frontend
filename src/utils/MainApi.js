import { mainApiOptions } from "./utils";

class MainApi {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config._headers;
  }

  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._handlePromise());
  }

  updateUserInfo(data) {
    const { email, name } = data;

    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then((res) => this._handlePromise(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._handlePromise(res));
  }

  createMovie(data) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
      thumbnail,
    } = data;

    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailer: trailer,
        movieId: movieId,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: thumbnail,
      }),
    }).then((res) => this._handlePromise(res));
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._handlePromise(res));
  }

  register(data) {
    const { email, password, name } = data;

    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then((res) => this._handlePromise(res));
  }

  login(data) {
    const { email, password } = data;

    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._handlePromise(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._handlePromise(res));
  }
}

const mainApi = new MainApi(mainApiOptions);

export default mainApi;
