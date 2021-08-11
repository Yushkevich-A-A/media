import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawVideoPost {
  constructor() {
    this.handlerCoord = null;
  }

  drawNewItemVideo(blob, parent) {
    this.li = document.createElement('li');
    this.li.classList.add('li-item-post');
    this.li.innerHTML = `<div class="item-post">
                            <div class="post-content-block">
                              <video class="video" controls></video>
                              <div class="post-content-coord"></div>
                            </div>
                            <div class="post-date-block"></div>
                          </div>`;
    parent.insertAdjacentElement('afterBegin', this.li);
    const postContent = this.li.querySelector('.video');
    postContent.src = URL.createObjectURL(blob);
    const postDateBlock = this.li.querySelector('.post-date-block');
    postDateBlock.textContent = moment().format('DD.MM.YYYY HH:mm');
  }

  async recordVideo(coordsFunc, parent, streamElement, handlerStart, handlerError) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      this.recorder = new MediaRecorder(stream);
      const chunks = [];

      this.recorder.addEventListener('start', (event) => {
        console.log(streamElement);
        streamElement.srcObject = stream;
        streamElement.play();
        handlerStart();
        console.log(this.setCoorditateCurrentElement);
      });

      this.recorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      this.recorder.addEventListener('stop', (event) => {
        stream.getTracks().forEach((track) => track.stop());
        if (this.cancellationTrack) {
          this.recorder = null;
          return;
        }
        const blob = new Blob(chunks);
        this.drawNewItemVideo(blob, parent);
        this.recorder = null;
        streamElement.srcObject = null;
        coordsFunc();
      });

      this.recorder.start();
    } catch (err) {
      handlerError();
    }
  }

  stopRecordVideo() {
    this.cancellationTrack = false;
    this.recorder.stop();
  }

  cancellationRecordVideo() {
    this.cancellationTrack = true;
    this.recorder.stop();
  }

  setCoorditateCurrentElement(coord) {
    const postContentCoord = this.li.querySelector('.post-content-coord');
    const { latitude, longitude } = coord;
    postContentCoord.textContent = `[${latitude}, ${longitude}]`;
    this.li = null;
  }

  abortCreateElement() {
    this.li.parentElement.removeChild(this.li);
    this.li = null;
  }
}
