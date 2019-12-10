import {
  compose
} from 'ramda'

export const moduleFuel = compose(n => n - 2, Math.floor, n => n / 3)

export const fuelFuel = amount => moduleFuel(amount) <= 0 ? 0 : moduleFuel(amount) + fuelFuel(moduleFuel(amount))
