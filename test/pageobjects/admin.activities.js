/* eslint-disable no-undef */
class ActivitiesPage {
  //buttoms and modals
  get editBtn() {
    return $("[data-testid='edit-btn']");
  }
  get confirmEditBtn() {
    return $("[data-testid='confirm-edit-btn']");
  }
  get cancelBtn() {
    return $("[data-testid='cancel-btn']");
  }
  get successModal() {
    return $("[data-testid='success-modal']");
  }
  get confirmModal() {
    return $("[data-testid='confirm-modal']");
  }

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

  //form
  get formAdmin() {
    return $("[data-testid='admin-editform']");
  }
  get formAdminFirstChild() {
    return $("[data-testid='admin-editform'] div:nth-child(2) input");
  }
  get formAdminSecondChild() {
    return $("[data-testid='admin-editform'] div:nth-child(3) input");
  }
  get formAdminThirdChild() {
    return $("[data-testid='admin-editform'] div:nth-child(4) input");
  }
  get formAdminFourthChild() {
    return $("[data-testid='admin-editform'] div:nth-child(5) input");
  }
  get formAdminFifthChild() {
    return $("[data-testid='admin-editform'] div:nth-child(6) input");
  }
  get formAdminSixthChild() {
    return $("[data-testid='admin-editform'] div:nth-child(7) input");
  }
  get formAdminSeventhChild() {
    return $("[data-testid='admin-editform'] div:nth-child(8) input");
  }

  get formFirstLabel() {
    return $("[data-testid='admin-editform'] div:nth-child(2) label");
  }
  get formSecondLabel() {
    return $("[data-testid='admin-editform'] div:nth-child(3) label");
  }
  get formThirdLabel() {
    return $("[data-testid='admin-editform'] div:nth-child(4) label");
  }
  get formFourthLabel() {
    return $("[data-testid='admin-editform'] div:nth-child(5) label");
  }
  get formFifthLabel() {
    return $("[data-testid='admin-editform'] div:nth-child(6) label");
  }
  get formSixthLabel() {
    return $("[data-testid='admin-editform'] div:nth-child(7) label");
  }
  get formSeventhLabel() {
    return $("[data-testid='admin-editform'] div:nth-child(8) label");
  }

  //activities
  get addBtn() {
    return $("[data-testid='add-btn']");
  }
  get pencilEditBtn() {
    return $("[data-testid='edit-btn']");
  }
  get deleteBtn() {
    return $("[data-testid='delete-btn']");
  }
  get addAndEditBtn() {
    return $("[data-testid='add-edit-btn']");
  }
  get formActivities() {
    return $("[data-testid='activity-add-edit-container']");
  }
  get addFormActivitiesFirst() {
    return $("[data-testid='activity-add-edit-container'] div:nth-child(1) input");
  }
  get formActivitieFirstLabel() {
    return $("[data-testid='activity-add-edit-container'] div:nth-child(1) label");
  }
  get addFormActivitiesSecond() {
    return $("[data-testid='activity-add-edit-container'] div:nth-child(2) textarea");
  }
  get addFormActivitiesThird() {
    return $("[data-testid='activity-add-edit-container'] div:nth-child(3) input");
  }
  get formActivitieThirdLabel() {
    return $("[data-testid='activity-add-edit-container'] div:nth-child(3) label");
  }

  async editAdminBtnClick() {
    await this.editBtn.click();
  }
  async editBtnClick() {
    await this.confirmEditBtn.click();
  }
  async cancelBtnClick() {
    await this.cancelBtn.click();
  }
  async editActivitiesBtn() {
    await this.addBtn.click();
  }
  async addAndEditBtnClick() {
    await this.addAndEditBtn.click();
  }
  async deleteActivitiesBtnClick() {
    await this.deleteBtn.click();
  }
}
module.exports = new ActivitiesPage();
