import { $ } from '@core/dom'
import {Emitter} from '@core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.componets = options.components || []
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter
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

        this.componets.forEach(component => component.init())
    }

    destroy() {
        this.componets.forEach(component => component.destroy())
    }
}
