import {
  parseWires,
  toVector,
  collide,
  manhattan,
  attachWire,
  closestIntersection
} from '../../src/day3/wires'

const ex0 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83'

test(
  'parseWires: properly converts string into two wires',
  () => {
    expect(
      parseWires(ex0)
    ).toStrictEqual([
      ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
      ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
    ])
  }
)

test(
  'toVector: preperly converts wire segment into a vector',
  () => {
    expect(
      toVector([83, 12], 'D75')
    ).toStrictEqual([[83, 12], [83, -63]])
  }
)

test(
  'collide: returns point of collision between two vectors',
  () => {
    expect(
      collide([[8, 5], [3, 5]])([[6, 7], [6, 3]])
    ).toStrictEqual([6, 5])
  }
)

test(
  'manhattan: properly calculates manhattan distance of two points',
  () => {
    expect(
      manhattan([0, 0])([-3, 3])
    ).toBe(6)
  }
)

test(
  'attachWire: creates list of vectors from wire',
  () => {
    expect(
      attachWire(['R8', 'U5', 'L5', 'D3'])
    ).toStrictEqual([[[0, 0], [8, 0]], [[8, 0], [8, 5]], [[8, 5], [3, 5]], [[3, 5], [3, 2]]])
  }
)

test(
  'closestIntersection: finds the collision closest to the root',
  () => {
    expect(
      closestIntersection('R8,U5,L5,D3\nU7,R6,D4,L4')
    ).toBe(6)
  }
)
