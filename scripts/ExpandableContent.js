import pixelsToRem from "./utils/pixelsToRem.js";

const rootSelector = "[data-js-expandable-content]";

class ExpandableContent {
    selectors = {
        root: rootSelector,
        button: "[data-expandable-content-button]"
    }

    stateClasses = {
        isExpanded: "is-expanded"
    }

    animationParams = {
        duration: 500,
        easing: "ease"
    }

    constructor(rootElement) {
        this.rootElement = rootElement,
        this.buttonElement = this.rootElement.querySelector(this.selectors.button),
        this.bindEvent();
    }

    expand() {
        const { scrollHeight, offsetHeight } = this.rootElement;
        
        this.rootElement.classList.add(this.stateClasses.isExpanded);
        this.rootElement.animate(
            [
                { maxHeight: `${pixelsToRem(offsetHeight)}rem` },
                { maxHeight: `${pixelsToRem(scrollHeight)}rem` }
            ],
            this.animationParams
        );
    }

    onButtonClick = () => {
        this.expand()
    }

    bindEvent() {
        this.buttonElement.addEventListener("click", this.onButtonClick);
    }
}

class ExpandableContentCollection {
   constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach(el => {
            new ExpandableContent(el);
        });
    }
}

export default ExpandableContentCollection;