function main(){

    function sumEvenFibo(limit){
        let sum = 0;

        currentFibo_a = 0
        currentFibo_b = 1
        nextFibo_b = currentFibo_a + currentFibo_b

        while(nextFibo_b < limit ){

            if ( nextFibo_b % 2 == 0 ){
                sum += nextFibo_b
            }
            
            currentFibo_a = currentFibo_b
            currentFibo_b = nextFibo_b
            nextFibo_b = currentFibo_a + currentFibo_b
        }

        return sum

    }

    console.log(sumEvenFibo(4_000_000))
}