const express = require('express');
const app = express();
const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/editWordFile', (req, res) => {
  const template = fs.readFileSync('path/to/your/template.docx', 'binary');
  const doc = new Docxtemplater();
  doc.load(template);

  // Replace placeholders with data from the request body
  const data = req.body;

  // Define the delimiters used in the Word document
  doc.setOptions({
    delimiters: {
      start: '{{',
      end: '}}',
    },
  });

  doc.setData(data);

  try {
    doc.render();
    const output = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync('path/to/your/output.docx', output);
    res.send('Word file successfully edited.');
  } catch (error) {
    res.status(500).send('Error editing Word file: ' + error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});