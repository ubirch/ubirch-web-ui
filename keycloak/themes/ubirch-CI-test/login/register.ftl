<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        ${msg("registerHeader")}
        <p class="subHeader">${msg("registerSubheader")}</p>
        <div class="modalButton">
            <a href="#open-modal">i</a>
        </div>

        <div id="open-modal" class="modal-window">
            <div>
                <a href="#" title="Close" class="modal-close">Close</a>
                <h3>${msg("registerDisclaimerHeader")}</h3>
                <p>
                    ${msg("registerDisclaimer")}
                </p>
            </div>
        </div>
    <#elseif section = "form">
        <div id="kc-form">
            <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}"
                  method="post">
                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('firstName',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text"
                               id="firstName" class="${properties.kcInputClass!}" name="firstName"
                               value="${(register.formData.firstName!'')}"/>
                    </div>
                </div>

                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('lastName',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text"
                               id="lastName" class="${properties.kcInputClass!}" name="lastName"
                               value="${(register.formData.lastName!'')}"/>
                    </div>
                </div>


                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}" type="text"
                               id="email" class="${properties.kcInputClass!}" name="email"
                               value="${(register.formData.email!'')}" autocomplete="email"/>
                    </div>
                </div>

                <#if !realm.registrationEmailAsUsername>
                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('username',properties.kcFormGroupErrorClass!)}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                   type="text" id="username" class="${properties.kcInputClass!}" name="username"
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
                            <input class="formInput"
                                   type="password" id="password" class="${properties.kcInputClass!}" name="password"
                                   autocomplete="new-password"/>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password-confirm',properties.kcFormGroupErrorClass!)}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="password-confirm"
                                   class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input class="formInput"
                                   type="password" id="password-confirm" class="${properties.kcInputClass!}"
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

                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('account_plan',properties.kcFormGroupErrorClass!)}">
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
                            <option value="private" selected>${msg("freeAccount")}</option>
                            <option value="company">${msg("proAccount")}</option>
                        </select>
                    </div>
                </div>

                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('company_name',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="user.attributes.account_plan"
                               class="${properties.kcLabelClass!}">${msg("company_name")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input
                                class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                id="user.attributes.company_name"
                                class="${properties.kcInputClass!}"
                                name="user.attributes.company_name"
                                value="${(register.formData['user.attributes.company_name']!'')}"
                        >
                    </div>
                </div>

                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('phone',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="user.attributes.phone"
                               class="${properties.kcLabelClass!}">${msg("phone")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input
                                class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                id="user.attributes.phone"
                                class="${properties.kcInputClass!}"
                                name="user.attributes.phone"
                                value="${(register.formData['user.attributes.phone']!'')}"
                        >
                    </div>
                </div>

                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('add_info',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="user.attributes.add_info"
                               class="${properties.kcLabelClass!}">${msg("add_info")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input
                                class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                id="user.attributes.add_info"
                                class="${properties.kcInputClass!}"
                                name="user.attributes.add_info"
                                value="${(register.formData['user.attributes.add_info']!'')}"
                        >
                    </div>
                </div>

                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('agb_version',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="user.attributes.agb_version"
                               class="${properties.kcLabelClass!}">${msg("agb_version")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input
                                class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                id="user.attributes.agb_version"
                                class="${properties.kcInputClass!}"
                                name="user.attributes.agb_version"
                                value="${(register.formData['user.attributes.agb_version']!'')}"
                        >
                    </div>
                </div>

                <div hidden class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('dpa_version',properties.kcFormGroupErrorClass!)}">
                    <div class="${properties.kcLabelWrapperClass!}">
                        <label for="user.attributes.dpa_version"
                               class="${properties.kcLabelClass!}">${msg("dpa_version")}</label>
                    </div>
                    <div class="${properties.kcInputWrapperClass!}">
                        <input
                                class="${properties.bottomBorderOnly!} ${properties.hoverBottomBorderOnly!}"
                                id="user.attributes.dpa_version"
                                class="${properties.kcInputClass!}"
                                name="user.attributes.dpa_version"
                                value="${(register.formData['user.attributes.dpa_version']!'')}"
                        >
                    </div>
                </div>


                <div class="${properties.kcFormGroupClass!} buttonGroup">
                    <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                            <input readonly="true" class="registerButton ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                                   onclick="document.getElementById('kc-register-form').submit();" value="${msg("doRegister")}"/>
                        </div>
                    </div>

                    <div id="kc-form-options" class="${properties.kcFormOptionsClass!} backToLogin">
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                                <input readonly="true" onclick="location.href='${url.loginUrl}';" class="backToLoginButton ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                                       value="${kcSanitize(msg("backToLogin"))?no_esc}"/>

                        </div>
                    </div>
                </div>
            </form>
        </div>
        <script>

        </script>
    </#if>
</@layout.registrationLayout>
