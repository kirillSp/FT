const rootSelector = "[data-js-video-player]";

class VideoPlayer {
    selectors = {
        root: rootSelector,
        video: "[data-js-video-player-video]",
        pannel: "[data-js-video-pannel]",
        playButton: "[data-js-video-play-button]",
    }

    stateClasses = {
        isActive: "is-active",
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.videoElement = this.rootElement.querySelector(this.selectors.video);
        this.pannelElement = this.rootElement.querySelector(this.selectors.pannel);
        this.playButtonElement = this.rootElement.querySelector(this.selectors.playButton);
        this.bindEvent();
    }

    onPlayButtonElement = () => {
        this.videoElement.play();
        this.videoElement.controls = true;
        this.pannelElement.classList.remove(this.stateClasses.isActive);
    }

    onVideoPause = () => {
        this.videoElement.controls = false;
        this.pannelElement.classList.add(this.stateClasses.isActive);
    }

    bindEvent() {
        this.playButtonElement.addEventListener("click", this.onPlayButtonElement);
        this.videoElement.addEventListener("pause", this.onVideoPause);
    }
}
class VideoPlayerCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach(el => {
            new VideoPlayer(el);
        });
    }
}

export default VideoPlayerCollection;