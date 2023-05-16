# Challenge-Rarities

## Overview
This code provides the implementation of a custom web component called RaritiesComponent. This component displays a list of items fetched from a specified URL and allows the user to select/unselect items using checkboxes. The component emits a custom event, raritiesUpdate, whenever the selection of items changes.

## Usage
- Created the RaritiesComponent component to detail its functions.
- Imported the RaritiesComponent class into my file.
- Created an instance of RaritiesComponent.
- Added the component in my index.
- Keep an eye on the raritiesUpdate event to receive updates when the item selection changes, it is available to view in the console as soon as an event is emitted.
- Customize the appearance of the component by modifying the inline styles or the getStyles() method.
- Run my web application and interact with the RaritiesComponent to select or deselect items.

## Dependencies
This component depends on the following external resources:

Fetch API: Used to fetch data from the specified URL.

## Events
Custom event emitted by the RaritiesComponent whenever the selection of items changes.
Contains the selected rarities as the checkedRarities property in the event detail.

## Styling
The component uses inline styles to style its elements.

## To install and use the project:
- Clone the project into a folder.
- Open the terminal and use the command to start the application:
  - `npm run serve`
- To access the web, use the link `localhost:3000`.
