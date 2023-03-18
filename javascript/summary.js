

let test = Math.max.apply(a(), [1, 2, 3]);


function a(x) {
    console.log(x);
}