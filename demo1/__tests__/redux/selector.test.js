import { createSelector } from 'reselect'

export const inSearchSelector = (state) => state.activityReducer.inSearch
export const channelsSelector = (state) => state.activityReducer.channels

const channelsMapSelector = createSelector([channelsSelector], (channels) => {
  const channelMap = {}
  channels?.forEach((channel) => {
    channelMap[channel.id] = channel
  })
  return channelMap
})

describe('activity selectors', () => {
  let channels
  describe('test simple selectors', () => {
    let state
    beforeEach(() => {
      channels = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
      ]
      state = {
        activityReducer: {
          inSearch: false,
          channels,
        },
      }
    })
    describe('test inSearchSelector', () => {
      it('it should return search state from the state', () => {
        expect(inSearchSelector(state)).toEqual(state.activityReducer.inSearch)
      })
    })

    describe('test channelsSelector', () => {
      it('it should return channels from the state', () => {
        expect(channelsSelector(state)).toEqual(state.activityReducer.channels)
      })
    })
  })

  describe('test complex selectors', () => {
    let state
    const res = {
      1: {
        id: 1,
        name: '1',
      },
      2: {
        id: 2,
        name: '2',
      },
    }
    const reducer = (channels) => {
      return {
        activityReducer: { channels },
      }
    }
    beforeEach(() => {
      state = reducer(channels)
    })
    describe('test channelsMapSelector', () => {
      it('it should return like res', () => {
        expect(channelsMapSelector(state)).toEqual(res)
        expect(channelsMapSelector.resultFunc(channels))
      })

      it('recoputations count correctly', () => {
        channelsMapSelector(state)
        expect(channelsMapSelector.recomputations()).toBe(1)
        state = reducer([
          {
            id: 3,
            name: '3',
          },
        ])
        channelsMapSelector(state)
        expect(channelsMapSelector.recomputations()).toBe(2)
      })
    })
  })
})
