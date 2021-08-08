import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawVideoPost {
  drawNewItemVideo(pos, video, parent) {
    const li = document.createElement('li');
    li.classList.add('item-post');
    li.innerHTML = `<div class="post-content-block">
                      <video class="video" controls></video>
                      <div class="post-content-coord"></div>
                    </div>
                    <div class="post-date-block"></div>`;
    parent.appendChild(li);
    const postContent = li.querySelector('.video');
    postContent.textContent = video;
    const postContentCoord = li.querySelector('.post-content-coord');
    const { latitude, longitude } = pos;
    postContentCoord.textContent = `[${latitude}, -${longitude}]`;
    const postDateBlock = li.querySelector('.post-date-block');
    postDateBlock.textContent = moment().format('DD.MM.YYYY HH:mm');
  }
}