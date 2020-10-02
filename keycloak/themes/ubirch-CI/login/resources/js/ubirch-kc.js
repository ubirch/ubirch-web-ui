queryParamsFromUrl = {
    account_plan: "free",
    account_type: "free",
};

ubirchParamSets = {
    free: {
        free: {
            personality_check_required: "false",
            personality_checked: "false",
            personality_check_failed: "false"
        }
    },
    pro: {
        verifier: {
            personality_check_required: "true",
            personality_checked: "false",
            personality_check_failed: "false"
        },
        anchorer: {
            personality_check_required: "true",
            personality_checked: "false",
            personality_check_failed: "false"
        }
    }
};


document.addEventListener("DOMContentLoaded", function() {
    query = getFormParamsFromUrl();
    setDataIntoForm(query);
});

/**
 * get params of form fields as string from fragment OR - if no fragment set - from query of url
 * @param windowRef Reference to window
 */
function getFormParamsFromUrl() {
    const query = window.location.search;
    if (query.length > 0) {
        return query.substr(1);
    }

    return undefined;
}

/**
 * put params into form fields
 * @param dataP string that contains field params in a form like:
 *    pid=9ceb5551-d006-4648-8cf7-c7b1a1ddccb1&tid=FGXC-CL11-KDKC-P9XC-74MM&td=2020-06-12&tt=11:00:00&tr=negativ
 */
function setDataIntoForm(dataP) {
    const separator = '&';
    const allParams = dataP.split(separator).map((value) => {
        const data = value.split('=');
        return {
            key: data[0],
            value: decodeURIComponent(data[1])
        };
    });
    allParams.forEach(param => {
        if (queryParamsFromUrl[param.key] !== undefined) {
            queryParamsFromUrl[param.key] = param.value;
        }
    });
    let selectedAccountType = ubirchParamSets[queryParamsFromUrl.account_plan][queryParamsFromUrl.account_type];
    if (!selectedAccountType) {
        console.warn("Wrong or missing query parameters for account_plan and account_type. Existing: free-free, pro-verifier, pro-anchorer");
        selectedAccountType = ubirchParamSets.free.free;
    }

    setInput("account_plan", queryParamsFromUrl.account_plan);
    setInput("account_type", queryParamsFromUrl.account_type);

    setInput("personality_check_required", selectedAccountType.personality_check_required);
    setInput("personality_checked", selectedAccountType.personality_checked);
    setInput("personality_check_failed", selectedAccountType.personality_check_failed);
}

function setInput(key, value) {
    const elementKey = "user.attributes." + key;
    if (value && document.getElementById(elementKey) && document.getElementById(elementKey) !== null) {
        document.getElementById(elementKey).value = value;
    } else {
        console.warn("missing element with id " + elementKey);
    }
}
