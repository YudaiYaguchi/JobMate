### 初期セットアップ
git clone https://github.com/YudaiYaguchi/JobMate.git
docker compose up
docker compose exec backend rails db:create
Rails: docker compose exec backend rails s -b '0.0.0.0'
React: docker compose exec frontend npm start

Rails: localhost:3001
React: localhost:3000

### Bash
docker compose exec frontend bash

### コントローラーの作り方
docker compose exec backend bash

### エラー対処

docker compose run backend bash -c "mkdir -p log && touch log/development.log"

フロントエンドが動かない
docker compose exec frontend npm install


