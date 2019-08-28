type AlertType = 'info' | 'warn' | 'error' | 'success';

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void;
};

export default class AlertHelper {
  static dropDown: DropdownType;

  static setDropDown(dropDown: DropdownType) {
    this.dropDown = dropDown;
  }

  static show(type: AlertType, title: string, message: string) {
    this.dropDown.alertWithType(type, title, message);
  }
}
