export default class ErrorPermissions {
  constructor() {
    this.closePermissionError = this.closePermissionError.bind(this);
    this.init();
  }

  init() {
    this.drawPermissionError()
  }

  drawPermissionError() {
    this.wrapperErrorPermission = document.createElement('div');
    this.wrapperErrorPermission.classList.add('wrapper-error-permissions', 'disable');
    this.wrapperErrorPermission.innerHTML = `
    <div class="permissions-error">
      <p class='permissions-error-text'>
        Ваш браузер не поддерживает функцию записи видео и аудио или данным функциям не были даны соответствующие разрешения.
      </p>
      <p class='permissions-error-text'>
        Выбанйте разрешение на использование данных функций или используйте другой браузер.
      </p>
      <button class='permissions-error-button'>Закрыть сообщение</button>
  </div>`;
  document.body.appendChild(this.wrapperErrorPermission);

  this.permissionsErrorText = this.wrapperErrorPermission.querySelector('.permissions-error-text');
  this.permissionsErrorButton = this.wrapperErrorPermission.querySelector('.permissions-error-button');
  this.permissionsErrorButton.onclick = this.closePermissionError;
  }

  openPermissionError() {
    this.wrapperErrorPermission.classList.remove('disable');

  }

  closePermissionError() {
    this.wrapperErrorPermission.classList.add('disable');
  }

}