
export default class ErrorBlock {
  constructor() {
    this.validationError = null;
    this.init();
  }

  init() {
    this.drawError();
    this.input.addEventListener('focus', () => {
      console.log('focus')
      this.removeValidationError();
    })
  }

  drawError() {
    this.blockError = document.createElement('div');
    this.blockError.classList.add('wrapper-error-coord', 'disable');
    this.blockError.innerHTML =`<div class="error-coord">
                            <div class="error-desc">
                              <p class="error-text">Что-то пошло не так</p>
                              <p class="error-text">К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p>
                            </div>
                            <form class='form-error'>
                              <div>
                                <div class="block-input-coord">
                                  <label for="coord" class="label-coord">
                                    Широта и долгота через запятую:
                                  </label>
                                  <input type="text" name="coord" class="input-coord">
                                </div>
                                <div class="validation-error disable">
                                </div>
                              </div>
                              <div class="block-buttons">
                                <button class="button-form-error error-cancel">Отмена</button>
                                <button class="button-form-error error-submit">ОК</button>
                              </div>
                            </form>
                          </div>`;
    document.body.appendChild(this.blockError);
    this.form = this.blockError.querySelector('.form-error');
    this.blockInputCoord = this.blockError.querySelector('.block-input-coord')
    this.input = this.blockError.querySelector('.input-coord');
    this.errorInput = this.blockError.querySelector('.validation-error');
  }

  showError() {
    this.blockError.classList.remove('disable');
  }

  hideError() {
    this.form.reset();
    this.blockError.classList.add('disable');
  }

  checkInputText(data) {
    if (data.trim() === '') {
      return false;
    }

    let value = data.replace(/[,*+?^${}()|[\]\\]/g, ' ').split('-').map(item => item.trim());

    if (value.length > 2) {
      return false;
    }

    const existIsNaN = value.find(i => isNaN(Number(i)) )
    if (existIsNaN) {
      return false;
    }
    return {
        latitude: value[0],
        longitude: value[1],
      }
  }

  createValidationError(text) {
    this.errorInput.classList.remove('disable');
    this.input.classList.add('input-error');
    this.errorInput.style.top = this.input.offsetTop + this.input.offsetHeight + 'px';
    this.errorInput.style.left = this.input.offsetLeft + 'px';
    this.errorInput.textContent = text;
  } 

  removeValidationError() {
    this.errorInput.textContent = '';
    this.errorInput.classList.add('disable');
    this.input.classList.remove('input-error');
  } 
}