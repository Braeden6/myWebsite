# **Braeden's Personal Website**

This [website](https://braedensconsulting.com/) is for practice and for displaying my programming abilities along side my resume. </br>
Tools used:
- [React](https://reactjs.org/docs/getting-started.html): library for building user interface
- [Bootstrap](https://react-bootstrap.github.io/): helps with layout and design
- HTML: structure, used mostly in JSX files
- CSS: layout, imported in JSX files
- [Vite](https://vitejs.dev/): frontend tooling (see script dev/build)
- JavaScript: main programming language
- [NPM](https://www.npmjs.com/): package manager
- [Mapbox-gl](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/): used for map in `/map` route
- [MSAL](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview): microsoft login system</br>

All this is deployed to Microsoft Azure Web App.

# Pages

## [Home](https://braedensconsulting.com/)

This is the main page you see when you visit the website. It includes some information about me and the website.

## [Map](https://braedensconsulting.com/map)

This page allows you to view the world map. You can the center cursor around and press the `Get Weather` to view the weather at this location. Also, you can select the `add Earthquake Data` checkbox to view all earthquakes from 1965-2016. More API calls and dataset will be added to this, in the future, including environmental data, location search, air quality, and more. 

## [My Resume](https://braedensconsulting.com/myResume)

This shows my current resume. You can press the `Print Resume` to print the page and download my resume.

## [Resume Builder](https://braedensconsulting.com/resumeBuilder)

This page allows you to build a resume in the same format as my resume. There are two templates to choose from and you can save, load, delete resumes as needed (if logged in).

# Available Scripts

In the project directory, you can run:

### `npm dev`

Runs the app in the development mode.\
Open [http://localhost:5174](http://localhost:5174) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

