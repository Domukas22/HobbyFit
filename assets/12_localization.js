(function () {
  // console.log(window.Shopify)

  // is cookie set?
  const cookie_country = get_cookie("user_country");
  const cookie_lang = get_cookie("user_lang");
  if (!cookie_country && !cookie_lang) {
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

        set_cookie("user_country", country, 14);
        set_cookie("user_lang", lang, 14);
        submit_localizationForm(country, lang);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function submit_localizationForm(country, lang) {
    const form = document.querySelector(".localization_form");
    const input_return = form.querySelector("input[name=return_to]");
    const input_country = form.querySelector("input[name=country_code]");
    const input_lang = form.querySelector("input[name=language_code]");

    form.setAttribute("action", get_formAction(get_lang()));
    input_return.value = create_langUrl(
      get_lang(),
      lang,
      window.location.href
    ).replace("https://sportokrepselis.myshopify.com", "");

    console.log(input_return.value);

    input_country.value = country;
    input_lang.value = lang;

    console.log(form);
    form.submit();

    //document.querySelector('form[action="/localization"]').submit()
  }
  function get_formAction(lang) {
    if (lang == "en") {
      return "/localization";
    } else {
      return `/${lang}/localization`;
    }
  }

  function set_cookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  function get_cookie(name) {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}=([^;]+)`);
    return cookieValue ? cookieValue[2] : null;
  }
  function get_lang() {
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
  function create_langUrl(lang_current, lang_target, url) {
    const langTarget_new = lang_target == "en" ? "" : lang_target;

    console.log(lang_current);
    console.log(langTarget_new);
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

  const langOptions_all = document.querySelectorAll(".langLink");
  const countryOptions_all = document.querySelectorAll(".countryOption");
  langOptions_all.forEach((x) =>
    x.addEventListener("click", (e) => {
      let lang_target = e.currentTarget.dataset.lang;
      set_cookie("user_lang", lang_target, 14);
      window.location.href = create_langUrl(
        get_lang(),
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
