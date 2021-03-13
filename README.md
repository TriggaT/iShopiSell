# iShopiSell-frontend
This repo contains the frontend to iShopiSell, a website for users to buy and sell products from other users. The backend of the website utilizes Ruby on Rails as API to manage the database and models, which can be viewed here: https://github.com/TriggaT/iShopiSell-backend

iShopiSell is a single page web application, with the frontend utilizing HTML, CSS, and JavaScript to manage the data received from the backend of the website. It's an e-commerce style app, allowing users to create products to put on the market and add/remove products that have already been placed on the market in their shopping cart to be purchased. It currently does not deal with actual money, but instead the concept of money, with each initial user starting with $200 in their account. Products can be sold at any price and users must also put the quantity of the product they possess when placing it on the market. Users can only get additional funds in their account through selling products in the market, with said market making a $1 per unit sold of your product. The first user in the seed data is the market. The market makes $1 profit per unit sold of any product while also not having any products of it's own. 

The user and product models received from the backend through fetch requests are immediately turned into JavaScript class objects with class constructors to make managing them easier with object oriented programming. The products are the only model that can be placed and/or removed from the shopping cart, so those functions are only in the product class with their quantity being adjusted as needed. Similarly, the users can only makes purchases that impact their account balance with those functions being attached to that class. There are total of four classes for the app, one for each model and an adapter to handle fetch request to each model to save data on the backend. All of the classes are the src folder. 

All elements in the HTML document that are utilized in JavaScript and/or CSS have class and id names so they can access or manipulated as needed using the proper format, listed at the top of the index.js file for javascript manipulation. For example, all the buttons have "EventListeners" that are in the index.js file that leads to recognition of the action and/or persistence of data. Additionally, when users login or out, certain elements, like the login screen and list of products, have to disappear or reappear to make room new elements to be placed in the document, particularly when a user puts a new product on the market. There are alerts within functions that correspond to the validations on the backend of the website to prevent bad data from being saved to the database.  
