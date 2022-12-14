const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

//show the file
app.use(cors(
    {
    origin:'http://localhost:5000'
}
))

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static('public'));


// info on file
app.get('*/:fileName/info', (req, res,) => {
    if (req.url !== '/favicon.ico') {
        const dir = __dirname + '/public/' + req.params.fileName;
        console.log(dir);
        fs.stat(dir, (err, stats) => {
            console.log(stats);
            res.send(stats)
        });
    }
})

app.route('*')
    // index Show all files in the folder
    .get((req, res,) => {
        if (req.url !== '/favicon.ico') {
            const dir = __dirname + '/public' + req.url;
            console.log(dir);
            fs.readdir(__dirname + '/public' + req.url, (err, files) => {
                if (files) {
                    files.forEach(file => console.log(file));
                }
                res.send(files);
            });
        }
    })

    //rename
    .put((req, res) => {
        // look up for the file if exist
        const url = `/public${req.url}`;
        if (!fs.existsSync(__dirname +url)) return res.status(404).send('The file not found');
        // rename

        const src = `/public/${req.body.src}` ;
        console.log(src);
        // update
        fs.rename(__dirname + url,__dirname + src,
            (err) => {
                if (err) throw err;
                console.log('File Renamed!');
            })
        res.end()
    })
    .copy((req, res) => {
        // look up for the file if exist
        const url = `./public${req.url.split('?')[0]}`;
        console.log(url);
        if (!fs.existsSync(url)) return res.status(404).send('The file not found');
        // copy
        const target = 'public/' + req.query.src
        console.log(target);
        fs.copyFile(url, target, (err) => {
            if (err) throw err;
            res.send(`${req.url.split('?')[0]} was copied to ${target}`);
        })
    })

    .delete((req, res) => {
        const url = `/public${req.url}`;
        // look up for the file if exist
        console.log(url);
        if (!fs.existsSync(`./public${req.url}`)) return res.status(404).send('The file not found');
        // delete
        fs.unlink(__dirname + url, function (err) {
            if (err) throw err;
            console.log('File deleted!');
            res.send(req.url + ' File deleted!');
        });
    })

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log('listen to port ' + port); });
