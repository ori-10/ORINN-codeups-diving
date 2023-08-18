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

  //////////
  // ページネーション
  //////////
  $(function () {
    // ページネーション（ブログ一覧）
    if ($("#contents").length > 0) {
      $("#contents").paginathing({
        limitPagination: 6,
        pageNumbers: true,
        perPage: 10,
        firstLast: false,
        pageNumbers: false,
        prevText: "",
        nextText: "",
        activeClass: "active",
      });
    }

    // ページネーション（ブログ記事ページ）
    if ($("#single-contents").length > 0) {
      $("#single-contents").paginathing({
        perPage: 1,
        firstLast: false,
        prevText: "",
        nextText: "",
        pageNumbers: false,
        showPageNumbers: false,
        hidePageNumbers: true,
        activeClass: "active",
      });
    }

    // ページネーション（campaign）
    if ($("#campaign-contents").length > 0) {
      $("#campaign-contents").paginathing({
        limitPagination: 6,
        pageNumbers: true,
        perPage: 4,
        firstLast: false,
        pageNumbers: false,
        prevText: "",
        nextText: "",
        activeClass: "active",
      });
    }

    // ここに他の処理を追加する（必要に応じて）
  });

  ///////////
  // campaign
  // 他ページから遷移時、該当タブが選択されている状態
  ///////////

  // $(function () {
  //   // タブ切り替え処理
  //   function switchTab(tabId) {
  //     $(".tab__content").hide();
  //     $("#" + tabId).fadeIn();
  //     $(".js-campaign-tab li").removeClass("active");
  //     $(".js-campaign-tab li a[href='#" + tabId + "']")
  //       .parent()
  //       .addClass("active");
  //   }

  //   // タブがクリックされたときの処理
  //   $(".js-campaign-tab li").click(function () {
  //     var tabId = $(this).find("a").attr("href").substring(1);
  //     switchTab(tabId);
  //   });

  //   // URLのハッシュ部分を取得
  //   var hash = location.hash;
  //   // もしハッシュ部分がある場合
  //   if (hash.length) {
  //     var tabId = hash.substring(1);
  //     switchTab(tabId);
  //   } else {
  //     // ページ開いた時 初めの状態
  //     switchTab(
  //       $(".js-campaign-tab li:first-child a").attr("href").substring(1)
  //     );
  //   }

  //   // 同ページのリンククリック処理
  //   $(".js-link-tab a").click(function () {
  //     var targetTab = $(this).attr("href").substring(1);
  //     switchTab(targetTab);

  //     // リンクをクリックしてスクロール
  //     var scrollAmount = $("#sub-campaign").offset().top - 100;
  //     $("html, body").animate(
  //       {
  //         scrollTop: scrollAmount,
  //       },
  //       800
  //     );
  //     return false; // リンクのデフォルト動作をキャンセル
  //   });
  // });

  $(function () {
    // タブ切り替え処理
    function switchTab(tabId) {
      $(".tab__content").hide();
      $("#" + tabId).fadeIn();
      $(".js-campaign-tab li").removeClass("active");
      $(".js-campaign-tab li a[href='#" + tabId + "']").parent().addClass("active");
    }
  
    // タブがクリックされたときの処理
    $(".js-campaign-tab li").click(function () {
      var tabId = $(this).find("a").attr("href").substring(1);
      switchTab(tabId);
    });
  
    // URLのハッシュ部分を取得
    var hash = location.hash;
    // もしハッシュ部分がある場合
    if (hash.length) {
      var tabId = hash.substring(1);
      switchTab(tabId);
    } else {
      // ページ開いた時 初めの状態
      var firstTabLink = $(".js-campaign-tab li:first-child a");
      if (firstTabLink.length > 0) {
        switchTab(firstTabLink.attr("href").substring(1));
      }
    }
  
    // 同ページのリンククリック処理
    $(".js-link-tab a").click(function () {
      var targetTab = $(this).attr("href").substring(1);
      switchTab(targetTab);
  
      // リンクをクリックしてスクロール
      var scrollAmount = $("#sub-campaign").offset().top - 100;
      $("html, body").animate({
        scrollTop: scrollAmount
      }, 800);
      return false; // リンクのデフォルト動作をキャンセル
    });
  });

  ////////////
  // price
  // 他ページから遷移時、リンクを押すと該当箇所にスクロール
  ////////////

  $(document).ready(function () {
    var hash = window.location.hash; // 現在のURLのハッシュ部分を取得
    if (hash) {
      var targetElement = $(hash); // ハッシュに対応する要素を取得
      if (targetElement.length > 0) {
        var targetOffset = targetElement.offset().top; // ハッシュに対応する要素の位置

        // スクロール実行
        $("html, body").animate(
          {
            scrollTop: targetOffset - (headerHeight + 10),
          },
          800
        );
      }
    }
  });

  ///////////
  // FAQ アコーディオン
  ///////////
  document.querySelectorAll(".js-accordion").forEach(function (elem) {
    elem.addEventListener("click", function () {
      elem.classList.toggle("open");
    });
  });

  ///////////
  // サイドバー アコーディオン
  ///////////
  function toggleAccordion(accordionElement) {
    var findElm = accordionElement
      .closest(".aside-archive__items")
      .find(".aside-archive__item");
    $(findElm).slideToggle();

    if (accordionElement.hasClass("close")) {
      accordionElement.removeClass("close");
    } else {
      accordionElement.addClass("close");
    }
  }

  $(document).ready(function () {
    $(".js-archive-accordion.open").each(function () {
      toggleAccordion($(this));
    });

    $(".js-archive-accordion").on("click", function () {
      toggleAccordion($(this));
    });
  });

  ////////////
  // about　モーダル
  ////////////
  // コース画像モーダル表示イベント
  $(".js-modal").click(function () {
    // まず、クリックした画像の HTML(<img>タグ全体)を#frayDisplay内にコピー
    $(".js-background").html($(this).prop("outerHTML"));
    //そして、fadeInで表示する。
    $(".js-background").fadeIn(200);
    $("body").addClass("loading__no-scroll");
    return false;
  });

  // コース画像モーダル非表示イベント
  // モーダル画像背景 または 拡大画像そのものをクリックで発火
  $(".js-background").click(function () {
    // 非表示にする
    $(".js-background").fadeOut(200);
    $("body").removeClass("loading__no-scroll");
    return false;
  });

  ////////////
  // コンタクト 未入力エラー
  ////////////

  $(document).ready(function () {
    $(".js-submit").on("click", function (event) {
      var form = document.getElementById("form");
      var requiredElements = form.querySelectorAll("[required]");
      var hasRequiredFields = false;
      var inquiryCheckboxes = form.querySelectorAll(
        'input[name="お問合せ項目"]'
      );

      // 必須項目のクラスとチェックボックスの選択状態をチェック
      requiredElements.forEach(function (element) {
        if (element.type === "checkbox") {
          if (!element.checked) {
            element.classList.add("required");
            hasRequiredFields = true;
          } else {
            element.classList.remove("required");
          }
        } else {
          if (element.value.trim() === "") {
            element.classList.add("required");
            hasRequiredFields = true;
          } else {
            element.classList.remove("required");
          }
        }
      });

      // チェックボックスの選択状態をチェック
      var isAnyCheckboxSelected = false;
      inquiryCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          isAnyCheckboxSelected = true;
        }
      });

      // チェックボックスの選択状態に応じて.requiredクラスを制御
      inquiryCheckboxes.forEach(function (checkbox) {
        if (!isAnyCheckboxSelected) {
          checkbox.classList.add("required");
          hasRequiredFields = true;
        } else {
          checkbox.classList.remove("required");
        }
      });

      // .requiredが一つでもあるかをチェック
      var hasAnyRequiredField = form.querySelector(".required") !== null;

      // .sub-contact__errorの表示制御
      var errorElement = $(".sub-contact__error");
      errorElement.toggleClass("active", hasAnyRequiredField);

      // .breadcrumb__item--errorの表示制御
      var breadcrumbErrorElement = $(".breadcrumb__item--error");
      breadcrumbErrorElement.toggleClass("active", hasAnyRequiredField);

      if (hasAnyRequiredField) {
        event.preventDefault(); // バリデーションエラー時はデフォルトの送信を阻止
      } else {
        // 未入力項目がない場合の処理
        window.location.href = "page-thanks.html"; // ページ遷移
      }
    });
  });
});
// 消さない
