const fs = require('fs');
const path = require('path');

// Cargar datos del archivo JSON
const cityData = require('./ocity.json');

// Plantilla HTML básica
const createHTMLTemplate = (data) => {
    let linksInterest = [];

    try {
        linksInterest = JSON.parse(data.links_interest);
    } catch (error) {
        console.error("Error parsing links_interest:", error);
    }
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.manifestation_name}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="App">
        <header class="border-solid border-2 border-indigo-600">
            <div class='container max-width flex flex-row'>
                <p class='basis-1/2'>hola</p>
                <p class='basis-1/2'>hola</p>
            </div>
        </header>
        <div class='flex justify-center border-solid border-2 border-indigo-600'>
            <div class='container max-width'>
                <div class='flex flex-row'>
                    <a href="https://www.google.com" class='basis-1/4'>Countries</a>
                    <a href="https://www.google.com" class='basis-1/4'>${data.country}</a>
                    <a href="https://www.google.com" class='basis-1/4'>Comunidad Valenciana</a>
                    <a href="https://www.google.com" class='basis-1/4'>${data.city_name_aux}</a>
                </div>
                <div class='container max-width'>
                    <div class='flex flex-col mt-10'>
                        <h1>${data.manifestation_name} (${data.city_name_aux})</h1>
                        <h2><a href='https://google.com'>View on OCity map</a></h2>
                    </div>
                    <div class='flex flex-row'>
                        <img src="https://o-city.org/manifestations_media/${data.image}" alt='imagen' class='w-1/2'></img>
                        <div>
                            <button id="toggleDescriptionButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Change to Local Language</button>
                            <p id="description">${data.manifestation_description}</p>
                        </div>
                    </div>
                </div>
                <div class='flex flex-col mt-4'>
                    <p><strong>Links of interest:</strong></p>
                    ${linksInterest.length > 0 ? linksInterest.map(link => `
                        <div class='mb-2'>
                            <p><strong>Description:</strong> ${link.description}</p>
                            <p><strong>URL:</strong> <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url}</a></p>
                        </div>
                    `).join('') : '<p>No links available</p>'}
                </div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var showLocalDescription = false;
            var buttonText = "Change to Local Language";
            var defaultDesc = \`${data.manifestation_description}\`;
            var localDesc = \`${data.manifestation_description_local}\`;
            
            var button = document.getElementById("toggleDescriptionButton");
            var description = document.getElementById("description");
            
            button.addEventListener("click", function() {
                showLocalDescription = !showLocalDescription;
                buttonText = showLocalDescription ? "Change to English" : "Change to Local Language";
                description.textContent = showLocalDescription ? localDesc : defaultDesc;
                button.textContent = buttonText;
            });
        });
    </script>
</body>
</html>
`};

// Crear un archivo HTML para cada entrada en el JSON
cityData.data.forEach((data, index) => {
    const htmlContent = createHTMLTemplate(data);
    const filePath = path.join("Gandia", `output_${index + 1}.html`);
    
    fs.writeFile(filePath, htmlContent, (err) => {
        if (err) {
            console.error(`Error writing file: ${filePath}`, err);
        } else {
            console.log(`File written successfully: ${filePath}`);
        }
    });
});
