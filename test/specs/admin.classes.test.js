/* eslint-disable prettier/prettier */
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
    await expect(AdminClasses.addClassForm).toBeDisplayed();
  });

  it('Select the options on the inputs', async () => {
    await expect(AdminClasses.addClassDayInput).toBeDisplayed();
    await AdminClasses.addClassDayInputClick();
    await expect(AdminClasses.addClassDayInputOption1).toBeDisplayed();
    await AdminClasses.addClassDayInputOption1Click();

    await expect(AdminClasses.addClassHourInput).toBeDisplayed();
    await AdminClasses.addClassHourInputClick();
    await expect(AdminClasses.addClassHourInputOption1).toBeDisplayed();
    await AdminClasses.addClassHourInputOption1Click();

    await expect(AdminClasses.addClassActivityInput).toBeDisplayed();
    await AdminClasses.addClassActivityInputClick();
    await expect(AdminClasses.addClassActivityInputOption1).toBeDisplayed();
    await AdminClasses.addClassActivityInputOption1Click();

    await expect(AdminClasses.addClassTrainerInput).toBeDisplayed();
    await AdminClasses.addClassTrainerInputClick();
    await expect(AdminClasses.addClassTrainerInputOption1).toBeDisplayed();
    await AdminClasses.addClassTrainerInputOption1Click();

    await expect(AdminClasses.addClassSlotsInput).toBeDisplayed();
    await AdminClasses.addClassSlotsInputClick();
    await expect(AdminClasses.addClassSlotsInputOption1).toBeDisplayed();
    await AdminClasses.addClassSlotsInputOption1Click();
  });

  it('Add the new Class and redirect to Classes page', async () => {
    await expect(AdminClasses.addClassButtonAdd).toBeDisplayed();
    await AdminClasses.addClassButtonAddClick();
    await expect(AdminClasses.addClassModalSuccess).toBeDisplayed();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admins/home/classes');
  });
});

describe('Delete a Class', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/classes');
  });

  it('Click on the Delete icon and delete the Class', async () => {
    await expect(AdminClasses.deleteClassButton).toBeDisplayed();
    await AdminClasses.deleteClassButtonClick();
    await expect(AdminClasses.deleteModalConfirm).toBeDisplayed();
    await AdminClasses.deleteClassButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admins/home/classes');
  });
});

describe('Update a Class', () => {
  beforeAll('Open browser', () => {
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/classes');
  });

  it('Click on the Update icon, change an input data & Update the Class', async () => {
    await expect(AdminClasses.updateClassButton).toBeDisplayed();
    await AdminClasses.updateClassButtonClick();
    await expect(AdminClasses.updateClassForm).toBeDisplayed();

    await expect(AdminClasses.addClassDayInput).toBeDisplayed();
    await AdminClasses.addClassDayInputClick();
    await expect(AdminClasses.addClassDayInputOption2).toBeDisplayed();
    await AdminClasses.addClassDayInputOption2Click();

    await expect(AdminClasses.addClassButtonAdd).toBeDisplayed();
    await AdminClasses.addClassButtonAddClick();
    await expect(AdminClasses.addClassModalSuccess).toBeDisplayed();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admins/home/classes');
  });
});
