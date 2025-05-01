# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


### DBを更新した場合
1.frontend/src/typesに型の定義をする
2.frontend/src/types/index.tsでexportする


### controller
```bash
  rails generate controller api/v1/users （例
```
### model
```bash
  rails generate model Todo title:string date:date is_done:boolean priority:string user:references
```
