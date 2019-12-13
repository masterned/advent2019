import {
  Point,
  manhattan,
  parseMagStrArray,
  charToAngle,
  toVector,
  calcDest,
  chainVectors,
  collide,
  point_lineCollide,
  getCollisions,
  closestIntersection
} from '../../src/day3/wires'

test(
  'Point: returns new point object',
  () => {
    expect(
      Point(4, 6)
    ).toStrictEqual({ x: 4, y: 6 })
  }
)

const p0 = Point(1, 9)
const p1 = Point(4, 3)
const p2 = Point(-5, -2)
const p3 = Point(-3, 7)

test(
  'manhattan: same signs',
  () => {
    expect(
      manhattan(p0)(p1)
    ).toBe(9)
  }
)

test(
  'manhattan: different signs',
  () => {
    expect(
      manhattan(p0)(p2)
    ).toBe(17)
  }
)

test(
  'manhattan: a different sign',
  () => {
    expect(
      manhattan(p0)(p3)
    ).toBe(6)
  }
)

const ex1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83'

test(
  'parseMagStrArray: properly separates string into arrays of magnitude strings',
  () => {
    expect(
      parseMagStrArray(ex1)
    ).toStrictEqual([
      ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
      ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
    ])
  }
)

test(
  'charToAngle: converts magnitude character to and angle point',
  () => {
    expect(
      charToAngle('U')
    ).toStrictEqual({ x: 0, y: 1 })
  }
)

test(
  'toVector: preperly converts magStr into a vector',
  () => {
    expect(
      toVector('D75', { x: 83, y: 12 })
    ).toStrictEqual({ x: 83, y: 12, a: { x: 0, y: -1 }, d: 75 })
  }
)

const a = toVector('D5', { x: 8, y: 5 })

test(
  'calcDest: properly returns end point of a vector',
  () => {
    expect(
      calcDest(a)
    ).toStrictEqual({ x: 8, y: 0 })
  }
)

const ex0_wire0 = ['R8', 'U5', 'L5', 'D3']

test(
  'chainVectors: converts magnitude string array into array of linked vectors',
  () => {
    expect(
      chainVectors(ex0_wire0)
    ).toStrictEqual([
      { x: 0, y: 0, a: { x: 1, y: 0 }, d: 8 },
      { x: 8, y: 0, a: { x: 0, y: 1 }, d: 5 },
      { x: 8, y: 5, a: { x: -1, y: 0 }, d: 5 },
      { x: 3, y: 5, a: { x: 0, y: -1 }, d: 3 }
    ])
  }
)

test(
  'point_lineCollision: point on vertical line',
  () => {
    expect(
      point_lineCollide(a)(Point(8, 3))
    ).toBe(true)
  }
)

const b = toVector('R5', { x: 4, y: 3 })

test(
  'point_lineCollision: point on horizontal line',
  () => {
    expect(
      point_lineCollide(b)(Point(8, 3))
    ).toBe(true)
  }
)

test(
  'point_lineCollision: out of bounds',
  () => {
    expect(
      point_lineCollide(b)(Point(8, 6))
    ).toBe(false)
  }
)

test(
  'point_lineCollision: floating',
  () => {
    expect(
      point_lineCollide(toVector('D5', Point(8, 5)))(Point(4, 5))
    ).toBe(false)
  }
)

test(
  'collide: vertical against horizontal',
  () => {
    expect(
      collide(a)(b)
    ).toStrictEqual(Point(8, 3))
  }
)

test(
  'collide: horizontal againt vertical',
  () => {
    expect(
      collide(b)(a)
    ).toStrictEqual(Point(8, 3))
  }
)

const c = toVector('R3', Point(3, 2))
const d = toVector('U4', Point(2, 1))

test(
  'collide: ghost numbers',
  () => {
    expect(
      collide(c)(d)
    ).toBe(false)
  }
)

test(
  'getCollisions: example one',
  () => {
    expect(
      getCollisions(chainVectors(['R8', 'U5', 'L5', 'D3']), chainVectors(['U7', 'R6', 'D4', 'L4']))
    ).toStrictEqual([Point(0, 0), Point(6, 5), Point(3, 3)])
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
