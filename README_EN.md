This is an automatic translation and may be incorrect in some places. See the source README and examples for authoritative information.

# Settings-discover
Application for finding devices with a library[Settings](https://github.com/GyverLibs/Settings)
- [Download .apk]https://github.com/GyverLibs/Settings-discover/releases/latest/download/Settings.apk
) latest version
- [Download .html](https://github.com/GyverLibs/Settings-discover/releases/latest/download/index.html)latest

To search for a smartphone / PC must be in the same local network with the device. The application must indicate the correct subnet mask (configured in the router). If the router did not change - then it is there standard *255.255.255.0*, as in the application by default.

> The library version v1.0 is required. 13 +

## How to collect
- Install[VS Code](https://code.visualstudio.com/download)
- Install[Node JS](https://nodejs.org/en/download/prebuilt-installer)
- Open a folder in VS Code
- Console **Ctrl + `**
- `npm install`Wait for the dependency setup
- `npm run build`Or run the script *build.bat*
- The project will assemble in the dist folder

## Development and debugging
`npm run dev`or the script *dev.bat* will start the dev server and open the browser, will update the site when changes in the code. To close,`Ctrl+C`in the console, then`y`

## Android
The application is sobar in the Kodular constructor, just opens the collected index.html in WebView
