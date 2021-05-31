queryParamsFromUrl = {
    account_plan: "free",
    account_type: "free",
};

valid_values = {
    account_plan: {
        free: {
            account_type: { free: "free"}},
        pro: {
            account_type: { verifier: "verifier", anchorer: "anchorer"}}}
};

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
}

function setInput(key, value) {
    const elementKey = "user.attributes." + key;
    if (value && document.getElementById(elementKey) && document.getElementById(elementKey) !== null) {
        document.getElementById(elementKey).value = value;
    } else {
        console.warn("missing element with id " + elementKey);
    }
}
