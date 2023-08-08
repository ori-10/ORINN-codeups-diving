("use strict"); /* 厳格にエラーをチェック */

// const { compile } = require("sass");

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  ///////////
  // ローディング
  ///////////

  $("body").css("display", "block");

  var webStorage = function () {
    if (sessionStorage.getItem("access")) {
      $(".loading").addClass("is-none");
    } else {
      //初回アクセス時の処理
      sessionStorage.setItem("access", 0);
      //ここにローディングの処理

      $(document).ready(function () {
        // ローディング画面を表示

        $(".loading__left-image").addClass("is-active");
        $(".loading__right-image").addClass("is-active");

        // ローディング画面のフェードアウト後にスクロール禁止を解除
        $("#loading")
          .delay(1700)
          .fadeOut("slow", function () {
            // フェードアウトが完了した後に実行されるコールバック関数
            // スクロール禁止を解除
            $("body").removeClass("loading__no-scroll");
            $(".loading__left-image").removeClass("is-active");
            $(".loading__right-image").removeClass("is-active");
          });

        // ローディング中はスクロール禁止
        $("body").addClass("loading__no-scroll");
      });
    }
  };

  webStorage();

  //////////////
  // topへ戻るボタン
  //////////////
  var topBtn = $(".js-page-top");
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 130) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  $(document).on("click", 'a[href*="#"]', function () {
    let time = 400;
    let header = $(".header__inner").height();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $("html,body").animate({ scrollTop: targetY }, time, "swing");
    return false;
  });

  //////////
  // ハンバーガー
  //////////
  $(function () {
    // ボタンクリックしたら
    $(".js-hamburger").click(function () {
      // アクティブクラスつけ外し
      $(this).toggleClass("active");
      // ナビ表示
      $(".sp-nav").toggleClass("active");

      // ヘッダーの色黒にする
      $(".header").toggleClass("active");
      // bodyに「.active」class付け外し　背景固定
      $("body").toggleClass("active");
    });

    // リンククリックしたら
    $(".js-header a").click(function () {
      // アクティブクラス外す
      $(".js-hamburger").removeClass("active");
      // ナビ表示
      $(".sp-nav").removeClass("active");
      // ヘッダーの色透明にする
      $(".header").removeClass("active");
      // bodyに「.active」class付け外し　背景固定解除
      $("body").removeClass("active");
    });
  });

  ////////////////
  //   ヘッダー　mv過ぎたら変色
  ////////////////

  let header = $(".header");
  let headerHeight = $(".header").height();
  let height = $(".js-mv-height").height();

  $(window).scroll(function () {
    if ($(this).scrollTop() > height - headerHeight) {
      // 指定px以上のスクロールでヘッダーを表示
      header.addClass("is-color");
    } else {
      // 画面が指定pxより上ならヘッダーを非表示
      header.removeClass("is-color");
    }
  });

  ////////////////
  //   メインビュー
  ////////////////

  let swipeOption = {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
  };
  new Swiper(".js-mv-swiper", swipeOption);

  ////////////
  // campaignスライダー
  ///////////

  let mySwiper = new Swiper(".js-campaign-swiper", {
    // オプション設定

    // PC時のみページネーション表示
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      // スライドの自動再生
      delay: 3000,
      disableOnInteraction: false,
    },

    loop: true, // スライドの無限ループ

    // スライドの表示枚数：768px未満の場合
    spaceBetween: 25,
    slidesPerView: "auto",

    breakpoints: {
      // スライドの表示枚数：768px以上の場合
      768: {
        spaceBetween: 40,
      },
    },
  });

  document.addEventListener("DOMContentLoaded", function () {
    var prevButton = document.querySelector(".swiper-button-prev");
    var nextButton = document.querySelector(".swiper-button-next");

    // prevボタンのクリックイベントを監視します
    prevButton.addEventListener("click", function () {
      // 自動再生を再開します
      mySwiper.autoplay.start();
    });
    // nextボタンのクリックイベントを監視します
    nextButton.addEventListener("click", function () {
      // 自動再生を再開します
      mySwiper.autoplay.start();
    });
  });

  /////////////
  // 画像出現アニメーション
  ////////////

  $(window).on("scroll", function () {
    // .information__imgが存在する場合のみ処理を実行
    if ($(".information__img").length > 0) {
      var windowPosition = $(window).scrollTop() + $(window).height();
      var boxPosition = $(".information__img").offset().top;
      if (windowPosition >= boxPosition) {
        $(".information__img").addClass("is-active");
      }
    }
    if ($(".voice-card__img--1").length > 0) {
      var voicePosition = $(".voice-card__img--1").offset().top;
      if (windowPosition >= voicePosition) {
        $(".voice-card__img--1").addClass("is-active");
      }
    }

    // .voice-card__img--2が存在する場合のみ処理を実行
    if ($(".voice-card__img--2").length > 0) {
      var voicePosition2 = $(".voice-card__img--2").offset().top;
      if (windowPosition >= voicePosition2) {
        $(".voice-card__img--2").addClass("is-active");
      }
    }

    // .price__imgが存在する場合のみ処理を実行
    if ($(".price__img").length > 0) {
      var pricePosition = $(".price__img").offset().top;
      if (windowPosition >= pricePosition) {
        $(".price__img").addClass("is-active");
      }
    }
  });

  // ページネーション
  // $(function () {
  //   $(".js-pagination").paginathing({
  //     //親要素のclassを記述
  //     perPage: 5, //1ページあたりの表示件数
  //     prevText: '<i class="fas fa-angle-left"></i>', //1つ前のページへ移動するボタンのテキスト
  //     nextText: '<i class="fas fa-angle-right"></i>', //1つ次のページへ移動するボタンのテキスト
  //     activeClass: "navi-active", //現在のページ番号に任意のclassを付与できます
  //     firstText: '<i class="fas fa-angle-double-left"></i>', // "最初ページ"に移動するボタンのテキスト
  //     lastText: '<i class="fas fa-angle-double-right"></i>', // "最後のページ"に移動するボタンのテキスト
  //   });
  // });

  // 要素の取得
  const tabItem = document.querySelectorAll(".tab__item");
  const tabContent = document.querySelectorAll(".tab__content");

  // tabItemに対してクリックイベントを追加
  // クリックした時にtabToggle関数を発火
  for (let i = 0; i < tabItem.length; i++) {
    tabItem[i].addEventListener("click", tabToggle);
  }

  function tabToggle() {
    // tabItemとtabContentの.activeを削除する
    for (let i = 0; i < tabItem.length; i++) {
      tabItem[i].classList.remove("active");
    }
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove("active");
    }

    // クリックしたtabItemに.activeを追加
    this.classList.add("active");

    // tabItemを配列にする
    // [<li class="tab-item active">About</li>, <li class="tab-item">Works</li>, <li class="tab-item">Contact</li>]
    const aryTabs = Array.prototype.slice.call(tabItem);

    // 配列に格納したキーワードと最初一致したインデックスを格納
    // <li class="tab-item active">About</li>の場合は「0」が返ってくる
    const index = aryTabs.indexOf(this);

    // インデックスに対応したtabContentに.activeを追加
    tabContent[index].classList.add("active");
  }

  // FAQ アコーディオン
  document.querySelectorAll(".js-accordion").forEach(function (elem) {
    elem.querySelector("p").addEventListener("click", function () {
      elem.classList.toggle("open");
    });
  });

  // about　モーダル
    // コース画像モーダル表示イベント
    $(".js-modal").click(function () {
      // まず、クリックした画像の HTML(<img>タグ全体)を#frayDisplay内にコピー
      $(".js-background").html($(this).prop("outerHTML"));
      //そして、fadeInで表示する。
      $(".js-background").fadeIn(200);
      return false;
    });
  
    // コース画像モーダル非表示イベント
    // モーダル画像背景 または 拡大画像そのものをクリックで発火
    $(".js-background").click(function () {
      // 非表示にする
      $(".js-background").fadeOut(200);
      return false;
    });


}); // 消さない
