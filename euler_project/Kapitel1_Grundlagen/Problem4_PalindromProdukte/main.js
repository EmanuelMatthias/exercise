function main(){
    function isPalindrom(candidat){
        //zerlegung
        asArray = []
        while(candidat > 0){
            ziffer = candidat % 10
            asArray = [...asArray, ziffer]
            candidat = (candidat - ziffer) / 10
        }
        let itIsPalindrom = true
        for(let i=0; i<asArray.length/2;i++){
            if(asArray[i] != asArray[asArray.length-i-1])
                itIsPalindrom = false
        }
        return itIsPalindrom
    }
    resultA = 1
    resultB = 1
    greatest = 1

    for(let a=100; a<1000;a++){
        for(let b=a; b<1000;b++){
            if(a*b > greatest && isPalindrom(a*b)){
                resultA = a
                resultB = b
                greatest = a* b
            }
        }
    }
    console.log(resultA,resultB,greatest)
}