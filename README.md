# Getting Started with Superheroes

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

# API

API is located at: [sh-backend](https://github.com/yanikr/sh-backend) and
deployed on:[render.com](https://sh-backend-giic.onrender.com) This is a RESTful
API built using Express.js, MongoDB, and Cloudinary (to manage actions done with
Images). The API allows you to manage superheroes by providing functionality to
create superheroes, fetch superheroes, fetch superheroes by ID, add or remove
images from a superhero, and delete superheroes completely. For more information
about API you can visit github link
[sh-backend](https://github.com/yanikr/sh-backend)

# How it works?

After opening live page [Superheroes App](https://yanikr.github.io/sh-app/) user
can see the list of all Superheroes created by himself or by other users. If the
user clicks on the button Create hero, he will see a form that needs to be
filled with data to create superhero. Additionally user can open any superhero
that was created before, edit it by adding/removing images. If hero has been
created without any image, it has placeholder as image, but you can add image to
that user later, and it will take place of placeholder. Also user can remove
created superhero at any time.

# How this app has been created

For the modest functionality of the app and technical requirements, all the
state and action management has been done with the use of redux-toolkit package
toolset. Appearance of the page has been adjusted with the use MaterialUI
component library. Forms are managed with the use of Formik package. All the
requests to api are made with the use of axios package. For testing, app uses
jest test that comes with create-react-app package
