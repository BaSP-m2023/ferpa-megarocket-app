/* eslint-disable no-undef */
class ClassesPage {
  //classes
  get formClasses() {
    return $("[data-testid='class-add-edit-container']");
  }
  get addformClassesFirst() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(1) select");
  }
  get formClassesFirstLabel() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(1) label");
  }
  get addformClassesSecond() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(2) select");
  }
  get formClassesSecondLabel() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(2) label");
  }
  get addformClassesThird() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(3) select");
  }
  get formClassesThirdLabel() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(3) label");
  }
  get addformClassesFourth() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(4) select");
  }
  get formClassesFourthLabel() {
    return $("[data-testid='class-add-edit-container'] div div:nth-child(4) label");
  }

  get addEditBtn() {
    return $("[data-testid='add-edit-btn']");
  }
  get addBtn() {
    return $("[data-testid='add-btn']");
  }
}
module.exports = new ClassesPage();
