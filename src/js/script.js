// const { compile } = require("sass");

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  ///////////
  // ローディング
  ///////////

  $('body').css('display','block');

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
  let height = $(".mv").height();

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
  ////////////

  let mySwiper = new Swiper(".js-campaign__swiper", {
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

  let prevButton = document.querySelector(".swiper-button-prev");
  let nextButton = document.querySelector(".swiper-button-next");

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

  /////////////
  // 画像出現アニメーション
  ////////////

  $(window).on("scroll", function () {
    let windowPosition = $(window).scrollTop() + $(window).height();

    let boxPosition = $(".information__img").offset().top;
    if (windowPosition >= boxPosition) {
      $(".information__img").addClass("is-active");
    }

    let voicePosition = $(".voice-card__img--1").offset().top;
    if (windowPosition >= voicePosition) {
      $(".voice-card__img--1").addClass("is-active");
    }

    let voicePosition2 = $(".voice-card__img--2").offset().top;
    if (windowPosition >= voicePosition2) {
      $(".voice-card__img--2").addClass("is-active");
    }

    let pricePosition = $(".price__img").offset().top;
    if (windowPosition >= pricePosition) {
      $(".price__img").addClass("is-active");
    }
  });
}); // 消さない
