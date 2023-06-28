/* eslint-disable no-undef */
class MemberSubscriptions {
  get memberLogo() {
    return $('[data-testid="header-logo"]');
  }

  get memberNav() {
    return $('[data-testid="nav-container"]');
  }

  get memberProfileButton() {
    return $('[data-testid="nav-container"] ul a:nth-child(1)');
  }

  async memberProfileButtonClick() {
    await this.memberProfileButton.click();
  }

  get memberClassesButton() {
    return $('[data-testid="nav-container"] ul a:nth-child(2)');
  }

  async memberClassesButtonClick() {
    await this.memberClassesButton.click();
  }

  get memberSubscriptionsButton() {
    return $('[data-testid="nav-container"] ul a:nth-child(3)');
  }

  async memberSubscriptionsButtonClick() {
    await this.memberSubscriptionsButton.click();
  }

  get memberActivitiesButton() {
    return $('[data-testid="nav-container"] ul a:nth-child(4)');
  }

  async memberActivitiesButtonClick() {
    await this.memberActivitiesButton.click();
  }

  get deleteSubscriptionButton() {
    return $('[data-testid="delete-btn"]');
  }

  async deleteSubscriptionButtonClick() {
    await this.deleteSubscriptionButton.click();
  }

  get deleteModalConfirm() {
    return $('[data-testid="confirm-modal"]');
  }
}

module.exports = new MemberSubscriptions();
