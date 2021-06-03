<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??); section>
    <#if section = "header">
        ${msg("doLogIn")}
    <#elseif section = "form">
    <div id="kc-form" <#if social.providers??>class="${properties.kcContentWrapperClass!}"</#if>>
        <#if social.providers??>
            <div id="kc-social-providers" class="">
                <select id="socialSelect">
                    <#list social.providers as p>
                            <option value="${p.loginUrl}">
                                ${p.alias}
                            </option>
                    </#list>
                    <input id="loginButton" type="button" onclick="location = getSocialUrl()" value="LOGIN">
                </select>
            </div>
        </#if>
      </div>
   </#if>

</@layout.registrationLayout>

<script>
    function getSocialUrl() {
        return this.document.getElementById('socialSelect').value
    }
</script>
