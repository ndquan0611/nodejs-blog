const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../utils/mongoose');

class AdminController {
    // [GET] /admin/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.findDeleted({})])
            .then(([courses, deletedCount]) => {
                res.render('admin/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount: deletedCount.filter(
                        (course) => course.deleted
                    ).length,
                });
            })
            .catch(next);
    }

    // [GET] /admin/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                const deletedCourses = courses.filter(
                    (course) => course.deleted === true
                );
                res.render('admin/trash-courses', {
                    courses: mutipleMongooseToObject(deletedCourses),
                });
            })
            .catch(next);
    }
}

module.exports = new AdminController();
