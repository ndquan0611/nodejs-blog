module.exports = function SortMiddleware(req, res, next) {
    res.locals._sort = {
        enalbed: false,
        type: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enalbed = true;
        // res.locals._sort.column = req.query.column;
        // res.locals._sort.type = req.query.type;

        Object.assign(res.locals._sort, {
            enalbed: true,
            column: req.query.column,
            type: req.query.type,
        });
    }

    next();
};
