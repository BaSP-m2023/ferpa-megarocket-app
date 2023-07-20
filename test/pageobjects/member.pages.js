/* eslint-disable no-undef */
class MemberPages{
  get memberLogo() {
    return $('[data-testid="header-logo"]');
  }

  get memberNav() {
    return $('[data-testid="nav-container"]');
  }

  get memberProfileButton() {
    return $('[data-testid="member-profile"]');
  }

  async memberProfileButtonClick() {
    await this.memberProfileButton.click();
  }

  get memberScheduleButton() {
    return $('[data-testid="member-schedule"]');
  }

  async memberScheduleButtonClick() {
    await this.memberScheduleButton.click();
  }

  get memberActivitiesButton() {
    return $('[data-testid="member-activities"]');
  }

  async memberActivitiesButtonClick() {
    await this.memberActivitiesButton.click();
  }

  get formMember() {
    return $('[data-testid="member-profile-container"]');
  }

  get formEditMember() {
    return $('[data-testid="member-editform-container"]');
  }

  get editMemberBtn() {
    return $('[data-testid="edit-btn"]');
  }

  async editMemberBtnClick() {
    await this.editMemberBtn.click();
  }

  get editMemberNameInput() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(1) input');
  }

  get editMemberNameLabel() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(1) label');
  }

  get editMemberLastNameInput() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(2) input');
  }

  get editMemberLastNameLabel() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(2) label');
  }

  get editMemberDniLabel() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(3) label');
  }

  get editMemberDniInput() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(3) input');
  }

  get editMemberPhoneInput() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(4) input');
  }

  get editMemberPhoneLabel() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(4) label');
  }

  get editMemberEmailLabel() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(5) label');
  }

  get editMemberEmailInput() {
    return $('[data-testid="member-editform-container"] div:nth-child(1) div:nth-child(5) input');
  }

  get editMemberCityInput() {
    return $('[data-testid="member-editform-container"] div div:nth-child(2) div:nth-child(1) input');
  }

  get editMemberCityLabel() {
    return $('[data-testid="member-editform-container"] div div:nth-child(2) div:nth-child(1) label');
  }

  get editMemberBirthLabel() {
    return $('[data-testid="member-editform-container"] div div:nth-child(2) div:nth-child(2) label');
  }

  get editMemberBirthInput() {
    return $('[data-testid="member-editform-container"] div div:nth-child(2) div:nth-child(2) input');
  }

  get editMemberZipInput() {
    return $('[data-testid="member-editform-container"] div div:nth-child(2) div:nth-child(3) input');
  }

  get editMemberZipLabel() {
    return $('[data-testid="member-editform-container"] div div:nth-child(2) div:nth-child(3) label');
  }

  get memberEditBtnConfirm() {
    return $('[data-testid="confirm-edit-btn"]');
  }

  async memberEditBtnConfirmClick() {
    await this.memberEditBtnConfirm.click();
  }

  get memberScheduleForm() {
    return $('[data-testid="schedule-container"]');
  }
  get memberScheduleGlossary() {
    return $('[data-testid="schedule-glossary"]');
  }

  get memberCrossfitClass() {
    return $('[data-testid="schedule-activities"] tr:nth-child(4) td:nth-child(3)');
  }

  async memberCrossfitClassClick() {
    await this.memberCrossfitClass.click();
  }

  get memberClassSubscribeModal() {
    return $('section div:nth-child(2) div');
  }

  get memberClassUnsubscribeModal() {
    return $('[data-testid="delete-subs-modal"]');
  }

  get memberClassSubscribeBtn() {
    return $('section div:nth-child(2) div:nth-child(3) button:nth-child(2)');
  }

  async memberClassSubscribeBtnClick() {
    await this.memberClassSubscribeBtn.click();
  }

  get memberClassSuccessModal() {
    return $('[data-testid="success-modal"]');
  }

  get memberClassUnsubscribeBtn() {
    return $('section div:nth-child(2) div:nth-child(3) button:nth-child(2)');
  }

  async memberClassUnsubscribeBtnClick() {
    await this.memberClassUnsubscribeBtn.click();
  }

  get memberActivitiesContainer() {
    return $('section div');
  }

  get memberActivity1() {
    return $('section div div:nth-child(1)');
  }

  get memberActivity1Image() {
    return $('section div div:nth-child(1) div:nth-child(1)');
  }
  get memberActivity1Description() {
    return $('section div div:nth-child(1) div:nth-child(2)');
  }

  get memberActivity2() {
    return $('section div div:nth-child(2)');
  }

  get memberActivity2Image() {
    return $('section div div:nth-child(2) div:nth-child(1)');
  }
  get memberActivity2Description() {
    return $('section div div:nth-child(2) div:nth-child(2)');
  }

  get memberActivity3() {
    return $('section div div:nth-child(3)');
  }

  get memberActivity3Image() {
    return $('section div div:nth-child(3) div:nth-child(1)');
  }
  get memberActivity3Description() {
    return $('section div div:nth-child(3) div:nth-child(2)');
  }

  get memberActivity4() {
    return $('section div div:nth-child(4)');
  }

  get memberActivity4Image() {
    return $('section div div:nth-child(4) div:nth-child(1)');
  }
  get memberActivity4Description() {
    return $('section div div:nth-child(4) div:nth-child(2)');
  }

  get memberActivity5() {
    return $('section div div:nth-child(5)');
  }

  get memberActivity4Image() {
    return $('section div div:nth-child(5) div:nth-child(1)');
  }
  get memberActivity4Description() {
    return $('section div div:nth-child(5) div:nth-child(2)');
  }


}

module.exports = new MemberPages();
