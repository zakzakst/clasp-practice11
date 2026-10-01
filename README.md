# clasp-practice11

Google Apps Script (GAS) の Web アプリから、Google Drive のフォルダ内にある画像を Google スプレッドシートへまとめて挿入するプロジェクトです。TypeScript を esbuild で GAS 用 JavaScript に変換し、`clasp` でデプロイします。

## 機能

- 指定した Google Drive フォルダから画像ファイルだけを取得
- ファイル名の昇順で並べ、指定したスプレッドシートの先頭シートへ挿入
- 挿入画像の幅を 300px に統一し、画像が重ならないように次の行へ配置
- Web アプリ画面からフォルダ ID とスプレッドシート ID を入力して実行

## 必要なもの

- Node.js と npm
- Google アカウント
- Google Drive と Google スプレッドシートへのアクセス権
- `@google/clasp` を使った Google Apps Script プロジェクト

## セットアップ

1. 依存パッケージをインストールします。

   ```bash
   npm install
   ```

2. clasp にログインします。

   ```bash
   npx clasp login
   ```

3. 設定ファイルのテンプレートをコピーします。

   Windows PowerShell:

   ```powershell
   Copy-Item _.clasp.json .clasp.json
   Copy-Item _.env .env
   ```

   macOS / Linux:

   ```bash
   cp _.clasp.json .clasp.json
   cp _.env .env
   ```

4. `.clasp.json` の `scriptId` を対象の Google Apps Script プロジェクトの ID に置き換えます。

   `.env` には次の値を設定します。現在のビルドでは、これらの値をサーバー側コードへ埋め込めます。

   ```dotenv
   SHEET_ID=対象スプレッドシートのID
   MY_ADDRESS=自分のメールアドレス
   ```

   `MY_ADDRESS` は現時点のコードでは参照されていません。将来の処理で使用するための環境変数です。

## ビルドとデプロイ

TypeScript と HTML を `dist/` に出力するには、次を実行します。

```bash
npm run build
```

GAS プロジェクトへビルドと push をまとめて実行する場合は、次を使用します。

```bash
npm run push
```

`push` は `npm run build` の後に `appsscript.json` を `dist/` へコピーし、`clasp push` を実行します。`dist/` は生成物のため、通常は直接編集しません。

初回デプロイ時は、Google Apps Script エディタまたは clasp で Web アプリとしてデプロイします。

1. `npm run push` でコードを push します。
2. GAS プロジェクトで **デプロイ** > **新しいデプロイ** を選択します。
3. 種類に **ウェブアプリ** を指定します。
4. 実行ユーザーとアクセスできるユーザーを確認してデプロイします。
5. 発行された URL を開き、画像フォルダ ID とスプレッドシート ID を入力します。

### ID の確認方法

- Drive フォルダ ID: フォルダ URL の `/folders/` の後ろの文字列
- スプレッドシート ID: スプレッドシート URL の `/d/` と `/edit` の間の文字列

## 開発用コマンド

| コマンド             | 内容                                                 |
| -------------------- | ---------------------------------------------------- |
| `npm run build`      | TypeScript を bundle し、HTML を `dist/` にコピー    |
| `npm run push`       | build 後に `appsscript.json` をコピーして clasp push |
| `npm run eslint`     | `src/` の ESLint を実行                              |
| `npm run prettier`   | リポジトリ内のファイルを Prettier で整形             |
| `npm run clasp:pull` | clasp からコードを取得                               |

## ディレクトリ構成

```text
src/
├── index.ts             # doGet と画像挿入処理
├── html/
│   ├── page.html        # Web アプリの画面
│   ├── script.html      # GAS 呼び出しと結果表示
│   └── styles.html      # 画面用スタイル
└── utils/               # Drive、Calendar、Document、Spreadsheet 用の共通処理
```

## 注意事項

- 実行時には Drive と Spreadsheet への承認が必要です。
- 指定したスプレッドシートでは、最初のシートが対象になります。
- 対象フォルダ直下の画像ファイルだけが処理され、サブフォルダは再帰的に検索されません。
- `.env` と `.clasp.json` は認証情報やプロジェクト情報を含むため、リポジトリへコミットしないでください。
- 外部から利用する Web アプリとして公開する場合は、アクセス範囲と実行ユーザーを必要最小限に設定してください。
