/* eslint-disable no-undef */
class ShearedComponents {
  //sheared component
  get header() {
    return $("[data-testid='header-container']");
  }
  get logo() {
    return $("[data-testid='header-logo']");
  }
  get navbar() {
    return $("[data-testid='nav-container']");
  }
  get navProfile() {
    return $("[data-testid='admins-profile']");
  }
  get navReports() {
    return $("[data-testid='admins-reports']");
  }
  get navActivities() {
    return $("[data-testid='admins-activities']");
  }
  get navClasses() {
    return $("[data-testid='admins-classes']");
  }
  get navMembers() {
    return $("[data-testid='admins-members']");
  }
  get navSubs() {
    return $("[data-testid='admins-subs']");
  }
  get navTrainers() {
    return $("[data-testid='admins-trainers']");
  }
  get footer() {
    return $("[data-testid='footer-container']");
  }
  //menu hambuerguesa
  get asideBar() {
    return $("[data-testid='aside-container']");
  }
  get homeBtn() {
    return $("[data-testid='home-buttom']");
  }
  get loginBtn() {
    return $("[data-testid='login-buttom']");
  }
  get signupBtn() {
    return $("[data-testid='signup-buttom']");
  }
  get contact() {
    return $("[data-testid='contact-container']");
  }
  get contactText() {
    return $("[data-testid='contact-container'] h3");
  }
  get contactFirstChild() {
    return $("[data-testid='contact-container'] div:nth-child(2) h4");
  }
  get contactSecondChild() {
    return $("[data-testid='contact-container'] div:nth-child(3) h4");
  }
  get contactThirdChild() {
    return $("[data-testid='contact-container'] div:nth-child(4) h4");
  }

  async continueClick() {
    await this.loginBtn.click();
  }
}
module.exports = new ShearedComponents();
