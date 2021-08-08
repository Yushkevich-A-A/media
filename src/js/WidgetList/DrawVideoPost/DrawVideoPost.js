import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawVideoPost {
  drawNewItemVideo(pos, blob, parent) {
    const li = document.createElement('li');
    li.classList.add('item-post');
    li.innerHTML = `<div class="post-content-block">
                      <video class="video" controls></video>
                      <div class="post-content-coord"></div>
                    </div>
                    <div class="post-date-block"></div>`;
    parent.appendChild(li);
    const postContent = li.querySelector('.video');
    postContent.src = URL.createObjectURL(blob);
    const postContentCoord = li.querySelector('.post-content-coord');
    const { latitude, longitude } = pos;
    postContentCoord.textContent = `[${latitude}, -${longitude}]`;
    const postDateBlock = li.querySelector('.post-date-block');
    postDateBlock.textContent = moment().format('DD.MM.YYYY HH:mm');
  }

  async recordVideo(coords, parent) {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })

    this.recorder = new MediaRecorder(stream);
    const chunks = [];

    this.recorder.addEventListener('dataavailable', event => {
      chunks.push(event.data);

    })

    this.recorder.addEventListener('stop', event => {
      stream.getTracks().forEach(track=>track.stop());
      if (this.cancellationTrack) {
        this.recorder = null;
        return;
      }
      const blob = new Blob(chunks);
      this.drawNewItemVideo(coords, blob, parent);
      this.recorder = null;
    });

    this.recorder.start();
  }


  stopRecordVideo() {
    this.cancellationTrack = false;
    this.recorder.stop()
  }

  cancellationRecordVideo() {
    this.cancellationTrack = true;
    this.recorder.stop()
  }
}