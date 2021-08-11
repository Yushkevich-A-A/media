export default class DrawWidget {
    constructor() {
        this.drawWidget();
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
        // this.newItemBlock = widget.querySelector('.input-new-post');
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
}