import { IPv4 } from "./ipv4.class.js";
import { Helper } from "./helper.class.js";

export class HtmlRenderer {
  constructor(helpField=false, help = false) {
    this.mainContainer = document.getElementById("main");
    this.help = help;
  }

  createArticle() {
    return document.getElementById("article").content.cloneNode(true);
  }

  createArticle_network_infos({ base, subnet }, subnetType) {
    const article = this.createArticle();
    article.querySelector(".article_header").innerHTML = "Network Infos:";
    const contentContainer = article.querySelector(".article_content");

    const first = new IPv4(
      base.getNetworkAddressinInt() + 1,
      base.getCIDRinDecimal()
    );
    const last = new IPv4(
      base.getBroadcastAddressinInt() - 1,
      base.getCIDRinDecimal()
    )

    const matrix = [];

    matrix.push([{ colspan: 5, content: 'Mask/CIDR:' }]);
    matrix.push(['', { colspan: 2, content: this.createInput(base.getCIDRinDecimal(), 'normal') }]);
    if (this.help) matrix.push(['', { colspan: 2, content: base.getCIDRinDecimal() },]);
    matrix.push(['Dec', ...base.getCIDRinDec().map(dec => ({ colspan: 2, content: this.createInput(dec, 'dec') }))]);
    if (this.helpField) if (this.help) matrix.push(['', ...base.getCIDRinDec().map(dec => ({ colspan: 2, content: dec }))]);
    if (this.helpField) matrix.push(['Hex', ...base.getCIDRinHexadecimal().map(hex => ({ colspan: 2, content: this.createInput(hex, 'hex') }))]);
    if (this.helpField) if (this.help) matrix.push(['', ...base.getCIDRinHexadecimal().map(hex => ({ colspan: 2, content: hex }))]);
    if (this.helpField) matrix.push(['Bin', ...base.getCIDRinBinary().map(bin => this.createInput(bin, 'bin'))]);
    if (this.helpField) if (this.help) matrix.push(['', ...base.getCIDRinBinary()]);

    matrix.push([{ colspan: 5, content: 'Network Address:' }]);
    matrix.push(['Dec', ...base.getNetworkAddressinDecimal().map(dec => ({ colspan: 2, content: this.createInput(dec, 'dec') }))]);
    if (this.help) matrix.push(['', ...base.getNetworkAddressinDecimal().map(dec => ({ colspan: 2, content: dec }))]);
    if (this.helpField) matrix.push(['Hex', ...base.getNetworkAddressinHexadecimal().map(hex => ({ colspan: 2, content: this.createInput(hex, 'hex') }))]);
    if (this.helpField) if (this.help) matrix.push(['', ...base.getNetworkAddressinHexadecimal().map(hex => ({ colspan: 2, content: hex }))]);
    if (this.helpField) matrix.push(['Bin', ...base.getNetworkAddressinBinary().map(bin => this.createInput(bin, 'bin'))]);
    if (this.helpField) if (this.help) matrix.push(['', ...base.getNetworkAddressinBinary()]);

    matrix.push([{ colspan: 5, content: 'Broadcast Address:' }]);
    matrix.push(['Dec', ...base.getBroadcastAddressinDecimal().map(dec => ({ colspan: 2, content: this.createInput(dec, 'dec') }))]);
    if (this.help) matrix.push(['', ...base.getBroadcastAddressinDecimal().map(dec => ({ colspan: 2, content: dec }))]);
    if (this.helpField) matrix.push(['Hex', ...base.getBroadcastAddressinHexadecimal().map(hex => ({ colspan: 2, content: this.createInput(hex, 'hex') }))]);
    if (this.helpField) if (this.help) matrix.push(['', ...base.getBroadcastAddressinHexadecimal().map(hex => ({ colspan: 2, content: hex }))]);
    if (this.helpField) matrix.push(['Bin', ...base.getBroadcastAddressinBinary().map(bin => this.createInput(bin, 'bin'))]);
    if (this.helpField) if (this.help) matrix.push(['', ...base.getBroadcastAddressinBinary()]);


    matrix.push([{ colspan: 5, content: 'Range:' }]);
    matrix.push(['Dec', ...first.getIPinDecimal().map(dec => ({ colspan: 2, content: this.createInput(dec, 'dec') }))]);
    if (this.help) matrix.push(['', ...first.getIPinDecimal().map(dec => ({ colspan: 2, content: dec }))]);
    matrix.push(['Dec', ...last.getIPinDecimal().map(dec => ({ colspan: 2, content: this.createInput(dec, 'dec') }))]);
    if (this.help) matrix.push(['', ...last.getIPinDecimal().map(dec => ({ colspan: 2, content: dec }))]);

    matrix.push([{ colspan: 5, content: 'Clients:' }]);
    matrix.push([
      '',
      { colspan: 2, content: this.createInput(last.getIPinInt() - first.getIPinInt() + 1, 'normal') },
      { colspan: 2, content: '<=>' },
      { colspan: 2, content: this.createInput(32 - base.getCIDRinDecimal(), 'normal') }
    ]);
    if (this.help) matrix.push([
      '',
      { colspan: 2, content: last.getIPinInt() - first.getIPinInt() + 1 },
      { colspan: 2, content: '' },
      { colspan: 2, content: `2^(${32 - base.getCIDRinDecimal()})-2` }

    ]);

    contentContainer.appendChild(this.createTable(matrix));
    return article;
  }

  createArticle_subnet({ base, subnet }, subnetType) {
    const article = this.createArticle();
    article.querySelector(".article_header").innerHTML = "Sub Netting:";
    const contentContainer = article.querySelector(".article_content");

    let matrix = [];
    matrix.push([{
      colspan: 7,
      content: Helper.shuffleArray(
        subnet.getSubAddresses().map(sub => sub.hosts)
      ).join(', ')
    }]);
    matrix.push({
      isHeader: true, content: [
        '',
        'clients',
        'hosts',
        'okt1',
        'okt2',
        'okt3',
        'okt4',
        'cidr',
      ]
    });
    subnet.getSubAddresses().forEach((address, id) => {
      matrix.push([
        `Lan ${id + 1}`,
        this.createInput(address.hosts, 'bin'),
        this.createInput(Math.pow(2, 32 - address.ipv4.getCIDRinDecimal()), 'bin'),
        ...address.ipv4.getNetworkAddressinDecimal().map(dec => this.createInput(dec, 'bin')),
        this.createInput(address.ipv4.getCIDRinDecimal(), 'bin'),
      ]);
      if (this.help)
        matrix.push([
          '',
          address.hosts,
          Math.pow(2, 32 - address.ipv4.getCIDRinDecimal()),
          ...address.ipv4.getNetworkAddressinDecimal(),
          address.ipv4.getCIDRinDecimal(),
        ]);
        
      if (this.helpField) matrix.push(['Hex', ...address.ipv4.getNetworkAddressinHexadecimal().map(hex => ({ colspan: 2, content: this.createInput(hex, 'hex') }))]);
      if (this.helpField) if (this.help) matrix.push(['', ...address.ipv4.getNetworkAddressinHexadecimal().map(hex => ({ colspan: 2, content: hex }))]);
      if (this.helpField) matrix.push(['Bin', ...address.ipv4.getNetworkAddressinBinary().map(bin => this.createInput(bin, 'bin'))]);
      if (this.helpField) if (this.help) matrix.push(['', ...address.ipv4.getNetworkAddressinBinary()]);
    });
    contentContainer.appendChild(this.createTable(matrix));

    matrix = [];

    matrix.push([{ colspan: 5, content: 'Super Address:' }]);
    matrix.push(['Dec', ...subnet.getSuperAddress().getIPinDecimal().map(dec => ({ colspan: 2, content: this.createInput(dec, 'dec') }))]);
    if (this.help) matrix.push(['', ...subnet.getSuperAddress().getIPinDecimal().map(dec => ({ colspan: 2, content: dec }))]);
    if (this.helpField) matrix.push(['Hex', ...subnet.getSuperAddress().getCIDRinHexadecimal().map(hex => ({ colspan: 2, content: this.createInput(hex, 'hex') }))]);
    if (this.helpField) if (this.help) matrix.push(['', ...subnet.getSuperAddress().getCIDRinHexadecimal().map(hex => ({ colspan: 2, content: hex }))]);
    if (this.helpField) matrix.push(['Bin', ...subnet.getSuperAddress().getCIDRinBinary().map(bin => this.createInput(bin, 'bin'))]);
    if (this.helpField) if (this.help) matrix.push(['', ...subnet.getSuperAddress().getCIDRinBinary()]);
    
    matrix.push([{ colspan: 5, content: 'CIDR:' }]);
    matrix.push(['', { colspan: 2, content: this.createInput(subnet.getSuperAddress().getCIDRinDecimal(), 'normal') }]);
    if (this.help) matrix.push(['', { colspan: 2, content: subnet.getSuperAddress().getCIDRinDecimal() },]);

    
    contentContainer.appendChild(this.createTable(matrix));
    return article;
  }

  createTable(matrix) {
    const table = document.createElement('table');
    matrix.forEach((matrix_row) => {
      const row = document.createElement('tr');
      const isHeader = false;
      if (!Array.isArray(matrix_row)) {
        if (matrix.isHeader !== undefined)
          isHeader = true;
        matrix_row = matrix_row.content;
      }
      table.appendChild(row);
      matrix_row.forEach((matrix_cell) => {
        let cell;
        if (isHeader)
          cell = document.createElement('th');
        else
          cell = document.createElement('td');
        if (typeof matrix_cell === 'string' || typeof matrix_cell === 'number') {
          cell.innerHTML = matrix_cell;
        } else if (typeof matrix_cell.content === 'string' || typeof matrix_cell.content === 'number') {
          cell.innerHTML = matrix_cell.content;
        } else {
          if (matrix_cell.content === undefined) {
            cell.appendChild(matrix_cell)
          } else {
            cell.appendChild(matrix_cell.content)
          }
        }
        if (matrix_cell.colspan !== undefined)
          cell.setAttribute('colspan', matrix_cell.colspan)
        row.appendChild(cell);
      })
    })
    return table;
  }

  createInput(value, className = '') {
    const len =
      className === 'bin' ? 4 :
        className === 'hex' ? 2 :
          className === 'hex' ? 3 :
            10;
    const input = document.createElement('input');
    if (typeof className === 'string' && className !== '') {
      input.classList.add(className);
    } else if (Array.isArray(className) && className.length > 0) {
      className.forEach(cN => {
        if (typeof cN === 'string' && cN !== '')
          input.classList.add(cN);
      });
    }
    input.maxLength = len;
    input.autocomplete = "off";
    input.addEventListener('keyup', (ev) => {
      const shouldValue = value.toString()
      input.classList.remove('answerTrue', 'answerFalse')
      if (input.value === shouldValue)
        input.classList.add('answerTrue')
      else if (input.value != '' && input.value != shouldValue)
        input.classList.add('answerFalse')
    })
    return input;
  }

  render(template) {
    const card = document.getElementById("card").content.cloneNode(true);;
    card.querySelector(".card_header").innerHTML = template.header;
    template.content.forEach(element => {
      card.querySelector(".card_content").appendChild(element);
    });
    this.mainContainer.appendChild(card);
  }
}