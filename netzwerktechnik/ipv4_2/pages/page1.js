import { HTMLRenderer } from "../HTMLRenderer.js";
import { Binding } from "../binding.class.js";

import { IPv4 } from "../ipv4.class.js";

export class Page_1 {
    page_title = 'Übersicht';
    page_content = document.createElement('div');

    inputCounter = 1;

    // ipv4 = new IPv4(2130706433, 24);
    ipv4 = new IPv4(3232238095, 29);
    ipv4_maskAddress = new IPv4(this.ipv4.getCIDRinInt(), this.ipv4.getCIDRinDecimal());
    ipv4_netAddress = new IPv4(this.ipv4.getNetworkAddressinInt(), this.ipv4.getCIDRinDecimal());
    ipv4_broadcastAddress = new IPv4(this.ipv4.getBroadcastAddressinInt(), this.ipv4.getCIDRinDecimal());

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
            } else {
                input.value = 0
            }
        });

        return input
    }

    createIPInputLine() {
        this.inputFields = {
            oktet_1: this.createInputField({ value: this.ipv4.getIPinDecimal()[0], max: 255 }),
            oktet_2: this.createInputField({ value: this.ipv4.getIPinDecimal()[1], max: 255 }),
            oktet_3: this.createInputField({ value: this.ipv4.getIPinDecimal()[2], max: 255 }),
            oktet_4: this.createInputField({ value: this.ipv4.getIPinDecimal()[3], max: 255 }),
            cidr: this.createInputField({ value: this.ipv4.getCIDRinDecimal(), size: 2, max: 32 })
        };
        const { container, content } = HTMLRenderer.getaLine();
        content.appendChild(this.inputFields.oktet_1);
        content.appendChild(HTMLRenderer.getaDot());
        content.appendChild(this.inputFields.oktet_2);
        content.appendChild(HTMLRenderer.getaDot());
        content.appendChild(this.inputFields.oktet_3);
        content.appendChild(HTMLRenderer.getaDot());
        content.appendChild(this.inputFields.oktet_4);
        content.appendChild(HTMLRenderer.getaSlash());
        content.appendChild(this.inputFields.cidr);
        this.page_content.appendChild(container);
    }

    createBinaryBlock() {
        // mask
        const network_lan_binary = this.binding.addBinding('pre', () => {
            const { lan } = IPv4.splitBinary_netHostbyCidr(this.ipv4_maskAddress);
            return lan.join(' ');
        });
        network_lan_binary.classList.add('binary_lan');
        const network_host_binary = this.binding.addBinding('pre', () => {
            const { host } = IPv4.splitBinary_netHostbyCidr(this.ipv4_maskAddress);
            return host.length === 0 ? '' : ` ${host.join(' ')}`;
        });
        network_host_binary.classList.add('binary_host');
        const network_dec = [
            this.binding.addBinding('pre', () => this.ipv4_maskAddress.getIPinDecimal()[0]),
            this.binding.addBinding('pre', () => this.ipv4_maskAddress.getIPinDecimal()[1]),
            this.binding.addBinding('pre', () => this.ipv4_maskAddress.getIPinDecimal()[2]),
            this.binding.addBinding('pre', () => this.ipv4_maskAddress.getIPinDecimal()[3]),
        ];

        // IP
        const ip_lan_binary = this.binding.addBinding('pre', () => {
            const { lan } = IPv4.splitBinary_netHostbyCidr(this.ipv4);
            return lan.join(' ');
        });
        ip_lan_binary.classList.add('binary_lan');
        const ip_host_binary = this.binding.addBinding('pre', () => {
            const { host } = IPv4.splitBinary_netHostbyCidr(this.ipv4);
            return host.length === 0 ? '' : ` ${host.join(' ')}`;
        });
        ip_host_binary.classList.add('binary_host');
        network_host_binary.classList.add('binary_host');
        const ip_dec = [
            this.binding.addBinding('pre', () => this.ipv4.getIPinDecimal()[0]),
            this.binding.addBinding('pre', () => this.ipv4.getIPinDecimal()[1]),
            this.binding.addBinding('pre', () => this.ipv4.getIPinDecimal()[2]),
            this.binding.addBinding('pre', () => this.ipv4.getIPinDecimal()[3]),
        ];

        // Network
        const net_lan_binary = this.binding.addBinding('pre', () => {
            const { lan } = IPv4.splitBinary_netHostbyCidr(this.ipv4_netAddress);
            return lan.join(' ');
        });
        net_lan_binary.classList.add('binary_lan');
        const net_host_binary = this.binding.addBinding('pre', () => {
            const { host } = IPv4.splitBinary_netHostbyCidr(this.ipv4_netAddress);
            return host.length === 0 ? '' : ` ${host.join(' ')}`;
        });
        net_host_binary.classList.add('binary_host');
        const net_dec = [
            this.binding.addBinding('pre', () => this.ipv4_netAddress.getIPinDecimal()[0]),
            this.binding.addBinding('pre', () => this.ipv4_netAddress.getIPinDecimal()[1]),
            this.binding.addBinding('pre', () => this.ipv4_netAddress.getIPinDecimal()[2]),
            this.binding.addBinding('pre', () => this.ipv4_netAddress.getIPinDecimal()[3]),
        ];

        // Broadcast
        const broadcast_lan_binary = this.binding.addBinding('pre', () => {
            const { lan } = IPv4.splitBinary_netHostbyCidr(this.ipv4_broadcastAddress);
            return lan.join(' ');
        });
        broadcast_lan_binary.classList.add('binary_lan');
        const broadcast_host_binary = this.binding.addBinding('pre', () => {
            const { host } = IPv4.splitBinary_netHostbyCidr(this.ipv4_broadcastAddress);
            return host.length === 0 ? '' : ` ${host.join(' ')}`;
        });
        broadcast_host_binary.classList.add('binary_host');
        const broadcast_dec = [
            this.binding.addBinding('pre', () => this.ipv4_broadcastAddress.getIPinDecimal()[0]),
            this.binding.addBinding('pre', () => this.ipv4_broadcastAddress.getIPinDecimal()[1]),
            this.binding.addBinding('pre', () => this.ipv4_broadcastAddress.getIPinDecimal()[2]),
            this.binding.addBinding('pre', () => this.ipv4_broadcastAddress.getIPinDecimal()[3]),
        ];

        const matrix = [
            {
                isHeader: true,
                content: [
                    '',
                    { classnames: ['binary_lan'], content: 'Lan' },
                    { classnames: ['binary_host'], content: 'Host' },
                    { colspan: 4, classnames: ['dec'], content: 'in Dec' }
                ]
            },
            [
                'mask',
                network_lan_binary,
                network_host_binary,
                ...network_dec.map(a => ({ classnames: ['dec'], content: a }))
            ],
            [
                'IP',
                ip_lan_binary,
                ip_host_binary,
                ...ip_dec.map(a => ({ classnames: ['dec'], content: a }))
            ],
            [
                'Network',
                net_lan_binary,
                net_host_binary,
                ...net_dec.map(a => ({ classnames: ['dec'], content: a }))
            ],
            [
                'Broadcast',
                broadcast_lan_binary,
                broadcast_host_binary,
                ...broadcast_dec.map(a => ({ classnames: ['dec'], content: a }))
            ]
        ];

        const table = HTMLRenderer.createTable(matrix);

        this.page_content.appendChild(table.render());
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

            console.log("ipv4:", this.ipv4.getIPinInt(), this.ipv4.getCIDRinDecimal());

            this.ipv4_maskAddress = new IPv4(this.ipv4.getCIDRinInt(), this.ipv4.getCIDRinDecimal());
            this.ipv4_netAddress = new IPv4(this.ipv4.getNetworkAddressinInt(), this.ipv4.getCIDRinDecimal());
            this.ipv4_broadcastAddress = new IPv4(this.ipv4.getBroadcastAddressinInt(), this.ipv4.getCIDRinDecimal());

            this.binding.update();
        }
    }



    render() {
        // IP Input
        this.createIPInputLine();

        this.createBinaryBlock()
        // let line_cidr_binary = HTMLRenderer.getaLine();
        // const CIDR_binary = this.binding.addBinding('pre', () => this.ipv4.getCIDRinBinary().join('.'));
        // line_cidr_binary.content.appendChild(CIDR_binary);
        // this.page_content.appendChild(line_cidr_binary.container);

        // let line_ip_binary = HTMLRenderer.getaLine();
        // const IP_binary = this.binding.addBinding('pre', () => this.ipv4.getIPinBinary().join('.'));
        // line_ip_binary.content.appendChild(IP_binary);
        // this.page_content.appendChild(line_ip_binary.container);


        // let line_network_binary = HTMLRenderer.getaLine();
        // const network_binary = this.binding.addBinding('pre', () => this.ipv4.getNetworkAddressinBinary().join('.'));
        // line_network_binary.content.appendChild(network_binary);
        // this.page_content.appendChild(line_network_binary.container);

        // let line_broadcast_binary = HTMLRenderer.getaLine();
        // const broadcast_binary = this.binding.addBinding('pre', () => this.ipv4.getBroadcastAddressinBinary().join('.'));
        // line_broadcast_binary.content.appendChild(broadcast_binary);
        // this.page_content.appendChild(line_broadcast_binary.container);


        return this.page_content;
    }
}