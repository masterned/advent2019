import {
  readFile
} from 'fs'

import {
  compose,
  map,
  head
} from 'ramda'

import {
  trim,
  split,
  toNum
} from '../utils/utils'

import {
  run,
  answerForm,
  setup,
  findNV
} from './intcode'

const splitCommas = split(',')

readFile('./res/day2/gravAssist_input.txt', { encoding: 'ascii', flag: 'r' }, (err, data) => {
  if (err) throw err

  const program = compose(map(toNum), splitCommas, trim)(data)
  const compRepair = head(run(setup(program)(12, 2)))

  const gravAssist = answerForm(...findNV(program)(19690720))

  console.log(`computer repair: ${compRepair}`)
  console.log(`grav assist: ${gravAssist}`)
})
