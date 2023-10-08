(function () {
  // console.log(window.Shopify)

  // is cookie set?
  const countryCOOKIE = GETcookie("user_country");
  const languageCookie = GETcookie("user_lang");
  if (!countryCOOKIE && !languageCookie) {
    localize();
  }

  function localize() {
    fetch(
      `${window.Shopify.routes.root}browsing_context_suggestions.json?country[enabled]=true&country[exclude]=${window.Shopify.country}&language[enabled]=true&language[exclude]=${window.Shopify.language}`
    )
      .then((response) => response.json())
      .then((data) => {
        const country = data.detected_values.country.handle;
        let lang;

        // Check the detected country and set the detected language accordingly
        if (country === "DE") {
          lang = "de";
        } else if (country === "LT") {
          lang = "lt";
        } else {
          lang = "en";
        }

        SETcookie("user_country", country, 14);
        SETcookie("user_lang", lang, 14);
        SUBMITlocalizationForm(country, lang);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function SUBMITlocalizationForm(country, lang) {
    const form = document.querySelector(".localization_form");
    const input_return = form.querySelector("input[name=return_to]");
    const input_country = form.querySelector("input[name=country_code]");
    const input_lang = form.querySelector("input[name=language_code]");

    form.setAttribute("action", GETformAction(GETcurrentLang()));
    input_return.value = CREATEurl(
      GETcurrentLang(),
      lang,
      window.location.href
    ).replace("https://sportokrepselis.myshopify.com", "");

    input_country.value = country;
    input_lang.value = lang;

    form.submit();

    //document.querySelector('form[action="/localization"]').submit()
  }
  function GETformAction(lang) {
    if (lang == "en") {
      return "/localization";
    } else {
      return `/${lang}/localization`;
    }
  }

  function GETcurrentLang() {
    if (window.location.href.includes(".com/de")) {
      return "de";
    } else if (window.location.href.includes(".com/lt")) {
      return "lt";
    } else if (
      !window.location.href.includes(".com/de") ||
      !window.location.href.includes(".com/lt")
    ) {
      return "en";
    }
  }
  function CREATEurl(lang_current, lang_target, url) {
    const langTarget_new = lang_target == "en" ? "" : lang_target;

    if (lang_current == "en" && langTarget_new == "") {
      //if EN
      return url;
    } else if (lang_current == "en") {
      return url.replace(".com", `.com/${langTarget_new}`);
    } else if (lang_current == "de") {
      return url.replace(".com/de", `.com/${langTarget_new}`);
    } else if (lang_current == "lt") {
      return url.replace(".com/lt", `.com/${langTarget_new}`);
    }
  }

  function SETcookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  function GETcookie(name) {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}=([^;]+)`);
    return cookieValue ? cookieValue[2] : null;
  }
  function SELECTlanguage(params) {
    // SETcookie(name, value, days)
    // SUBMITlocalizationForm(country, lang);
  }

  const langOptions_all = document.querySelectorAll(".langLink");
  const countryOptions_all = document.querySelectorAll(".countryOption");
  langOptions_all.forEach((x) =>
    x.addEventListener("click", (e) => {
      let lang_target = e.currentTarget.dataset.lang;
      SETcookie("user_lang", lang_target, 14);
      window.location.href = CREATEurl(
        GETcurrentLang(),
        lang_target,
        window.location.href
      );
    })
  );
  countryOptions_all.forEach((x) =>
    x.addEventListener("click", (e) => {
      const country = e.currentTarget.dataset.value;
      document.querySelector('input[name="country_code"]').value = country;
      document.querySelector(".localization_form").submit();
    })
  );
})();
