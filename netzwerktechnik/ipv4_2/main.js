import { Page_Main } from "./pages/page_main.js";



function main() {
  const page_main = new Page_Main(document.getElementById('main'));
  page_main.render();
}

document.addEventListener("DOMContentLoaded", main);