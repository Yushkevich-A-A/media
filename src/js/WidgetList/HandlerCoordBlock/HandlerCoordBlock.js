
export default class HandlerCoordBlock {
  constructor() {
  }

  init() {
    this.drawHandlerCoord();
    this.input.addEventListener('focus', () => {
      console.log('focus')
      this.removeValidationHandlerCoord();
    })
  }

  drawHandlerCoord() {
    this.blockHandlerCoord = document.createElement('div');
    this.blockHandlerCoord.classList.add('wrapper-handlercoord-coord', 'disable');
    this.blockHandlerCoord.innerHTML =`<div class="handlercoord-coord">
                            <div class="handlercoord-desc">
                              <p class="handlercoord-text">Что-то пошло не так</p>
                              <p class="handlercoord-text">К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p>
                            </div>
                            <form class='form-handlercoord'>
                              <div>
                                <div class="block-input-coord">
                                  <label for="coord" class="label-coord">
                                    Широта и долгота через запятую:
                                  </label>
                                  <input type="text" name="coord" class="input-coord">
                                </div>
                                <div class="validation-handlercoord disable">
                                </div>
                              </div>
                              <div class="block-buttons">
                                <button class="button-form-handlercoord handlercoord-cancel">Отмена</button>
                                <button class="button-form-handlercoord handlercoord-submit">ОК</button>
                              </div>
                            </form>
                          </div>`;
    document.body.appendChild(this.blockHandlerCoord);
    this.form = this.blockHandlerCoord.querySelector('.form-handlercoord');
    this.blockInputCoord = this.blockHandlerCoord.querySelector('.block-input-coord')
    this.input = this.blockHandlerCoord.querySelector('.input-coord');
    this.handlerCoordInput = this.blockHandlerCoord.querySelector('.validation-handlercoord');
  }

  showHandlerCoord() {
    this.blockHandlerCoord.classList.remove('disable');
  }

  hideHandlerCoord() {
    this.form.reset();
    this.blockHandlerCoord.classList.add('disable');
  }

  checkInputText(data) {
    if (data.trim() === '') {
      return false;
    }

    let value = data.replace(/[*+?^${}()|[\]\\]/g, ' ').replace(/[−]/g, '-').split(',').map(item => item.trim());

    if (value.length !== 2) {
      return false;
    }

    const existIsNaN = value.find(i => isNaN(Number(i)) )
    if (existIsNaN) {
      return false;
    }
    return {
        latitude: Number(value[0]),
        longitude: Number(value[1]),
      }
  }

  createValidationHandlerCoord(text) {
    this.handlerCoordInput.classList.remove('disable');
    this.input.classList.add('input-handlercoord');
    this.handlerCoordInput.style.top = this.input.offsetTop + this.input.offsetHeight + 'px';
    this.handlerCoordInput.style.left = this.input.offsetLeft + 'px';
    this.handlerCoordInput.textContent = text;
  } 

  removeValidationHandlerCoord() {
    this.handlerCoordInput.textContent = '';
    this.handlerCoordInput.classList.add('disable');
    this.input.classList.remove('input-handlercoord');
  } 
}