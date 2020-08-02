import {
  multiply,
  add,
  compose,
  trim,
  split,
  map,
  toString,
  reverse,
  has,
  prop,
  ifElse,
  __,
  head,
  slice,
  always,
  init,
  any
} from 'ramda'

const {
  parseInt
} = Number

export class MemoryFormatException extends Error {
  constructor() {
    super('string cannot be converted into a memory array')
  }
}

const mfe = () => {
  throw new MemoryFormatException
}

export const input = address => {
  address
}

export const output = data => {
  data
}

export class QUIT extends Error {
  constructor() {
    super('program terminated')
  }
}

export const quit = () => {
  throw new QUIT
}

export const codes = {
  1: {
    fn: add,
    arity: 3
  },
  2: {
    fn: multiply,
    arity: 3
  },
  3: {
    fn: input,
    arity: 1
  },
  4: {
    fn: output,
    arity: 1
  },
  99: {
    fn: quit,
    arity: 0
  }
}

export const position = prop

export const immediate = always

export const modes = {
  0: position,
  1: immediate
}

export class MalformedInstruction extends Error {
  constructor() {
    super('instruction not recognized')
  }
}

export const mfiError = () => {
  throw new MalformedInstruction
}

export const parseMemory = compose(
  ifElse(
    any(isNaN),
    mfe,
    val => val,
  ),
  map(parseInt),
  split(','),
  trim
)

export const padEnd = value => length => string => string.padEnd(length, value)

export const getModes = compose(
  map(
    compose(
      ifElse(
        has(__, modes),
        prop(__, modes),
        mfiError
      ),
      parseInt
    )
  ),
  split(''),
  padEnd('0')(3),
  reverse,
  slice(0, -2),
  toString
)

export const getOperand = compose(
  ifElse(
    has(__, codes),
    prop(__, codes),
    mfiError
  ),
  parseInt,
  slice(-2, Infinity),
  toString
)

export const translate = memory => {
  const result = {}
  const operand = getOperand(head(memory))
  result.op = operand.fn
  if (operand.arity === 2) {
    result.rs = prop(1, memory)
    result.rt = prop(2, memory)
  }
  if (operand.arity === 1) {
    result.rs = prop(1, memory)
  }
}

export const execute = insMem => {
  const op_code = head(insMem)
  const operand = getOperand(op_code)
  const modes = getModes(op_code)
  const params = slice(1, operand.arity)(insMem)
  const values = init(params).map((val, i) => modes[i](val)(insMem))
  const dest = prop(operand.arity)(insMem)
  const result = [...insMem]
  result[dest] = operand.fn(...values)
  return result
}
