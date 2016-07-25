module.exports = {
    path: 's/:seriesUUID',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./SeriesPage'))
        })
    }
}