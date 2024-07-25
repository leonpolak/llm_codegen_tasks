//...Cloude:

let i = 0;

const f1 = () => {
  console.log(i++);
  return new Promise(resolve => setImmediate(() => resolve(f1())));
};

const run = async () => {
  while (true) {
    await f1();
  }
};

// run();

//...GPT-4o:

i = 0;

const f2 = async () => {
  while (true) {
    console.log(i++);
    await new Promise(resolve => setTimeout(resolve, 0)); // Yield control back to the event loop
  }
};

// f2();



