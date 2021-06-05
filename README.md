## Data Viz Tool (dvt)

dvt is a proof of concept for a modern data visualization tool. Specifically, the aim is that:
1. Users should be able to visualize millions of rows of data and tens of columns without difficulty
1. Queries should be composable, i.e. you can use an existing query as a new dataset to create a second query
1. Everything should compile to code and be version-controlled, although the user may create visualizations via a UI
1. Dimensions and measures should lean on and extend dbt schema files to make it easy for dbt users to get started

(dvt is a placeholder name and an ode to dbt)

### Quickstart
1. Clone the repository
1. Install http-server with `npm install http-server -g`
1. Run the server with `./server.sh`
1. Navigate to localhost:8000 to start visualizing!