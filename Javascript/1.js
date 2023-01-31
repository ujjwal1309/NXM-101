// SYMBOL
let obj={};
let a=Symbol.for("Ujjwal");
let b=Symbol.for("Ujjwal");
//Symbol() gives us the unique value 
// Symbol.for() doesn't gives us the unique value
obj[a]=1;
obj[b]=2;
console.log(obj)

//Functions

let now=function(){
    console.log("Hello");
}

let bye=now;

bye();
now();

//Array

const arr=[1,2];
let arr2=arr;


if(arr){
    console.log("Truthy")
}else{
    console.log("flsy")
}

//Destructuring

let user = {
    firstName: 'Vivek',
    lastName: 'Agarwal',
    age: 38,
    posts: [
      {title: 'Post 1', comments: 10},
      {title: 'Post 2', comments: 11}
    ]
  }
  
  const { firstName:first, lastName, age=40, ...rest } = user;
  console.log(first, lastName, age, rest);
  
  // only the deepest keys become variables
  const { posts: [{ title }, {title: t2}] } = user;
  console.log(title, t2);

  console.log(user);
  console.log(age)
  console.log(rest)


