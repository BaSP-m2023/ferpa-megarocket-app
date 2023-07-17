/* eslint-disable no-undef */
import addActivity from '../pageobjects/activities.post';
import LoginPage from '../pageobjects/login.page';

describe('Login Process', () => {
  beforeAll(async () => {
    await browser.url('https://ferpa-megarocket-app.vercel.app/home');
  });
  it('Verify Login', async () => {
    await addActivity().toBeDisplayed();
    await LoginPage.loginValues('admin@gmail.com', 'Admin123');
    await LoginPage.loginBtn.click();
  });
});

describe('Create an activity', () => {
  it('should create an activity successfully', async () => {
    await addActivity.activityBtn.click();
    await addActivity.addBtn.click();
  });
  it('fillForm', async () => {
    await addActivity.activityName.setValue('Boxing');
    await addActivity.addDescription.setValue(
      'Boxing is a combat sport and a martial art in which two people, usually wearing protective gloves and other protective equipment'
    );
    await addActivity.isActive.click();
    await addActivity.addBtn.click();
  });
});
