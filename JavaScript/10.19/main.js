const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

//1.
// const promise=alice1.animate(aliceTumbling, aliceTiming).finished;

// promise.then(() => 
//   {
//     const promise2=alice2.animate(aliceTumbling, aliceTiming).finished;
//     promise2.then
//     (
//       () =>
//       {
//         alice3.animate(aliceTumbling, aliceTiming);
//       }
//     )
//   }

// )

//2.
// const promise=alice1.animate(aliceTumbling, aliceTiming).finished;
// promise
//   .then(() =>
//   {
//   return alice2.animate(aliceTumbling, aliceTiming).finished;
//   })
//   .then(() =>
//   {
//     alice3.animate(aliceTumbling, aliceTiming);
//   }
//   )

//3.
async function myFunction()
{
  await alice1.animate(aliceTumbling, aliceTiming).finished;
  await alice2.animate(aliceTumbling, aliceTiming).finished;
  alice3.animate(aliceTumbling, aliceTiming);
}
myFunction();