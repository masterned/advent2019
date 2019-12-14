import {
  readFile
} from 'fs'

import {
  head,
  compose
} from 'ramda'

import {
  fileOpts
} from '../utils/utils'

import {
  run,
  answerForm,
  setup,
  findNV,
  parseProgram
} from './intcode'

readFile('./res/day2/gravAssist_input.txt', fileOpts, (err, data) => {
  if (err) throw err

  const program = parseProgram(data)

  const compRepair = compose(
    head,
    run,
    setup(program)
  )(12, 2)

  const gravAssist = answerForm(...findNV(program)(19690720))

  console.log(`computer repair: ${compRepair}`)
  console.log(`grav assist: ${gravAssist}`)
})
