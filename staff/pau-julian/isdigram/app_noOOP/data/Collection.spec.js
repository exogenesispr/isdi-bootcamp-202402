describe('Collection', function () {
    describe('constructor', function () {
        it('creates a collection', function () {
            delete localStorage.cars

            var cars = new Collection('cars')

            expect(cars).toBeInstanceOf(Collection)
        })
    })

    describe('_generateId', function () {
        it('generates a random id', function () {
            var cars = new Collection('cars')

            var id1 = cars._generateId()

            expect(typeof id1).toBe('string')

            var id2 = cars._generateId()

            expect(typeof id2).toBe('string')

            expect(id1 === id2).toBe(false)
        })
    })

    describe('_loadDocuments', function () {
        it('loads empty array on new collection', function () {
            delete localStorage.cars
            var cars = new Collection('cars')

            var info = cars._loadDocuments()

            expect(info).toBeInstanceOf(Array)
            expect(info.length).toBe(0)
        })
        it('loads array on non-empty collection', function () {
            localStorage.cars = "[{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]"
            var cars = new Collection('cars')

            var documents = cars._loadDocuments()

            expect(documents).toBeInstanceOf(Array)
            expect(documents.length).toBe(2)

            var document = documents[0]
            expect(document).toBeInstanceOf(Object)
            expect(document.brand).toBe('porsche')
            expect(document.model).toBe('911')

            var document = documents[1]
            expect(document).toBeInstanceOf(Object)
            expect(document.brand).toBe('fiat')
            expect(document.model).toBe('500')
        })
    })

    describe('_saveDocuments', function () {
        it('saves a Collection', function () {
            delete localStorage.cars

            var documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]

            var cars = new Collection('cars')

            cars._saveDocuments(documents)

            expect(typeof localStorage.cars).toBe('string')

            var documentsJSON = JSON.stringify(documents)
            expect(localStorage.cars).toBe(documentsJSON)
        })
        it('fails on non-array documents', function () {
            var documents = 'hola documents'

            var cars = new Collection('cars')

            var errorThrown

            try {
                cars._saveDocuments(documents)
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(TypeError)
            expect(errorThrown.message).toBe('documents is not an array')
        })
        it('fails on array with non-object document in documents', function () {
            delete localStorage.cars

            var documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }, 'hola document']

            var cars = new Collection('cars')

            var errorThrown

            try {
                cars._saveDocuments(documents)
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(TypeError)
            expect(errorThrown.message).toBe('a document in documents is not an object')
        })
    })

    describe('>CRUD', function () {
        describe('findOne', function () {
            it('finds one element in DB file', function () {
                localStorage.cars = "[{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]"
                var cars = new Collection('cars')
                var car = cars.findOne(function (car) {
                    return car.brand === 'fiat'
                })

                expect(car).toBeInstanceOf(Object)
                expect(car.brand).toBe('fiat')
                expect(car.model).toBe('500')
            })
            it('should fail on non-callback', function () {
                var cars = new Collection('cars')

                var errorThrown
                try {
                    cars.findOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a function')
            })
            it('should fail on non-function callback', function () {
                var cars = new Collection('cars')

                var errorThrown
                try {
                    cars.findOne(123)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a function')
            })
        })

        describe('insertOne', function () {
            it('should insert one element into localStorage DB', function () {
                var car2 = { brand: 'opel', model: 'el del yayo' }

                cars.insertOne(car2)
                var index = cars.findIndex(function (car) {
                    return brand === 'opel'
                })

                expect(!!cars.insertOne).toBe(true)
                expect(JSON.parse(localStorage.cars[index])).toBeInstanceOf(Object)
                expect(JSON.parse(localStorage.cars[index][brand])).toBe('opel')
                expect(JSON.parse(localStorage.cars[index][model])).toBe('el del yayo')
            })
        })

        describe('updateOne', function () {
            it('should update value of Collection(this) in the DB', function () {

            })
        })

        describe('deleteOne', function () {
            it('should delete an item from DB', function () {

            })
        })

        describe('getAll', function () {
            it('should return all items from DB of a selected collection', function () {
                var cars = cars.getAll()


            })
        })

        describe('printAll', function () {
            it('should print a table of all objects of a collection with their properties', function () {

            })
        })
    })
})