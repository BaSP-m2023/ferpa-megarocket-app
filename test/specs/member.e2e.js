const ShearedComponents = require('../pageobjects/sheared.components');
const LoginPage = require('../pageobjects/login.page');
const MemberPages = require ('../pageobjects/member.pages')

describe('E2E Member', () => {
  beforeAll(() => {
    browser.url('https://ferpa-megarocket-app.vercel.app/home');
  });

  it('Login with Member credentials.', async () => {
    await expect(ShearedComponents.sandwich).toBeDisplayed();

    await ShearedComponents.loginClick();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/home/login');
    await ShearedComponents.closeSandwichBtn.click();

    await expect(LoginPage.loginForm).toBeDisplayed();
    await expect(LoginPage.loginFormChild).toHaveTextContaining('LOGIN');
    await expect(LoginPage.continueBtn).toBeDisplayed();

    await expect(LoginPage.loginFormFirstChild).toBeDisplayed();
    await browser.pause(1000);
    await LoginPage.loginFormFirstChild.setValue('dany_lezama@hotmail.com');

    await LoginPage.loginFormSecondChild.waitForDisplayed();
    await browser.pause(1000);
    await LoginPage.loginFormSecondChild.setValue('Dany123');

    await browser.pause(1000);
    await LoginPage.continueBtnClick();
  });

  it('Check Member navigation', async () => {
    await expect(MemberPages.memberLogo).toBeDisplayed();
    await expect(MemberPages.memberNav).toBeDisplayed();
    await expect(MemberPages.memberProfileButton).toBeDisplayed();
    await MemberPages.memberProfileButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/members/home/profile');
    await expect(MemberPages.memberScheduleButton).toBeDisplayed();
    await MemberPages.memberScheduleClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/member/schedule');
    await expect(MemberPages.memberActivitiesButton).toBeDisplayed();
    await MemberPages.memberActivitiesClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/members/home/activities');
  });

  it('Edit Member profile information', async () => {
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/member/profile');
    await MemberPages.editMemberBtnClick();
    await browser.pause(1000);
    await expect(MemberPages.formEditMember).toBeDisplayed();

    await browser.pause(1000);
    await MemberPages.editMemberNameInput.waitForDisplayed();
    await expect(MemberPages.editMemberNameLabel).toHaveTextContaining('First Name');
    await MemberPages.editMemberNameInput.setValue('Jacinta');

    await browser.pause(1000);
    await MemberPages.editMemberLastNameInput.waitForDisplayed();
    await expect(MemberPages.editMemberLastNameLabel).toHaveTextContaining('Last Name');
    await MemberPages.editMemberLastNameInput.setValue('Perez');

    await browser.pause(1000);
    await MemberPages.editMemberDniInput.waitForDisplayed();
    await expect(MemberPages.editMemberDniLabel).toHaveTextContaining('DNI');
    await MemberPages.editMemberDniInput.setValue('33999666');

    await browser.pause(1000);
    await MemberPages.editMemberPhoneInput.waitForDisplayed();
    await expect(MemberPages.editMemberPhoneLabel).toHaveTextContaining('Phone');
    await MemberPages.editMemberPhoneInput.setValue('3419999999');

    await browser.pause(1000);
    await MemberPages.editMemberEmailInput.waitForDisplayed();
    await expect(MemberPages.editMemberEmailLabel).toHaveTextContaining('Email');
    await MemberPages.editMemberEmailInput.setValue('jacinta@gmail.com');

    await browser.pause(1000);
    await MemberPages.editMemberCityInput.waitForDisplayed();
    await expect(MemberPages.editMemberCityLabel).toHaveTextContaining('City');
    await MemberPages.editMemberCityInput.setValue('Rosario');

    await browser.pause(1000);
    await MemberPages.editMemberBirthInput.waitForDisplayed();
    await expect(MemberPages.editMemberBirthLabel).toHaveTextContaining('Birthday');
    await MemberPages.editMemberBirthInput.setValue('05071995');

    await browser.pause(1000);
    await MemberPages.editMemberZipInput.waitForDisplayed();
    await expect(MemberPages.editMemberZipLabel).toHaveTextContaining('Zip Code');
    await MemberPages.editMemberZipInput.setValue('4321');

    await browser.pause(1000);
    await MemberPages.memberEditBtnConfirmClick();
  });

  it('Member Schedule, subscribe to a class and unsubscribe', async () => {
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/member/schedule');
    await expect(MemberPages.memberScheduleForm).toBeDisplayed();
    await expect(MemberPages.memberScheduleGlossary).toBeDisplayed();

    await expect(MemberPages.memberCrossfitClass).toBeDisplayed();
    await MemberPages.memberCrossfitClassClick();
    await browser.pause(1000);
    await MemberPages.memberClassSubscribeModal.waitForDisplayed();
    await expect(MemberPages.memberClassSubscribeBtn).toBeDisplayed();
    await MemberPages.memberClassSubscribeBtnClick();
    await browser.pause(1000);
    await expect(MemberPages.memberClassSuccessModal).toBeDisplayed();

    await MemberPages.memberCrossfitClassClick();
    await browser.pause(1000);
    await MemberPages.memberClassUnsubscribeModal.waitForDisplayed();
    await expect(MemberPages.memberClassUnsubscribeBtn).toBeDisplayed();
    await MemberPages.memberClassUnsubscribeBtnClick();
    await browser.pause(1000);
    await expect(MemberPages.memberClassSuccessModal).toBeDisplayed();
  });

  it('Check Activities displayed for Members', async () => {
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/member/activities');
    await expect(MemberPages.memberActivitiesContainer).toBeDisplayed();

    await expect(MemberPages.memberActivity1).toBeDisplayed();
    await expect(MemberPages.memberActivity1Description).toBeDisplayed();
    await expect(MemberPages.memberActivity1Image).toBeDisplayed();

    await expect(MemberPages.memberActivity2).toBeDisplayed();
    await expect(MemberPages.memberActivity2Description).toBeDisplayed();
    await expect(MemberPages.memberActivity2Image).toBeDisplayed();

    await expect(MemberPages.memberActivity3).toBeDisplayed();
    await expect(MemberPages.memberActivity3Description).toBeDisplayed();
    await expect(MemberPages.memberActivity3Image).toBeDisplayed();

    await expect(MemberPages.memberActivity4).toBeDisplayed();
    await expect(MemberPages.memberActivity4Description).toBeDisplayed();
    await expect(MemberPages.memberActivity4Image).toBeDisplayed();

    await expect(MemberPages.memberActivity5).toBeDisplayed();
    await expect(MemberPages.memberActivity5Description).toBeDisplayed();
    await expect(MemberPages.memberActivity5Image).toBeDisplayed();
  });
});