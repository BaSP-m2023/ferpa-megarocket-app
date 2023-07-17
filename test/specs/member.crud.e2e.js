/* eslint-disable no-undef */
import LoginPage from '../pageobjects/login.page';
import MemberCrud from '../pageobjects/member.crud';

describe('CRUD Member', () => {
  beforeAll(async () => {
    await browser.url('https://ferpa-megarocket-app.vercel.app/home');
  });
  describe('Login Process', () => {
    it('Verify Login', async () => {
      await MemberCrud().toBeDisplayed();
      await LoginPage.loginValues('admin@gmail.com', 'Admin123');
    });
  });

  describe('Create a Member', () => {
    it('Should create a member successfully', async () => {
      await MemberCrud.membersBtn.click();
      await MemberCrud.addMember.click();
    });
    it('Fill form', async () => {
      await MemberCrud.firstName.setValue('Eliezer');
      await MemberCrud.lastName.setValue('Alberth');
      await MemberCrud.dni.setValue('12345678');
      await MemberCrud.phone.setValue('3411234567');
      await MemberCrud.email.setValue('eliezer@alberth.com');
      await MemberCrud.city.setValue('Rosario');
      await MemberCrud.birthDay.setValue('14/02/1995');
      await MemberCrud.zipCode.setValue('2000');
      await MemberCrud.membership.click();
      await MemberCrud.lastMembership.click();
      await MemberCrud.isActive.click();
      await MemberCrud.addBtn.click();
    });
  });

  describe('Edit a Member', () => {
    it('Should edit a member successfully', async () => {
      await MemberCrud.editBtn.click();
      await MemberCrud.lastName.setValue('Alberto');
      await MemberCrud.confirmEdit.click();
    });
  });

  describe('Delete a Member', () => {
    it('Should delete a member successfully', async () => {
      await MemberCrud.deleteBtn.click();
      await MemberCrud.confirmDelete.click();
    });
  });
});
