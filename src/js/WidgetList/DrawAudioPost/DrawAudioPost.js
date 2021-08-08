import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawAudioPost {
  drawNewItemAudio(pos, audio, parent) {
    console.log(audio);
    const li = document.createElement('li');
    li.classList.add('item-post');
    li.innerHTML = `<div class="post-content-block">
                      <audio class="audio" controls></audio> 
                      <div class="post-content-coord"></div>
                    </div>
                    <div class="post-date-block"></div>`;
    parent.appendChild(li);
    const postContent = li.querySelector('.audio');
    postContent.src = audio;
    const postContentCoord = li.querySelector('.post-content-coord');
    const { latitude, longitude } = pos;
    postContentCoord.textContent = `[${latitude}, -${longitude}]`;
    const postDateBlock = li.querySelector('.post-date-block');
    postDateBlock.textContent = moment().format('DD.MM.YYYY HH:mm');
  }
}