# reddit-clone
A Reddit clone.

If I had more time, I could improve many things, like:
- In the frontend:
   - The design of the page.
   - Show content instead of only a title.
   - Show images.
   - Make the page responsive to mobile devices.
   - Show a message when there are no recent posts to display.
   - Don't hit the endpoint that gets all the recent posts data when the user likes a post.
   - Don't allow the user to create posts with empty content, and show a proper message.
   - Clear the text in the input element of the 'Create post' component after the user created a post.
   - Fix the bug where the homepage looks bad when there are many posts.
   - Maybe disable action buttons ('Like' and 'Create post') after they're pressed and until the action they initiate finishes. This way the user can't spam the endpoints from the application.
   - Use a proper tool to provide styling to the components.
   - Create components to avoid repeating some style rules.
   - Allow the user to sort posts by creation date and/or likes.
   - Follow proper conventions for CSS styles implementation.
- In the backend:
   - Move the routes definition to a 'routes' folder.
   - Move the business logic of each endpoint to a 'services' folder.
   - Create controllers between routes and services to validate the data provided in the request.
   - Correctly return responses for error cases.
   - Maybe make success return responses follow a convention and/or be more descriptive.
   - Enforce very strict model definitions and make sure there's no way of inserting or updating rows with incorrect data.
   - Implement pagination for the GET endpoint.
- Overall:
   - Use TypeScript.
   - Add unit tests for the logic.
   - Add integration tests for simple scenarios.
   - Consider scaling problems.
   - Consider authentication.
