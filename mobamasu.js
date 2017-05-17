// JQueryの開始
$(function(){
    // コンソールにログを吐きます(ChromeをアクティブにしてF12押してConsoleタブ見るといい！)
    console.log("モバマスBOT開始！");
    var url = location.href;
    // フラッシュや予期せぬページに飛ばされた時に戻るページ
    var redirectUrl;
    // 機能にあった遷移先をセット。対応していないページでは何もしない
    if (url.indexOf("quests") !== -1 || url.indexOf("quest_boss") !== -1) {
        // 通常の仕事(常に最新のフロア)の画面
        redirectUrl = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fquests%3Fl_frm%3DMypage_2%26rnd%3D194435151";
    } else if (url.indexOf("event_date") !== -1) {
        // アイドルプロデュース開催時の4人目のクエスト画面
        redirectUrl = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fevent_date%2Fmission_list%2F%3Fstage%3D4%26rnd%3D400584661";
    } else {
        console.log("モバマスBOT終了！");
        return;
    }
    // 2～4秒待ってからサブミットする。BOTフィルター回避用。あるのか知らんけど。回避できるかも謎だけど！
    var waitMilliSeconds = 2000 + Math.floor(Math.random() * 2000);
    // 制限に達した時に表示される内容
    var fullText = "所属ｱｲﾄﾞﾙ数が上限に達しました｡移籍かﾚｯｽﾝをしましょう｡";

    // 一定時間待ってから処理します
    setTimeout(function(){
        console.log(waitMilliSeconds + "ミリ秒待ったよ");
        // フォームあるってことは普通のプロデュース画面
        if ($("form").size() != 0) {
            // アイドルいっぱいになってたらアラートで知らせる
            if ($("span.red:contains(" + fullText + ")").size() != 0) {
                alert(fullText);
            // 今いるURLがスタミナ切れのページか確認する。一致する文字列がない場合は-1が返る
            } else if (location.href.indexOf("life_empty") !== -1) {
                alert("スタミナ切れたよ！！！");
            // 特に問題なければ情報を送る。課金アイテム使いたくないので無料の方を選択(1個目のフォーム)
            } else {
                $("form:eq(0)").submit();
                console.log("サブミット発動！");
            }
        // 普通に違うページに移動させるとReferer(どこから来たのかを示す情報)が渡ってしまって
        // 不正遷移とみなされそうなので、その情報を落として移動させる
        } else {
            location.assign('application/x-shockwave-flash,<html><script>location.replace("' + redirectUrl +'");</script></html>');
            console.log("最初のページに戻るお");
        }
        console.log("モバマスBOT終了！");
    }, waitMilliSeconds);
});
