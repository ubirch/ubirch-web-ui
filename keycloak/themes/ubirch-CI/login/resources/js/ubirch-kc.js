queryParamsFromUrl = {
    account_plan: "private",
    account_type: "private",
};

valid_values = {
    account_plan: {
        private: {
            account_type: { private: "private"}},
        company: {
            account_type: { verifier: "verifier", anchorer: "anchorer"}}}
};

allowed_characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%"

document.addEventListener("DOMContentLoaded", function() {
    setDataIntoForm();
});
/**
 * get params of form fields as string from query of url and split them into params
 */
function getFormParamsFromUrl() {

    const query = window.location.search;

    if (query.length > 0) {
        const separator = '&';
        const allParams = query.substr(1).split(separator).map((value) => {
            const data = value.split('=');
            return {
                key: data[0],
                value: decodeURIComponent(data[1])
            };
        });
        return allParams;
    }

    return undefined;
}

function checkParamsWithDefaults(appParams) {

    appParams.forEach(param => {
        if (queryParamsFromUrl[param.key] !== undefined) {
            queryParamsFromUrl[param.key] = param.value;
        }
    });

    let accountPlan = valid_values.account_plan[queryParamsFromUrl.account_plan];
    if (!accountPlan) {
        queryParamsFromUrl.account_plan = "free";
        accountPlan = valid_values.account_plan.free;
    }
    if (!accountPlan.account_type[queryParamsFromUrl.account_type]) {
        queryParamsFromUrl.account_type = Object.keys(accountPlan.account_type)[0];
    }

}

/**
 * put params into form fields
 */
function setDataIntoForm() {

    const allParams = getFormParamsFromUrl();

    checkParamsWithDefaults(allParams);



    setInput("account_plan", queryParamsFromUrl.account_plan);
    setInput("account_type", queryParamsFromUrl.account_type);
    setInput("firstName", allParams.find(param => param.key === "first_name")?.value);
    setInput("lastName", allParams.find(param => param.key === "last_name")?.value);
    setInput("email", allParams.find(param => param.key === "email")?.value);
    setInput("company_name", allParams.find(param => param.key === "company_name")?.value);
    setInput("phone", allParams.find(param => param.key === "phone")?.value);
    setInput("add_info", allParams.find(param => param.key === "add_info")?.value);
    setInput("agb_version", allParams.find(param => param.key === "agb_version")?.value);
    setInput("dpa_version", allParams.find(param => param.key === "dpa_version")?.value);


}

function setInput(key, value) {
    value = sanitizeInput(value);

    const elementKey = "user.attributes." + key;
    const defaultKey = key;

    const element = document.getElementById(elementKey);
    const defaultElement = document.getElementById(defaultKey);

    if (value && element) {
        document.getElementById(elementKey).value = value;
    } else
    if (value && defaultElement) {
        document.getElementById(defaultKey).value = value;
    } else
    {
        console.warn("missing element with id " + elementKey);
    }
}

function sanitizeInput(value){
    // remove all characters that are not part of allowed_characters
    value = String(value).replace(/[<>`"{}]/g, "");
    console.log(value);
    return value;
}
