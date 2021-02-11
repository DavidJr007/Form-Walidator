import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    accept: false,
    message: "",

    errors: {
      username: false,
      email: false,
      password: false,
      password2: false,
    },
  };
  messages = {
    username_incorect: "Name have to be longer than 8 and without space",
    email_incorect: "Missing @ in email",
    password_incorect: "Password have to have 8 marks",
    accept_incorect: "You must accept it",
  };
  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      this.setState({
        [name]: value,
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      });
    }
  };
  handleFormSubmit = (e) => {
    e.preventDefault();

    const validation = this.formValidation();

    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        password: "",
        password2: "",
        accept: false,
        message: "Everything correct. Thank you!",
        errors: {
          username: false,
          email: false,
          password: false,
          password2: false,
        },
      });
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          password2: !validation.password,
          accept: !validation.accept,
        },
      });
    }
  };
  formValidation = () => {
    let username = false;
    let email = false;
    let accept = false;
    let password = false;
    let correct = false;

    if (
      this.state.username.length > 8 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }
    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }
    if (this.state.password.length > 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && accept && password) {
      correct = true;
    }
    return {
      correct,
      password,
      username,
      accept,
      email,
    };
  };
  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(
        () =>
          this.setState({
            message: "",
          }),
        3000
      );
    }
  }
  render() {
    return (
      <div className="wrapper">
        <form
          className="register-form"
          onSubmit={this.handleFormSubmit}
          noValidate
        >
          <h2 className="form-title">Register</h2>
          <div className="form-box">
            <label htmlFor="user">Username:</label>
            <input
              type="text"
              id="user"
              placeholder="Enter a username"
              name="username"
              onChange={this.handleChange}
            />
            {this.state.errors.username && (
              <p className="error-text">{this.messages.username_incorect}</p>
            )}
          </div>
          <div className="form-box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            {this.state.errors.password && (
              <p className="error-text">{this.messages.password_incorect}</p>
            )}
          </div>
          <div className="form-box">
            <label htmlFor="password2">Password:</label>
            <input
              type="password"
              id="password2"
              placeholder="Repeat the password"
              name="password2"
              onChange={this.handleChange}
            />
            {this.state.errors.password && (
              <p className="error-text">{this.messages.password_incorect}</p>
            )}
          </div>
          <div className="form-box">
            <label htmlFor="email">E-mail address:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter e-mail address"
              name="email"
              onChange={this.handleChange}
            />
            {this.state.errors.email && (
              <p className="error-text">{this.messages.email_incorect}</p>
            )}
          </div>
          <label htmlFor="accept">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              checked={this.state.accept}
              onChange={this.handleChange}
            />
            I accepted the reugulations
          </label>
          {this.state.errors.accept && (
            <p className="error-accept">{this.messages.accept_incorect}</p>
          )}

          <button className="send">Send</button>
          {this.state.message && <h3>{this.state.message}</h3>}
        </form>
      </div>
    );
  }
}

export default App;
