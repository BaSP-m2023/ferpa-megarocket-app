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
  get confirmBtn() {
    return $("[data-testid='confirm-btn']");
  }
  //form
  get trainerForm() {
    return $("[data-testid='trainer-form-container']");
  }
  get firstChild() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(1) input"
    );
  }
  get firstChildLabel() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(1) label"
    );
  }
  get secondChild() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(2) input"
    );
  }
  get secondChildLabel() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(2) label"
    );
  }
  get thirdChild() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(3) input"
    );
  }
  get thirdChildLabel() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(3) label"
    );
  }
  get fourthChild() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(4) input"
    );
  }
  get fourthChildLabel() {
    return $(
      "[data-testid='trainer-form-container'] div div div:nth-child(1) div:nth-child(4) label"
    );
  }
  get fifthChild() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(1) input");
  }
  get fifthChildLabel() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(1) label");
  }
  get sixthChild() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(2) input");
  }
  get sixthChildLabel() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(2) label");
  }
  get seventhChild() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(3) input");
  }
  get seventhChildLabel() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(3) label");
  }
  get eighthChild() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(4) input");
  }
  get eighthChildLabel() {
    return $("[data-testid='trainer-form-container'] div:nth-child(2) div:nth-child(4) label");
  }
  get lastChild() {
    return $("[data-testid='trainer-form-container'] div:nth-child(3) div:nth-child(2)");
  }
}

module.exports = new TrainerPage();
