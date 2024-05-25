const axios = require('axios');
const scrapy = require('node-scrapy')
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const express = require('express')
const app = express()

app.use(cors());

app.get('/app', async function (req, res) {
    const imagePath = path.resolve(__dirname, `./downloads/${req.query.app_id}.png`);

    if (!imagePath) {
        return res.status(404).send('No app ID');
    }

    // Check if the image already exists
    if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `inline;filename="${req.query.app_id}.png"`);
        res.setHeader('Cache-Control', 'public, max-age=86400, no-transform');
        return res.send(imageBuffer);
    }

    const url = `https://play.google.com/store/apps/details?id=${req.query.app_id}`
    const model = "img[alt='Icon image'] (src)"

    const page = await axios.get(url);
    let imageSrc = scrapy.extract(page.data, model)

    if (!imageSrc) {
        return res.status(404).send('Image not found');
    }

    imageSrc = imageSrc.replace(/=.+$/, '');

    const image = await axios.get(imageSrc, { responseType: 'arraybuffer' });

    // Save the image buffer to the file system
    fs.writeFileSync(imagePath, image.data);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `inline;filename="${req.query.app_id}.png"`)
    res.setHeader('Cache-Control', 'public, max-age=86400, no-transform')
    res.send(image.data)
})

app.listen(1337, () => {
    console.log(`Server is running on port 1337`);
})