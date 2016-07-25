module.exports = {
    path: 'userprofile(/:userId)',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./Profile'))
        })
    }
}