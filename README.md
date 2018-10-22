# TalkDeskChallenge

The goal of the this challenge was to build a working interface that basically list, filter and paginate a list of apps:

- List all the apps
- Paginate the list (page size = 3)
- Filter the apps as you type in the search bar
- Have all the existing categories in the left navigation sorted by alphabetic order
- Allow filtering of apps when we click on a category
- Apps should be sorted by ascending order of the sum of the plans price

To do the challenge, two classes with logic were done:
 - WebRequestJsonService.ts - To fetch data from json
 - AppComponent.ts - That contains all the logic needed to meet the requirements of the challenge

The challenge has some unit tests for the two classes referred to above. Just a few tests were done with an example of what could be done, without covering every possible cases, as it was not the main objective of the challenge either.

NOTE: To be better structured, separate components should have been created for each part of the logic:
- PaginationComponent
- FilterComponent
- ListCompoenent

The structure was not implemented in this way because the free time available is not much and i think that at this stage the main objective is to have all the points requested to work: P

## To run the app

Pre-requirements
- Install node (https://nodejs.org/en/)

- run the command `npm install` (to install the dependencies)
- run the command `ng serve`
- Navigate to http://localhost:4200/

## Unit Tests

- run the command `ng test` to execute the unit tests

## Author

Daniel Soares
