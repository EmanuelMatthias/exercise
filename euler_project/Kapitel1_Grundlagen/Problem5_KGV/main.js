function main(){

    primeList = [2]

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

    function primFactorDestroyer(number){
        let result={}
        isPrime(number)
        while( number != 1 ){
            for(let i = 0; i < primeList.length; i++ ){
                if(number % primeList[i] == 0){
                    number /= primeList[i]
                    result[primeList[i]]=result[primeList[i]]+1 || 1
                }
            }
        }
        return result
    }

    let result = {}
    for(let i = 2; i <= 20; i++){
        factors = primFactorDestroyer(i)
        keys = Object.keys(factors)
        for( let j=0; j < keys.length; j++ ){
            const key = keys[j]
            const val1 = factors[key]
            const val2 = result[key] || 1
            const res = Math.max(val1, val2)
            result[key] = res
        }
    }
    let kgv = 1
    keys = Object.keys(result)
    for(let i = 0; i < keys.length; i++){
        const key = keys[i]
        const value = result[key]
        const res = (key*1)**value
        kgv*=res
    }
    console.log(kgv)
    

    
}