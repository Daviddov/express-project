const express = require('express');
const app = express();
const fs = require('fs')

app.use('/', express.static('public'));

app.route('*')
    .get((req, res,) => {
        console.log(__dirname + req.url);
        fs.readdir(__dirname + req.url, (err, files) => {
            files.forEach(file => file);
        });
        res.send();
    })
    .delete((req, res) => {
            fs.unlink(__dirname + req.url, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                    res.send(req.url +' File deleted!');
                  }); 
    })
    .put((req, res) => {
        // look up for the course
        // const course = courses.find(c => c.id === parseInt(req.params.id))
        // if (!course) return res.status(404).send('The course mot found')
        // // validate
        // const { error } = validateCourse(req.body)
        // if (error) return res.status(400).send(error.details[0].message)
        // // update
        // course.name = req.body.name;
        // res.send(course)
    })
    .post((req, res) => {
        // const result = validateCourse(req.body)
        // if (result.error) {
        //     //400 bad requset
        //     res.status(400).send(result.error.details[0].message)
        //     return
        // }
        // const course = {
        //     id: courses.length + 1,
        //     name: req.body.name
        // };
        // courses.push(course);
        // res.send(course);
    });

const port = process.env.PORT || 3000
app.listen(port, () => { console.log('listen to port ' + port); });
