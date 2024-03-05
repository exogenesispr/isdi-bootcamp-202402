var matcha = require('./matcha')

var Arroz = require('./Arroz')

matcha.describe('Arroz', function () {
    matcha.describe('> construct', function () {
        matcha.it('should construct', function () {
            var a = new Arroz

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(0)
        })

        matcha.it('should construct with multiple values', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(3)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })

        matcha.it('should construct with one non-numeric value', function () {
            var a = new Arroz(true)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(1)
            matcha.expect(a[0]).toBe(true)
        })

        matcha.it('should construct with ONE NUMERIC value', function () {
            var a = new Arroz(5)

            matcha.expect(a).toBeInstanceOf(Arroz)

            matcha.expect(a.length).toBe(5)
            for (var i = 0; i < a.length; i++) {
                matcha.expect(a[i]).toBe(undefined)
            }
        })
    })

    matcha.describe('> push', function () {
        matcha.it('should push a value', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.push).toBe(true)

            var length = a.push(40, 50, 60, 70)

            matcha.expect(a.length).toBe(7)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(50)
            matcha.expect(a[5]).toBe(60)
            matcha.expect(a[6]).toBe(70)
            matcha.expect(length).toBe(7)
        })
    })

    matcha.describe('> pop', function () {
        matcha.it('should extract last value', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.pop).toBe(true)

            var value = a.pop()

            matcha.expect(a.length).toBe(2)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(undefined)
            matcha.expect(value).toBe(30)
        })
    })

    matcha.describe('> toString', function () {
        matcha.it('should convert to string', function () {
            var a = new Arroz(10, 20, 30, 40)

            matcha.expect(!!a.toString).toBe(true)

            var string = a.toString()

            matcha.expect(string).toBe('Arroz [10, 20, 30, 40]')
        })
    })

    matcha.describe('> at', function () {
        matcha.it('should return position of Arroz (positive index)', function () {
            var a = new Arroz(10, 20, 30, 40)

            matcha.expect(!!a.at).toBe(true)

            var atValue = a.at(2)

            matcha.expect(atValue).toBe(30)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(undefined)
        })

        matcha.it('should return position of Arroz (negative index)', function () {

            var a = new Arroz(10, 20, 30, 40)
            var atValueMinus = a.at(-2)

            matcha.expect(atValueMinus).toBe(30)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(undefined)
        })

        matcha.it('should return position of Arroz (OUT OF RANGE index)', function () {

            var a = new Arroz(10, 20, 30, 40)
            var atValueMinus = a.at(-70)

            matcha.expect(undefined).toBe(undefined)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(undefined)
        })
    })

    matcha.describe('> concat', function () {
        matcha.it('should return concatenation of single value (string/number)', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.concat).toBe(true)

            a.concat('40')

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a[3]).toBe('40')
            matcha.expect(a[4]).toBe(undefined)

            var a = new Arroz(10, 20, 30)

            a.concat(40)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(undefined)


        })

        matcha.it('should return concatenation of arrays', function () {

            var a = new Arroz(10, 20, 30)
            a.concat([40, 50])

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(50)

        })
    })

    matcha.describe('> every', function () {
        matcha.it('should return true if all elements meet condition HAPPY', function () {
            var a = new Arroz(10, 20, 30)
            matcha.expect(!!a.every).toBe(true)

            var result = a.every(function (x) {
                return x < 40
            })

            matcha.expect(result).toBe(true)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })

        matcha.it('should return true if all elements meet condition UNHAPPY', function () {
            var a = new Arroz(10, 20, 30)

            var result = a.every(function (x) {
                return x < 20
            })

            matcha.expect(result).toBe(false)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })
    })
    matcha.describe('> includes', function () {
        matcha.it('should return true if at least 1 element meets condition HAPPY', function () {
            var a = new Arroz(10, 20, 30)
            matcha.expect(!!a.includes).toBe(true)

            var result = a.includes(function (x) {
                return x < 20
            })

            matcha.expect(result).toBe(true)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })

        matcha.it('should return true if at least 1 element meets condition UNHAPPY', function () {
            var a = new Arroz(10, 20, 30)

            var result = a.includes(function (x) {
                return x < 5
            })

            matcha.expect(result).toBe(false)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })
    })

    matcha.describe('> indexOf', function () {
        matcha.it('should return index of item nearer to index 0', function () {
            var a = new Arroz(10, 30, 20, 30)
            matcha.expect(!!a.indexOf).toBe(true)

            var result = a.indexOf(30)

            matcha.expect(result).toBe(1)
        })

        matcha.it('should return index of item nearer to index that I input', function () {
            var a = new Arroz(10, 30, 20, 30)

            var result = a.indexOf(30, 1)

            matcha.expect(result).toBe(1)


            var a = new Arroz(10, 30, 20, 30)

            var result = a.indexOf(30, -1)

            matcha.expect(result).toBe(3)
        })

        matcha.it('should return -1 if input index is out of bounds UNHAPPY', function () {
            var a = new Arroz(10, 30, 20, 30)

            var result = a.indexOf(30, 7)

            matcha.expect(result).toBe(-1)


            var a = new Arroz(10, 30, 20, 30)

            var result = a.indexOf(30, -7)

            matcha.expect(result).toBe(-1)
        })
    })

    matcha.describe('> lastIndexOf', function () {
        matcha.it('should return index of item nearer to LAST index', function () {
            var a = new Arroz(2, 5, 9, 2)
            matcha.expect(!!a.lastIndexOf).toBe(true)

            var result = a.lastIndexOf(2)

            matcha.expect(result).toBe(3)

            var a = new Arroz(2, 5, 9, 2)

            var result = a.lastIndexOf(7)

            matcha.expect(result).toBe(-1)
        })
        matcha.it('should return index of item nearer to LAST index from my input index', function () {
            var a = new Arroz(2, 5, 9, 2)

            var result = a.lastIndexOf(2, 3)

            matcha.expect(result).toBe(3)

            var a = new Arroz(2, 5, 9, 2)

            var result = a.lastIndexOf(2, 2)

            matcha.expect(result).toBe(0)

            var a = new Arroz(2, 5, 9, 2)

            var result = a.lastIndexOf(2, -2)

            matcha.expect(result).toBe(0)

            var a = new Arroz(2, 5, 9, 2)

            var result = a.lastIndexOf(2, -1)

            matcha.expect(result).toBe(3)
        })
    })

    matcha.describe('> some', function () {
        matcha.it('should return TRUE if value of array meets callback argument', function () {
            var a = new Arroz(1, 2, 3, 4, 5)
            matcha.expect(!!a.some).toBe(true)

            var result = a.some(function (x) {
                return x % 2 === 0
            })

            matcha.expect(result).toBe(true)

            var result = a.some(function (x) {
                return x % 7 === 0
            })

            matcha.expect(result).toBe(false)
        })
    })
    matcha.describe('> shift', function () {
        matcha.it('should return first element in the array and mutate original array', function () {
            var a = new Arroz(10, 20, 30)
            matcha.expect(!!a.shift).toBe(true)

            var result = a.shift()

            matcha.expect(result).toBe(10)
            matcha.expect(a[0]).toBe(20)
            matcha.expect(a[1]).toBe(30)
            matcha.expect(a[2]).toBe(undefined)

            var a = new Arroz()
            var result = a.shift()

            matcha.expect(result).toBe(undefined)
        })
    })
    matcha.describe('> unshift', function () {
        matcha.it('should return array with elements in constructor in first indexs of array', function () {
            var a = new Arroz(30, 40, 50)
            matcha.expect(!!a.unshift).toBe(true)

            a.unshift(10, 20)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(50)
            matcha.expect(a.length).toBe(5)
        })
    })
    matcha.describe('> map', function () {
        matcha.it('should return a new Arroz with results of calling callback into each element in calling Arroz', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.map).toBe(true)

            var result = a.map(function (x) {
                return x * 10
            })

            matcha.expect(result[0]).toBe(100)
            matcha.expect(result[1]).toBe(200)
            matcha.expect(result[2]).toBe(300)
            matcha.expect(result.length).toBe(3)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)

        })
    })
    matcha.describe('> join', function () {
        matcha.it('should return a string of concenation of all elements in array, separated by separator(if no separator, by ,)', function () {
            var a = new Arroz('Fire', 'Air', 'Water')

            matcha.expect(!!a.join).toBe(true)

            result = a.join()

            matcha.expect(result).toBe('Fire,Air,Water')

            var a = new Arroz('Fire', 'Air', 'Water')

            result = a.join('')

            matcha.expect(result).toBe('FireAirWater')

            var a = new Arroz('Fire', 'Air', 'Water')

            result = a.join('-')

            matcha.expect(result).toBe('Fire-Air-Water')
        })
    })

    matcha.describe('> with', function () {
        matcha.it('should return new Arroz with index item changed', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.with).toBe(true)

            var result = a.with(1, 40)

            matcha.expect(result[0]).toBe(10)
            matcha.expect(result[1]).toBe(40)
            matcha.expect(result[2]).toBe(30)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)


            var a = new Arroz(10, 20, 30)

            var result = a.with(-2, 40)

            matcha.expect(result[0]).toBe(10)
            matcha.expect(result[1]).toBe(40)
            matcha.expect(result[2]).toBe(30)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })
    })

    matcha.describe('> find', function () {
        matcha.it('should return first element that meets callback function condition', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.find).toBe(true)

            var result = a.find(function (x) {
                return x > 20
            })

            matcha.expect(result).toBe(30)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)

            var a = new Arroz(10, 20, 30)

            var result = a.find(function (x) {
                return x > 30
            })

            matcha.expect(result).toBe(undefined)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)

            var a = new Arroz({ brand: 'adidas', model: 'cool socks', price: 16 }, { brand: 'nike', model: 'air max', price: 120 }, { brand: 'puma', model: 'dangerous glasses', price: 30 })

            var i = 0
            var item = a.find(function (element, index, arroz) {
                matcha.expect(index).toBe(i++)
                matcha.expect(arroz).toBe(a)

                return element.price === 120
            })

            matcha.expect(item.brand).toBe('nike')
            matcha.expect(item.model).toBe('air max')
            matcha.expect(item.price).toBe(120)
        })
    })
    matcha.describe('> findIndex', function () {
        matcha.it('should return first INDEX that meets callback function condition', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.findIndex).toBe(true)

            var result = a.findIndex(function (x) {
                return x > 20
            })

            matcha.expect(result).toBe(2)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)

            var a = new Arroz(10, 20, 30)

            var result = a.findIndex(function (x) {
                return x > 30
            })

            matcha.expect(result).toBe(undefined)

            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })
    })

    matcha.describe('> filter', function () {
        matcha.it('should return a new Arroz with elements that meet the callback function', function () {
            var a = new Arroz(20, 30, 40, 30, 20)

            matcha.expect(!!a.filter).toBe(true)

            var result = a.filter(function (x) {
                return x > 20
            })

            matcha.expect(result[0]).toBe(30)
            matcha.expect(result[1]).toBe(40)
            matcha.expect(result[2]).toBe(30)
            matcha.expect(result.length).toBe(3)
            matcha.expect(result[3]).toBe(undefined)

            matcha.expect(a[0]).toBe(20)
            matcha.expect(a[1]).toBe(30)
            matcha.expect(a[2]).toBe(40)
            matcha.expect(a[3]).toBe(30)
            matcha.expect(a[4]).toBe(20)
        })
    })

    matcha.describe('> reduce', function () {
        matcha.it('should return a single value of all values operated across all elements', function () {
            var a = new Arroz(10, 20, 30, 40)

            matcha.expect(!!a.reduce).toBe(true)

            var result = a.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue
            })

            matcha.expect(result).toBe(100)
        })
    })

    matcha.describe('> forEach', function () {
        matcha.it('should execute callback function in all elements of Arroz', function () {
            var a = new Arroz(10, 20, 30, 40, 50, 60)
            var b = new Arroz

            matcha.expect(!!a.forEach).toBe(true)

            a.forEach(function (element, index, arroz) {
                b[index] = { item: element, iterable: arroz }
                b.length++
            })

            matcha.expect(a.length).toBe(6)

            for (var i = 0; i < a.length; i++) {
                matcha.expect(a[i]).toBe(10 * (i + 1))
            }

            matcha.expect(b.length).toBe(a.length)

            for (var i = 0; i < b.length; i++) {
                var element = b[i]

                matcha.expect(element.item).toBe(10 * (i + 1))
                matcha.expect(element.iterable).toBe(a)
            }
        })
    })

    matcha.describe('> slice', function () {
        matcha.it('should return temporal Arroz of elements in indexed intervals', function () {
            var a = new Arroz(10, 20, 30, 40, 50)

            matcha.expect(!!a.slice).toBe(true)

            var result = a.slice(2)

            matcha.expect(result[0]).toBe(30)
            matcha.expect(result[1]).toBe(40)
            matcha.expect(result[2]).toBe(50)

            var result = a.slice(2, 4)

            matcha.expect(result[0]).toBe(30)
            matcha.expect(result[1]).toBe(40)

            var result = a.slice(1, 5)

            matcha.expect(result[0]).toBe(20)
            matcha.expect(result[1]).toBe(30)
            matcha.expect(result[2]).toBe(40)
            matcha.expect(result[3]).toBe(50)

            var result = a.slice(-2)

            matcha.expect(result[0]).toBe(40)
            matcha.expect(result[1]).toBe(50)

            var result = a.slice(2, -1)

            matcha.expect(result[0]).toBe(30)
            matcha.expect(result[1]).toBe(40)

            var result = a.slice()

            matcha.expect(result[0]).toBe(10)
            matcha.expect(result[1]).toBe(20)
            matcha.expect(result[2]).toBe(30)
            matcha.expect(result[3]).toBe(40)
            matcha.expect(result[4]).toBe(50)

        })
    })

    matcha.describe('> splice', function () {
        matcha.it('should modify array, augmenting length and insering (deletecount) new indexes', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.splice).toBe(true)

            var result = a.splice(1, 0, 200)

            matcha.expect(result.length).toBe(0)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(200)
            matcha.expect(a[2]).toBe(20)
            matcha.expect(a[3]).toBe(30)
            matcha.expect(a.length).toBe(4)


            var a = new Arroz(10, 20, 30)
            var result = a.splice(1, 1, 200)

            matcha.expect(result[0]).toBe(20)
            matcha.expect(result.length).toBe(1)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(200)
            matcha.expect(a[2]).toBe(30)
            matcha.expect(a.length).toBe(3)

            var a = new Arroz(10, 20, 30)
            var result = a.splice(1, 2, 200)

            matcha.expect(result[0]).toBe(20)
            matcha.expect(result[1]).toBe(30)
            matcha.expect(result.length).toBe(2)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(200)
            matcha.expect(a.length).toBe(2)

            var a = new Arroz(10, 20, 30)
            var result = a.splice(1, 1, 200, 300)

            matcha.expect(result[0]).toBe(20)
            matcha.expect(result.length).toBe(1)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(200)
            matcha.expect(a[2]).toBe(300)
            matcha.expect(a[3]).toBe(30)
            matcha.expect(a.length).toBe(4)

            var a = new Arroz(10, 20, 30)
            var result = a.splice(1, 0, 200, 300, 400, 500)

            matcha.expect(result.length).toBe(0)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(200)
            matcha.expect(a[2]).toBe(300)
            matcha.expect(a[3]).toBe(400)
            matcha.expect(a[4]).toBe(500)
            matcha.expect(a[5]).toBe(20)
            matcha.expect(a[6]).toBe(30)
            matcha.expect(a.length).toBe(7)

        })
    })

    matcha.describe('> from', function () {
        matcha.it('should create and instance of Arroz from numbers', function () {
            var a = new Arroz(10, 20, 30)
            var b = Arroz.from(a)

            matcha.expect(a.length).toBe(3)

            for (var i = 0; i < a.length; i++) {
                matcha.expect(a[i]).toBe(10 * (i + 1))
            }

            matcha.expect(a === b).toBe(false)


            matcha.expect(b.length).toBe(a.length)

            for (var i = 0; i < b.length; i++) {
                matcha.expect(b[i]).toBe(10 * (i + 1))
            }

        })
    })
})