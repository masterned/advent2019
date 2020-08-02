import {
  MalformedInstruction,
  getOperand,
  getModes,
  immediate,
  position,
  execute,
  parseMemory,
  MemoryFormatException
} from '../../src/day5/IO_computer'

import {
  multiply
} from 'ramda'

describe('parseMemory', () => {
  it('transforms a properly formatted string into an array of memory values', () => {
    expect(parseMemory('1002,4,3,4,33,1101,100,-1,4,0'))
      .toStrictEqual([1002, 4, 3, 4, 33, 1101, 100, -1, 4, 0])
  })

  it('throws a MemoryFormatException when string is unable to be translated into a memory array', () => {
    expect(() => parseMemory('Hello World!'))
      .toThrow(MemoryFormatException)
  })
})

describe('getOperand', () => {
  it('gets function from op-code', () => {
    expect(getOperand(1002))
      .toStrictEqual({ fn: multiply, arity: 3 })
  })

  it('throws MalformedInstruction error when op-code unrecognized', () => {
    expect(() => getOperand(11142))
      .toThrow(MalformedInstruction)
  })
})

describe('getModes', () => {
  it('returns mode functions from modes', () => {
    expect(getModes(10101))
      .toStrictEqual([
        immediate,
        position,
        immediate
      ])
  })

  it('throws MalformedInstruction error when mode unrecognized', () => {
    expect(() => getModes(12103))
      .toThrow(MalformedInstruction)
  })
})

describe('execute', () => {
  it('properly changes memory', () => {
    expect(execute([1002, 4, 3, 4, 33]))
      .toStrictEqual([1002, 4, 3, 4, 99])
  })
})
