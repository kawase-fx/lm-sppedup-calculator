# lm-sppedup-calculator

## ローモバ時短計算機

ご利用はこちらから計画的に https://kawase-fx.github.io/lm-sppedup-calculator/

![FireShot Capture 335 -  - ](https://user-images.githubusercontent.com/29803517/98297889-7928ce80-1ff8-11eb-877f-50a0ef1450b6.png)

### 【推奨】スマホでは横画面で使ってください。

### 使い方１（画像から）

1. ローモバのバッグ画面を、アイテムごとの線に合わせてスクショしてください。
1. ファイル選択ボタンでスクショを送信すると、自動で読み取って時短計算します。

* １つのスクショ画像から１度に３つのアイテム個数を読み取ります。
* スマホ向け：マルチOFFの時、スクショは何枚でも一気に送ることができます。
* PC向け：マルチONで処理を同時並行で行います。3倍早いけど一度に画像2枚から4枚が限界です。
* iPhone6s+ では iOS 14.2 でマルチは１枚だけでも処理準備中にブラウザが死にます。
* 32スレッドCPUでRAM 32GBのPCで5枚、それ以上は処理準備中にブラウザが死にます。

#### 画像読み取りに失敗することがあります。その場合は・・・

1. 拡大倍率を１から１０の間で試してみてください。１でダメなら１０、それでダメなら５や１に戻す、みたいにするといいかもです。
1. 認識結果が出ているログ窓で、間違って認識されてしまった言葉を選択状態にすると、置き換える言葉を種類や単位から選べます。この設定はブラウザで記憶するのでずっと有効です。
1. スクショの両端に岩があるような、ナイスな解像度の方、失敗した時の画像を添えて連絡くれたら対応するかもしれません。

* いい例

![screenshot-2020-11-04_22 40 51 519](https://user-images.githubusercontent.com/29803517/98238903-71423d80-1faa-11eb-9fc9-a38c0c0ce806.png)

アイテムごとの区切り線がスクロール領域にぴたっとハマって、かつお知らせが出てないのがいいです。

* わるい例

![screenshot-2020-11-05_21 05 10 564](https://user-images.githubusercontent.com/29803517/98239002-9df65500-1faa-11eb-9fcb-111e10776a4a.png)

こんな感じで縦にずれると文字が見切れちゃうので、プログラムから文字が見えなくなります。

### 使い方２（手で入力）

合計行以外の、ジャンルとスピードアップ単位がクロスする欄を選んでタッチすると個数を入力できます。

個数を入力したら自動計算され、合計に加算されます。

![ダウンロード](https://user-images.githubusercontent.com/29803517/98239221-f594c080-1faa-11eb-8c99-d32046a38cde.png)

## ライセンスそのほか

* 読み取り精度が悪い、スクショ面倒くさひ、などあるかと思います。ローモバに実装されないのがいけないと思います。
* グーグルの読取処理つかわんの？＝あれは有料です。これは「無料でアプリを作る遊び」なので取り入れる機会はないです。
* 現状のまま利用する限り無料です。組み入れやフォーク後の改変はお断りします。free for AS-IS. prohibit embeding, modify with fork.
* プルリク（来るのかなｗ）歓迎。welcome to pull request.
* このアプリはローモバアイテムの寄付などを受け付けております。give me item of lords mobile or BTC!!

  * Lords mobile ID `Kawa San`
  * BTC `3CE1q8DPYqtUfRoMjiRb2HMD31WaD4JdUQ`

## 謝辞/使用ライブラリ

以下のライブラリによってアプリが支えられております。ありがとうございます。

Big.js 10進数計算
https://github.com/MikeMcl/big.js#readme

tesseract.js OCR
https://github.com/naptha/tesseract.js

Maquette 仮想DOM
https://github.com/AFASSoftware/maquette

many many thank you ECJ members.
