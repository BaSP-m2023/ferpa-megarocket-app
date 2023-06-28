/* eslint-disable no-dupe-class-members */
/* eslint-disable no-undef */
class AdminSubs {
  get adminSubsButton() {
    return $('[data-testid="admins-subs"]');
  }
  async adminSubsButton() {
    await this.adminSubsButton.click();
  }
  get adminLogo() {
    return $('[data-testid="header-logo"]');
  }

  get addSubsButton() {
    return $('[data-testid="add-btn"]');
  }

  async addSubsButtonClick() {
    await this.addSubsButton.click();
  }

  get addSubsForm() {
    return $('[data-testid="subs-add-container"]');
  }
  get addSubsMemberInput() {
    return $('[data-testid="subs-add-container"] div div:nth-child(1)');
  }

  async addSubsMemberInputClick() {
    await this.addSubsMemberInput.click();
  }

  get addSubsMemberInputOption1() {
    return $('[data-testid="subs-add-container"] div div:nth-child(1) option:nth-child(1)');
  }

  async addSubsMemberInputOption1Click() {
    await this.addSubsMemberInputOption1.click();
  }

  get addSubsClassInput() {
    return $('[data-testid="subs-add-container"] div div:nth-child(2)');
  }

  async addSubsClassInputClick() {
    await this.addSubsClassInput.click();
  }

  get addSubsClassInputOption1() {
    return $('[data-testid="subs-add-container"] div div:nth-child(2) option:nth-child(1)');
  }

  async addSubsClassInputOption1Click() {
    await this.addSubsClassInputOption1.click();
  }

  get addSubsDateInput() {
    return $('[data-testid="subs-add-container"] div div:nth-child(3)');
  }

  async addSubsDateInputClick() {
    await this.addSubsDateInput.click();
  }

  async enterDate(value) {
    await this.addSubsDateInput.setValue(value);
  }

  get deleteSubsButton() {
    return $('[data-testid="delete-btn"]');
  }

  async deleteSubsButtonClick() {
    await this.deleteSubsButton.click();
  }

  get deleteModalConfirm() {
    return $('[data-testid="confirm-modal"]');
  }

  get updateSubsButton() {
    return $('[data-testid="edit-btn"]');
  }

  async updateSubsButtonClick() {
    await this.updateSubsButton.click();
  }
}
module.exports = new AdminSubs();
