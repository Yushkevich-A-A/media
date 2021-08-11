import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawAudioPost {
  constructor() {
    this.handlerCoord = null;
  }

  drawNewItemAudio(blob, parent) {

    this.li = document.createElement('li');
    this.li.classList.add('item-post');
    this.li.innerHTML = `<div class="post-content-block">
                      <audio class="audio" controls></audio> 
                      <div class="post-content-coord"></div>
                    </div>
                    <div class="post-date-block"></div>`;
    parent.appendChild(this.li);
    const postContent = this.li .querySelector('.audio');
    postContent.src = URL.createObjectURL(blob);
    const postDateBlock = this.li .querySelector('.post-date-block');
    postDateBlock.textContent = moment().format('DD.MM.YYYY HH:mm');
  }

  async recordAudio(coordsFunc, parent, handlerStart, handlerError) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })

      this.recorder = new MediaRecorder(stream);
      const chunks = [];

      this.recorder.addEventListener('start', event => {
        handlerStart();
      })

      this.recorder.addEventListener('dataavailable', event => {
        chunks.push(event.data);
      })

      this.recorder.addEventListener('stop', event => {
        stream.getTracks().forEach(track => track.stop());
        if (this.cancellationTrack) {
          this.recorder = null;
          return;
        }
        const blob = new Blob(chunks);
        this.drawNewItemAudio(blob, parent);
        this.recorder = null;

        coordsFunc();
      });
      this.recorder.start();
    } catch(err) {
      handlerError();
    }
  }

  stopRecordAudio() {
    this.cancellationTrack = false;
    this.recorder.stop()
  }

  cancellationRecordAudio() {
    this.cancellationTrack = true;
    this.recorder.stop();
  }

  setCoorditateCurrentElement(coord) {
    const postContentCoord = this.li.querySelector('.post-content-coord');
    const { latitude, longitude } = coord;
    postContentCoord.textContent = `[${latitude}, -${longitude}]`;
    this.li = null;
  }

  abortCreateElement() {
    this.li.parentElement.removeChild(this.li);
    this.li = null;
  }
}