function main() {

  const helperTable = document.getElementById("helper");
  const questionField = document.getElementById("question");
  const resultField = document.getElementById("HEX_DEC_BIN_Result");


  const input = document.getElementById("input");

  let timer = 0;

  function init(){
    for(i = 0; i < 16; i++){
      row = document.createElement("tr");
      cell_id = document.createElement("td");
      cell_id.appendChild(document.createTextNode(i));
      cell_bin = document.createElement("td");
      cell_bin.appendChild(document.createTextNode(i.toString(2).padStart(4,'0')));
      cell_hex = document.createElement("td");
      cell_hex.appendChild(document.createTextNode(i.toString(16).padStart(1,'0').toUpperCase()));
      cell_mul = document.createElement("td");
      cell_mul.appendChild(document.createTextNode(i * 16));
      row.appendChild(cell_id)
      row.appendChild(cell_bin)
      row.appendChild(cell_hex)
      row.appendChild(cell_mul)
      helperTable.appendChild(row)
    }
  }

  function question(){
    let a = -1
    let b = -1
    let c = -1
    function get(){
      return {a,b,c}
    }
    function set(){
      f = [0,1,2]
      a = f.splice(Math.floor(Math.random() * 3),1)[0]
      b = f.splice(Math.floor(Math.random() * 2),1)[0]
      c = Math.floor(Math.random() * 255)
      timer = new Date()
      return {a,b,c}
    }
    return {get, set}
  }
  quest = question()

  function insertChar(t,c,p){
    return t.slice(0,p) + c + t.slice(p)
  }

  function createQuestion(){
    a = quest.set()
    b = ["Dec","Hex","Bin"]
    c = [10,16,2]
    d = [0,2,8]
    e = ["",""," "]
    f = [0,0,4]
    questionField.innerHTML = "<br>Von " + b[a.a] + " nach " + b[a.b] + "<br><br>"
    questionField.innerHTML += ((a.a === 1)?"0x":"") + insertChar(a.c.toString(c[a.a]).padStart(d[a.a],'0').toUpperCase(),e[a.a],f[a.a]) + "<br>"

  }

  function reactionHandler(ev){
    if (ev.key === "Enter"){
      b = ["Dec","Hex","Bin"]
      c = [10,16,2]
      d = [0,2,8]
      e = ["",""," "]
      f = [0,0,4]
      a = quest.get()
      val = input.value
      target = insertChar(a.c.toString(c[a.b]).padStart(d[a.b],'0').toUpperCase(),e[a.b],f[a.b])
      res = val.toUpperCase().replace(/ /g, '') === target.replace(/ /g, '')
      resultField.innerHTML = ((res)?"true":"false")
      // resultField.innerHTML = target + " <> " +  input.value + " " + ((res)?"true":"false")
      if (res){
        resultField.innerHTML = "<br>" + target + " <> " +  input.value + " " + ((res)?"true":"false")
        resultField.innerHTML += (timer - new Date()) / 1000 + "sek"
        createQuestion()
        input.value = ''
      }
    }
  }

  input.addEventListener("keydown", reactionHandler);
  // sendButton.addEventListener("click", changeHandler);

  init();
  createQuestion();

}