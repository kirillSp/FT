class BaseComponent {
    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error("Невозможно создать экземпляр абстрактного класса BaseComponent");
        }
    }

     getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop];
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop];

                target[prop] = newValue;

                if (target[prop] !== oldValue) {
                    this.updateUi();
                }

                return true;
            }
        })
    }

    updateUi() {
        throw new Error("Необходимо реализовать метод UpdateUi");
    }
}

export default BaseComponent;