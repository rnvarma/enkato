module.exports = {
    path: 'v/:videoUUID',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./SingleVideoPage'))
        })
    }
}