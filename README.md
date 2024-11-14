Mesto Project
The Mesto project is an interactive web application where users can share photos, like posts, and edit profile information. The project includes form validation, API integration, and server deployment.

Functionality
Form Validation
"Edit Profile" Form:

The "Name" and "About Me" fields are validated for length and input restrictions.
Dynamic validation makes the "Save" button active only when the data is correct.
Validation errors are cleared when the form is reopened.
"New Place" Form:

The "Title" and "Image URL" fields are required: the first is validated for length, and the second for URL format.
If the data does not meet the requirements, a custom error message is displayed.
The form is cleared after a card is added to the page.
Avatar Update Form:

The field for the new avatar URL is validated for URL format.
An edit icon appears when hovering over the avatar.
API Integration
The project is connected to a server, allowing for loading user information and cards, as well as adding, deleting, and liking cards.
All API requests include a unique token and group ID.
Main API Requests:
Loading User Information - GET request.
Loading Cards - Initial cards are loaded from the server.
Editing Profile - PATCH request, sending updated user data.
Adding a New Card - POST request with the card title and image URL.
Liking and Unliking a Card - PUT and DELETE requests to manage likes.
Deleting a Card - DELETE request with the card ID.
Updating User Avatar - PATCH request that accepts the URL of the new avatar.
Enhanced UX
The "Save" and "Add" buttons change text to "Saving..." and "Adding..." during data submission.
Error messages are displayed to improve the user experience in case of request failures.
Project Structure
validation.js: Functions for form validation, including enableValidation to enable validation and clearValidation to clear errors.
api.js: Functions for sending requests to the server, covering all main methods for handling user data and cards.
Installation and Launch
Clone the repository:

bash
Копировать код
git clone https://github.com/your-username/mesto.git
Install dependencies:

bash
Копировать код
npm install
Start the project in development mode:

bash
Копировать код
npm run dev
To deploy the project:

bash
Копировать код
npm run build
npm run deploy
Deployment
The project is deployed to a server and available at application link.

Technologies
HTML/CSS: Adaptive and semantic layout.
JavaScript: Reactive interface, form validation, event handling.
API: Interaction with the server through REST API.
Git: Version control system for tracking changes.
Webpack: Project bundling and resource optimization.
License
The project is distributed under the MIT license.

