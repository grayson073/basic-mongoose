Basic Mongoose Models
===

## Description

This assignment has you practicing full CRUD for a validated resource using ExpressJS and Mongoose.

Pick a resource, for example `unicorns`.

## Setup

1. Testing changes
   * Create separate folders for `unit` and `e2e` tests in the `test` directory
   * Modify `scripts` in `package.json` (_see in-class example_!)
      * add `--recursive` to running mocha
      * create separate `test:unit` and `test:e2e` scripts (plus watch scripts)
   * (Don't forget to modify test path or add `--recursive` to mocha when debugging!)
2. Connecting to mongodb with mongoose:
   * Create `lib/connect.js`
   * Open connection mongoose in:
      * `server.js`
      * `test/e2e/db.js` 
3. Create an express app that uses a `lib` folder with a `models` folder and a `routes` folder.
4. Add test `MONGODB_URI` to `.travis.yml`

## Requirements

* Spend some time coming up with a topical model that is of interested to you.
* Create a schema and model: 
    * Pick at least three validations that the schema will have, two beyond `required`
    * Also include in your schema:
        * Include a complex object property (a property that has subfields, like an address with city, state, zip)
        * An array property (a property that holds zero or more of some values)
    * Unit test a successful model and test validations fail correctly.
* Create HTTP REST routes:
    * Write E2E API tests and routes for all of the exposed routes
        * Use `lean` for all GETs and `select` where apprioriate (at least get all)
    * Routes are:
        * `GET /resources` list ([]) of all the resources. Limit the returned fields
        * `GET /resources/:id` return single resource object with that id (or 404 if doesn't exist)
        * `POST /resources` add a new resource and return new entity from db with `_id`
        * `PUT /resources/:id` update the resource and new "updated" entity
        * `DELETE /resource/:id` Delete the resource with that id. Return `{ removed: <result> }` where `<result>`
        is `true` if it was deleted, otherwise `false`.
  * Make `GET /resources` queryable. Don't create a seperate route! Use existing GET
        
## Rubric

* Resource
    * Schema and Model **2pts**
    * Model Unit Tests **2pts**
* Use Model and instance methods in routes **1pt** each = **5pts**
* Queryable GET **1pt**
