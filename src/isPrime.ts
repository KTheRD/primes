const IsPrimeComputer = (): [(n: number) => Promise<boolean | 1 | 0 | null>, () => void] => {
  const generatedPrimes = [2]
  let maxNumberChecked = 2
  let shouldStop = false

  const stopComputing = () => shouldStop = true

  const isPrime = async (n: number) => {

    if (n === 0) return 0;
    if (n === 1) return 1;

    if (maxNumberChecked > n) {
      return generatedPrimes.includes(n)
    }

    if (Math.sqrt(n) > maxNumberChecked) {

      for (const prime of generatedPrimes) {
        if (n % prime === 0) return console.log(prime),false
        if (prime > Math.sqrt(n)) return true
      }

      for (let loopsPassed = 1; maxNumberChecked <= Math.sqrt(n); maxNumberChecked++, loopsPassed++) {

        // stop the computation once in a while to stop browser from freezing
        // also check if we must stop and check new number
        if (loopsPassed >= 10000) {
          loopsPassed = 0;
          if (shouldStop) {
            stopComputing();
            return null;
          }
          await new Promise(r => setTimeout(r))
        }

        let isPrime = true

        for (const prime of generatedPrimes) {
          if (prime > Math.sqrt(maxNumberChecked)) break
          if (maxNumberChecked % prime === 0) {
            isPrime = false
            break
          }
        }

        if (isPrime) {
          generatedPrimes.push(maxNumberChecked)
          if (n % maxNumberChecked === 0) return console.log(maxNumberChecked),false
        }
      }

    }

    return true
  }

  return [isPrime, stopComputing]
}

export default IsPrimeComputer
