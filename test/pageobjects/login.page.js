/* eslint-disable no-undef */
class LoginPage {
  get inputUsername() {
    return $('#root > section > div > div > form > div > div:nth-child(1) > input');
  }

  get inputPassword() {
    return $('#root > section > div > div > form > div > div:nth-child(2) > input');
  }

  get loginBtn() {
    return $('[data-testid="continue-btn"]');
  }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.loginBtn.click();
  }
  open() {
    return super.open('login');
  }
}

module.exports = new LoginPage();
