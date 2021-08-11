import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawTextPost {
  constructor() {
    this.handlerCoord = null;
  }

  drawNewItemText(pos, text, parent) {
    const li = document.createElement('li');
    li.classList.add('li-item-post');
    li.innerHTML = `<div class="item-post">
                      <div class="post-content-block">
                        <p class="post-content-text"></p> 
                        <div class="post-content-coord"></div>
                      </div>
                      <div class="post-date-block"></div>
                    </div>`;
    parent.insertAdjacentElement('afterBegin', li);
    const postContentText = li.querySelector('.post-content-text');
    postContentText.textContent = text;
    const postContentCoord = li.querySelector('.post-content-coord');
    const { latitude, longitude } = pos;
    postContentCoord.textContent = `[${latitude}, ${longitude}]`;
    const postDateBlock = li.querySelector('.post-date-block');
    postDateBlock.textContent = moment().format('DD.MM.YYYY HH:mm');
  }
}
