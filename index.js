const fs = require("fs");

const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("I could not find that file"); // Whatever we pass into the reject(err) function will be the error later available in the catch() method
      }
      resolve(data); // Whatever variable we are passing into the resolve(data) function will be later available as an argument in
      // the then() method . In simple words whatever we are passing into the resolve(data) function is the result of the promise
      // that will be available in the then() handler
    });
  }); // We are using the Promise constructor here which was introduced in the language with ES6. This promise
  // constructor will take a so called executor function which will get called immediately when the promise is created and this
  // executor function will be called with two arguments: resolve and reject. These functions are used to resolve or reject the promise.
  // In this case, if there is an error reading the file, the reject function will be called with an error message. Otherwise, the resolve function
  // will be called with the file data.
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 🥲");
      resolve("success"); // We donot have any data to pass here . So we are passing some random string which is "success" . There
      // is no rule that everytime a promise has to return a meaningful value
    });
  });
};

///////////////////// Implementing Promises using async/await which were introduced to Javascript in ES8 /////////////////////////

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`); // This await here will stop the code from running at this point until the promise
    // is resolved . Now if the promise is fulfilled which means if the Promise is successful then the value of the await expression is the
    // resolved value of the promise which is finally assigned to the data variable
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dog-img.txt", res.body.message);

    console.log("Random dog image has saved to the file");
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFilePro("dog-img.txt", res.body.message);

    // fs.writeFile("dog-img.txt", res.body.message, (err) => {
    //   console.log("Random dog image has saved to the file");
    // });
  })
  .then(() => {
    console.log("Random dog image has saved to the file");
  })
  .catch((err) => {
    console.log(err);
  });
  */
// This readFilePro function will return a promise and we are catcing the promise using the
// then() handler . The data that we are passing into the above then() handler is the result of the promise that we are returning from
// the above resolve() method incase there is no error in getting the data back

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

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log("Random dog image has saved to the file");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
