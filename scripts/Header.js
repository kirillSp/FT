class Header {
    selectors = {
        root: "[data-js-header]",
        overlay: "[data-js-header-overlay]",
        burgerButton: "[data-js-header-burger-button]"
    }

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock"
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay); 
        this.burgerElement = this.rootElement.querySelector(this.selectors.burgerButton); 
        this.bindEvent()
    }

    bindEvent() {
        this.burgerElement.addEventListener("click", this.onBurgerButtonClick);
    }

    onBurgerButtonClick = () => {
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        this.burgerElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock)
    }
}

export default Header;