module.exports = {
    path: 'educator',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./EducatorOnboarding'))
        })
    }
}