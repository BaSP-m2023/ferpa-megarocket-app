/* eslint-disable no-undef */
class TrainerPage {
  //buttons
  get deleteBtn() {
    return $("[data-testid='delete-btn']");
  }
  get addBtn() {
    return $("[data-testid='add-btn']");
  }
  get cancelBtn() {
    return $("[data-testid='cancel-btn']");
  }
  get editBtn() {
    return $("[data-testid='edit-btn']");
  }
  get addEditBtn() {
    return $("[data-testid='add-edit-btn']");
  }
  get logoutBtn() {
    return $("[data-testid='logout-logo']");
  }
  //form
  get trainerForm() {
    return $("[data-testid='trainer-form-container']");
  }
  //agregar los nth-child
}
module.exports = new TrainerPage();
