/* eslint-disable no-undef */
class AddSubscription {
  get logIn() {
    return $('#root > section > aside > div.aside_buttons__1hEx8 > a:nth-child(2) > h3');
  }
  get adminPage() {
    return $('#root > section > div > a:nth-child(3) > button');
  }
  get subscriptionBtn() {
    return $('#root > header > nav > ul > a:nth-child(6) > li');
  }
  get addSubs() {
    return $('[data-testid="add-btn"]');
  }
  get addMember() {
    return $('#root > section > form > div > div:nth-child(1) > select');
  }
  get addClass() {
    return $('#root > section > form > div > div:nth-child(2) > select');
  }
  get fillForm() {
    return $('#root > section > form > div > div:nth-child(1) > select > option:nth-child(6)');
  }
  get addBtn() {
    return $('[data-testid="add-btn"]');
  }
  get firstSelect() {
    return $('[data-testid="subs-add-container"] div div:nth-child(1) select');
  }
  get lastMember() {
    return $('[data-testid="subs-add-container"] div div:nth-child(1) option:last-child');
  }
  get secondSelect() {
    return $('[data-testid="subs-add-container"] div div:nth-child(2) select');
  }
  get lastClass() {
    return $('[data-testid="subs-add-container"] div div:nth-child(2) option:last-child');
  }
  get date() {
    return $('#root > section > form > div > div:nth-child(3) > input');
  }
  async loginValues(Member, Class) {
    await this.userNameInput.setValue(Member);
    await this.passwordInput.setValue(Class);
    await this.loginBtn.click();
  }
  async subsBtnClick() {
    await this.subscriptionBtn.click();
  }
  async addSubsClick() {
    await this.addSubs.click();
  }
  async addMemberClick() {
    await this.addMember.click();
  }
  async addClassClick() {
    await this.addClass.click();
  }
  async firstSelectClick() {
    await this.firstSelect.click();
  }
  async lastMemberClick() {
    await this.lastMember.click();
  }
  async secondSelectClick() {
    await this.secondSelect.click();
  }
  async lastClassClick() {
    await this.lastClass.click();
  }
  async dateClick() {
    await this.date.click();
  }
  async addBtnClick() {
    await this.addBtn.click();
  }
  open() {
    return browser.url('https://ferpa-megarocket-app.vercel.app/home');
  }
}
module.exports = new AddSubscription();
