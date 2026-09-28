# clasp-template

## TODO

- Advanced Google Servicesの利用試したい

## アイデア

- 指定したフォルダを同じ階層にコピーする（フォルダコピーがグーグルドライブにはなかった）
- リマインドメール送信
  - スプレッドシートに日付とメッセージを入力するGASをAPIから実行できるようにする（Chrome拡張機能からたたく想定）
  - 毎朝トリガー発火。スプレッドシートを確認して本日の日付のメッセージをメール送信
- HTTPリクエスト（API連携）
  - UrlFetchApp.fetch
- PropertiesService
  - 行データ表示の時の選択行の保持に利用できたかも
- テンプレート挿入
  - テンプレートドキュメントを別シートで事前に用意
  - スクリプト実行してテンプレートドキュメントにあるシート名の一覧を取得
  - 挿入したいシート名を選択
  - 選択されたシートの内容を、現在のシートに挿入する
- サイドバーにTODOリスト、入力もできる。データはスプレッドシートに連携

## GAS以外の機能

- 「@」を入力してスマートチップの挿入などできるので覚えておく
- 挿入 > 構成要素 > 会議メモ で参加者のチップをいい感じにリストアップしてくれる
- カスタムビルディングブロック使ってみる
  - https://support.google.com/docs/answer/13584759

## コマンドメモ

- `npx clasp login`
- `npx clasp clone スクリプトID`

## 済

- build上手くいかない
  - https://qiita.com/venect_qiita/items/5aa9666c32b80038ef52#対応の方針
    - ⇒ vite build使う？ https://github.com/WildH0g/apps-script-engine-template
- esbuild-gas-plugin試す
  - https://zenn.dev/funteractiveinc/articles/776b5812833475
  - ⇒ あまり変わらなかったので利用しない
- eventの主催者・参加者取得
  - ⇒ エラー出るので、一旦あきらめる
  - Advanced Google Servicesを利用すればできそうではあった
- htmlファイルはコピーでなくejsとかxhtmlとか使う
  - ⇒ GASのテンプレート機能で対応
- clasp pushの際にmanifest overwriteを自動でyesにできないか？
  - clasp push -fだと出来るっぽい。ただ、-fは怖いので自動化はあきらめる
  - https://qiita.com/hosaka_/items/d7ada9556ddbb7c5d988
- ドキュメントにシートを挿入する（Chrome拡張機能からたたく想定 アイデアとして出したはいいが選択中のドキュメントに挿入するパターンのほうが便利そう 却下）
  - 挿入するシート：テンプレート的なドキュメントを事前に用意
  - 挿入する先のドキュメント：IDを指定
  - 想定するリクエスト
    - テンプレートドキュメントのID
    - 挿入するシート名
    - 挿入する先のドキュメントのID
    - シート名