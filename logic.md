# Use Cases

## Save reddit posts to db

- [x] Get Reddit posts every 15th minute of every hour
- [x] Get posts from reddit on a daily schedule (~700 rows of data from Reddit)

## Auto delete Reddit Posts after 7 days

- [x] Exactly 7 days from initial load, find data where date difference > 7, and delete
  - [x] Do for both master_posts and posts table

## Titles

- [x] When user adds a title, add to 'Titles' table
- [x] When user deletes a title, delete from 'Titles' table
  - [x] Also delete title from 'Posts' table
- [] When user loads page, get titles from 'Titles' table

## Posts

- [x] When user has initial load on page for first day, do a join between 'Users', 'Titles', and 'Master Posts' tables
  - [x] This is then added to the 'Post' table
  - [x] User has a 'last_queried' field that is then used to minimize amount of searching needed to do
- [x] When user decides to reload reddit posts, they can request it again
  - [] User also has option to check or uncheck if they want the latest posts everytime they load the page
- [x] When user has marked a post read, update posts table
- [x] When user requests posts, filter to where read boolean equal to false

# To-dos

- [x] Add documentation to routes
  - https://editor.swagger.io/
- [] Add testing to API
