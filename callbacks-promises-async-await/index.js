// callbacks
function sum(a,b){
    console.log("sum")
    console.log(a+b)
}

// here we are passing the function as call back
function calculator( a,b, sum){
    return sum(a,b)
}

calculator(1,2,()=>{
    sum(1,2)
})

// call back hell

function func1(a,b,sum){
    
}