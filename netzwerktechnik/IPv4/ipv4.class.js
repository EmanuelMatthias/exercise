export class IPv4 {
  constructor(base, cidr) {
    this.base = base;
    this.cidr = cidr;
    this.mask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
  }

  // get API
  // Cidr
  getCIDRinInt() { return (0xFFFFFFFF << (32 - this.cidr)) >>> 0; }
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


  intToDecimal(int) { return [24, 16, 8, 0].map(shift => (int >>> shift) & 0xFF); }
  intToHexdecimal(int) { return int.toString(16).padStart(8, '0').match(/.{2}/g); }
  intToBinary(int) { return int.toString(2).padStart(32, '0').match(/.{4}/g); }

  consoleOutput() {
    console.log(`IPv4: ${this.getIPinInt()}`);
    console.log(`\tDecimal: ${this.getIPinDecimal().join('.')} /${this.getCIDRinDecimal()}`);
    console.log(`\tHexdecimal: ${this.getIPinHexadecimal().join(':')}`);
    console.log(`\tBinary: ${this.getIPinBinary().join(' ')}`);

    console.log(`CIDR: ${this.getCIDRinInt()}`);
    console.log(`\tDecimal: ${this.getCIDRinDecimal()}`);
    console.log(`\tHexdecimal: ${this.getCIDRinHexadecimal().join(':')}`);
    console.log(`\tBinary: ${this.getCIDRinBinary().join(' ')}`);

    console.log(`Network Address: ${this.getNetworkAddressinInt()}`);
    console.log(`\tDecimal: ${this.getNetworkAddressinDecimal().join('.')}`);
    console.log(`\tHexdecimal: ${this.getNetworkAddressinHexadecimal().join(':')}`);
    console.log(`\tBinary: ${this.getNetworkAddressinBinary().join(' ')}`);

    console.log(`Broadcast Address: ${this.getBroadcastAddressinInt()}`);
    console.log(`\tDecimal: ${this.getBroadcastAddressinDecimal().join('.')}`);
    console.log(`\tHexdecimal: ${this.getBroadcastAddressinHexadecimal().join(':')}`);
    console.log(`\tBinary: ${this.getBroadcastAddressinBinary().join(' ')}`);
  }
}