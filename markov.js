/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    this.chains = {};
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const lastWord = this.words[this.words.length - 1];
    for (let i = 0; i < this.words.length - 1; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1];

      if (this.chains[word]) {
        this.chains[word].push(nextWord);
      } else {
        this.chains[word] = [nextWord];
      }
    }
    if (this.chains[lastWord]) {
      this.chains[lastWord].push(null);
    } else {
      this.chains[lastWord] = [null];
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let wordCount = 1;
    let randInd = Math.floor(Math.random() * Object.keys(this.chains).length);
    let options = Object.keys(this.chains);
    let curWord = options[randInd];
    let returnStr = curWord;

    while (wordCount < numWords) {
      options = this.chains[curWord];
      let nextWord = options[Math.floor(Math.random() * options.length)];
      if (nextWord === null) {
        break;
      }
      returnStr = returnStr + ` ${nextWord}`;
      curWord = nextWord;
      wordCount = wordCount + 1;
    }

    return returnStr;

  }

}

module.exports = { MarkovMachine }
