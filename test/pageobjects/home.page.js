/* eslint-disable no-undef */
class HomePage {
  get landing() {
    return $("[data-testid='landing-container']");
  }
}
module.exports = new HomePage();
