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
  get closeSandwichBtn() {
    return $("[data-testid='close-btn']");
  }
  get sandwich() {
    return $("[data-testid='sandwich-btn']");
  }
  get asideBar() {
    return $("[data-testid='aside-container']");
  }
  get homeBtn() {
    return $("[data-testid='home-button']");
  }
  get loginBtn() {
    return $("[data-testid='login-button']");
  }
  get signupBtn() {
    return $("[data-testid='signup-button']");
  }
  get contact() {
    return $("[data-testid='contact-container']");
  }
  get contactText() {
    return $("[data-testid='contact-container'] h3");
  }
  // modals
  get successModal() {
    return $("[data-testid='success-modal']");
  }
  get logoutBtn() {
    return $("[data-testid='logout-logo']");
  }
  get modalLogout() {
    return $("[data-testid='logout-modal']");
  }

  async loginClick() {
    await this.loginBtn.click();
  }
}
module.exports = new ShearedComponents();
