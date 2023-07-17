/* eslint-disable no-undef */
class MemberPage {
  //sheared component
  get addBtn() {
    return $("[data-testid='add-btn']");
  }
  get confirmBtn() {
    return $("[data-testid='confirm-add-btn']");
  }
  get memberForm() {
    return $("[data-testid='member-add-form']");
  }
  get memberFormText() {
    return $("[data-testid='member-add-form'] h2");
  }
  get memberFirstChild() {
    return $("[data-testid='member-add-form'] div div div:nth-child(1) input");
  }
  get memberFirstChildLabel() {
    return $("[data-testid='member-add-form'] div div div:nth-child(1) label");
  }
  get memberSecondChild() {
    return $("[data-testid='member-add-form'] div div div:nth-child(2) input");
  }
  get memberSecondChildLabel() {
    return $("[data-testid='member-add-form'] div div div:nth-child(2) label");
  }
  get memberThirdChild() {
    return $("[data-testid='member-add-form'] div div div:nth-child(3) input");
  }
  get memberThirdChildLabel() {
    return $("[data-testid='member-add-form'] div div div:nth-child(3) label");
  }
  get memberFourthChild() {
    return $("[data-testid='member-add-form'] div div div:nth-child(4) input");
  }
  get memberFourthChildLabel() {
    return $("[data-testid='member-add-form'] div div div:nth-child(4) label");
  }
  get memberFifthhChild() {
    return $("[data-testid='member-add-form'] div div div:nth-child(5) input");
  }
  get memberFifthChildLabel() {
    return $("[data-testid='member-add-form'] div div div:nth-child(5) label");
  }
  get memberSixthhChild() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(1) input");
  }
  get memberSixthChildLabel() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(1) label");
  }
  get memberSeventhChild() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(2) input");
  }
  get memberSeventhChildLabel() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(2) label");
  }
  get memberEighthhChild() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(3) input");
  }
  get memberEighthChildLabel() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(3) label");
  }
  get memberNinethChild() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(4) select");
  }
  get memberNinethChildLabel() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(4) label");
  }
  // get memberTenthChild() {
  //   return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(5) label input");
  // }
  get memberTenthChildLabel() {
    return $("[data-testid='member-add-form'] div div:nth-child(2) div:nth-child(5) label");
  }
}
module.exports = new MemberPage();
