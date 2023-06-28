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

  get addClassForm() {
    return $('[data-testid="class-add-edit-container"]');
  }

  get addClassDayInput() {
    return $('[data-testid="class-add-edit-container"] select');
  }

  async addClassDayInputClick() {
    await this.addClassDayInput.click();
  }

  get addClassDayInputOption1() {
    return $('[data-testid="class-add-edit-container"] select option:nth-child(1)');
  }

  get addClassDayInputOption2() {
    return $('[data-testid="class-add-edit-container"] select option:nth-child(2)');
  }

  async addClassDayInputOption1Click() {
    await this.addClassDayInputOption1.click();
  }

  async addClassDayInputOption2Click() {
    await this.addClassDayInputOption2.click();
  }

  get addClassHourInput() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(5)');
  }

  async addClassHourInputClick() {
    await this.addClassHourInput.click();
  }

  get addClassHourInputOption1() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(5) option:nth-child(1)');
  }

  async addClassHourInputOption1Click() {
    await this.addClassHourInputOption1.click();
  }

  get addClassActivityInput() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(7)');
  }

  async addClassActivityInputClick() {
    await this.addClassHourInput.click();
  }

  get addClassActivityInputOption1() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(7) option:nth-child(1)');
  }

  async addClassActivityInputOption1Click() {
    await this.addClassActivityInputOption1.click();
  }

  get addClassTrainerInput() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(9)');
  }

  async addClassTrainerInputClick() {
    await this.addClassHourInput.click();
  }

  get addClassTrainerInputOption1() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(9) option:nth-child(1)');
  }

  async addClassTrainerInputOption1Click() {
    await this.addClassActivityInputOption1.click();
  }

  get addClassSlotsInput() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(11)');
  }

  async addClassSlotsInputClick() {
    await this.addClassHourInput.click();
  }

  get addClassSlotsInputOption1() {
    return $('[data-testid="class-add-edit-container"] select:nth-child(11) option:nth-child(1)');
  }

  async addClassSlotsInputOption1Click() {
    await this.addClassActivityInputOption1.click();
  }

  get addClassModalSuccess() {
    return $('[data-testid="success-modal"]');
  }

  get addClassButtonAdd() {
    return $('[data-testid="add-edit-btn"]');
  }

  async addClassButtonAddClick() {
    await this.addClassButtonAdd.click();
  }

  get deleteClassButton() {
    return $('[data-testid="delete-btn"]');
  }

  async deleteClassButtonClick() {
    await this.deleteClassButton.click();
  }

  get deleteModalConfirm() {
    return $('[data-testid="confirm-modal"]');
  }

  get updateClassButton() {
    return $('[data-testid="edit-btn"]');
  }

  async updateClassButtonClick() {
    await this.updateClassButton.click();
  }

  get updateClassForm() {
    return $('[data-testid="activity-add-edit-container"]');
  }
}

module.exports = new AdminClasses();
