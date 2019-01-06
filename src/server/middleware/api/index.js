import {panel} from '../../mongo'
const bodyParser = require('body-parser')


export default (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true}));

    const handleFailure = (res) => {
        res.send({error: "true", })
    }

    // returns data needed for initial view
    app.get('/api/panelList', (req, res) => {
        panel.find({}, (err, result) => {
            res.send(result)
        })
    })

    // add panel
    app.post('/api/addPanel', (req, res) => {
        const {panelId, panelName} = req.body
        console.log(panelId, panelName);
        if (panelId !== undefined || panelName !== undefined) {
            panel({panelId,panelName})
                .save((err, result) => {
                    if (err) console.log(err);
                    res.send(result)
                })
        } else {
            handleFailure({res, error: ""})
        }
    })

    // add panel
    // DO UPDATE!!!!!
    app.put('/api/updatePanel', (req, res) => {
        const {panelId, panelName} = req.body
        console.log(panelId, panelName);
        if (panelId === undefined || panelName === undefined) {
            handleFailure()
        }

        panel.updateOne({panelId}, {panelName}, (err, result) => {
            if (!result.ok) {
                handleFailure()
            }
            panel.find({panelId}, (err, findResult) => {
                res.send(findResult)
            })
        })
    })
}
