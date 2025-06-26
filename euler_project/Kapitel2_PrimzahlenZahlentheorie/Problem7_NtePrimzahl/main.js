function main(){
    let primeList = [2]

    function isPrime(number){
        if(number == 1){
            return false
        }else if( number in primeList){
            return true
        }else if(number % 2 == 1){
            for(let i = 0; i < primeList.length; i++ ){
                if(number % primeList[i] == 0){
                    return false
                }
            }
        }else{
            return false
        }
        primeList=[...primeList, number]
        return true
    }

    function allPrime(end){
        let testNumber = 3;
        breaker=0
        while(breaker < 1000000 && primeList.length <= end){
            breaker++
            isPrime(testNumber)
            testNumber++
        }
        if(breaker >= 1000000)
            console.log("break out")
        return primeList[primeList.length-1]
    }
    console.log(allPrime(10001))
    console.log(primeList)
}