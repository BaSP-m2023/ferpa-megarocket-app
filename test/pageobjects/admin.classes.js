/* eslint-disable no-undef */
class AdminClasses {
  get adminClassesButton() {
    return $('[data-testid="admins-classes"]');
  }
  get adminLogo() {
    return $('[data-testid="header-logo"]');
  }

  async adminClassesButtonClick() {
    await this.adminClassesButton.click();
  }

  get addClassButton() {
    return $('[data-testid="add-btn"]');
  }

  async addClassButtonClick() {
    await this.addClassButton.click();
  }

  get addClassModal() {
    return $('[data-testid="class-add-edit-container"]');
  }
}

module.exports = new AdminClasses();
