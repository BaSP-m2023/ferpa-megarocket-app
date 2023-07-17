/* eslint-disable no-undef */
class addActivity {
  get activityBtn() {
    return $('#root > header > nav > ul > a.nav_link__rYLMY.nav_linkFocused__IQMZN > li');
  }
  get addActivity() {
    return $('[data-testid="add-btn"]');
  }
  get activityName() {
    return $(
      '#root > div > div.routes_fullWidth__MwVnX > div > form > div > div:nth-child(1) > input'
    );
  }
  get addDescription() {
    return $(
      '#root > div > div.routes_fullWidth__MwVnX > div > form > div > div:nth-child(2) > textarea'
    );
  }
  get isActive() {
    return $(
      '#root > div > div.routes_fullWidth__MwVnX > div > form > div > div.form_checkboxField__6iX4X > input'
    );
  }
  get addBtn() {
    return $(
      '#root > div > div.routes_fullWidth__MwVnX > div > form > div > div.form_formBtns__AjKRN > button'
    );
  }
}
module.exports = new addActivity();
