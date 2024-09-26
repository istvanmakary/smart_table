# "Take home problem" challenge

## Installing the project

Execute `yarn i`

## Run the project

Execute `yarn dev`

## Features

[x] A basic UI app that fetches the dataset and displays it.
[x] A reusable table component that can display large datasets (~2000 rows).
[x] Adding the ability to show and hide columns on the table component.
[x] Adding the ability to apply flexible filters to the data.
[] Bonus: Use NL to set these filters. -- I have no experience with NL, so I could not do this.

## Extras

The table's state (page, perPage, filter, visible columns) are synced with the browsers hash, which makes it possible to share the current state of the app, and also the user can navigate in the browser's history to view previous searches.
