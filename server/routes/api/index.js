// Express
import express from 'express';

const router = express.Router();

router.all('/', (req, res) => {
    res.json({
        foo: 'bar'
    });
});

router.all('/weed', (req, res) => {
    res.status(420);
    res.statusMessage = '418 Tea-Time, 420 Blazeit';
    res.send('<pre>const weed = \'Smoke weed everyday\';\nmodule.exports = weed;\n// Note: I do not condone the use of weed or any drug for that matter</pre>');
})

module.exports = router;