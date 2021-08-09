export default class ErrorPermissions {
  constructor() {
    this.init();
  }

  init() {
    this.drawPermissionError()
  }

  drawPermissionError() {
    const wrapperErrorPermission = document.createElement('div');
    wrapperErrorPermission.classList.add('wrapper-error-permissions');
    

  }
}