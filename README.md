# TTC Next Bus Times

A simple component built as part of a microsite a few years back to pull upcoming times from an open source API for the next TTC bus at a particular intersection in downtown Toronto. Extracted and placed in the Create React App framework with very little minor modification to original code.

This was a fun collaborative project with the dev team when we first started learning React.

## Component Details

<code>/src/ttc/NextBus.js</code>

Main component that takes a list of routes (four for the four stops at interseciton) passed in from App.js and renders information about each stop.

<code>/src/ttc/TTCStop.js</code>

Component that connects to the NextBus feed for a particular route and loads the data into another component.

<code>/src/ttc/TTCDirection.js</code>

Final component that renders the upcoming bus times for a stop. In hindsight, this could have been created as a stateless functional component.

## Bus times from NextBus:
https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Commands

#### `npm install`
#### `npm start`
