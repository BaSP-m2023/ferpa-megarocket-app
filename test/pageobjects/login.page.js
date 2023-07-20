class LoginPage {

  get loginContainer() {
    return $("[data-testid='login-container']");
  }
  get loginFormChild() {
    return $("[data-testid='login-container'] div:nth-child(1) h2");
  }
  get loginForm() {
    return $("[data-testid='login-form']");
  }
  get loginFormFirstChild() {
    return $("[data-testid='login-form'] div:nth-child(1) div input");
  }
  get loginFormSecondChild() {
    return $("[data-testid='login-form'] div:nth-child(2) input");
  }
  get continueBtn() {
    return $("[data-testid='continue-btn']");
  }
  async continueBtnClick() {
    await this.continueBtn.click();
  }
}
module.exports = new LoginPage();