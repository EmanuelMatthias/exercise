import { HTMLRenderer } from "../HTMLRenderer.js";

import { Page_1 } from "./page1.js";

export class Page_Main {
    constructor(mainContainer) {
        this.mainContainer = mainContainer;
    }
    createTabList() {
        const pages=[
            new Page_1,
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
        ]

        const tabslist = [
            { label: pages[0].page_title, content: pages[0].render() },
            { label: 'test2', content: pages[1] },
            { label: 'test3', content: pages[2] },
            { label: 'test4', content: pages[3] },
            { label: 'test5', content: pages[4] },
        ];
        return HTMLRenderer.createTabList(tabslist);
    }
    render() {
        const tabListBlock = this.createTabList()
        this.mainContainer.appendChild(tabListBlock);
    }
}