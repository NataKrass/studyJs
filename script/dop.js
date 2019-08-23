let num = 266219;
    num = (''+num).split('');
    i = num.length;
    result = 1;

while (i > 0)
  result *= num[--i];

console.log(result);

let upresult = (result**3).toString();
console.log(upresult[0] + upresult[1]);

