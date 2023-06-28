/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const MemberSubscriptions = require('../pageobjects/member.subscriptions');

describe('Go to the Members section', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/members/home/profile');
  });

  it('Click on the Subscriptions button', async () => {
    await expect(MemberSubscriptions.memberLogo).toBeDisplayed();
    await expect(MemberSubscriptions.memberNav).toBeDisplayed();
    await MemberSubscriptions.memberSubscriptionsButtonClick();
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/members/home/subscriptions'
    );
  });
});

describe('Delete a Subscription', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/members/home/subscriptions');
  });

  it('Click on the Delete icon and delete the Subscription', async () => {
    await expect(MemberSubscriptions.deleteSubscriptionButton).toBeDisplayed();
    await MemberSubscriptions.deleteSubscriptionButtonClick();
    await expect(MemberSubscriptions.deleteModalConfirm).toBeDisplayed();
    await MemberSubscriptions.deleteSubscriptionButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/members/home/subscriptions'
    );
  });
});
