/** Class create chat */
export default class chatModule {
    _notice: Array<object>;
    _messages: Map<string, Array<string>>;
    /**
     * chatModule constructor.
     * @constructor
     */
    constructor() {
        this._notice = [];
        this._messages = new Map();
    }

    /**
     * addData
     * @param username
     * @param message
     */
    addData(user, message) {
        this._notice.push({username: user, text: message});

        let arr = [];
        if (this._messages.has(user)) {
          arr = this._messages.get(user);
          arr.push(message);
        } else {
          arr.push(message);
        }
        this._messages.set(user, arr);
    }

    /**
     * getNotice
     */
    getNotice() {
        return this._notice;
    }

    /**
     * delNotice
     */
    delNotice() {
        this._notice = [];
    }
    /**
     * getUserMessages
     * @param user
     */
    getUserMessages(user) {
        if (this._messages.has(user)) {
            return this._messages.get(user)
        }
        return [];
    }
}
