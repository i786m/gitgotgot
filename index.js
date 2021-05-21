const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');
const FILE_PATH = './data.json';

const makeCommit = n => {
  // n is the number of pushes you want to make
  if (n === 0) return simpleGit().push();
  const x = 50;
  const y = random.int(0, x);
  const DATE = moment().subtract(x, 'd').add(y, 'd').format();
  // goes back by x amount of days and create pushes on random days until today
  const data = {
    date: DATE,
  };
  console.log(DATE);
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add(FILE_PATH)
      .commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n));
  });
};

makeCommit(9);
