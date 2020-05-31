# Posts Table

posts

id (increments)
title:string
comments:string
url:string
reddit_id:integer (unique)
user:string
read:boolean (default=false)
created_at:timestamp (default=knex.fn.now())
