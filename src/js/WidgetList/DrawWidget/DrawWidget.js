export default class DrawWidget {
  constructor(error, text, audio, video) {
    this.error = error;
    this.newText = text;
    this.newAudio = audio;
    this.newVideo = video;
    this.inputText = null;
    this.arrData = [];
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
        document.querySelector('.error-submit').click();
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

    this.error.form.addEventListener('submit', event => {
      event.preventDefault();
      const value = this.error.checkInputText(this.error.input.value);
      if(!value) {
        this.error.createValidationError('Введите значения широты и долготы через запятую');
        return;
      }
      this.newText.drawNewItemText(value, this.inputText, this.postList);
      this.error.hideError();
      this.inputText = null;
    });

    document.addEventListener('click', event => {
      if(event.target.closest('.error-cancel')) {
        this.error.hideError();
        this.inputText = null;
      }

      if(event.target.closest('.audio-icon')) {
        this.activateVideoAudio();
        this.trackAudio()
      }

      if(event.target.closest('.block-track-submit')) {
        this.recorder.stop();
        this.activateText();
      }

      if(event.target.closest('.video-icon')) {
        this.activateVideoAudio();
      }

      if(event.target.closest('.block-track-cancel')) {
        this.activateText();
      }
    });
  }

  getCoordinate(handler) {
    if (this.capabilityGeolocation) {

      navigator.geolocation.getCurrentPosition(
        (pos) => handler(pos),
        () => this.error.showError(),
      );
    } else {
      this.error.showError();
    }
  }
  
  checkAPI() {
    if (navigator.geolocation) {
      this.capabilityGeolocation = true;
    } else {
      this.capabilityGeolocation = false;
    }

    if (navigator.mediaDevices) {
      this.capabilityMediaDevices = true;
    } else {
      this.capabilityMediaDevices = false;
    }

    if (window.MediaRecorder) {
      this.capabilityMediaRecorder = true;
    } else {
      this.capabilityMediaRecorder = false;
    }
  }

  drawWidget() {
    const widget = document.createElement('div');
    widget.classList.add('widget-wrapper');
    widget.innerHTML = `<div class="widget-list">
                          <div class="block-content">
                            <div class="block-side-line"></div>
                            <ul class="post-list">
                            </ul>
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
                              <div class="block-track-timer">
                                00:05
                              </div>
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
  }

  activateVideoAudio() {
    this.inputNewPostText.classList.add('disable');
    this.blockTrackAudioVideo.classList.remove('disable');
  }

  activateText() {
    this.blockTrackAudioVideo.classList.add('disable');
    this.inputNewPostText.classList.remove('disable');
  }

  async trackAudio() {

    const li = document.createElement('li');
    li.classList.add('item-post');
    li.innerHTML = `<div class="post-content-block">
                      <audio class="audio" controls></audio> 
                      <div class="post-content-coord"></div>
                    </div>
                    <div class="post-date-block"></div>`;
                    this.postList.appendChild(li);
    const postContent = li.querySelector('.audio');

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })

    this.recorder = new MediaRecorder(stream);
    const chunks = [];

    this.recorder.addEventListener('dataavaliable', event => {
      console.log(event);
      chunks.push(event.data);
    })

    this.recorder.addEventListener('stop', event => {
      console.log(event);
      stream.getTracks().forEach( track=> track.stop());
      const blob = new Blob(chunks);
      postContent.src = URL.createObjectURL(blob);
    });

    this.recorder.start();
  }

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
    // postDateBlock.textContent = moment().format('DD.MM.YYYY HH:mm');
  }
}

