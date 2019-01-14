// greeter.ts
import add from './example/add'
function greeter(person: string) {
  return `Hello ${person}!`
}

const lao: string = 'Node Hero'
const pungi: string = "TypseScript Hero"

let newVal = add(lao, pungi)

console.log(greeter(newVal))
