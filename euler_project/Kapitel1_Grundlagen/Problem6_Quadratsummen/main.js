function main(){
    function sumQuad(end){
        let res = 0
        for(let i = 1; i<=end; i++){
            res += i**2
        }
        return res
    }
    function quadSum(end){
        let res = 0
        for(let i = 1; i<=end; i++){
            res += i
        }
        return res**2
    }
    function difference(end){
        return quadSum(end) - sumQuad(end)
    }

    console.log(difference(100))
}