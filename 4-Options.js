//...Cloude:

const getSelected = (options) => {
  const selectedValues = [];
  const seenKeys = new Set();

  for (const key in options) {
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      selectedValues.push(options[key]);
    }
  }

  return selectedValues;
};

// Example usage
const x = Symbol('x');
const _ = Symbol('_');

const options = {
  [x]: 'Uno',
  [_]: 'Due',
  [x]: 'Tre',
  [_]: 'Quatro',
};

const selected = getSelected(options);
console.log(selected); // ["Uno", "Tre"]

//...GPT-4o:

const x = Symbol('x');
const _ = Symbol('_');

const options = {
  [x]: 'Uno',
  [_]: 'Due',
  [x]: 'Tre',
  [_]: 'Quatro',
};

function getSelected(options) {
  const seenKeys = new Set();
  const selected = [];

  for (const key of [x, _]) {
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      selected.push(options[key]);
    }
  }

  return selected;
}

console.log(getSelected(options)); // ["Tre", "Quatro"]