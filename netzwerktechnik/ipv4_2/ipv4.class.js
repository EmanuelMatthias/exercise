export class IPv4 {
  constructor(base, cidr) {
    this.base = base;
    this.cidr = Math.max(Math.min(cidr, 32), 0);
  }

  // get API
  // Cidr
  getCIDRinInt() {
    if (this.cidr === 0) return 0x00000000;
    return (0xFFFFFFFF << (32 - this.cidr)) >>> 0;
  }
  getCIDRinDecimal() { return this.cidr; } // CIDR is a number, so convert to decimal
  getCIDRinDec() { return this.intToDecimal(this.getCIDRinInt()); } // CIDR is a number, so convert to decimal
  getCIDRinHexadecimal() { return this.intToHexdecimal(this.getCIDRinInt()); } // CIDR is a number, so convert to hex
  getCIDRinBinary() { return this.intToBinary(this.getCIDRinInt()); } // CIDR is a number, so convert to binary
  // IP
  getIPinInt() { return this.base; }
  getIPinDecimal() { return this.intToDecimal(this.base); }
  getIPinHexadecimal() { return this.intToHexdecimal(this.base); }
  getIPinBinary() { return this.intToBinary(this.base); }

  // Network address
  getNetworkAddressinInt() { return (this.base & this.getCIDRinInt()) >>> 0; }
  getNetworkAddressinDecimal() { return this.intToDecimal(this.getNetworkAddressinInt()); }
  getNetworkAddressinHexadecimal() { return this.intToHexdecimal(this.getNetworkAddressinInt()); }
  getNetworkAddressinBinary() { return this.intToBinary(this.getNetworkAddressinInt()); }

  // Broadcast address
  getBroadcastAddressinInt() { return (this.base | ~this.getCIDRinInt()) >>> 0; }
  getBroadcastAddressinDecimal() { return this.intToDecimal(this.getBroadcastAddressinInt()); }
  getBroadcastAddressinHexadecimal() { return this.intToHexdecimal(this.getBroadcastAddressinInt()); }
  getBroadcastAddressinBinary() { return this.intToBinary(this.getBroadcastAddressinInt()); }

  setIPinDecimal(ip) { this.base = this.ipToInt(ip); }
  setCIDRinDecimal(cidr) { this.cidr = parseInt(cidr); }

  ipToInt(ip) { return ip.split('.').reduce((acc, part) => (acc << 8) + parseInt(part) >>> 0, 0) }
  intToDecimal(int) { return [24, 16, 8, 0].map(shift => (int >>> shift) & 0xFF); }
  intToHexdecimal(int) { return int.toString(16).padStart(8, '0').match(/.{2}/g); }
  intToBinary(int) { return int.toString(2).padStart(32, '0').match(/.{4}/g); }

  static splitBinary_netHostbyCidr(ipv4) {
    const bin = ipv4.getIPinBinary().join('');
    const splitPoint = ipv4.getCIDRinDecimal();
    let [lan, host] = [[], []];
    if (0 < splitPoint && splitPoint < 29) {
      [lan, host] = [
        bin.slice(0, splitPoint).match(/.{1,4}/g),
        [
          bin.slice(splitPoint).slice(0, (32 - splitPoint) % 4),
          ...bin.slice(splitPoint).slice((32 - splitPoint) % 4).match(/.{4}/g),
        ].filter(a => a !== '')
      ]
    } else if(splitPoint === 32) {
      [lan, host] = [
        bin.match(/.{4}/g),
        []
      ];
    } else if(splitPoint === 0) {
      [lan, host] = [
        [],
        bin.match(/.{4}/g),
      ];
    }else if(splitPoint >= 29) {
      [lan, host] = [
        bin.slice(0, splitPoint).match(/.{1,4}/g),
        [bin.slice(splitPoint)],
      ];
    }
    return { lan, host }
  }
}