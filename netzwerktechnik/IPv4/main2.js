import { IPv4 } from "./ipv4.class.js"
import { Subnet } from "./subnet.class.js";
import { HtmlRenderer } from "./htmlRenderer.class.js";
import { Helper } from "./helper.class.js";

function main() {
  const htmlRenderer = new HtmlRenderer();
  const exercise_list = [
    ...Array(3).fill(0).map(() => {
      const base = new IPv4(
        Math.floor(Math.random() * Math.pow(2, 32)),
        Math.floor(Math.random() * 22) + 5
      );
      const subnet = new Subnet(base);
      return { base, subnet };
    })
  ];

  exercise_list.forEach(({ base, subnet }, id) => {
    const subnetType = Math.floor(Math.random() * 2) === 0;
    const first = new IPv4(
      base.getNetworkAddressinInt() + 1,
      base.getCIDRinDecimal()
    );
    const last = new IPv4(
      base.getBroadcastAddressinInt() - 1,
      base.getCIDRinDecimal()
    )
    const header = `
      <div class="header">
        <span class="title">IPv4 Subnet ${id + 1}</span>
        <div>
        ${base.getIPinDecimal().join('.')} 
          ${subnetType ?
        '/' + base.getCIDRinDecimal() :
        '&nbsp;&nbsp;&nbsp;' + base.getCIDRinDec().join('.')
      }
        </div >
      </div >
      `;
    const content = `
      <div>
        <span class="head">CIDR:</span>
        <div class='content'>
          ${!subnetType ?
        base.getCIDRinDecimal() :
        base.getCIDRinDec().join('.')}<br>
          ${base.getCIDRinHexadecimal().join(':').toUpperCase()}<br>
          ${base.getCIDRinBinary().join(' ')}
        </div>
      </div>

      <div>
        <span class="head">Network Address:</span>
        <div class='content'>
          ${base.getNetworkAddressinDecimal().join('.')}<br>
          ${base.getNetworkAddressinHexadecimal().join(':').toUpperCase()}<br>
          ${base.getNetworkAddressinBinary().join(' ')}
        </div>
      </div>

      <div>
        <span class="head">Broadcast Address:</span>
        <div class='content'>
          ${base.getBroadcastAddressinDecimal().join('.')}<br>
          ${base.getBroadcastAddressinHexadecimal().join(':').toUpperCase()}<br>
          ${base.getBroadcastAddressinBinary().join(' ')}
        </div>
      </div>

      <div>
        <span class="head">Range:</span>
        <div class='content'>
          ${first.getIPinDecimal().join('.')} 
          - 
          ${last.getIPinDecimal().join('.')}<br>
          Hosts: 
          ${last.getIPinInt() - first.getIPinInt() + 1}
          <=>
           2^${32 - base.getCIDRinDecimal()} - 2
        </div>
      </div>

      <div>
        <span class="head">Sub Netting:</span>
        <div class='content'>
          ${subnet.getSubAddresses().map(sub => sub.hosts).join()}<br>
          ${subnet.getSubAddresses().map(sub => Math.pow(2, 32 - sub.ipv4.getCIDRinDecimal())).join()}<br>
          ${subnet.getSubAddresses().map(sub => 32 - sub.ipv4.getCIDRinDecimal()).join()}<br>
          ${subnet.getSubAddresses().map(sub => 
            sub.ipv4.getIPinDecimal().join('.') + ' /' + sub.ipv4.getCIDRinDecimal()
          ).join('<br>')}<br>
        </div>
      </div>

      <div>
        <span class="head">Super Netting:</span>
        <div class='content'>
          ${subnet.getSuperAddress().getIPinDecimal().join('.')} /${subnet.getSuperAddress().getCIDRinDecimal()}<br>
          ${subnet.getSuperAddress().getCIDRinHexadecimal().join(':').toUpperCase()}<br>
          ${subnet.getSuperAddress().getCIDRinBinary().join(' ')}
        </div>
      </div>
    `;
    htmlRenderer.render({
      header,
      content
    });
  });
}

document.addEventListener("DOMContentLoaded", main);