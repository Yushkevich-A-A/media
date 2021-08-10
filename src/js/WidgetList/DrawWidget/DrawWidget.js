import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawWidget {
  constructor(handlerCoord, errorPermissions, text, audio, video) {
    this.handlerCoord = handlerCoord;
    this.errorPermissions = errorPermissions;
    this.newText = text;
    this.newAudio = audio;
    this.newVideo = video;
    this.inputText = null;
    this.cancellationTrack = null;
    this.timer = null;
    this.typePost = null;
    this.init();
  }

  init() {
    this.checkAPI();
    this.drawWidget();
    this.listeners();
  }

  listeners() {
    document.addEventListener('keydown', event => {
      if (!event.target.closest('.input-text') && !event.target.closest('.input-coord')) {
        return;
      }

      if (event.target.closest('.input-coord') && event.key === 'Enter') {
        document.querySelector('.handlercoord-submit').click();
        return;
      }

      const inputText = event.target.closest('.input-text');
      if (!event.key === 'Enter') {
        return;
      }
      if (event.key === 'Enter' && inputText.value.trim() === '') {
        inputText.value = '';
        inputText.blur();
        return;
      }

      if (event.key === 'Enter') {
        inputText.blur();
        this.inputText = inputText.value;
        inputText.value = '';
        this.getCoordinate((data) => {
          this.newText.drawNewItemText(data.coords, this.inputText, this.postList);
        });
      }
    });

    document.addEventListener('click', event => {
      event.preventDefault();
      if(event.target.closest('.handlercoord-cancel')) {
        this.handlerCoord.removeValidationHandlerCoord();
        this.handlerCoord.hideHandlerCoord();
        this.inputText = null;
      }

      if(event.target.closest('.handlercoord-submit')) {
        this.submitFuncValidate();
      }

      if(event.target.closest('.audio-icon')) {
        debugger;
        if (this.checkAvaliableMedia()) {
          return;
        }
        this.typePost = 'audio';
        this.getCoordinate(data => this.startRecordAudio(data.coords));
      }

      if(event.target.closest('.video-icon')) {
        if (this.checkAvaliableMedia()) {
          return;
        }
        this.typePost = 'video';
        this.getCoordinate(data => this.startRecordVideo(data.coords) );
      }

      if(event.target.closest('.block-track-submit')) {
        if (this.typePost === 'audio') {
          this.newAudio.stopRecordAudio();
        } else {
          this.newVideo.stopRecordVideo();
        }
        this.activateText();
        this.typePost = null;
        this.timerStop();
      }

      if(event.target.closest('.block-track-cancel')) {
        if (this.typePost === 'audio') {
          this.newAudio.cancellationRecordAudio();
        } else {
          this.newVideo.cancellationRecordVideo();
        }
        this.activateText();
        this.typePost = null;
        this.timerStop();
      }
    });
  }

  getCoordinate(handler) {
    if (this.capabilityGeolocation) {

      navigator.geolocation.getCurrentPosition(
        (pos) => handler(pos),
        () => this.handlerCoord.showHandlerCoord(),
      );
    } else {
      this.handlerCoord.showHandlerCoord();
    }
  }
  
  checkAPI() {
    this.capabilityGeolocation = !!navigator.geolocation;
    this.capabilityMediaDevices = !!navigator.mediaDevices;
    this.capabilityMediaRecorder = !!window.MediaRecorder;
  }

  drawWidget() {
    const widget = document.createElement('div');
    widget.classList.add('widget-wrapper');
    widget.innerHTML = `<div class="widget-list">
                          <div class="block-content">
                            <div class="block-side-line"></div>
                            <div class="block-content-and-stream">
                              <ul class="post-list">
                              </ul>
                              <div class="stream-block disable">
                                <video class="video-stream" muted></video>
                              </div>
                            </div>
                          </div>
                          <div class="input-new-post">
                            <div class="input-new-post-text">
                              <div class="block-input">
                                <textarea class="input-text" placeholder="Type your message here"></textarea>
                              </div>
                              <div class="video-audio-block">
                                <div class="block-icons-video-audio">
                                  <div class="button-icon audio-icon"></div>
                                  <div class="button-icon video-icon"></div>
                                </div>
                              </div>
                            </div>
                            <div class="block-track-audio-video disable">
                              <div class="button-icon block-track-submit"></div>
                              <div class="block-track-timer"></div>
                              <div class="button-icon block-track-cancel"></div>
                              </div>
                          </div>
                        </div>`;
    document.body.appendChild(widget);
    this.postList = widget.querySelector('.post-list');
    this.newItemBlock = widget.querySelector('.input-new-post');
    this.trackTimer = widget.querySelector('.block-track-timer');
    this.blockTrackAudioVideo = widget.querySelector('.block-track-audio-video');
    this.inputNewPostText = widget.querySelector('.input-new-post-text');
    this.streamBlock = widget.querySelector('.stream-block');
    this.videoStream = widget.querySelector('.video-stream');
  }

  activateVideo() {
    this.inputNewPostText.classList.add('disable');
    this.blockTrackAudioVideo.classList.remove('disable');
    this.streamBlock.classList.remove('disable');
  }

  activateAudio() {
    this.inputNewPostText.classList.add('disable');
    this.blockTrackAudioVideo.classList.remove('disable');
  }

  activateText() {
    this.streamBlock.classList.add('disable');
    this.blockTrackAudioVideo.classList.add('disable');
    this.inputNewPostText.classList.remove('disable');
  }

  timerStart() {
    let ms = 0
    this.trackTimer.textContent = moment(ms).format('mm:ss');
    this.timer = setInterval(() => {
      ms += 1000;
      this.trackTimer.textContent = moment(ms).format('mm:ss');
    }, 1000)
  }

  timerStop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  startRecordAudio(coord) {
    this.activateAudio();
    this.newAudio.recordAudio(
      coord, 
      this.postList, 
      () => this.timerStart())
  };

  startRecordVideo(coord) {
    this.activateVideo();
    this.newVideo.recordVideo(
      coord, 
      this.postList, 
      this.videoStream, 
      () => this.timerStart()
    )
  };

  submitFuncValidate() {
    debugger;
    const value = this.handlerCoord.checkInputText(this.handlerCoord.input.value);
    if(!value) {
      this.handlerCoord.createValidationHandlerCoord('Введите значения широты и долготы через запятую');
      return;
    }
    this.handlerCoord.removeValidationHandlerCoord();
    if (this.typePost === 'audio') {
      this.startRecordAudio(value);
    } else if (this.typePost === 'video') {
      this.startRecordVideo(value);
    } else {
      this.newText.drawNewItemText(value, this.inputText, this.postList);
    }
    this.handlerCoord.hideHandlerCoord();
    this.inputText = null;
  }

  checkAvaliableMedia() {
    if (!this.capabilityMediaRecorder) {
      this.errorPermissions.openPermissionError();
      return true;
    }
    if (!this.capabilityMediaDevices) {
      this.errorPermissions.openPermissionError();
      return true;
    }
    return false;
  }
}

