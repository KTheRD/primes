import GithubCorner from "react-github-corner"
import classes from "./app.module.css"
import { useEffect, useState } from "react"
import isPrime, { stopComputing } from "./isPrime"

const getMessages = (isPrime: null | boolean | 0 | 1) => {
  switch (isPrime) {
    case null:
      return "Please enter your number"
    case 0:
    case 1:
      return `Your number is ${isPrime}`
    case true:
      return "Your number is prime"
    case false:
      return "Your number is composite"
  }
}

function App() {

  const [inputNumber, setInputNumber] = useState<number | null>(null)
  const [isComputing, setIsComputing] = useState(false)
  const [isCurentNumberPrime, setIsCurrentNumberPrime] = useState<null | boolean | 1 | 0>(null)

  useEffect(() => {
    if (inputNumber === null) {
      setIsCurrentNumberPrime(null)
      return;
    };
    if (isComputing) {
      stopComputing()
    }

    const timeoutID = setTimeout(() => { // will start only after computing will stop
      setIsComputing(true)

      isPrime(inputNumber).then(res => {
        if (res === null) return
        setIsCurrentNumberPrime(res)
        setIsComputing(false)
      })
    })

    return () => clearTimeout(timeoutID)
  }, [inputNumber])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.trim() === '') {
      setInputNumber(null)
      return
    }

    if (isNaN(Number(value))) {
      return
    }

    if (Number(value) >= Number.MAX_SAFE_INTEGER) {
      return
    }

    setInputNumber(Math.abs(Math.floor(Number(value))))
  }

  return (
    <>
      <GithubCorner href="https://github.com/KTheRD/primes" />

      <div className={classes.container}>
        <div className={classes["info-container"]}>
          <p>
            A prime number (or a prime) is a natural number greater than 1 that is not a product of two smaller natural numbers. A natural number greater than 1 that is not prime is called a composite number.
          </p>
        </div>
        <div className={classes["input-container"]}>
          <input
            type="text" //number would be more convinient, but the assignment requires text type
            onChange={handleOnChange}
            value={inputNumber ?? ""}
          />
        </div>
        <div className={classes["output-container"]}>
          {
            isComputing ? "Computing..." :
              getMessages(isCurentNumberPrime)
          }
        </div>
      </div>

    </>
  )
}

export default App
