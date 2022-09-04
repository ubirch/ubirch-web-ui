<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(false); section>
    <#if section = "header">
        ${msg("loginHeader")}
    <#elseif section = "form">
        <div id="kc-form">
            <#if realm.password>
                <form class="kc-form" id="kc-form-login" onsubmit="login.disabled = true; return true;"
                      action="${url.loginAction}" method="post">
                    <div class="${properties.kcFormGroupClass!}">
                        <label for="username"
                               class="${properties.kcLabelClass!}"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>

                        <#if usernameEditDisabled??>
                            <input class="formInput" tabindex="1" id="username" class="${properties.kcInputClass!}"
                                   name="username" value="${(login.username!'')}" type="text" disabled/>
                        <#else>
                            <input class="formInput" tabindex="1" id="username" class="${properties.kcInputClass!}"
                                   name="username" value="${(login.username!'')}" type="text" autofocus
                                   autocomplete="off"/>
                        </#if>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                        <input class="formInput" tabindex="2" id="password" class="${properties.kcInputClass!}"
                               name="password" type="password" autocomplete="off"/>
                    </div>

                    <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                        <div id="kc-form-options">
                            <#if realm.rememberMe && !usernameEditDisabled??>
                                <div class="checkbox">
                                    <label>
                                        <#if login.rememberMe??>
                                            <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"
                                                   checked> ${msg("rememberMe")}
                                        <#else>
                                            <input tabindex="3" id="rememberMe" name="rememberMe"
                                                   type="checkbox"> ${msg("rememberMe")}
                                        </#if>
                                    </label>
                                </div>
                            </#if>
                        </div>
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                            <#if realm.resetPasswordAllowed>
                                <span><a tabindex="5"
                                         href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                            </#if>
                        </div>

                    </div>

                    <div class="${properties.kcFormGroupClass!} buttonGroup">
                        <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                            <div class="${properties.kcFormOptionsWrapperClass!}">
                                <input readonly="true" onclick="document.getElementById('kc-form-login').submit();"
                                       class="registerButton ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                                       name="login" id="kc-login" value="${msg("doLogIn")}"/>
                            </div>
                        </div>

                        <#if realm.password && realm.registrationAllowed && !usernameEditDisabled??>
                            <div class="${properties.kcFormOptionsWrapperClass!}">
                                <input onclick="location.href='https://ubirch.com/de/registration-test-forms'" readonly="true"
                                       class="backToLoginButton ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                                       value="${kcSanitize(msg("goToRegister"))?no_esc}"/>

                            </div>
                        </#if>
                    </div>


                </form>
                <#if realm.password && social.providers??>
                    <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                        <#if realm.password && social.providers?? && social.providers?filter(p -> p.alias!="google")?size gt 0>
                            <div id="kc-social-providers-wrapper">
                                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                                    <#list social.providers?filter(p -> p.alias!="google") as p>
                                        <a id="social-${p.alias}"
                                           class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
                                           type="button" href="${p.loginUrl}">
                                            <#if p.iconClasses?has_content>
                                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}"
                                                   aria-hidden="true"></i>
                                                <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                                            <#else>
                                                <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                                            </#if>
                                        </a>
                                    </#list>
                                </ul>
                            </div>
                        </#if>
                        <#if realm.password && social.providers?? && social.providers?filter(p -> p.alias="google")?size gt 0>
                            <div id="ubirch-employee">
                                <#list social.providers?filter(p -> p.alias="google") as p>
                                    <a id="ubirch-employee-login"
                                       href="${p.loginUrl}">
                                        <img title="Login as UBIRCHee" src="${url.resourcesPath}/img/UBIRCH_Wort_Bildmarke_black.svg"
                                             alt="Login as UBIRCHee">
                                        ${msg("loginAsUBIRCHee")}
                                    </a>
                                </#list>
                            </div>
                        </#if>
                    </div>
                </#if>
            </#if>
        </div>

    </#if>
</@layout.registrationLayout>
