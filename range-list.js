// In this part of the interview process, we'd like you to come up with an algorithm to
// solve the problem as described below. The problem itself is quite simple to solve.The
// solution needs to be in JavaScript.What we are mainly looking for in this test(other
// than that the solution should work) is, how well you actually write the code.
// We want to see how you write production - quality code in a team setting where
// multiple developers will be collaborating on the codebase.
//     Specifically, we are looking for: simple, clean, readable and maintainable code, for
// example:
//     - Code organization and submission format.Things like code organization,
//         readability, documentation, testing and deliverability are most important here.
// - Your mastery of idiomatic JavaScript(JS) programming.We understand that
// you may not have much experience with JS.We encourage you to take some
// time to research modern JS and best practices, and try your best to apply them
// when writing your test solution.
// --


// Problem Set below:
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range
// includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
/**
*
* NOTE: Feel free to add any extra member variables/functions you like.
*/

class RangeList {
    constructor() {
        this.rangeList = null;
        // Initialize as empty array instead?
        // Rangelist will simply be a 1D array
    }
    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    add(range) {
        // Memoize range numbers
        const rangeMin = range[0];
        const rangeMax = range[1];
        
        // Case 1: rL is empty
        if (!this.rangeList) {
            this.rangeList = range;
        } else {    // Case 2: rL is defined
            // let overlap = false;
            let i = 0;
            let length = this.rangeList.length;

            while (i < length) {
                let currMin = this.rangeList[i];
                let currMax = this.rangeList[i+1];

                if (rangeMin < currMin) {
                    if (rangeMax < currMin) { // new range has no overlap with rL
                        this.rangeList.unshift(rangeMin, rangeMax);
                        break;
                    } else if (rangeMax <= currMax) { // new range has some overlap with rL
                        this.rangeList[i] = rangeMin; // expand rL domain to the left
                        break;
                    } else if (rangeMax > currMax) { // expand rL in both directions
                        this.rangeList[i] = rangeMin; 
                        this.rangeList[i+1] = rangeMax; 
                    }
                } else if (rangeMin >= currMin && rangeMin < currMax) {
                    if (rangeMax <= currMax) { // new range has no overlap with rL
                        break;
                    } else if (rangeMax > currMax) { // new range has some overlap with rL
                        this.rangeList[i+1] = rangeMax; // expand rL domain to the left
                        break;
                    } else if (rangeMax > currMax) { // expand rL in both directions
                        this.rangeList[i] = rangeMin;
                        this.rangeList[i + 1] = rangeMax;
                        break;
                    }
                } else if (rangeMin >= currMax && rangeMax >= currMax) {
                
                    if (i+1 === this.rangeList.length-1) { // only if we've reached the end of rL, should we take action
                        if (rangeMin === currMax) {
                            this.rangeList[i + 1] = rangeMax;
                            break;
                        } else if (rangeMin > currMax) {
                            console.log('here')
                            this.rangeList.push(rangeMin, rangeMax);
                            break;
                        }
                    }
                    
                }

                i = i + 2;  // analyzing by pairs of numbers
            }
           
        }

    }

    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    remove(range) {
        const rangeMin = range[0];
        const rangeMax = range[1];

        // Case 1: rL is empty
        if (!this.rangeList) {
            this.rangeList = range;
        } else {    // Case 2: rL is defined
            // let overlap = false;
            let i = 0;
            let length = this.rangeList.length;

            while (i < length) {
                let currMin = this.rangeList[i];
                let currMax = this.rangeList[i + 1];

                if (rangeMin < currMin) {
                    if (rangeMax < currMin) { // new range has no overlap with rL
                        this.rangeList.unshift(rangeMin, rangeMax);
                        break;
                    } else if (rangeMax <= currMax) { // new range has some overlap with rL
                        this.rangeList[i] = rangeMin; // expand rL domain to the left
                        break;
                    } else if (rangeMax > currMax) { // expand rL in both directions
                        this.rangeList[i] = rangeMin;
                        this.rangeList[i + 1] = rangeMax;
                    }
                } else if (rangeMin >= currMin && rangeMin < currMax) {
                    if (rangeMax <= currMax) { // new range has no overlap with rL
                        break;
                    } else if (rangeMax > currMax) { // new range has some overlap with rL
                        this.rangeList[i + 1] = rangeMax; // expand rL domain to the left
                        break;
                    } else if (rangeMax > currMax) { // expand rL in both directions
                        this.rangeList[i] = rangeMin;
                        this.rangeList[i + 1] = rangeMax;
                        break;
                    }
                } else if (rangeMin >= currMax && rangeMax >= currMax) {

                    if (i + 1 === this.rangeList.length - 1) { // only if we've reached the end of rL, should we take action
                        if (rangeMin === currMax) {
                            this.rangeList[i + 1] = rangeMax;
                            break;
                        } else if (rangeMin > currMax) {
                            console.log('here')
                            this.rangeList.push(rangeMin, rangeMax);
                            break;
                        }
                    }

                }

                i = i + 2;  // analyzing by pairs of numbers
            }

        }

    }
    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        // TODO: implement this
        if (this.rangeList) {
            let printArr = [];
            var i, 
                length = this.rangeList.length;

            for ( i = 0; i < length; i++ ) {
                if (i % 2 === 0) {
                    printArr.push(`[${this.rangeList[i]},`);
                } else {
                    printArr.push(`${this.rangeList[i]})`)
                }
            }
            console.log(printArr.join(" "));
        } else {
            console.log("Range list is undefined")
        }
    }
}


// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

// rl.remove([10, 10]);
// rl.print();
// // Should display: [1, 8) [10, 21)

// rl.remove([10, 11]);
// rl.print();
// // Should display: [1, 8) [11, 21)

// rl.remove([15, 17]);
// rl.print();
// // Should display: [1, 8) [11, 15) [17, 21)

// rl.remove([3, 19]);
// rl.print();
// // Should display: [1, 3) [19, 21)