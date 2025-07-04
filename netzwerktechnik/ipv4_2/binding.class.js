export class Binding {
    bindList = [];

    addBinding(selector, data) {
        const ele = document.createElement(selector);
        ele.update = () => { ele.innerHTML = data() }
        ele.update();
        this.bindList.push(ele);
        return ele;
    }
    update() {
        this.bindList.forEach(ele=>ele.update())
    }
}