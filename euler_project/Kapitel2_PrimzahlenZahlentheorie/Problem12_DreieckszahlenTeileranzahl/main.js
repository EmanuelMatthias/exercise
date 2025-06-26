function main(){
    let breaker = 0
    let counter = 0
    let number = 1
    while(breaker < 100000 && counter < 500){
        number++
        let toTest = number * (number + 1) / 2
        counter = 0
        for(let i = 1; i <= toTest / 2; i++ ){
            if(toTest % i == 0){
                if(i == toTest / 2){
                    counter += 1
                }else{
                    counter += 2
                }
            }
        }
        breaker++
    }
    console.log(number, counter)
    if(breaker >= 100000)
        console.log("breaker out")
}