/* Load JavaScript after webpage has loaded */
window.onload = function () {
    /**
     * Declare variables holding reference to input objects
     */
    const lengthAIpt = document.querySelector('#length-a');
    const lengthBIpt = document.querySelector('#length-b');
    const lengthCIpt = document.querySelector('#length-c');

    /**
     * Declare variables holding reference to input object's value when updated
     */
    let lengthA = 0;
    let lengthB = 0;
    let lengthC = 0;

    /**
     * Declare variables holding reference to form and buttons
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
     * Add event listener to variable referring to an input field.
     * When the value of the input field changes, get the value from the input
     * field and assign it to the corresponding variable.
     * 
     * @param {String} 'change'
     * @param {Function} function: updates variable
    */
    lengthAIpt.addEventListener('change', function () {
            lengthA = lengthAIpt.value;
    })
    lengthBIpt.addEventListener('change', function () {
        lengthB = lengthBIpt.value;
    })
    lengthCIpt.addEventListener('change', function () {
        lengthC = lengthCIpt.value;
    })

    /**
     * Identify triangle by number of sides equal in length.
     * 
     * @returns name for type of triangle
     */
    function identifyTriangle() {
        let n = numOfMatchingLengths(lengthA, lengthB, lengthC);
        let declaration = 'This is a ';
        let triangle = " triangle";

        if (n < 0) {
            return "This is not a triangle";
        }
        else if (n === 0) {
            return declaration + 'Scalene' + triangle;
        }
        else if (n === 1) {
            return declaration + 'Isosceles' + triangle;
        }
        else if (n === 3) {
            return declaration + 'Equilateral' + triangle;
        }
        else {
            return declaration + triangle;
        }
    }

    /**
     * Compare values from variables containing the side lengths.
     * If the sides do not qualify to be a triangle, return -1.
     * 
     * @param {Number} a length of side A
     * @param {Number} b length of side B
     * @param {Number} c length of side C
     * @returns number of sides that are equal or -1 if not a triangle
     */
    function numOfMatchingLengths(a, b, c) {
        if (a + b <= c) {
            return -1;
        }

        let n = 0;

        n += compareLengths(a, b);
        n += compareLengths(a, c);
        n += compareLengths(b, c);

        return n;
    }

    /**
     * Determine if two lengths are the same.
     * 
     * @param {Number} firstLength 
     * @param {Number} secondLength 
     * @returns 1 if equal, else 0
     */
    function compareLengths(firstLength, secondLength) {
        if (firstLength === secondLength) {
            return 1;
        }
        else {
            return 0;
        }
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
        answer.innerHTML = "";
        error.innerHTML = "";

        let errorFound = false;

        if (lengthA <= 0) {
            createErrorMessage('Length A cannot be 0 or negative');
            errorFound = true;
        }

        if (lengthB <= 0) {
            createErrorMessage('Length B cannot be 0 or negative');
            errorFound = true;
        }

        if (lengthC <= 0) {
            createErrorMessage('Length C cannot be 0 or negative');
            errorFound = true;
        }

        if (!errorFound) {
            error.innerHTML = "";
            let p = document.createElement('p');
            p.appendChild(
                document.createTextNode(identifyTriangle())
            );
            answer.appendChild(p);
        }
    })

    /**
     * Create a paragraph element with provided text.
     * Add paragraph as child to error div element.
     * 
     * @param {String} errorMessage: message indicating cause of error
     */
    function createErrorMessage(errorMessage) {
        let p = document.createElement('p');
        p.appendChild(
            document.createTextNode(errorMessage)
        );
        error.appendChild(p);
    }

    /**
     * Add event listener to reset button.
     * When clicked, reset values of input fields and clear answer and error divs.
     * 
     * @param {String} 'click'
     * @param {Function} function: reset input fields and clear divs
     */
    resetBtn.addEventListener('click', function () {
        form.reset();
        answer.innerHTML = "";
        error.innerHTML = "";
    })
}