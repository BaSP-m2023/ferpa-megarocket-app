/* eslint-disable no-undef */
const AdminClasses = require('../pageobjects/admin.classes');

describe('Go to the Admins section', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/profile');
  });

  it('Click on the classes button', async () => {
    await expect(AdminClasses.adminLogo).toBeDisplayed();
    await expect(AdminClasses.adminClassesButton).toBeDisplayed();
    await AdminClasses.adminClassesButtonClick();
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admins/home/classes');
  });
});

describe('Create a new Class', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/classes');
  });

  it('Click on the ADD button on the Classes section', async () => {
    await expect(AdminClasses.addClassButton).toBeDisplayed();
    await AdminClasses.addClassButtonClick();
    await expect(AdminClasses.addClassModal).toBeDisplayed();
  });

  it('Select the options on the inputs', async () => {});
});
