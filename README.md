<p align="center">
  <a href="https://www.newt.so/">
    <img src="https://user-images.githubusercontent.com/3859812/155490725-80ed1f06-996e-407f-8f63-fd54f0acaf14.svg" alt="Newt" width="70" height="57" />
  </a>
</p>
<h3 align="center">
Newt's starter
</h3>
<p align="center">
  <a href="https://demo-newt-docs-starter-nuxtjs.vercel.app/">Demo</a> | <a href="https://www.newt.so/">Newt</a>
</p>

## 概要

**newt-docs-starter-nuxtjs**
<br />Newtを利用したドキュメントサイト
<br />技術構成： Nuxt.js, JavaScript

## 開発をはじめる

### Step1: Newtスペースをセットアップ

1. スペースを作成します
    - スペースUIDを控えておきましょう。スペースUIDは 管理画面URL（ `https://app.newt.so/{スペースUID}` ） もしくは スペース設定 > 一般 から確認できます。
2. Appを作成します
    - Appテンプレートから作成する場合、**Docs**を選択し「このテンプレートを追加」をクリックしてください。
    - スクラッチで作成する場合は、App名とAppUIDを設定して次のステップに進みます。
    - AppUIDを控えておきましょう。AppUIDは管理画面URL（ `https://app.newt.so/{スペースUID}/app/{AppUID}` ） または App設定 > 一般 から確認できます。
3. App設定から、Articleモデル, Categoryモデルを作成します
    - Appテンプレートから作成した場合、すでにモデルが作成されているためこのステップは飛ばします
    - スクラッチで作成した場合は、[Newtスペースの構成](#Newtスペースの構成)に従ってAppとモデルを作成します
4. スペース設定 > APIキー からCDN APIトークンを作成します
    - スペース設定 > APIキー よりCDN APIトークンを作成します
    - 複製マークをクリックしてトークンをコピーしましょう

### Step2: nuxt.config.jsを書き換える

1. Step1で取得したスペースUID, AppUID, CDN APIトークンでnuxt.config.jsのconfig変数を書き換えます

```javascript
const config = {
  spaceUid: 'スペースUID',
  appUid: 'AppUID',
  token: 'CDN APIトークン',
  apiType: 'cdn',
  articleModelUid: 'article',
  categoryModelUid: 'category',
}
```

### Step3: devサーバーを起動する

Yarnを使う

```bash
# 依存パッケージをインストール
$ yarn install

# localhost:3000でdevサーバーを起動
$ yarn dev
```

NPMを使う

```bash
# 依存パッケージをインストール
$ npm install

# localhost:3000でdevサーバーを起動
$ npm run dev
```

### Step4: Staticなサイトを生成して起動

```bash
# Staticなサイトを生成（SSG）
$ yarn generate

# サーバーを起動
$ yarn start
```

## Newtスペースの構成

`Docs` appの中にArticle, Category の2つのモデルを作ります。

| App名（任意） | モデル名（モデルUID） |
| --- | --- |
| Docs | Article (`article`) |
|  | Category (`category`) |

### Article（`uid: article`）モデル

| フィールドID | フィールド名 | フィールドタイプ | オプション |
| --- | --- | --- | --- |
| title | タイトル | テキスト | 必須フィールド, このフィールドをタイトルに使う |
| slug | スラッグ | テキスト | 必須フィールド |
| meta | メタ情報 | カスタムフィールド | |
| body | 本文 | Markdown or リッチテキスト |  |
| category | カテゴリ | 参照（Categoryモデル） | |
| sortOrder | 順番（昇順） | 数字 |  |

### Category（`uid: category`）モデル

| フィールドID | フィールド名 | フィールドタイプ | オプション |
| --- | --- | --- | --- |
| name | 名前 | テキスト | 必須フィールド, このフィールドをタイトルに使う |
| sortOrder | 順番（昇順） | 数字 | |

### メタ情報（`id: META`）カスタムフィールドタイプ

| フィールドID | フィールド名 | フィールドタイプ | オプション |
| --- | --- | --- | --- |
| title | Title | テキスト | |
| description | Description | テキスト | |
| ogImage | OG画像 | 画像 |  |

## License

[MIT License](https://github.com/Newt-Inc/newt-docs-starter-nuxtjs/blob/main/LICENSE)
