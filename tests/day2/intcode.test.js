import {
  QUIT,
  execute,
  run,
  separateInstructions,
  answerForm,
  findNV,
  setup
} from '../../src/day2/intcode'

test(
  'opcode 99 kills the program',
  () => {
    expect(
      () => execute([99, 0, 0, 0])(99, 1, 1, 1)
    ).toThrow(QUIT)
  }
)

test(
  'single execute, op code 1 adds two sep regs into third',
  () => {
    expect(
      execute([1, 2, 3, 4, 5, 6, 7, 8])(1, 2, 3, 4)
    ).toStrictEqual([1, 2, 3, 4, 7, 6, 7, 8])
  }
)

test(
  'properly separates instructions',
  () => {
    expect(
      separateInstructions([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    ).toStrictEqual([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]])
  }
)

test(
  'runs a small program',
  () => {
    expect(
      run([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])
    ).toStrictEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])
  }
)

test(
  'setup: returns a program with a new noun and verb',
  () => {
    expect(
      setup([0, 1, 2, 3, 4, 5, 6, 7])(8, 9)
    ).toStrictEqual([0, 8, 9, 3, 4, 5, 6, 7])
  }
)

test(
  'answerForm: returns correct value',
  () => {
    expect(
      answerForm(12, 2)
    ).toBe(1202)
  }
)

test(
  'findNV: returns the noun and verb that cause a certain result',
  () => {
    expect(
      findNV([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])(3500)
    ).toStrictEqual([9, 10])
  }
)
