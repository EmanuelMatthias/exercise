class IPv4 {

    int = 0;
    ip = 0;
    cidr = 0;
    mask = 0;
    networkAdress = 0;
    broadcastAddress = 0;
    hostLength = 0;

    constructor(ip = "0.0.0.0", cidr = 1) {
        this.ip = ip
        this.cidr = cidr
        this.int = this.initIp(ip)
        this.mask = this.initCIDR(cidr)
        this.networkAdress = this.calcNetworkAddress()
        this.broadcastAddress = this.calcBroadcastAddress()
        this.hostLengthBaseTwo = this.calcHostLengthBaseTwo()
    }

    initIp(ip) { return this.ipToInt(ip); }
    initCIDR(cidr) { return 0xFFFFFFFF << (32 - cidr) >>> 0 }

    getInt() { return this.int }
    getMaskInt() { return this.mask }
    getIP() { return this.intToIp(this.int) }
    getCIDR() { return this.cidr }
    getNetmask() { return this.intToIp(this.mask) }
    getIPinHex() { return this.intToHexOctetets(this.int) }
    getIPinBinary() { return this.intToBinaryOctetets(this.int) }
    getNetmaskinHex() { return this.intToHexOctetets(this.mask) }
    getNetmaskinBinary() { return this.intToBinaryOctetets(this.mask) }
    getNetworkAddress() { return this.intToIp(this.networkAdress) }
    getFirstHost() { return this.intToIp(this.networkAdress + 1) }
    getLastHost() { return this.intToIp(this.broadcastAddress - 1) }
    getBroadcastAddress() { return this.intToIp(this.broadcastAddress) }
    getNextNetworkAddress() { return this.intToIp(this.broadcastAddress + 1) }
    getHostLengthBaseTwo() { return this.hostLengthBaseTwo }

    setCIDR(newCIDR) {
        this.cidr = newCIDR
        this.mask = this.initCIDR(newCIDR)
        this.networkAdress = this.calcNetworkAddress()
        this.broadcastAddress = this.calcBroadcastAddress()
        this.hostLengthBaseTwo = this.calcHostLengthBaseTwo()
    }

    addMask(addMask) {
        return this.intToIp(this.int + addMask)
    }

    ipToInt(ip) {
        return ip
            .split('.')
            .reduce(
                (acc, part) =>
                    (acc << 8) + parseInt(part) >>> 0,
                0
            )
    }
    intToIp(int) {
        return [24, 16, 8, 0].map(shift =>
            (int >>> shift) & 0xFF
        )
    }
    intToHexOctetets(int) {
        return int.toString(16).padStart(8, '0').match(/.{2}/g)
    }
    intToBinaryOctetets(int) {
        return int.toString(2).padStart(32, '0').match(/.{8}/g)
    }

    calcNetworkAddress() { return this.int & this.mask }
    calcBroadcastAddress() { return this.int | (~this.mask >>> 0) }
    calcHostLengthBaseTwo() { return 32 - this.cidr }
}

class Exercise {
    typ;
    ipv4;
    sideContent;

    container = document.createElement('div')

    constructor(typ, ip, cidr) {
        this.typ = typ;
        this.ipv4 = new IPv4(ip.join('.'), cidr)
        this.sideContent = this.sideContentforTypeX()
        this.getHTML = this.getHTMLforTypX()

        this.container.classList.add('container')
    }
    sideContentforTypeX() {
        if (this.typ === 0) return this.sideContentforType0()
        if (this.typ === 1) return this.sideContentforType1()
        return this.sideContentforType2()
    }
    sideContentforType0() {
        return {
            netmaskOrCidr: Math.floor(Math.random() * 2)
        }
    }
    sideContentforType1() {

        const diff = Math.floor(Math.random() * 3) + 1
        if (30 - this.ipv4.getCIDR() - diff <= 2)
            this.ipv4.setCIDR(this.ipv4.getCIDR() - diff)

        return {
            netmaskOrCidr: Math.floor(Math.random() * 2),
            subCIDR: this.ipv4.getCIDR() + diff,
            subCount: Math.pow(2, diff),
        }
    }
    sideContentforType2() { }
    getHTMLforTypX() {
        if (this.typ === 0) return this.getHTMLforTyp0
        if (this.typ === 1) return this.getHTMLforTyp1
        return this.getHTMLforTyp2
    }


    containerElement(typ, parent) {
        const ele = document.createElement(typ)
        parent.appendChild(ele)
        return ele
    }
    textElement(typ, parent, text) {
        if (typ != null) {
            const ele = document.createElement(typ)
            ele.appendChild(document.createTextNode(text))
            parent.appendChild(ele)
            return ele
        } else {
            return document.createTextNode(text)
        }
    }
    tableElement(parent, contentMatrix) {
        const table = this.containerElement('table', parent)
        for (let i = 0; i < 1; i++) {
            const line = this.containerElement('tr', table)
            for (let j = 0; j < contentMatrix[i].length; j++) {
                const cell = this.containerElement('th', line)
                let cellContent
                if (typeof (contentMatrix[i][j]) === "string" || typeof (contentMatrix[i][j]) === "number")
                    cellContent = this.textElement(null, cell, contentMatrix[i][j])
                else
                    cellContent = contentMatrix[i][j]
                cell.appendChild(cellContent)
            }
        }
        for (let i = 1; i < contentMatrix.length; i++) {
            const line = this.containerElement('tr', table)
            for (let j = 0; j < contentMatrix[i].length; j++) {
                const cell = this.containerElement('td', line)
                let cellContent
                if (typeof (contentMatrix[i][j]) === "string" || typeof (contentMatrix[i][j]) === "number")
                    cellContent = this.textElement(null, cell, contentMatrix[i][j])
                else
                    cellContent = contentMatrix[i][j]
                cell.appendChild(cellContent)
            }

        }
        return table
    }
    inputCheckElement(parent, preShouldValue) {
        const input = document.createElement('input')
        input.addEventListener('keyup', (ev) => {
            const shouldValue = preShouldValue.toString()
            console.log(input.value, shouldValue)
            input.classList.remove('answerTrue', 'answerFalse')
            if (input.value === shouldValue)
                input.classList.add('answerTrue')
            else if (input.value != '' && input.value != shouldValue)
                input.classList.add('answerFalse')
        })
        if (parent !== null)
            parent.appendChild(input)
        return input
    }



    getHTMLforTyp0() {
        const ip = this.ipv4.getIP();
        const iphex = this.ipv4.getIPinHex();
        const ipbin = this.ipv4.getIPinBinary();

        const netmask = this.ipv4.getNetmask()
        const netmaskhex = this.ipv4.getNetmaskinHex()
        const netmaskbin = this.ipv4.getNetmaskinBinary()

        const net = (this.sideContent.netmaskOrCidr === 0) ? '/' + this.ipv4.getCIDR() : '  ' + this.ipv4.getNetmask().join('.');

        const headerContainer = this.containerElement('div', this.container)

        this.textElement('h1', headerContainer, 'Netzwerk')
        this.textElement('pre', headerContainer, ip.join('.') + ' ' + net)

        this.tableElement(
            this.container,
            [
                [],
                ['', ...ip],
                // ['',...iphex],
                [
                    'Hex',
                    this.inputCheckElement(null, iphex[0]),
                    this.inputCheckElement(null, iphex[1]),
                    this.inputCheckElement(null, iphex[2]),
                    this.inputCheckElement(null, iphex[3]),
                ],
                // ['',...ipbin],
                [
                    'Bin',
                    this.inputCheckElement(null, ipbin[0]),
                    this.inputCheckElement(null, ipbin[1]),
                    this.inputCheckElement(null, ipbin[2]),
                    this.inputCheckElement(null, ipbin[3]),
                ]
            ],
        )
        if (this.sideContent.netmaskOrCidr === 0) {
            this.tableElement(
                this.container,
                [
                    [],
                    ['', '/' + this.ipv4.getCIDR()],
                    [
                        'Bin',
                        this.inputCheckElement(null, netmaskbin[0]),
                        this.inputCheckElement(null, netmaskbin[1]),
                        this.inputCheckElement(null, netmaskbin[2]),
                        this.inputCheckElement(null, netmaskbin[3]),
                    ],
                    [
                        'Dec',
                        this.inputCheckElement(null, netmask[0]),
                        this.inputCheckElement(null, netmask[1]),
                        this.inputCheckElement(null, netmask[2]),
                        this.inputCheckElement(null, netmask[3]),
                    ],
                    // ['',...netmaskhex],
                    // ['',...netmaskbin],
                ],
            )
        } else {
            this.textElement('h2',this.container,'Submask')
            this.tableElement(
                this.container,
                [
                    [
                        '',
                    ],
                    [
                        'CIDR /',
                        this.inputCheckElement(null, this.ipv4.getCIDR()),
                    ],
                ]
            )
        }

        this.tableElement(
            this.container,
            [
                [
                    '',
                ],
                [
                    'Lan:',
                    this.inputCheckElement(null, this.ipv4.getNetworkAddress()[0]),
                    this.inputCheckElement(null, this.ipv4.getNetworkAddress()[1]),
                    this.inputCheckElement(null, this.ipv4.getNetworkAddress()[2]),
                    this.inputCheckElement(null, this.ipv4.getNetworkAddress()[3]),
                    '/',
                    this.inputCheckElement(null, this.ipv4.getCIDR()),
                    // this.ipv4.getNetworkAddress()[0],
                    // this.ipv4.getNetworkAddress()[1],
                    // this.ipv4.getNetworkAddress()[2],
                    // this.ipv4.getNetworkAddress()[3],
                    // this.ipv4.getCIDR(),
                ],
                [
                    'First:',
                    this.inputCheckElement(null, this.ipv4.getFirstHost()[0]),
                    this.inputCheckElement(null, this.ipv4.getFirstHost()[1]),
                    this.inputCheckElement(null, this.ipv4.getFirstHost()[2]),
                    this.inputCheckElement(null, this.ipv4.getFirstHost()[3]),
                    '/',
                    this.inputCheckElement(null, this.ipv4.getCIDR()),
                    // this.ipv4.getFirstHost()[0],
                    // this.ipv4.getFirstHost()[1],
                    // this.ipv4.getFirstHost()[2],
                    // this.ipv4.getFirstHost()[3],
                    // this.ipv4.getCIDR(),
                ],
                [
                    'Broadcast:',
                    this.inputCheckElement(null, this.ipv4.getBroadcastAddress()[0]),
                    this.inputCheckElement(null, this.ipv4.getBroadcastAddress()[1]),
                    this.inputCheckElement(null, this.ipv4.getBroadcastAddress()[2]),
                    this.inputCheckElement(null, this.ipv4.getBroadcastAddress()[3]),
                    '/',
                    this.inputCheckElement(null, this.ipv4.getCIDR()),
                    // this.ipv4.getBroadcastAddress()[0],
                    // this.ipv4.getBroadcastAddress()[1],
                    // this.ipv4.getBroadcastAddress()[2],
                    // this.ipv4.getBroadcastAddress()[3],
                    // this.ipv4.getCIDR(),
                ],
                [
                    'Last:',
                    this.inputCheckElement(null, this.ipv4.getLastHost()[0]),
                    this.inputCheckElement(null, this.ipv4.getLastHost()[1]),
                    this.inputCheckElement(null, this.ipv4.getLastHost()[2]),
                    this.inputCheckElement(null, this.ipv4.getLastHost()[3]),
                    '/',
                    this.inputCheckElement(null, this.ipv4.getCIDR()),
                    // this.ipv4.getLastHost()[0],
                    // this.ipv4.getLastHost()[1],
                    // this.ipv4.getLastHost()[2],
                    // this.ipv4.getLastHost()[3],
                    // this.ipv4.getCIDR(),
                ],
                [
                    'Hosts: 2^',
                    this.inputCheckElement(null, this.ipv4.getHostLengthBaseTwo()),
                    // '2^' + this.ipv4.getHostLengthBaseTwo() + ' - 2 =' + (Math.pow(2, this.ipv4.getHostLengthBaseTwo()) - 2),

                ],
                [
                    'Next Lan:',
                    this.inputCheckElement(null, this.ipv4.getNextNetworkAddress()[0]),
                    this.inputCheckElement(null, this.ipv4.getNextNetworkAddress()[1]),
                    this.inputCheckElement(null, this.ipv4.getNextNetworkAddress()[2]),
                    this.inputCheckElement(null, this.ipv4.getNextNetworkAddress()[3]),
                    '/',
                    this.inputCheckElement(null, this.ipv4.getCIDR()),
                    // this.ipv4.getNextNetworkAddress()[0],
                    // this.ipv4.getNextNetworkAddress()[1],
                    // this.ipv4.getNextNetworkAddress()[2],
                    // this.ipv4.getNextNetworkAddress()[3],
                    // this.ipv4.getCIDR(),
                ],
            ]
        )

        return this.container
    }
    getHTMLforTyp1() {
        const ip = this.ipv4.getIP();
        const iphex = this.ipv4.getIPinHex();
        const ipbin = this.ipv4.getIPinBinary();

        const netmask = this.ipv4.getNetmask()
        const netmaskhex = this.ipv4.getNetmaskinHex()
        const netmaskbin = this.ipv4.getNetmaskinBinary()

        const headerContainer = this.containerElement('div', this.container)

        this.textElement('h1', headerContainer, 'Subnetting')
        this.textElement('pre', headerContainer, ip.join('.') + '/' + this.ipv4.getCIDR() + ' -> ' + '/' + this.sideContent.subCIDR)

        const matrix = [];
        const mainIP = new IPv4(this.ipv4.getNetworkAddress().join('.'), this.sideContent.subCIDR)
        const mask = ~mainIP.getMaskInt() + 1
        for (let i = 0; i < this.sideContent.subCount; i++) {
            matrix[i] = [
                'sublan ' + (i + 1),
                // mainIP.getIP().join('.') + '/' + this.sideContent.subCIDR,
                // mask,
                // mainIP.addMask(mask * i).join('.')+ '/' + this.sideContent.subCIDR,
                this.inputCheckElement(null, mainIP.addMask(mask * i)[0]),
                this.inputCheckElement(null, mainIP.addMask(mask * i)[1]),
                this.inputCheckElement(null, mainIP.addMask(mask * i)[2]),
                this.inputCheckElement(null, mainIP.addMask(mask * i)[3]),
                '/' + this.sideContent.subCIDR,
            ]
        }

        this.tableElement(
            this.container,
            [[], ...matrix],
        )
        console.log('html typ 1');

        console.log('gegeben')
        // console.log('netmaskOrCidr:', this.sideContent.netmaskOrCidr)
        console.log('IP:', this.ipv4.getIP(), (this.sideContent.netmaskOrCidr === 0) ? '/' + this.ipv4.getCIDR() : this.ipv4.getNetmask().join('.'))
        console.log('gesucht:')
        console.log('Lan:', this.ipv4.getNetworkAddress().join('.'), '/' + this.ipv4.getCIDR())
        console.log('First:', this.ipv4.getFirstHost().join('.'), '/' + this.ipv4.getCIDR())
        console.log('Last:', this.ipv4.getLastHost().join('.'), '/' + this.ipv4.getCIDR())
        console.log('Broadcast:', this.ipv4.getBroadcastAddress().join('.'), '/' + this.ipv4.getCIDR())
        console.log('Hosts:', '2^' + this.ipv4.getHostLengthBaseTwo() + ' - 2', '=', + Math.pow(2, this.ipv4.getHostLengthBaseTwo()) - 2)
        console.log('Next Lan:', this.ipv4.getNextNetworkAddress().join('.'))
        return this.container
    }
    getHTMLforTyp2() { console.log('html typ 2'); return this.container }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

function generateWeightedSequenze(length, maxValue, factor = 2) {
    const weights = Array.from({ length: maxValue + 1 }, (_, i) => Math.pow(factor, maxValue - i))
    const totalWeight = weights.reduce((a, b) => a + b, 0)
    function weightedRandom() {
        let r = Math.random() * totalWeight;
        for (let i = 0; i < weights.length; i++) {
            r -= weights[i]
            if (r <= 0) return i;
        }
        return weights.length - 1;
    }
    return Array.from({ length }, () => weightedRandom())
}

function main() {

    htmlBody = document.getElementById('main');



    shuffleTo255 = shuffleArray(Array(256).fill(0).map((_, b) => b))
    shuffleCIDR = shuffleArray(Array(25).fill(0).map((_, b) => b + 5))
    shuffleTyp = generateWeightedSequenze(100, 2, 1.25)

    exercises = Array(20).fill(0)
        .map((_, id) => {
            return new Exercise(
                shuffleTyp[id],
                [shuffleTo255[id * 4], shuffleTo255[id * 4 + 1], shuffleTo255[id * 4 + 2], shuffleTo255[id * 4 + 3]],
                shuffleCIDR[id]
            )
        })
        .forEach(ele => {
            console.log(ele.typ, ele.ipv4.getIP(), ele.ipv4.getCIDR())
            const html = ele.getHTML();
            htmlBody.appendChild(html)
            console.log('')
        });

    ipv4_list = [
        new IPv4("192.168.0.0", 16),
        new IPv4("192.168.0.0", 18),
        new IPv4("192.168.64.0", 18),
        new IPv4("192.168.128.0", 18),
        new IPv4("192.168.192.0", 18),
    ]
    ipv4_list.forEach(element => {
        // console.log(element.getIP(), element.getNetmask().join('.'), '/' + element.getCIDR())
        console.log(element.getIP(), '/' + element.getCIDR())
        // console.log('Hex:', '0x' + element.getIPinHex().join(' 0x'), 'Bin:', element.getIPinBinary().join(' '))
        // console.log('Hex:', '0x' + element.getNetmaskinHex().join(' 0x'), 'Bin:', element.getNetmaskinBinary().join(' '))
        console.log('Lan:', element.getNetworkAddress().join('.'), '/' + element.getCIDR())
        console.log('First:', element.getFirstHost().join('.'), '/' + element.getCIDR())
        console.log('Last:', element.getLastHost().join('.'), '/' + element.getCIDR())
        console.log('Broadcast:', element.getBroadcastAddress().join('.'), '/' + element.getCIDR())
        console.log('Hosts:', '2^' + element.getHostLengthBaseTwo() + ' - 2', '=', + Math.pow(2, element.getHostLengthBaseTwo()) - 2)
        console.log('Next Lan:', element.getNextNetworkAddress().join('.'))

        console.log('Next Lan:', ~element.getMaskInt() + 1)
        console.log('Next Lan:', element.getInt())

        console.log('')
    });
}
// ipv4_list = [
//     new IPv4("17.33.249.144", 20),
//     new IPv4("17.33.249.144", 13),
//     new IPv4("17.33.249.144", 28),
//     new IPv4("17.33.249.144", 9),
//     new IPv4("17.33.249.144", 7),
// ]
// ipv4_list = [
//     new IPv4("10.12.240.0", 20),
//     new IPv4("10.12.240.0", 21),
//     new IPv4("10.12.248.0", 21),
// ]
// ipv4_list = [
//     new IPv4("10.12.240.0", 20),
//     new IPv4("10.12.240.0", 22),
//     new IPv4("10.12.244.0", 22),
//     new IPv4("10.12.248.0", 22),
//     new IPv4("10.12.252.0", 22),
// ]
// ipv4_list = [
//     new IPv4("10.12.240.0", 20),
//     new IPv4("10.12.240.0", 23),
//     new IPv4("10.12.242.0", 23),
//     new IPv4("10.12.244.0", 23),
//     new IPv4("10.12.246.0", 23),
//     new IPv4("10.12.248.0", 23),
//     new IPv4("10.12.250.0", 23),
//     new IPv4("10.12.252.0", 23),
//     new IPv4("10.12.254.0", 23),
// ]
// ipv4_list = [
//     new IPv4("172.16.0.0",20),
//     new IPv4("172.16.0.0",22),
//     new IPv4("172.16.4.0",22),
//     new IPv4("172.16.8.0",22),
//     new IPv4("172.16.12.0",22),
// ]
// ipv4_list = [
//     new IPv4("172.16.0.0",19),
//     new IPv4("172.16.0.0",21),
//     new IPv4("172.16.8.0",21),
//     new IPv4("172.16.16.0",21),
//     new IPv4("172.16.24.0",21),
// ]
// ipv4_list = [
//     new IPv4("172.16.0.0",18),
//     new IPv4("172.16.0.0",20),
//     new IPv4("172.16.16.0",20),
//     new IPv4("172.16.32.0",20),
//     new IPv4("172.16.48.0",20),
// ]
// ipv4_list = [
//     new IPv4("172.16.0.0",17),
//     new IPv4("172.16.0.0",19),
//     new IPv4("172.16.32.0",19),
//     new IPv4("172.16.64.0",19),
//     new IPv4("172.16.96.0",19),
// ]
// ipv4_list = [
//     new IPv4("172.16.0.0",16),
//     new IPv4("172.16.0.0",18),
//     new IPv4("172.16.64.0",18),
//     new IPv4("172.16.128.0",18),
//     new IPv4("172.16.192.0",18),
// ]
// ipv4_list = [
//     new IPv4("172.16.0.0",15),
//     new IPv4("172.16.0.0",17),
//     new IPv4("172.16.128.0",17),
//     new IPv4("172.17.0.0",17),
//     new IPv4("172.17.128.0",17),
// ]


// ipv4_list = [
//     new IPv4("172.16.0.0", 23),
//     new IPv4("172.16.2.0", 24),
//     new IPv4("172.16.3.0", 26),
// ]
// ipv4_list = [
//     new IPv4("192.168.100.0", 24),
//     new IPv4("192.168.100.0", 27),
//     new IPv4("192.168.100.32", 27),
//     new IPv4("192.168.100.64", 27),
//     new IPv4("192.168.100.96", 27),
//     new IPv4("192.168.100.128", 27),
//     new IPv4("192.168.100.140", 27),
// ]
// ipv4_list = []
// ipv4_list.forEach(element => {
//     // console.log(element.getIP(), element.getNetmask().join('.'), '/' + element.getCIDR())
//     console.log(element.getIP(), '/' + element.getCIDR())
//     // console.log('Hex:', '0x' + element.getIPinHex().join(' 0x'), 'Bin:', element.getIPinBinary().join(' '))
//     // console.log('Hex:', '0x' + element.getNetmaskinHex().join(' 0x'), 'Bin:', element.getNetmaskinBinary().join(' '))
//     console.log('Lan:', element.getNetworkAddress().join('.'), '/' + element.getCIDR())
//     console.log('First:', element.getFirstHost().join('.'), '/' + element.getCIDR())
//     console.log('Last:', element.getLastHost().join('.'), '/' + element.getCIDR())
//     console.log('Broadcast:', element.getBroadcastAddress().join('.'), '/' + element.getCIDR())
//     console.log('Hosts:', '2^' + element.getHostLengthBaseTwo() + ' - 2', '=', + Math.pow(2, element.getHostLengthBaseTwo()) - 2)
//     console.log('Next Lan:', element.getNextNetworkAddress().join('.'))
//     console.log('')
// });