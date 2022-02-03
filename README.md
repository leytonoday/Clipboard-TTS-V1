# Clipboard TTS

<div align="center">
<img src="https://user-images.githubusercontent.com/36010516/152340380-07dd0e06-1d49-4c54-b1f5-c8b37ae57e69.png" width="150" height="150">
</div>

Clipboard TTS is used to read your text aloud for you. It is a study tool to aid the dyslexic and mentally exhausted that are having trouble reading. As a student, it's often the case that you have a pile of books to read, and eventually it can be quite challenging and exhausting to get through it all. This is where this application comes in handy! It will read all any text that you copy and generate extremely high quality WaveNet (deep neural network) audio using the Google Cloud TTS API. This application will also scan any copied images for text using the advanced Google Cloud Vision API and read that text aloud also. 

Note: As previously mentioned, you must acquire keys to the Google Cloud TTS API (https://cloud.google.com/text-to-speech) and Google Cloud Vision API (https://cloud.google.com/vision). You simply input these keys into the settings page, and the application will work like magic. Visit the given links and sign up to acquire the keys for your credentials to the APIs. 

## Features
Features include:
- Automatic detection of clipboard changes. Changes are read aloud to the user.
- Supporting over 50 languages
- Both male and female voices
- Speed and volume controls
- A dictionary mode to read aloud the definition of the copied words

See the figure below.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Figures
Home page with settings
![1](https://user-images.githubusercontent.com/36010516/147893854-b90ffca7-ac4e-440e-8410-a5486f1beafc.png)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Contact me for general enqueries here: leytonodayabc123@gmail.com
