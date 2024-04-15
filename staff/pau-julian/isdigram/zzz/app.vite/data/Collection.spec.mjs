import Collection from "./Collection.mjs"

describe('Collection', () => {
    describe('constructor', () => {
        it('creates a collection', () => {
            delete localStorage.cars

            const cars = new Collection('cars')

            expect(cars).toBeInstanceOf(Collection)
        })
    })

    describe('_generateId', () => {
        it('generates a random id', () => {
            const cars = new Collection('cars')

            const id1 = cars._generateId()

            expect(typeof id1).toBe('string')

            const id2 = cars._generateId()

            expect(typeof id2).toBe('string')

            expect(id1 === id2).toBe(false)
        })
    })

    describe('_loadDocuments', () => {
        it('loads empty array on new collection', () => {
            delete localStorage.cars
            const cars = new Collection('cars')

            const info = cars._loadDocuments()

            expect(info).toBeInstanceOf(Array)
            expect(info.length).toBe(0)
        })
        it('loads array on non-empty collection', () => {
            localStorage.cars = "[{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]"
            const cars = new Collection('cars')

            const documents = cars._loadDocuments()

            expect(documents).toBeInstanceOf(Array)
            expect(documents.length).toBe(2)

            let document = documents[0]
            expect(document).toBeInstanceOf(Object)
            expect(document.brand).toBe('porsche')
            expect(document.model).toBe('911')

            document = documents[1]
            expect(document).toBeInstanceOf(Object)
            expect(document.brand).toBe('fiat')
            expect(document.model).toBe('500')
        })
    })

    describe('_saveDocuments', () => {
        it('saves a Collection', () => {
            delete localStorage.cars

            const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]

            const cars = new Collection('cars')

            cars._saveDocuments(documents)

            expect(typeof localStorage.cars).toBe('string')

            const documentsJSON = JSON.stringify(documents)
            expect(localStorage.cars).toBe(documentsJSON)
        })
        it('fails on non-array documents', () => {
            const documents = 'hola documents'

            const cars = new Collection('cars')

            let errorThrown

            try {
                cars._saveDocuments(documents)
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(TypeError)
            expect(errorThrown.message).toBe('documents is not an array')
        })
        it('fails on array with non-object document in documents', () => {
            delete localStorage.cars

            const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }, 'hola document']

            const cars = new Collection('cars')

            let errorThrown

            try {
                cars._saveDocuments(documents)
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(TypeError)
            expect(errorThrown.message).toBe('a document in documents is not an object')
        })
    })

    describe('>CRUD', () => {
        describe('findOne', () => {
            it('finds one element in DB file', () => {
                localStorage.cars = "[{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]"
                const cars = new Collection('cars')
                const car = cars.findOne((car) => {
                    return car.brand === 'fiat'
                })

                expect(car).toBeInstanceOf(Object)
                expect(car.brand).toBe('fiat')
                expect(car.model).toBe('500')
            })
            it('should fail on non-callback', () => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.findOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a function')
            })
            it('should fail on non-callback', () => {
                const cars = new Collection('cars')

                let errorThrown
                try {
                    cars.findOne(123)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a function')
            })
        })

        describe('insertOne', () => {
            it('should insert one element into localStorage DB', () => {
                const car2 = { brand: 'opel', model: 'el del yayo' }

                cars.insertOne(car2)
                const index = cars.findIndex((car) => {
                    return brand === 'opel'
                })

                expect(!!cars.insertOne).toBe(true)
                expect(JSON.parse(localStorage.cars[index])).toBeInstanceOf(Object)
                expect(JSON.parse(localStorage.cars[index][brand])).toBe('opel')
                expect(JSON.parse(localStorage.cars[index][model])).toBe('el del yayo')
            })
        })

        describe('updateOne', () => {
            it('should update value of Collection(this) in the DB', () => {

            })
        })

        describe('deleteOne', () => {
            it('should delete an item from DB', () => {

            })
        })

        describe('getAll', () => {
            it('should return all items from DB of a selected collection', () => {
                const cars = cars.getAll()


            })
        })

        describe('printAll', () => {
            it('should print a table of all objects of a collection with their properties', () => {

            })
        })
    })
})