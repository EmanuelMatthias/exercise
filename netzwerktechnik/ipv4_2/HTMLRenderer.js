export class HTMLRenderer {
    static getaDot(){
        const dot = document.createElement('span');
        dot.innerText = '.';
        return dot;
    }
    static getaSlash(){
        const slash = document.createElement('span');
        slash.innerText = '/';
        return slash;
    }
    static simpleHash() {
        return (Math.floor(Math.random() * Math.pow(2, 32) + Math.pow(2, 32))).toString();
    }

    static createTabList(tabList) {
        const tabContainer = new TabList(tabList);
        return tabContainer.render();
    }
}
class TabList {
    tabList_tab_content_list = [];
    tabList_content_container_list = [];
    constructor(tabList) {
        this.tabList = tabList.map(a => ({ ...a, id: HTMLRenderer.simpleHash() }));
    }
    createTabPart() {
        const tabList_tab_container = document.createElement('div');
        tabList_tab_container.classList.add('tabList_head');
        this.tabList.forEach((element, id) => {
            const tabList_tab_content = document.createElement('div');
            tabList_tab_content.classList.add('tabList_headcontent');
            if (id === 0) tabList_tab_content.classList.add('active');
            tabList_tab_content.setAttribute('tabId', element.id);
            tabList_tab_content.innerText = element.label;
            tabList_tab_content.addEventListener('click', this.clickhandler(element.id));
            tabList_tab_container.appendChild(tabList_tab_content);
            this.tabList_tab_content_list.push(tabList_tab_content);
        });
        return tabList_tab_container;
    }
    createContentPart() {
        const tabList_content_container = document.createElement('div');
        tabList_content_container.classList.add('tabList_content');
        this.tabList.forEach((element, id) => {
            const tabList_content_content = document.createElement('div');
            tabList_content_content.classList.add('tabList_contentcontent');
            if (id === 0) tabList_content_content.classList.add('active');
            tabList_content_content.setAttribute('tabId', element.id);
            tabList_content_content.getAttribute('tabId')
            tabList_content_content.appendChild(element.content);
            tabList_content_container.appendChild(tabList_content_content);
            this.tabList_content_container_list.push(tabList_content_content);
        });
        return tabList_content_container;
    }
    clickhandler(id) {
        const that = this;
        return () => {
            that.tabList_tab_content_list.forEach(ele => ele.classList.remove('active'));
            that.tabList_content_container_list.forEach(ele => ele.classList.remove('active'));
            that.tabList_tab_content_list.forEach(ele => {
                if (ele.getAttribute('tabId') === id)
                    ele.classList.add('active');
            });
            that.tabList_content_container_list.forEach(ele => {
                if (ele.getAttribute('tabId') === id)
                    ele.classList.add('active');
            });

        }
    }
    render() {
        const tabPart = this.createTabPart();
        const contentPart = this.createContentPart();

        const container = document.createElement('div');
        container.classList.add('tabList');
        container.appendChild(tabPart);
        container.appendChild(contentPart);
        return container;

    }
}