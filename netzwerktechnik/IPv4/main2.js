import { IPv4 } from "./ipv4.class.js"
import { Subnet } from "./subnet.class.js";
import { HtmlRenderer } from "./htmlRenderer.class.js";

function main() {
  const htmlRenderer = new HtmlRenderer(true,TransformStreamDefaultController);
  const exercise_list = [
    ...Array(25).fill(0).map(() => {
      const base = new IPv4(
        Math.floor(Math.random() * Math.pow(2, 32)),
        Math.floor(Math.random() * 22) + 5
      );
      const subnet = new Subnet(base);
      return { base, subnet };
    })
  ];

  let help = htmlRenderer.help;
  let helpField = htmlRenderer.helpField;
  exercise_list.forEach(({ base, subnet }, id) => {
    const subnetType = Math.floor(Math.random() * 2) === 0;
    const header = `
        <div class="title">IPv4 Subnet ${id + 1}</div>
        <div>
        ${base.getIPinDecimal().join('.')} 
          ${subnetType ?
        '/' + base.getCIDRinDecimal() :
        '&nbsp;&nbsp;&nbsp;' + base.getCIDRinDec().join('.')
      }
        </div>
      `;

    if(id===0){
      htmlRenderer.help = true;
      htmlRenderer.helpField = true;
    }else if(id===1){
      htmlRenderer.help = help;
    }else{
      htmlRenderer.helpField = helpField;
    }
    const content = [
      htmlRenderer.createArticle_network_infos({ base, subnet }, subnetType),
      htmlRenderer.createArticle_subnet({ base, subnet }, subnetType),
    ];
    if(id===0)
        content.push(htmlRenderer.createAList({ base, subnet }, subnetType))
    htmlRenderer.render({
      header,
      content
    });
  });
}

document.addEventListener("DOMContentLoaded", main);