const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: {
            type: String,
            maxLength: 255,
            required: true,
        },
        description: {
            type: String,
            maxLength: 600,
        },
        image: {
            type: String,
            maxLength: 255,
        },
        videoId: {
            type: String,
            maxLength: 255,
            required: true,
        },
        slug: { type: String, slug: 'name', unique: true },
    },
    { timestamps: true }
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
