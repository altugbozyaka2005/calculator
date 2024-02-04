import React from 'react'

function App() {
  const [result, setResult] = React.useState();
  const [formula, setFormula] = React.useState("");
  const [lastUnit, setLastUnit] = React.useState();

  const keySymbols = ["AC", "/", "x", 7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, "=", 0, "."]
  const operations = ["/", "×", "-", "+"]

  function updateFormula(input) {
    if (formula === "0" && input === "0") {
      return
    } 

    if (input === "AC") {
      setFormula("0");
      setLastUnit(0);
    } else if (input === "=") {
      if (lastUnit !== result) {
        const calculatedResult = calculate(formula)
        setResult(calculatedResult);
        setFormula((prevFormula) => prevFormula + " = " + calculatedResult)
        setLastUnit(calculatedResult)
      }
    } else if (operations.includes(input)) {
      if (!operations.includes(lastUnit)) {
        if (lastUnit === result) {
          const regExp = formula.match(/(\d*\.?\d+)$/)
          setFormula(regExp[0] + " " + input + " ")
          setLastUnit(input)
        } else {
          setFormula((prevFormula) => prevFormula + " " + input + " ")
          setLastUnit(input)
        }
      }
    } else if (input === ".") {
      if (formula === null || lastUnit.includes(".")) {
        return
      } else {
        setFormula((prevFormula) => prevFormula + ".")
        setLastUnit(prevState => prevState + ".")
      }
    } else {
      if (lastUnit === result) {
        setFormula(input)
        setLastUnit(input)
      } else {
        const newFormula = (formula === "0" ? input : formula + input) // this is used to ensure that last key gets the most recent formula
        setFormula(newFormula)
        const regExp = newFormula.match(/((\d*\.?\d+)|(\d+\.))$/)
        setLastUnit(regExp[0])
      }
    }
  }

  function calculate(formula) {
    return (eval(formula))
  }
   
  return (
    <div className='calculator-container'>
      <div className="yellow-display">{formula}</div>
      <div className="white-display" id="display">{lastUnit}</div>
      <div className='buttons-container'>
        <button id="clear" className='delete-button' onClick={() => updateFormula("AC")}>AC</button>
        <button id="divide" className='operation-button' onClick={() => updateFormula("/")}>/</button>
        <button id="multiply" className='operation-button' onClick={() => updateFormula("×")}>×</button>
        <button id="seven" className='number-button' onClick={() => updateFormula("7")}>7</button>
        <button id="eight" className='number-button' onClick={() => updateFormula("8")}>8</button>
        <button id="nine" className='number-button' onClick={() => updateFormula("9")}>9</button>
        <button id="subtract" className='operation-button' onClick={() => updateFormula("-")}>-</button>
        <button id="four" className='number-button' onClick={() => updateFormula("4")}>4</button>
        <button id="five" className='number-button' onClick={() => updateFormula("5")}>5</button>
        <button id="six" className='number-button' onClick={() => updateFormula("6")}>6</button>
        <button id="add" className='operation-button' onClick={() => updateFormula("+")}>+</button>
        <button id="one" className='number-button' onClick={() => updateFormula("1")}>1</button>
        <button id="two" className='number-button' onClick={() => updateFormula("2")}>2</button>
        <button id="three" className='number-button' onClick={() => updateFormula("3")}>3</button>
        <button id="equals" className='equal-button' onClick={() => updateFormula("=")}>=</button>
        <button id="zero" className='number-button' onClick={() => updateFormula("0")} style={{gridColumn: 'span 2'}}>0</button>
        <button id="decimal" className='number-button' onClick={() => updateFormula(".")}>.</button>
      </div>
      <h4>Coded by <a href='https://github.com/altugbozyaka2005'>Altug Bozyaka</a></h4>
    </div>
  )
}

export default App
