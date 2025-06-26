function main() {
    // function primfactor(input,number=2){
    //     if(number < input){
    //         if(input % number == 0 ) {
    //             return primfactor(input / number, number)
    //         }else{
    //             return primfactor(input, number+1)
    //         }
    //     }else{
    //         return number
    //     }
    // }
    function primfactor2(input){
        let number = 2;
        while(input > number){
            if(input % number == 0){
                input /= number
            }else{
                number++
            }
        }
        return number
    }
    console.log(primfactor2(600851475143))
}