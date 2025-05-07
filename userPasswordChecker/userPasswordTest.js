function main() {

  const passwordInput = document.getElementById("passwordInput");
  const sendButton = document.getElementById("sendButton");

  const result_Length = document.getElementById("result_Length");
  const result_smallLetter = document.getElementById("result_smallLetter");
  const result_bigLetter = document.getElementById("result_bigLetter");
  const result_number = document.getElementById("result_number");
  const result_special = document.getElementById("result_special");
  const result_quality = document.getElementById("result_quality");

  const userPasswordResult = document.getElementById("userPasswordResult");

  const changeHandler = (_event) => {
    clearing();
    if (passwordInput.value.length >= 4)
      readwWithPHPReturnJson();
  }

  function readwWithPHPReturnJson() {
    // fetch("./handler.php", {
    fetch("./handler.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"password": passwordInput.value})
    })
    .then(res => res.json())
    .then(res => {
      useResult(res);
    })
    .catch(err => {
      console.error("Fehler:", err);
    });
  }

  function useResult(res) {
    if(res.length < 8)
      result_Length.classList.add("need_this");
    result_Length.innerHTML = res.length;
    
    if(res.lettersSmall === 0)
      result_smallLetter.classList.add("need_this");
    else
      result_smallLetter.innerHTML = res.lettersSmall + " => ( " + res.matches.lettersSmall.join(", ") + " )";
    if(res.lettersBig === 0)
      result_bigLetter.classList.add("need_this");
    else
      result_bigLetter.innerHTML = res.lettersBig + " => ( " + res.matches.lettersBig.join(",") + " )";
    if(res.numbers === 0)
      result_number.classList.add("need_this");
    else
      result_number.innerHTML = res.numbers + " => ( " + res.matches.numbers.join(",") + " )";
    if(res.specials === 0)
      result_special.classList.add("need_this");
    else
      result_special.innerHTML = res.specials + " => ( " + res.matches.specials.join(",") + " )";
    if(res.quality <= 50)
      result_quality.classList.add("need_this");
    
    result_quality.innerHTML = res.quality + " bits";


    userPasswordResult.innerHTML = "Password is " + (
      res.quality < 20 ? "very weak" :
      res.quality < 40 ? "weak" :
      res.quality < 60 ? "medium" :
      res.quality < 80 ? "strong" :
      "( very strong )"
    ) + "<br>";
    userPasswordResult.innerHTML +=
      (res.lettersSmall == 0) ? "<br> add small letters" : "";
    userPasswordResult.innerHTML +=
      (res.lettersBig == 0) ? "<br> add big letters" : "";
    userPasswordResult.innerHTML +=
      (res.numbers == 0) ? "<br> add numbers" : "";
    userPasswordResult.innerHTML +=
      (res.specials == 0) ? "<br> add special signs" : "";
  }

  function clearing() {
    result_Length.innerHTML = "";
    result_smallLetter.innerHTML = "";
    result_bigLetter.innerHTML = "";
    result_number.innerHTML = "";
    result_special.innerHTML = "";
    result_quality.innerHTML = "";

    userPasswordResult.innerHTML = "";

    result_Length.classList.remove("need_this");
    result_smallLetter.classList.remove("need_this");
    result_bigLetter.classList.remove("need_this");
    result_number.classList.remove("need_this");
    result_special.classList.remove("need_this");
    result_quality.classList.remove("need_this");

  }

  passwordInput.addEventListener("keyup", changeHandler);
  sendButton.addEventListener("click", changeHandler);

}