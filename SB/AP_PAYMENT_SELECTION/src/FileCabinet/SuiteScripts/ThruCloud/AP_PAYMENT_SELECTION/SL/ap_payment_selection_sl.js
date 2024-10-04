/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(["N/url", "N/redirect", "../Library/slpaymentlibrary.js", "../Library/slmapping.js"],

    (url, redirect, slPaymentlibrary, slMapping) => {

        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                objForm = slPaymentlibrary.FORM.buildForm({
                    title: slMapping.SUITELET.form.title,
                    dataParam: scriptContext.request.parameters.data
                });
                scriptContext.response.writePage(objForm);
            }
        }

        return {onRequest}

    });
