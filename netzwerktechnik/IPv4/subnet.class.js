import { IPv4 } from './ipv4.class.js';
import { Helper } from './helper.class.js';

export class Subnet {
  constructor(base, cidrs) {
    this.base = base;
    if (Array.isArray(cidrs)) {
      this.cidrs = cidrs;
    } else {
      this.cidrs = this.generateRandomCIDRs(32 - this.base.getCIDRinDecimal());
    }
    this.cidrs.sort((a, b) => b - a);
  }
  getNetworkAddressfromSubnet() { return this.calculateSubnetIP(); }
  getCIDRs(){ return this.cidrs; }
  getSuperAddress() { return this.findCommonIPv4(); }

  generateRandomCIDRs(startCIDR) {
    return Array(Math.floor(Math.random() * 6) + 2)
      .fill(0)
      .reduce(
        (acc, _, id) => {
          if (acc.remainingIPs == 0)
            return acc;
          let maxClientsCIDR = Math.floor(Math.log2(acc.remainingIPs));
          if (maxClientsCIDR < 2)
            return acc;
          if (id == 0)
            if (Math.pow(2, maxClientsCIDR) == acc.remainingIPs)
              maxClientsCIDR -= 1;
          const randomCIDR = Math.min(10, Helper.generateWeightedSequenze(1, maxClientsCIDR - 2, 0.6)[0] + 2);
          acc.remainingIPs -= Math.pow(2, randomCIDR);
          acc.result.push(randomCIDR);
          return acc;
        },
        {
          result: [],
          remainingIPs: Math.pow(2, startCIDR)
        }
      )
      .result
  }
  calculateSubnetIP() {
    const result = this.cidrs.reduce((acc, cidr) => {
      const ipv4 = new IPv4(acc.currentIP.getNetworkAddressinInt(), 32 - cidr);
      acc.result.push(new IPv4(ipv4.getNetworkAddressinInt(), 32 - cidr));
      acc.currentIP = new IPv4(ipv4.getBroadcastAddressinInt() + 1, 32 - cidr);
      return acc
    }, {
      currentIP: this.base,
      result: []
    })
      .result;
    this.calculateSubnetIP = () => result; // Cache the result for future calls
    return result;
  }
  findCommonIPv4(addrs) {
    addrs = this.calculateSubnetIP().map(ipv4 => ipv4.getIPinInt());
    let cidr = 32;
    let result = addrs[0];
    for (let i = 1; i < addrs.length; i++) {
      while (((result >>> (32 - cidr)) !== (addrs[i] >>> (32 - cidr))) && cidr > 0) {
        cidr--;
      }
    }
    const mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
    const base = (result & mask) >>> 0;
    result = new IPv4(base, cidr);
    this.findCommonIPv4 = () => result; // Cache the result for future calls
    return result;
  }
  consoleOutput() {
    console.log(`Subnet base: ${this.base.getIPinDecimal().join('.')} / ${this.base.getCIDRinDecimal()}`);
    console.log(`Subnet cidrs: ${this.cidrs.join(', ')}`);
    this.getNetworkAddressfromSubnet().forEach(
      (ipv4, index) => {
        console.log(`Subnet ${index + 1}: ${ipv4.getIPinDecimal().join('.')} / ${ipv4.getCIDRinDecimal()}`);
      }
    );
    console.log(`Common prefix: ${this.findCommonIPv4().getIPinDecimal().join('.')} / ${this.findCommonIPv4().getCIDRinDecimal()  }`);
  }
}