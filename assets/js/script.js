class Calculator{

    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        //Clear All
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        //delete last one value
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        //ignore multiple . execute
        if(number === '.' && this.currentOperand.includes('.')) return

        //Show clicked number
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        //Operator not Select Not Compute
        if(this.currentOperand === '') return
        //if operator selected then compute
        if(this.previousOperand != ''){
            this.compute()
        }


        this.operation = operation
        this.previousOperand = this.currentOperand
        //clear current data
        this.currentOperand = ''
    }

    compute(){
        //define variable
        let computation

        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        //check user without press any number press equal button
        if (isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current 
                break 
            
            case '-':
                computation = prev - current
                break 

            case '*':
                computation = prev * current
                break 

            case '÷':
                computation = prev / current
                break 

            default: return
        }

        //After Compute define 

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    //Display numbers 
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        //update Current Data
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        //Show data with Operation 
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
        }

        //update previous data
        //this.previousOperandTextElement.innerText = this.previousOperand
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//All Number buttons data collect
numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//All Operations buttons data collect
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//equal button add event listener
equalsButton.addEventListener('click', button => {
    //Call compute Function
    calculator.compute()
    //update dispaly value
    calculator.updateDisplay()
})


//Clear button add event listener
allClearButton.addEventListener('click', button => {
    //Call Clear Function
    calculator.clear()
    //update dispaly value
    calculator.updateDisplay()
})

//Delete button add event listener
deleteButton.addEventListener('click', button => {
    //Call Delete Function
    calculator.delete()
    //update dispaly value
    calculator.updateDisplay()
})
