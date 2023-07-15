/* eslint-disable no-undef */
class MemberPage {
  //sheared component
  get addBtn() {
    return $("[data-testid='add-btn']");
  }
  get memberForm() {
    return $("[data-testid='add-btn']");
  }
}
module.exports = new MemberPage();
