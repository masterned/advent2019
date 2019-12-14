import {
  concat,
  head,
  compose,
  map,
  trim,
  split
} from 'ramda'

const sum = (a, b) => a + b
const product = (a, b) => a * b

export class QUIT extends Error {
  constructor() {
    super('program exited')
  }
}

const quit = () => {
  throw new QUIT
}

const err = () => {
  throw new Error('unexpected op code')
}

const opCodes = new Map([
  [1, sum],
  [2, product],
  [99, quit]
])

export const execute = program => (op, r0, r1, rd) => {
  const fn = opCodes.has(op) ? opCodes.get(op) : err
  program[rd] = fn(program[r0], program[r1])
  return program
}

export const separateInstructions = intcode =>
  intcode.length === 0
    ? []
    : concat([intcode.slice(0, 4)], separateInstructions(intcode.slice(4)))

export const run = intcode => {
  const program = execute(intcode)
  const instructions = separateInstructions(intcode)
  try {
    instructions.forEach(i => program(...i))
  } catch (e) {
    if (e instanceof QUIT) {
      // do nothing
    } else throw e
  }
  return intcode
}

export const setup = program => (n, v) => {
  const newProg = [...program]
  newProg[1] = n
  newProg[2] = v
  return newProg
}

export const answerForm = (noun, verb) => 100 * noun + verb

export const findNV = program => result => {
  for (let n = 0; n < 100; ++n) {
    for (let v = 0; v < 100; ++v) {
      const trial = head(run(setup(program)(n, v)))
      if (trial === result) return [n, v]
    }
  }
  return [-1, -1]
}

export const parseProgram = compose(map(Number.parseInt), split(','), trim)
