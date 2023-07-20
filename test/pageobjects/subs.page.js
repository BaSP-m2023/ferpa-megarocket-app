/* eslint-disable no-undef */
class SubsPage {
  //sheared component
  get deleteBtn() {
    return $("[data-testid='delete-btn']");
  }
  get addBtn() {
    return $("[data-testid='add-btn']");
  }
  get subsForm() {
    return $("[data-testid='subs-add-container']");
  }
  get containerForm() {
    return $("[data-testid='subs-table-container']");
  }
  get firstLabel() {
    return $("[data-testid='subs-add-container'] div:nth-child(1) label");
  }
  get firstSelect() {
    return $("[data-testid='subs-add-container'] div:nth-child(1) select");
  }
  get secondLabel() {
    return $("[data-testid='subs-add-container'] div div:nth-child(2) label");
  }
  get secondSelect() {
    return $("[data-testid='subs-add-container'] div div:nth-child(2) select");
  }
}
module.exports = new SubsPage();
