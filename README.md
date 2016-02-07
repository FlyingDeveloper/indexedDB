# indexedDB

This is an attempt to learn a bit about indexedDB.

## Goals

1. Create a basic DB connection and store/retrieve a string
1. Store/retrieve a simple object
1. Store/retrieve a more complex object
1. Check to see if an object exists in the DB.
  1. If the object is in the DB:
    1. Retrieve the object from the DB
    1. Display on a form
  1. If the object isn't in the DB:
    1. Fetch the object from a service
    1. store object in DB
    1. Display on the form
1. Verify that object in the database is current
  1. Store a timestamp of the last time the object was fetched
  1. Include the timestamp in the request to the service
  1. In the service, respond with 304 if the object is still valid

## Project Structure

```
/src
 /front-end
 /back-end
```

The `front-end` directory will contain the HTML and Javascript that
will run client side, in the browser.

The `back-end` directory will contain the service code that provides
the data used during milestone 4.

----

## This project's work is complete

A quick update here. After completing Milestone 4, I had enough of an
understanding of indexedDB to move forward with implementation in a
production app so this project's job is complete. Completing Milestone5
was not necessary to expand my understanding of indexedDB.