# lm-sppedup-calculator

## ローモバ時短計算機

ご利用はこちらから計画的に
demo site is below.
演示網站如下。

https://kawase-fx.github.io/lm-sppedup-calculator/

![FireShot Capture 335 -  - ](https://user-images.githubusercontent.com/29803517/98297889-7928ce80-1ff8-11eb-877f-50a0ef1450b6.png)

### 【推奨】スマホでは横画面で使ってください。
### Recommended: Use your phone in landscape mode.
### 建議：在橫向模式下使用手機。

### 使い方１（画像から） usage A: from screenshot 用法1:從截圖讀取字符

* ローモバのバッグ画面を、アイテムごとの線に合わせてスクショしてください。
Take screen shot the Lord mobile 'Speed Up bag' along the lines of each item.
沿著每個項目的線路，截王國紀元'加速包'。

* ファイル選択ボタンでスクショを送信すると、自動で読み取って時短計算します。
select screenshot with file selection button.
this will be read characters automatically from screenshot and compute 'speed up' items.
用文件選擇按鈕選擇屏幕截圖，這樣就會自動從屏幕截圖中讀取字符，併計算 "加速 "項目。

* １つのスクショ画像から１度に３つのアイテム個数を読み取ります。
* スマホ向け：マルチOFFの時、スクショは何枚でも一気に送ることができます。
* PC向け：マルチONで処理を同時並行で行います。3倍早いけど一度に画像2枚から4枚が限界です。
* iPhone6s+ では iOS 14.2 でマルチは１枚だけでも処理準備中にブラウザが死にます。
* 32スレッドCPUでRAM 32GBのPCで5枚、それ以上は処理準備中にブラウザが死にます。

* Reads 3 item counts at a time from one screenshot image.
* For smartphones: set MULTI to off, can select many screenshots as you want at once. if set MULTI to on, iPhone6s+ with iOS 14.2, the browser dies while preparing to process only one picture.
* For PC: can set MULTI to ON, It's 3 times faster, but the select limit is 2 to 4 screenshot at a time. my Ubuntu on TR1950X with 32GB of RAM, browser died while preparing to process at select 5 pictures.

* 一次從一張截圖圖像中讀取3個項目的數量。
* 智能手機：將 並發處理 設置為 OFF，可以一次選擇多張截圖。
如果將 並發處理 設置為 ON，iPhone6s+與iOS14.2，瀏覽器在準備處理只有一張圖片時死機。
* 對於PC：可以將 並發處理 設置為 ON，速度快3倍，但一次只能選擇2到4張截圖。
我的 Ubuntu 上的 TR1950X，32GB內存，瀏覽器在準備處理5張圖片時死機。

#### 画像読み取りに失敗することがあります。その場合は・・・
#### sometimes fails to read images. In that case...
#### 有時無法讀取圖像。在這種情況下...

* 拡大倍率を１から１０の間で試してみてください。１でダメなら１０、それでダメなら５や１に戻す、みたいにするといいかもです。
* 認識結果が出ているログ窓で、間違って認識されてしまった言葉を選択状態にすると、置き換える言葉を種類や単位から選べます。この設定はブラウザで記憶するのでずっと有効です。

* Try change SCALE slider between 1 and 10; if 1 doesn't work, try 10, if that doesn't, try 5 or 1 again, and so on.
* In the log window where the recognition results are showing, you can select from table header the word you want to replace by selecting the wrong word that was recognized by mistake in the log window. This setting is remembered by the browser.

* 試著在1和10之間改變SCALE滑塊，如果1不行，就試10，如果不行，再試5或1，以此類推。
* 你可以在 log 中選擇錯誤識別的單詞之後，從表頭中選擇要替換的單詞。這個設置會被瀏覽器記住。

![FireShot Capture 338 -  - ](https://user-images.githubusercontent.com/29803517/98443252-85727000-214d-11eb-9b0e-e0a5d71b0abf.png)

* 失敗した時の画像を添えて連絡くれたら対応するかもしれません。
* if your screenshot could not recognize, give report to me with that screenshot.
* 如果你的截圖無法識別，請給我跟那個截圖還有報告。

#### いい例
#### example of good picture to auto recognition.
#### 好的圖片到自動識別的例子。

![screenshot-2020-11-04_22 40 51 519](https://user-images.githubusercontent.com/29803517/98238903-71423d80-1faa-11eb-9fc9-a38c0c0ce806.png)

#### わるい例
#### example of __BAD__ picture to auto recognition.
#### __不__ 好的圖片到自動識別的例子。

![screenshot-2020-11-05_21 05 10 564](https://user-images.githubusercontent.com/29803517/98239002-9df65500-1faa-11eb-9fcb-111e10776a4a.png)

### 使い方２（手で入力） usage B: input item count by hand 用法2:自己輪入數量

* 合計行以外の、ジャンルとスピードアップ単位がクロスする欄を選んでタッチすると個数を入力できます。個数を入力したら自動計算され、合計に加算されます。
* You can enter the number of items by touch/click the column where the genre and the speed-up unit are crossed(except for the total line), it will be calculated automatically and added to the total.
* 可以通過點擊種類與時間單位交叉的那一欄(除總行外)來輸入項目數，將自動計算並加到總數中。

![ダウンロード](https://user-images.githubusercontent.com/29803517/98239221-f594c080-1faa-11eb-8c99-d32046a38cde.png)

## ライセンスそのほか
## License and other information.
## 許可和其他信息。

* 読み取り精度が悪い、スクショ面倒くさひ、などあるかと思います。ローモバに実装されないのがいけないと思います。
* グーグルの読取処理つかわんの？＝あれは有料です。これは「無料でアプリを作る遊び」なので取り入れる機会はないです。

* 現状のまま利用する限り無料です。組み入れやフォーク後の改変はお断りします。
* free to as is use. before contact to me embeding or fork with modify.
* 免費使用。 在與我聯繫之前嵌入或進行修改。

* プルリク（来るのかなｗ）歓迎。
* pull request is welcome.

* このアプリはローモバアイテムの寄付などを受け付けております。give donation to me item of lords mobile or BTC!!
* give BTC donation or item of LM to me !!
* 透過BTC給我捐款或遊戲裡的項目給我！ !

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
