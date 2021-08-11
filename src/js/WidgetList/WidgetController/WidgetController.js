import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class WidgetController {
  constructor(widget, handlerCoord, errorPermissions, text, audio, video) {
    this.widget = widget;
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
    this.handlerCoord.init();
    this.checkAPI();
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
          this.newText.drawNewItemText(data.coords, this.inputText, this.widget.postList);
        });
      }
    });

    document.addEventListener('click', event => {
      event.preventDefault();
      if(event.target.closest('.handlercoord-cancel')) {
        this.rejectFuncValidate()
      }

      if(event.target.closest('.handlercoord-submit')) {
        console.log(this.typePost)
        this.submitFuncValidate();
      }

      if(event.target.closest('.audio-icon')) {
        this.typePost = 'audio';
        this.startRecordAudio();
      }

      if(event.target.closest('.video-icon')) {
          this.typePost = 'video';
          this.startRecordVideo()
        }

      if(event.target.closest('.block-track-submit')) {
        if (this.typePost === 'audio') {
          this.newAudio.stopRecordAudio();
        } else if (this.typePost === 'video') {
          this.newVideo.stopRecordVideo();
        }
        this.widget.activateText();
        this.timerStop();
      }

      if(event.target.closest('.block-track-cancel')) {
        if (this.typePost === 'audio') {
          this.newAudio.cancellationRecordAudio();
        } else if (this.typePost === 'video') {
          this.newVideo.cancellationRecordVideo();
        }
        this.widget.activateText();
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
  }

  timerStart() {
    let ms = 0
    this.widget.trackTimer.textContent = moment(ms).format('mm:ss');
    this.timer = setInterval(() => {
      ms += 1000;
      this.widget.trackTimer.textContent = moment(ms).format('mm:ss');
    }, 1000)
  }

  timerStop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  startRecordAudio() {
    this.newAudio.recordAudio( 
      () => this.getCoordinate(pos => this.newAudio.setCoorditateCurrentElement(pos.coords)), 
      this.widget.postList, () => {
        this.widget.activateAudio();
        this.timerStart();
      }, () => this.errorPermissions.openPermissionError());
  };

  startRecordVideo() {
        this.newVideo.recordVideo(
      () => this.getCoordinate(pos => this.newVideo.setCoorditateCurrentElement(pos.coords)),
      this.widget.postList, 
      this.widget.videoStream, 
      () => {
        this.widget.activateVideo();
        this.timerStart();
      }, () => this.errorPermissions.openPermissionError());
  };

  submitFuncValidate() {
    const value = this.handlerCoord.checkInputText(this.handlerCoord.input.value);
    if(!value) {
      this.handlerCoord.createValidationHandlerCoord('Введите значения широты и долготы через запятую');
      return false;
    }
    this.handlerCoord.removeValidationHandlerCoord();
    if (this.typePost === 'audio') {
      this.newAudio.setCoorditateCurrentElement(value);
    } else if (this.typePost === 'video') {
      this.newVideo.setCoorditateCurrentElement(value);
    } else {
      this.newText.drawNewItemText(value, this.inputText, this.widget.postList);
    }
    this.handlerCoord.hideHandlerCoord();
    this.inputText = null;
    this.typePost = null;
  }

  rejectFuncValidate() {
    // console.log(this.typePost)
    this.handlerCoord.removeValidationHandlerCoord();
    if (this.typePost === 'audio') {
      this.newAudio.abortCreateElement();
    } else if (this.typePost === 'video') {
      this.startRecordVideo(value);
    }
    this.handlerCoord.hideHandlerCoord();
    this.inputText = null;
    this.typePost = null;
  }

}
