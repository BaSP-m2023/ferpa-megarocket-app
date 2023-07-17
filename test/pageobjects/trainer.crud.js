/* eslint-disable no-undef */
class TrainerCrud {
  get trainerBtn() {
    return $('#root > header > nav > ul > a.nav_link__rYLMY.nav_linkFocused__IQMZN > li');
  }
  // Create Trainer
  get addBtn() {
    return $('[data-testid="add-btn"]');
  }
  get firstName() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(1) > div:nth-child(1) > input'
    );
  }
  get lastName() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(1) > div:nth-child(2) > input'
    );
  }
  get dni() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(1) > div:nth-child(3) > input'
    );
  }
  get phone() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(1) > div:nth-child(4) > input'
    );
  }
  get email() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(2) > div:nth-child(1) > input'
    );
  }
  get city() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(2) > div:nth-child(2) > input'
    );
  }
  get salary() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(2) > div:nth-child(3) > input'
    );
  }
  get password() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_row__LFBMB > div:nth-child(2) > div:nth-child(4) > input'
    );
  }
  get activities() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_select__1LxDh.form_wideSelect__ipdqV > div > div > div.css-hlgwow > div.css-19bb58m'
    );
  }
  get selectActivity() {
    return $(
      '#root > div > div > form > div.form_field__98sx1 > div.form_select__1LxDh.form_wideSelect__ipdqV > div > div > div.css-1dyz3mf > div.css-1p3m7a8-multiValue > div.css-9jq23d'
    );
  }
  get addTrainer() {
    return $('#root > div > div > form > div.form_buttons__+AYNj > button');
  }
  // Edit Trainer
  get editBtn() {
    return $('[data-testid="edit-btn"]');
  }
  get confirmEdit() {
    return $('[data-testid="add-edit-btn"]');
  }
  // Delete Trainer
  get deleteBtn() {
    return $('[data-testid="delete-btn"]');
  }
  get confirmDelete() {
    return $('[data-testid="confirm-btn"]');
  }
}
module.exports = new TrainerCrud();
