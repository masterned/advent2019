import {
  createCriteria,
  parseRangeArray,
  checkDoubleDigit
} from '../../src/day4/passwords'

test(
  'parseRangeArray: basic test',
  () => {
    expect(
      parseRangeArray('0-999999')
    ).toStrictEqual([0, 999999])
  }
)

const meetsCriteria = createCriteria([0, 999999])

test(
  'meetsCriteria: breaks ascending',
  () => {
    expect(
      meetsCriteria(223450)
    ).toBe(false)
  }
)

test(
  'meetsCriteria: breaks double digit',
  () => {
    expect(
      meetsCriteria(123789)
    ).toBe(false)
  }
)

test(
  'meetsCriteria: too many chain digits',
  () => {
    expect(
      meetsCriteria(111111)
    ).toBe(false)
  }
)

test(
  'checkDoubleDigit: tests the outer function for concept',
  () => {
    expect(
      checkDoubleDigit(123444)
    ).toBe(false)
  }
)

test(
  'checkDoubleDigit: double at end',
  () => {
    expect(
      checkDoubleDigit(111122)
    ).toBe(true)
  }
)

test(
  'checkDoubleDigit: double at front',
  () => {
    expect(
      checkDoubleDigit(334567)
    ).toBe(true)
  }
)

test(
  'checkDoubleDigit: double in middle',
  () => {
    expect(
      checkDoubleDigit(123345)
    ).toBe(true)
  }
)

test(
  'checkDoubleDigit: double in second',
  () => {
    expect(
      checkDoubleDigit(122345)
    ).toBe(true)
  }
)

test(
  'checkDoubleDigit: double in second last',
  () => {
    expect(
      checkDoubleDigit(123445)
    ).toBe(true)
  }
)

test(
  'checkDoubleDigit: double double',
  () => {
    expect(
      checkDoubleDigit(112245)
    ).toBe(true)
  }
)

test(
  'checkDoubleDigit: triple double',
  () => {
    expect(
      checkDoubleDigit(112233)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: double at end',
  () => {
    expect(
      meetsCriteria(111122)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: double at front',
  () => {
    expect(
      meetsCriteria(334567)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: double in middle',
  () => {
    expect(
      meetsCriteria(123345)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: double in second',
  () => {
    expect(
      meetsCriteria(122345)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: double in second last',
  () => {
    expect(
      meetsCriteria(123445)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: double double',
  () => {
    expect(
      meetsCriteria(112245)
    ).toBe(true)
  }
)

test(
  'meetsCriteria: triple double',
  () => {
    expect(
      meetsCriteria(112233)
    ).toBe(true)
  }
)
