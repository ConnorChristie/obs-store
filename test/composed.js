const test = require('tape')
const pipe = require('pump')
const ObservableStore = require('../')
const ComposedStore = require('../lib/composed')

test('ComposedStore - basic', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore()
  const childStoreTwo = new ObservableStore()
  const composedStore = new ComposedStore({
    children: {
      one: childStoreOne,
      two: childStoreTwo,
    },
  })

  childStoreOne.putState(1)
  childStoreTwo.putState(2)

  t.deepEqual(composedStore.getState(), { one: 1, two: 2 }, 'composedStore gets state from children')

})

test('ComposedStore - child initState', function(t){
  t.plan(1)
  
  const childStoreOne = new ObservableStore({ initState: 1 })
  const childStoreTwo = new ObservableStore({ initState: 2 })
  const composedStore = new ComposedStore({
    children: {
      one: childStoreOne,
      two: childStoreTwo,
    },
  })

  t.deepEqual(composedStore.getState(), { one: 1, two: 2 }, 'composedStore gets state from children')

})
