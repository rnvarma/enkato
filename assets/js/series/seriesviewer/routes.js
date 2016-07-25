module.exports = {
    path: 's/:seriesUUID/watch',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./SeriesViewer'))
        })
    }
}