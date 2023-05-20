/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class EventEmitter {
  events: { [eventName: string]: Set<any> }
  constructor() {
    this.events = {}
  }

  _getEventListByName(eventName: string) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set()
    }
    return this.events[eventName]
  }

  on(eventName: string, fn: (...args: any) => void) {
    this._getEventListByName(eventName).add(fn)
  }

  once(eventName: string, fn: (value: any) => void) {
    const self = this

    const onceFn = (...args: any) => {
      self.removeListener(eventName, onceFn)
      fn.apply(self, args)
    }
    this.on(eventName, onceFn)
  }

  emit(eventName: string, ...args: any) {
    this._getEventListByName(eventName).forEach(
      // eslint-disable-next-line func-names
      (fn) => fn(...args)
    )
  }

  removeListener(eventName: string, fn?: (...args: any) => void) {
    this._getEventListByName(eventName).delete(fn)
  }
}
