/* eslint-disable no-undef */
class MemberPage {
  //buttoms and modals
  get editMemberBtn() {
    return $("[data-testid='edit-btn']");
  }
  get editBtn() {
    return $("[data-testid='confirm-edit-btn']");
  }
  get cancelBtn() {
    return $("[data-testid='cancel-btn']");
  }
  get successModal() {
    return $("[data-testid='success-modal']");
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
    return $("[data-testid='member-profile']");
  }
  get navClasses() {
    return $("[data-testid='member-classes']");
  }
  get navMySubscription() {
    return $("[data-testid='member-subs']");
  }
  get navActivities() {
    return $("[data-testid='member-activities']");
  }
  get footer() {
    return $("[data-testid='footer-container']");
  }

  //form
  get formMember() {
    return $("[data-testid='member-editform-container']");
  }
  get formMemberFirstChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(2) input");
  }
  get formMemberSecondChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(3) input");
  }
  get formMemberThirdChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(4) input");
  }
  get formMemberFourthChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(5) input");
  }
  get formMemberFifthChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(6) input");
  }
  get formMemberSixthChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(7) input");
  }
  get formMemberSeventhChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(8) input");
  }
  get formMemberEighthChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(9) input");
  }
  get formMemberNinethChild() {
    return $("[data-testid='member-editform-container'] div:nth-child(10) select");
  }
  get select() {
    return $(
      "[data-testid='member-editform-container'] div:nth-child(10) select option:nth-child(3)"
    );
  }
  get formFirstLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(2) label");
  }
  get formSecondLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(3) label");
  }
  get formThirdLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(4) label");
  }
  get formFourthLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(5) label");
  }
  get formFifthLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(6) label");
  }
  get formSixthLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(7) label");
  }
  get formSeventhLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(8) label");
  }
  get formEighthLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(9) label");
  }
  get formNinethLabel() {
    return $("[data-testid='member-editform-container'] div:nth-child(10) label");
  }

  async editMemberBtnClick() {
    await this.editMemberBtn.click();
  }
  async editBtnClick() {
    await this.editBtn.click();
  }
  async cancelBtnClick() {
    await this.cancelBtn.click();
  }
}
module.exports = new MemberPage();
