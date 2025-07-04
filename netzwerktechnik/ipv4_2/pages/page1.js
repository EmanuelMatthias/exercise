import { HTMLRenderer } from "../HTMLRenderer.js";
import { Binding } from "../binding.class.js"; 

import { IPv4 } from "../ipv4.class.js";

export class Page_1 {
    page_title = 'Übersicht';
    page_content = document.createElement('div');

    inputCounter = 1;

    ipv4 = new IPv4(2130706433,24);
    binding = new Binding();

    createInputField(
        {
            size = 3,
            min = 0,
            max = 1,
            value = ''
        }
    ) {
        const input = document.createElement('input');
        input.classList.add('none', `size${size}`);
        input.value = value;
        input.maxLength = size;
        input.type = 'number';
        input.min = min;
        input.max = max;
        input.setAttribute('tabindex', this.inputCounter++);

        input.addEventListener('focus', () => { input.select(); })

        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.value = parseInt(input.value);
                if (input.value.length >= input.maxLength) {
                    if (input.value < input.min) input.value = input.min;
                    if (input.value > input.max) input.value = input.max;
                    input.value = parseInt(input.value);
                    const next = document.querySelector(`[tabindex="${input.tabIndex + 1}"]`);
                    if (next) {
                        next.focus();
                        next.select?.();
                    }
                }
                this.updateValues();
            }else{
                input.value = 0
            }
        });

        return input
    }

    updateValues() {
        if (
            this.inputFields.oktet_1 &&
            this.inputFields.oktet_2 &&
            this.inputFields.oktet_3 &&
            this.inputFields.oktet_4 &&
            this.inputFields.cidr
        ) {
            let ip = `${this.inputFields.oktet_1.value}`;
            ip += `.${this.inputFields.oktet_2.value}`;
            ip += `.${this.inputFields.oktet_3.value}`;
            ip += `.${this.inputFields.oktet_4.value}`;
            this.ipv4.setIPinDecimal(ip);
            this.ipv4.setCIDRinDecimal(this.inputFields.cidr.value);
            this.binding.update();
        }
    }

    render() {
        const ipInputLine = document.createElement('div');
        ipInputLine.classList.add('shortBlock');

        this.inputFields = {
            'oktet_1': this.createInputField({ value: this.ipv4.getIPinDecimal()[0], max: 255 }),
            'oktet_2': this.createInputField({ value: this.ipv4.getIPinDecimal()[1], max: 255 }),
            'oktet_3': this.createInputField({ value: this.ipv4.getIPinDecimal()[2], max: 255 }),
            'oktet_4': this.createInputField({ value: this.ipv4.getIPinDecimal()[3], max: 255 }),
            'oktet_2': this.createInputField({ value: '0', max: 255 }),
            'oktet_3': this.createInputField({ value: '0', max: 255 }),
            'oktet_4': this.createInputField({ value: '1', max: 255 }),
            'cidr': this.createInputField({ value: this.ipv4.getCIDRinDecimal(), size: 2, max: 32 }),
        };

        ipInputLine.appendChild(this.inputFields.oktet_1);
        ipInputLine.appendChild(HTMLRenderer.getaDot());
        ipInputLine.appendChild(this.inputFields.oktet_2);
        ipInputLine.appendChild(HTMLRenderer.getaDot());
        ipInputLine.appendChild(this.inputFields.oktet_3);
        ipInputLine.appendChild(HTMLRenderer.getaDot());
        ipInputLine.appendChild(this.inputFields.oktet_4);
        ipInputLine.appendChild(HTMLRenderer.getaSlash());
        ipInputLine.appendChild(this.inputFields.cidr);

        this.page_content.appendChild(ipInputLine)
        
        const test = this.binding.addBinding('span', ()=>this.ipv4.getIPinBinary())
        
        this.page_content.appendChild(test)

        return this.page_content;
    }
}