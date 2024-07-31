
// observable is an entity that keep on emitting the stuff or data

// pipe is a stream where we have different operator that process data
// -- the operator that process data 
// -- map to iterate over something and send data back
// -- pluck to fetch the specific attribute you may say
// 

// observer is the end person that do something at the end when everything got happen, he is the person who subscribe the data.
// means the end result after the data is processed , or getting error if something wrong happen when in stream or complete.
// next();
// Error();
// Complete();

// reactive programming 

import {Observable} from 'rxjs'
import {map,pluck,catchError} from 'rxjs/operators';

const data = [
    {id:1,name:'john'},
    {id:2,name:'ibtasam'},
    {id:3,name:'shayan bhai'}
]
// entity that emitting the data continouly right.
const observable = new Observable((subscriber)=>{
    subscriber.next(data);
    setTimeout(() => {
        subscriber.next(data);
    }, 2000);
    subscriber.next(data);
})

// making a stream of operators - pipe

 const stream = observable.pipe(
    map((ob)=>{
        return ob
    })
 )

// entity that 
const observer = {
    next(response ){ console.log(response) },
    error(err){ console.log(err)}
}

stream.subscribe(observer)

// if no pipe - observable.subscribe(observer)
// if pipe - something = observable.pipe() then somehting.subscribe(observer)