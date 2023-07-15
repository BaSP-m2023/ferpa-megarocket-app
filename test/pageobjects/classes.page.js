/* eslint-disable no-undef */
class ClassesPage {
  //classes
  get formClasses() {
    return $("[data-testid='class-add-edit-container']");
  }
  get addformClassesFirst() {
    return $("[data-testid='class-add-edit-container'] div:nth-child(1) select");
  }
  get formClassesFirstLabel() {
    return $("[data-testid='class-add-edit-container'] div:nth-child(1) label");
  }
  get addformClassesSecond() {
    return $("[data-testid='activities-editform'] div:nth-child(2) textarea");
  }
  get addformClassesThird() {
    return $("[data-testid='activities-editform'] div:nth-child(3) input");
  }
  get formActivitieThirdLabel() {
    return $("[data-testid='activities-editform'] div:nth-child(3) label");
  }
}
module.exports = new ClassesPage();
