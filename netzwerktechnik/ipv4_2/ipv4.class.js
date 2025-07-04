export class IPv4 {
  constructor(base, cidr) {
    this.base = base;
    this.cidr = cidr;
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
}