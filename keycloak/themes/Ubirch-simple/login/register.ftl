<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        ${msg("registerTitle")}
    <#elseif section = "form">
        <div id="kc-form">
            <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}"
                  method="post">
                <#if realm.registrationEmailAsUsername>
                    <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text" id="firstName" name="firstName" value="-" hidden/>
                    <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text" id="lastName" name="lastName" value="-" hidden/>
                <#else>
                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('firstName',properties.kcFormGroupErrorClass!)}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName"
                                   value="${(register.formData.firstName!'')}"/>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('lastName',properties.kcFormGroupErrorClass!)}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName"
                                   value="${(register.formData.lastName!'')}"/>
                        </div>
                    </div>
                </#if>

                <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text" id="email" class="${properties.kcInputClass!}" name="email"
                               value="${(register.formData.email!'')}" autocomplete="email"/>
                    </div>
                </div>

                <#if !realm.registrationEmailAsUsername>
                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('username',properties.kcFormGroupErrorClass!)}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text" id="username" class="${properties.kcInputClass!}" name="username"
                                   value="${(register.formData.username!'')}" autocomplete="username"/>
                        </div>
                    </div>
                </#if>

                <#if passwordRequired>
                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password',properties.kcFormGroupErrorClass!)}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="password" id="password" class="${properties.kcInputClass!}" name="password"
                                   autocomplete="new-password"/>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password-confirm',properties.kcFormGroupErrorClass!)}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="password-confirm"
                                   class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="password" id="password-confirm" class="${properties.kcInputClass!}"
                                   name="password-confirm"/>
                        </div>
                    </div>
                </#if>

                <#if recaptchaRequired??>
                    <div class="form-group">
                        <div class="${properties.kcInputWrapperClass!}">
                            <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                        </div>
                    </div>
                </#if>

                <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('account_plan',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="user.attributes.account_plan"
                               class="${properties.kcLabelClass!}">${msg("accountPlan")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <select
                                class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                id="user.attributes.account_plan"
                                class="${properties.kcInputClass!}"
                                name="user.attributes.account_plan"
                                value="${(register.formData['user.attributes.account_plan']!'')}"
                        >
                            <option value="free" selected>${msg("freeAccount")}</option>
                            <option value="pro">${msg("proAccount")}</option>
                        </select>
                    </div>
                </div>

                <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('account_type',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="user.attributes.account_type"
                               class="${properties.kcLabelClass!}">${msg("accountType")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <select
                                class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                id="user.attributes.account_type"
                                class="${properties.kcInputClass!}"
                                name="user.attributes.account_type"
                                value="${(register.formData['user.attributes.account_type']!'')}"
                        >
                            <option value="free">${msg("freeAccount")}</option>
                            <option value="verifier">${msg("proAccountForVerifier")}</option>
                            <option value="anchorer">${msg("proAccountForAnchorer")}</option>
                        </select>
                    </div>
                </div>

                <div class="${properties.kcFormGroupClass!}">
                    <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                            <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                        </div>
                    </div>

                    <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                               type="submit" value="${msg("doRegister")}"/>
                    </div>
                </div>
            </form>
        </div>
    </#if>
</@layout.registrationLayout>
