// Modify Array prototype to handle async behavior

//...Cloude

Array.prototype.then = function(resolve, reject) {
    let results = new Array(this.length);
    let completed = 0;
  
    const checkCompletion = () => {
      if (completed === this.length) {
        resolve(results);
      }
    };
  
    this.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          completed++;
          checkCompletion();
        },
        (error) => {
          reject(error);
        }
      );
    });
  
    if (this.length === 0) {
      resolve(results);
    }
  };
  
  // Example usage within an async function
  (async () => {
    const p1 = f1();
    const p2 = f2();
    const p3 = f3();
    // p1, p2, p3 are instances of Promise
    // Modified behavior of await [] to act like Promise.all
    await [p1, p2, p3];
  })();

//...GPT-4o

Object.defineProperty(Array.prototype, 'then', {
    value: function (resolve, reject) {
      const promises = this;
      const results = [];
      let pending = promises.length;
  
      if (pending === 0) {
        resolve(results);
        return;
      }
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(result => {
            results[index] = result;
            pending -= 1;
            if (pending === 0) {
              resolve(results);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    writable: true,
    configurable: true
  });
  
  // Example usage within an async function
  (async () => {
    const f1 = () => new Promise(resolve => setTimeout(() => resolve('Result 1'), 1000));
    const f2 = () => new Promise(resolve => setTimeout(() => resolve('Result 2'), 2000));
    const f3 = () => new Promise(resolve => setTimeout(() => resolve('Result 3'), 1500));
  
    const p1 = f1();
    const p2 = f2();
    const p3 = f3();
  
    // p1, p2, p3 are instances of Promise
    // Modified behavior of await [] to act like Promise.all
    const results = await [p1, p2, p3];
    console.log(results); // ['Result 1', 'Result 2', 'Result 3']
  })();


 