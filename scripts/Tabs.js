import BaseComponent from "./BaseComponent.js";

const rootSelector = "[data-js-tabs]";

class Tabs extends BaseComponent {
    selector = {
        root: rootSelector,
        button: "[data-js-tabs-button]",
        content: "[data-js-tabs-content]",
    }

    stateClasses = {
        isActive: "is-active",
    }

    stateAttributes = {
        ariaSelected: "aria-selected",
        tabIndex: "tabindex"
    }

    constructor(rootElement) {
        super();
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selector.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selector.content);
        this.state = this.getProxyState({
            activeTabsIndex: [...this.buttonElements]
                .findIndex(buttonElement => {
                    buttonElement.classList.contains(this.stateClasses.isActive);
                })
            });
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
    }


    updateUi() {
        const { activeTabsIndex } = this.state;

        this.buttonElements.forEach((buttonElement, i) => {
            const isActive = i === activeTabsIndex;

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? 0 : -1);
        });

        this.contentElements.forEach((contentElement, i) => {
            const isActive = i === activeTabsIndex;

            contentElement.classList.toggle(this.stateClasses.isActive, isActive);
        })
    }

    activateTab(newTabIndex) {
        this.state.activeTabsIndex = newTabIndex;
        this.buttonElements[newTabIndex].focus();
    }

    previousTabs = () => {
        const newTabIndex = this.state.activeTabsIndex === 0 ? 
            this.limitTabsIndex :
            this.state.activeTabsIndex - 1;
        
        this.activateTab(newTabIndex);

      
    }
    nextTabs = () => {
         const newTabIndex = this.state.activeTabsIndex === this.limitTabsIndex ? 
            0 : 
            this.state.activeTabsIndex + 1;

        this.activateTab(newTabIndex);
    }
    
    firstChildTabs = () => {
        this.activateTab(0);
    }
    lastChildTabs = () => {
        this.activateTab(this.limitTabsIndex)
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabsIndex = buttonIndex;
    }

    onKeyDown = (e) => {
        const { code, metaKey } = e;
        const action = {
            ArrowLeft: this.previousTabs,
            ArrowRight: this.nextTabs,
            Home: this.firstTabs,
            End: this.lastChild
        }[code];
        
        const isMacKeyHome = metaKey && code === "ArrowKey";

        if (isMacKeyHome) {
            this.firstChild();
            return;
        }

        const isMacKeyEnd = metaKey && code === "ArrowKey";

        if (isMacKeyEnd) {
            this.lastChild();
            return;
        }

        action?.();
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener("click", () => {
                this.onButtonClick(index);
            });

            this.rootElement.addEventListener('keydown', this.onKeyDown)
        });
    }
}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach(el => {
            new Tabs(el);
        });
    }
}

export default TabsCollection;