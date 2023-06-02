/* Load JavaScript after webpage has loaded */
window.onload = function () {
    /**
     * Declare arrays holding references to input objects and values
     */
    const lengthsIpt = document.querySelectorAll('input[type="number"]');
    console.log("LengthsIpt entries", lengthsIpt.entries());
    const lengthsVal = lengthsIpt.map(ipt => ipt.value);

    for (let i = 0; i < lengthsIpt.length; i++) {
        lengthsIpt[i].addEventListener('change', (i) => {
            lengthsVal[i] = lengthsIpt[i].value;
        })
    }

    /**
     * Declare variables holding references to form and buttons
     */
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('#submit-btn');
    const resetBtn = document.querySelector('#reset-btn');

    /**
     * Declare variables holding reference to answer and error
     */
    const answer = document.querySelector('.answer');
    const error = document.querySelector('.error');

    /**
     * Determine if two lengths are the same.
     * 
     * @param {Number} firstLength 
     * @param {Number} secondLength 
     * @returns 1 if lengths are equal, 0 if not
     */
    const compareLengths = (firstLength, secondLength) => (firstLength === secondLength) ? 1 : 0;

    /**
     * Create a paragraph element with provided text.
     * Add paragraph as child to error div element.
     * 
     * @param {Object} display: object to show message
     * @param {String} message: message indicating answer or error
     */
    const createMessage = (display, message) => {
        let p = document.createElement('p');
        p.appendChild(
            document.createTextNode(message)
        );
        display.appendChild(p);
    }

    /**
     * Clear answer and error divs.
     */
    const clear = () => {
        answer.innerHTML = "";
        error.innerHTML = "";
    }

    /**
     * Compare side lengths.
     * If the sides do not qualify to be a triangle, return -1.
     * Identify triangle by number of sides equal in length.
     * 
     * @param {Number[]} arr: lengths of sides
     * @returns name for type of triangle
     */
    function identifyTriangle(arr) {
        let n = 0;
        let [a, b, c] = arr;

        if (a + b <= c) {
            return 'This is not a triangle';
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                n += (i === arr.length - 1) ?
                    compareLengths(i, 0) :
                    compareLengths(i, i + 1)
            }
        }

        let triangleIdentity = "";

        switch (n) {
            case 0:
                triangleIdentity = 'This is a Scalene triangle';
                break;
            case 1:
                triangleIdentity = 'This is an Isosceles triangle';
                break;
            case 3:
                triangleIdentity = 'This is an Equilateral triangle';
                break;
            default:
                triangleIdentity = 'This is a triangle';
        }

        return triangleIdentity;
    }

    /**
     * Add event listener to submit button.
     * When clicked, clear previous results from answer and error divs.
     * Check if every length variable has a value greater than 0.
     * For each length less than or equal to 0, display an error message.
     * If every length is valid, identify the type of triangle.
     * Display the identity in the answer div.
     * 
     * @param {String} 'click'
     * @param {Function} function: display result of identifyTriangle
     */
    submitBtn.addEventListener('click', function () {
        clear();

        let errorFound = false;
        for (let i = 0; i < lengthsVal.length; i++) {
            if (lengthsVal[i] <= 0) {
                let side = lengthsIpt[i].getAttribute('id').split('-')[1];
                createMessage(`Length ${side} cannot be 0 or negative`);
                errorFound = true;
            }
        }

        if (!errorFound) {
            createMessage(answer, identifyTriangle(lengthsVal));
        }
    })

    /**
     * Add event listener to reset button.
     * When clicked, reset values of input fields and clear answer and error divs.
     * 
     * @param {String} 'click'
     * @param {Function} function: reset input fields and clear divs
     */
    resetBtn.addEventListener('click', function () {
        form.reset();
        clear();
    })
}