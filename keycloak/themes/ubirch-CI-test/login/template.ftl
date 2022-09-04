<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayWide=false>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <script type="text/javascript" src="${url.resourcesPath}/js/ubirch-kc.js"></script>
</head>

<body class="">
<div class="navbar-fixed">
    <nav class="navElement">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="nav-wrapper">
                        <a class="logo" href="https://ubirch.de">
                            <img src="${url.resourcesPath}/img/Ubirch_Logo_weiss.svg" alt="logo"></a>
                        <ul class="mainnav">
                            <li><a href="https://ubirch.de/unternehmen" title="Unternehmen">${msg("companyStr")}</a></li>
                            <li>
                                <#if (client.baseUrl)?has_content>
                                  <a href="${client.baseUrl}" title="Console">${msg("Console")}</a>
                                <#elseif pageRedirectUri?has_content>
                                  <a href="${pageRedirectUri}" title="Console">${msg("Console")}</a>
                                <#else>
                                  <a href="https://console.prod.ubirch.com" title="Console">${msg("Console")}</a>
                                </#if>
                            </li>
                            <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
                            <li class="noborder"><img class="langmenue" src="${url.resourcesPath}/img/Weltkugel_weiss.svg"
                                                      alt="language">
                                <div class="langwrap">
                                    <div class="arrowup"></div>
                                    <div class="langmenuebox">
                                      <span class="active"><a href="#">${locale.current}</a></span>
                                        <#list locale.supported as l>
                                          <#if l.label != locale.current>
                                          |<span><a href="${l.url}">${l.label}</a></span>
                                          </#if>
                                        </#list>
                                    </div>
                                </div>
                            </li>
                            </#if>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </nav>
</div>

  <div class="login-pf-page">
      <div id="form-col">
          <div id="kc-content">
            <div id="kc-content-wrapper">

                <div>
                    <h1 id="kc-page-title"><#nested "header"></h1>
                </div>

              <#-- App-initiated actions should not see warning messages about the need to complete the action -->
              <#-- during login.                                                                               -->
              <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                  <div class="alert alert-${message.type}">
                      <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                      <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                      <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                      <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                      <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
                  </div>
              </#if>

              <#nested "form">

              <#if displayInfo>
                  <div id="kc-info" class="${properties.kcSignUpClass!}">
                      <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                          <#nested "info">
                      </div>
                  </div>
              </#if>
            </div>
          </div>
      </div>
  </div>
</body>
</html>
</#macro>
