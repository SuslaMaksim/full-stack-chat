

let  Proto = () =>{
    
    
 let obj = {
     ' ': [1],
     'g': [4],
     'd': [6],
     'x': [5],
     'o': [3,7],
     'p': [8,9,10],

 }
 let arrey = []
 for(let item in obj){
     for(let j of obj[item]){
         arrey[j] = item
     }
 }
 console.log(Object.keys(obj ))




    return(
        <>
            </>
    )
    
}

export default Proto