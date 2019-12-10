import {
  moduleFuel,
  fuelFuel
} from '../../src/day1/fuel'

test(
  'moduleFuel: full process',
  () => {
    expect(
      moduleFuel(12)
    ).toBe(2)
  }
)

test(
  'moduleFuel: no round',
  () => {
    expect(
      moduleFuel(14)
    ).toBe(2)
  }
)

test(
  'moduleFuel: large-ish number',
  () => {
    expect(
      moduleFuel(1969)
    ).toBe(654)
  }
)

test(
  'moduleFuel: even larger number',
  () => {
    expect(
      moduleFuel(100756)
    ).toBe(33583)
  }
)

test(
  'fuelFuel (+module): to zero',
  () => {
    expect(
      fuelFuel(14)
    ).toBe(2)
  }
)

test(
  'fuelFuel (+module): recur',
  () => {
    expect(
      fuelFuel(1969)
    ).toBe(966)
  }
)

test(
  'fuelFuel (+module): larger recur',
  () => {
    expect(
      fuelFuel(100756)
    ).toBe(50346)
  }
)
