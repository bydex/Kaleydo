"use strict";

import gulp from "gulp";
const smartgrid = require("smart-grid");

gulp.task("smart-grid", (cb) => {
    smartgrid("./src/styles/vendor/import/", {
        outputStyle: "scss",
        filename: "_smart-grid",
        columns: 12, // number of grid columns
        offset: "1.875rem", // gutter width - 30px
        mobileFirst: false,
        mixinNames: {
            container: "container"
        },
        container: {
            fields: "0.9375rem", // side fields - 15px
            maxWidth: "1200px"
        },
        breakPoints: {
            xss: {
                width: "450px"
            },
            xs: {
                width: "520px"
            },
            sm: {
                width: "767px"
            },
            md: {
                width: "991px"
            },
            lg: {
                width: "1200px"
            },
            xl: {
                width: "1430px"
            }
        }
    });
    cb();
});
