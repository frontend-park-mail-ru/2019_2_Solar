/**
 * Unique id generator generator.
 * @return {function} - Unique id generator.
 */
const _getNewId = () => {
    let lastId = 0;
    return () => {
        lastId += 1;
        return lastId;
    };
};

/** EventBus class to subscribe, unsubscribe and emit events. */
class Bus {
    /**
     * EventBus constructor.
     * @constructor
     */
    constructor() {
        this.subs = {};
        this.getNextUniqueId = _getNewId();
    }

    /**
     * Subscribe to the event.
     * @param {string} event
     * @param {object} callback
     * @return {function} - Unsubscribe function
     */
    on(event, callback) {
        const id = this.getNextUniqueId();
        if (!this.subs[event]) {
            this.subs[event] = {};
        }
        this.subs[event][id] = callback;
        return () => {
            delete this.subs[event][id];
            if (Object.keys(this.subs[eventType]).length === 0) {
                delete this.subs[eventType];
            }
        };
    }

    /**
     * Emit the event.
     * @param {string} event
     * @param {object} data
     */
    emit(event, data) {
        if (!this.subs[event]) {
            return;
        }
        Object.keys(this.subs[event]).forEach((key) => this.subs[event][key](data));
    }
}

export default new Bus();
