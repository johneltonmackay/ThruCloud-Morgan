/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search', 'N/error'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search, error) => {
        
        const beforeSubmit = (scriptContext) => {
            var invFlexshipRecord = scriptContext.newRecord;
            if (
                scriptContext.type === scriptContext.UserEventType.CREATE ||
                scriptContext.type === scriptContext.UserEventType.COPY ||
                scriptContext.type === scriptContext.UserEventType.TRANSFORM
            ) {
                var strTrackingNumber = invFlexshipRecord.getValue({
                    fieldId: "custbody_tracking_number",
                });
                let arrTrackingNumber = searchTrackingNumber(strTrackingNumber);
                if (arrTrackingNumber.length > 0) {
                    let objErrorMsg = {
                        recId: arrTrackingNumber[0].recId,
                        recHAWB: arrTrackingNumber[0].recTrackingNumber,
                    };
                    let errorMessage =
                        "HAWB: " +
                        objErrorMsg.recHAWB +
                        " is already used by Shipment Record: " +
                        objErrorMsg.recId;
                    let myCustomError = error.create({
                        name: "HAWB Validator",
                        message:
                            "Shipment Record Creation Failed due to errors. Error Messages: " +
                            errorMessage,
                    });
                    log.error("beforeSubmit_sr_to_inv_default_item error", myCustomError.message);
                    throw myCustomError.message;
                }    
            }
        };
        
        
        

        // Private Function

        const searchTrackingNumber = (strTrackingNumber) => {
            let arrTransaction = [];
            try {
                let objTransactionSearch = search.create({
                    type: 'transaction',
                    filters: [
                        ['type', 'anyof', 'SalesOrd'],
                        'AND',
                        ['custbody_tracking_number', 'is', strTrackingNumber],
                        'AND',
                        ['mainline', 'is', 'T'],
                      ],
                    columns: [
                        search.createColumn({ name: 'tranid' }),
                        search.createColumn({ name: 'custbody_tracking_number' })
                    ],
    
                });
                var searchResultCount = objTransactionSearch.runPaged().count;
                if (searchResultCount != 0) {
                    var pagedData = objTransactionSearch.runPaged({pageSize: 1000});
                    for (var i = 0; i < pagedData.pageRanges.length; i++) {
                        var currentPage = pagedData.fetch(i);
                        var pageData = currentPage.data;
                        if (pageData.length > 0) {
                            for (var pageResultIndex = 0; pageResultIndex < pageData.length; pageResultIndex++) {
                                var recId = pageData[pageResultIndex].getValue({name: 'tranid'});
                                var recTrackingNumber = pageData[pageResultIndex].getValue({ name: 'custbody_tracking_number'});
                                
                                // Check if record already exists in arrTransaction
                                var existingIndex = arrTransaction.findIndex(item => item.recId === recId);
                                if (existingIndex == -1) {
                                    // If doesn't exist, push to array
                                    arrTransaction.push({
                                        recId: recId,
                                        recTrackingNumber: recTrackingNumber,
                                    });
                                }
                            }
                        }
                    }
                }
                log.debug(`beforeSubmit_sr_to_inv_default_item: arrTransaction ${Object.keys(arrTransaction).length}`, arrTransaction);
                return arrTransaction;
            } catch (err) {
                log.error('beforeSubmit_sr_to_inv_default_item error', err.message);
            }
        }


        return {beforeSubmit}

    });
