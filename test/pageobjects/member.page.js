/* eslint-disable no-undef */
class MemberPage {
  //sheared component
  get addBtn() {
    return $("[data-testid='add-btn']");
  }
  get editBtn() {
    return $("[data-testid='edit-btn']");
  }
  get confirmBtn() {
    return $("[data-testid='confirm-edit-btn']");
  }
  get memberForm() {
    return $("[data-testid='member-add-form']");
  }
  get memberEditForm() {
    return $("[data-testid='member-editform-container']");
  }
  get addFirstChild() {
    return $("[data-testid='member-editform-container'] div div div:nth-child(1) input");
  }
  get addFirstChildLabel() {
    return $("[data-testid='member-editform-container'] div div div:nth-child(1) label");
  }
  get addSecondChild() {
    return $(
      "[data-testid='member-editform-container'] div div:nth-child(2) div:nth-child(4) select"
    );
  }
  get addSecondChildLabel() {
    return $(
      "[data-testid='member-editform-container'] div div:nth-child(2) div:nth-child(4) label"
    );
  }
  async confirmBtnClick() {
    await this.confirmBtn.click();
  }
}
module.exports = new MemberPage();
