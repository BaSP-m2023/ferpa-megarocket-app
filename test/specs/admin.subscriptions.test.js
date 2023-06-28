/* eslint-disable no-undef */
const AdminSubs = require('../pageobjects/admin.subscriptions');

describe('Go to the Admins section', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/profile');
  });

  it('Click on the Subscription button', async () => {
    await expect(AdminSubs.adminLogo).toBeDisplayed();
    await expect(AdminSubs.adminSubsButton).toBeDisplayed();
    await AdminSubs.adminSubsButtonClick();
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/admins/home/subscriptions'
    );
  });
});

describe('Create a new Subscription', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/subscriptions');
  });

  it('Click on the ADD button on the Subscriptions section', async () => {
    await expect(AdminSubs.addSubsButton).toBeDisplayed();
    await AdminSubs.addSubsButtonClick();
    await expect(AdminSubs.addSubsForm).toBeDisplayed();
  });

  it('Select the options on the inputs', async () => {
    await expect(AdminSubs.addSubsMemberInput).toBeDisplayed();
    await AdminSubs.addSubsMemberInputClick();
    await expect(AdminSubs.addSubsMemberInputOption1).toBeDisplayed();
    await AdminSubs.addSubsMemberInputOption1Click();

    await expect(AdminSubs.addSubsClassInput).toBeDisplayed();
    await AdminSubs.addSubsClassInputClick();
    await expect(AdminSubs.addSubsClassInputOption1).toBeDisplayed();
    await AdminSubs.addSubsClassInputOption1Click();

    await expect(AdminSubs.addSubsDateInput).toBeDisplayed();
    await AdminSubs.addSubsDateInputClick();
    await AdminSubs.enterDate('29062023');
  });

  it('Add the new Subscription and redirect to Subscriptions page', async () => {
    await expect(AdminSubs.addSubsButton).toBeDisplayed();
    await AdminSubs.addSubsButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/admins/home/subscriptions'
    );
  });
});

describe('Delete a Subscription', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/subscriptions');
  });

  it('Click on the Delete icon and delete the Subscription', async () => {
    await expect(AdminSubs.deleteSubsButton).toBeDisplayed();
    await AdminSubs.deleteSubsButtonClick();
    await expect(AdminSubs.deleteModalConfirm).toBeDisplayed();
    await AdminSubs.deleteSubsButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/admins/home/subscriptions'
    );
  });
});

describe('Update a Subscription', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/Subscription');
  });

  it('Click on the Update icon, change an input data & Update the Subscription', async () => {
    await expect(AdminSubs.updateSubsButton).toBeDisplayed();
    await AdminSubs.updateSubsButtonClick();
    await expect(AdminSubs.addSubsDateInput).toBeDisplayed();
    await AdminSubs.addSubsDateInputClick();
    await AdminSubs.enterDate('30062023');
    await expect(AdminSubs.addSubsButton).toBeDisplayed();
    await AdminSubs.addSubsButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/admins/home/Subscription'
    );
  });
});
