/* eslint-disable no-undef */
class MemberCrud {
  get membersBtn() {
    return $('#root > header > nav > ul > a.nav_link__rYLMY.nav_linkFocused__IQMZN > li');
  }
  get addMember() {
    return $('#root > section > section > div.members_header__vYGff > a > button');
  }
  // Members Form - Create
  get firstName() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(1) > div:nth-child(1) > input'
    );
  }
  get lastName() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(1) > div:nth-child(2) > input'
    );
  }
  get dni() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(1) > div:nth-child(3) > input'
    );
  }
  get phone() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(1) > div:nth-child(4) > input'
    );
  }
  get email() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(1) > div:nth-child(5) > input'
    );
  }
  get city() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(2) > div:nth-child(1) > input'
    );
  }
  get birthDay() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(2) > div:nth-child(2) > input'
    );
  }
  get zipCode() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(2) > div:nth-child(3) > input'
    );
  }
  get membership() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(2) > div:nth-child(4) > select'
    );
  }
  get lastMembership() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(2) > div:nth-child(4) > select > option:nth-child(4)'
    );
  }
  get isActive() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_row__YXAYr > div:nth-child(2) > div.addMembers_checkboxField__+Fj4k > label.addMembers_switch__jIfOA > span'
    );
  }
  get addBtn() {
    return $(
      '#root > div > div.addMembers_inAdminBox__koBkB > form > div.addMembers_formBtns__jzqEl > button'
    );
  }
  // Edit member
  get editBtn() {
    return $(
      '#root > section > section > table > tbody > tr:nth-child(4) > td:nth-child(6) > a > button'
    );
  }
  get confirmEdit() {
    return $(
      '#root > div > div.editMembers_box__lyXvu > form > div.editMembers_formBtns__sAOST > button'
    );
  }
  // Delete member
  get deleteBtn() {
    return $(
      '#root > section > section > table > tbody > tr:nth-child(4) > td:nth-child(7) > button'
    );
  }
  get confirmDelete() {
    return $(
      '#root > section > section > table > div > div > div.modal_modalChildren__VqxkB > button.button_btn__HDsEA.button_delete__75Ds9'
    );
  }
}
module.exports = new MemberCrud();
