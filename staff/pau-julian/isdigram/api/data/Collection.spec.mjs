import fs from 'fs'

import Collection from "./Collection.mjs"

import { expect } from 'chai'

describe('Collection', () => {
    describe('constructor', () => {
        it('creates a collection', () => {
            const cars = new Collection('cars')

            expect(cars).to.be.instanceOf(Collection)
        })
    })


    describe('>helpers', () => {
        describe('_generateId', () => {
            it('generates a random id', () => {
                const cars = new Collection('cars')

                const id1 = cars._generateId()

                expect(typeof id1).to.equal('string')

                const id2 = cars._generateId()

                expect(typeof id2).to.equal('string')

                expect(id1 === id2).to.equal(false)
            })
        })

        describe('_loadDocuments', () => {
            it('loads empty array on new collection', (done) => {
                fs.writeFile(`./data/cars.json`, '[]', (error) => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            console.error(error)

                            return
                        }

                        expect(error).to.be.null

                        expect(documents).to.be.instanceOf(Array)
                        expect(documents.length).to.equal(0)

                        done()
                    })
                })
            })

            it('loads array on non-empty collection', (done) => {
                fs.writeFile('./data/cars.json', '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]', (error) => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            console.error(error)

                            return
                        }

                        expect(error).to.be.null

                        expect(documents).to.be.instanceOf(Array)
                        expect(documents.length).to.equal(2)

                        let document = documents[0]
                        expect(document).to.be.instanceOf(Object)
                        expect(document.brand).to.equal('porsche')
                        expect(document.model).to.equal('911')

                        document = documents[1]
                        expect(document).to.be.instanceOf(Object)
                        expect(document.brand).to.equal('fiat')
                        expect(document.model).to.equal('500')

                        done()
                    })
                })
            })
        })

        describe('_saveDocuments', () => {
            it('saves a Collection', (done) => {
                fs.writeFile('./data/cars.json', '[]', (error) => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]

                    const cars = new Collection('cars')

                    cars._saveDocuments(documents, (error) => {
                        if (error) {
                            console.error(error)

                            return
                        }

                        expect(error).to.be.null

                        fs.readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            expect(documentsJSON).to.equal(JSON.stringify(documents))

                            done()
                        })
                    })
                })
            })

            it('fails on non-array documents', () => {
                const documents = 'hola documents'

                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars._saveDocuments(documents, () => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('hola documents is not an array')
            })
            it('fails on array with non-object document in documents', () => {
                const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }, 'hola document']

                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars._saveDocuments(documents, () => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('a document in documents is not an object')
            })
        })
    })

    describe('>CRUD', () => {
        describe('findOne', () => {
            it('finds one element in DB file', (done) => {
                fs.writeFile('./data/cars.json', '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]', (error) => {
                    if (error) {
                        console.error(error)

                        return
                    }
                    const cars = new Collection('cars')

                    cars.findOne((car) => car.brand === 'fiat', (error, car) => {
                        if (error) {
                            console.error(error)

                            return
                        }
                        expect(error).to.be.null

                        expect(car).to.be.instanceOf(Object)
                        expect(car.brand).to.equal('fiat')
                        expect(car.model).to.equal('500')

                        done()
                    })
                })
            })

            it('should fail on non-callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars.findOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')
            })

            it('should fail on non-callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars.findOne(123)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')
            })
        })

        describe('insertOne', () => {
            it('should insert one element into file', () => {
                //const car2 = { brand: 'opel', model: 'el del yayo' }
                //
                //cars.insertOne(car2)
                //const index = cars.findIndex((car) => {
                //    return brand === 'opel'
                //})
                //
                //expect(!!cars.insertOne).to.equal(true)
                //expect(JSON.parse(localStorage.cars[index])).to.be.instanceOf(Object)
                //expect(JSON.parse(localStorage.cars[index][brand])).to.equal('opel')
                //expect(JSON.parse(localStorage.cars[index][model])).to.equal('el del yayo')
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


            })
        })

        describe('printAll', () => {
            it('should print a table of all objects of a collection with their properties', () => {

            })
        })
    })
})