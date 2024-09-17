const fs = require("fs");

const superagent = require("superagent");

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       console.log(res.body.message);
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log("Random dog image has saved to the file");
//       });
//     });
// });

/* In the below , We will solve the callback hell that was created above by building promises , We will gonna use promise for
 the http request instead of  the callback. This is gonna work because the superagent library  actually has the support to promises
 out of the box . So can we can simply use them here */

/* Below we will learn how to consume a promise */
// The superagent third party library get() method will return a promise . A promise basically implements the concept of a future value
// Basically we are expecting a value that we will recieve in the future (or) In simple words , We are saying that "Hey Dog API  please
// get me a random dog image in the background and let me know when you are ready and then give me that data back . So here the random
// image is the value that we expect sometime in the future"

/* Important note about Promises
 A Promise that comes back with the data  is called a resolved promise . So in the beginning it is a pending promise and once it sucess
 fully gets the data back then it is a resolved promise . However the resolved promise might not be successful everytime because there 
  might have been an error . So we can say that a resolved promise can either be fulfilled (or) rejected . The fulfilled promise will
   have a result that we can use and a rejected promise will have an error that is returned . Please remember in the above then()
   method it will handle only fulfilled promises but it will not do anything if there is an error because for that we have another 
   method for handling the rejected promises which will return a error is the catch() method . So after the then() method we can 
   chain this then() method with a catch() method to handle the error*/

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("Random dog image has saved to the file");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
