import {
    convertArrayOfJsonObjectsToRequiredFormat,
    filterDataAccordingToState, NAME
} from './utility.js'
import States from '../data/states'

describe('testing utility functions', () => {
    let testObj = JSON.parse('{"name":"Texas","data":{"agriculture":60,"manufacturing":0,"mining":2,"trade":0,"domestic service":0,"professional service":0}}')
    let testArray = [];
    testArray.push(testObj)
    let populationTestArray = [{ "name": "Texas", "data": { "Under 5 Years": "2027307", "5 to 13 Years": "3277946", "14 to 17 Years": "1420518", "18 to 24 Years": "2454721", "25 to 44 Years": "7017731", "45 to 64 Years": "5656528", "65 Years and Over": "2472223" } }]

    it('test convert array of json objects when data is null', () => {
        expect(convertArrayOfJsonObjectsToRequiredFormat(null, "abc", States)).toEqual(null)
    })
    it('test convert array of json objects when data is undefined', () => {
        expect(convertArrayOfJsonObjectsToRequiredFormat(undefined, "abc", States)).toEqual(null)
    })
    it('test convert array of json objects when data is empty string', () => {
        expect(convertArrayOfJsonObjectsToRequiredFormat('', "abc", States)).toEqual(null)
    })
    it('test convert array of json objects when data is any string', () => {
        expect(convertArrayOfJsonObjectsToRequiredFormat('abc', "abc", States)).toEqual(null)
    })
    it('test convert array of json objects when data empty array', () => {
        expect(convertArrayOfJsonObjectsToRequiredFormat([], "abc", States)).toEqual(null)
    })
    it('test convert array of json objects when key is abc', () => {


        expect(convertArrayOfJsonObjectsToRequiredFormat(testArray, "abc", States)).toEqual(null)
    })

    it('test convert array of json objects when key is empty', () => {

        expect(convertArrayOfJsonObjectsToRequiredFormat(testArray, "", States)).toEqual(null)
    })

    it('test convert array of json objects when key is undefined', () => {

        expect(convertArrayOfJsonObjectsToRequiredFormat(testArray, undefined, States)).toEqual(null)
    })

    it('test convert array of json objects when key is null', () => {

        expect(convertArrayOfJsonObjectsToRequiredFormat(testArray, null, States)).toEqual(null)
    })
    it('test convert array of json objects when key is hello', () => {


        expect(convertArrayOfJsonObjectsToRequiredFormat(testArray, "hello", States)).toEqual(null)
    })
    it('test convert array of json objects when key is NAME', () => {

        expect(convertArrayOfJsonObjectsToRequiredFormat(testArray, NAME, States).length).toEqual(1)
    })

    it('test filterDataAccordingToState when data is empty', () => {
        expect(filterDataAccordingToState('Texas',[],NAME)).toEqual(null)
    })
    it('test filterDataAccordingToState when data is undefined', () => {
        expect(filterDataAccordingToState('Texas',undefined,NAME)).toEqual(null)
    })
    it('test filterDataAccordingToState when data is null', () => {
        expect(filterDataAccordingToState('Texas',null,NAME)).toEqual(null)
    })
    it('test filterDataAccordingToState when key is null', () => {
        expect(filterDataAccordingToState('Texas',populationTestArray,null)).toEqual(null)
    })
    it('test filterDataAccordingToState when key is undefined', () => {
        expect(filterDataAccordingToState('Texas',populationTestArray,undefined)).toEqual(null)
    })
    it('test filterDataAccordingToState when key is not NAME', () => {
        expect(filterDataAccordingToState('Texas',populationTestArray,'state')).toEqual(null)
    })
    it('test filterDataAccordingToState when filter text is null', () => {
        expect(filterDataAccordingToState(null,populationTestArray,'state')).toEqual(null)
    })
    it('test filterDataAccordingToState when filter text is undefined', () => {
        expect(filterDataAccordingToState(undefined,populationTestArray,'state')).toEqual(null)
    })
    it('test filterDataAccordingToState when filter text is not hello', () => {
        expect(filterDataAccordingToState('hello',populationTestArray,'state')).toEqual(null)
    })
    it('test filterDataAccordingToState when filter text is  correct', () => {
        expect(filterDataAccordingToState('Texas',populationTestArray,NAME).length).toEqual(1)
    })
})