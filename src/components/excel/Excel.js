import { $ } from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.componets = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscrier = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.componets = this.componets.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())

        this.subscrier.subscribeComponents(this.componets)
        this.componets.forEach(component => component.init())
    }

    destroy() {
        this.subscrier.usubscribeFromeStore()
        this.componets.forEach(component => component.destroy())
    }
}
