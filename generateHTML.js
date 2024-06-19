require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./src/App').default;
const MosaicoPatrimonios = require('./src/MosaicoPatrimonios').MosaicoPatrimonios;
const cityData = require('./src/ocity.json');

const outputDir = path.resolve(__dirname, 'Gandia');
const publicDir = path.resolve(__dirname, 'public');
const indexHtmlPath = path.resolve(publicDir, 'index.html');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const generateHTML = () => {
  cityData.data.forEach((item) => {
    const appHtml = ReactDOMServer.renderToStaticMarkup(
      React.createElement('div', { id: 'root' }, React.createElement(App, { data: item }))
    );

    // Leer el contenido del index.html
    let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // Reemplazar el contenido del div #root con el HTML generado
    indexHtmlContent = indexHtmlContent.replace('<div id="root"></div>', appHtml);

    // Guardar el HTML generado en un archivo
    const fileName = `${item.id}-${item.city_name_aux}.html`;
    fs.writeFileSync(path.resolve(outputDir, fileName), indexHtmlContent);
  });

  // Generar mosaico HTML
  const mosaicoHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement('div', { id: 'root' }, React.createElement(MosaicoPatrimonios, { data: cityData.data }))
  );

  // Leer el contenido del index.html
  let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

  // Reemplazar el contenido del div #root con el HTML generado
  indexHtmlContent = indexHtmlContent.replace('<div id="root"></div>', mosaicoHtml);

  // Guardar el HTML generado en un archivo
  const mosaicoFileName = `mosaico.html`;
  fs.writeFileSync(path.resolve(outputDir, mosaicoFileName), indexHtmlContent);
};

generateHTML();
