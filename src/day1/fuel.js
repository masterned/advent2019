import {
  compose,
  map,
  split,
  trim,
  sum
} from 'ramda'

export const moduleFuel = compose(n => n - 2, Math.floor, n => n / 3)

export const fuelFuel = amount => moduleFuel(amount) <= 0 ? 0 : moduleFuel(amount) + fuelFuel(moduleFuel(amount))

export const parseModuleArray = str => map(Number.parseInt)(compose(split('\n'), trim)(str))

export const calc = fn => arr => sum(map(fn)(arr))
