/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search', 'N/ui/message'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, message) => {

        const beforeLoad = (scriptContext) => {

        }

        const beforeSubmit = (scriptContext) => {
            log.debug('scriptContext.type', scriptContext.type)
            if (scriptContext.type === scriptContext.UserEventType.CREATE) {
                try {
                    const newRecord = scriptContext.newRecord;
    
                    let intForm = newRecord.getValue({
                        fieldId: 'customform',
                    });
                    log.debug('intForm', intForm)
                    let intSubsidiary = newRecord.getValue({
                        fieldId: 'subsidiary',
                    });
                    log.debug('intSubsidiary', intSubsidiary)
    
                    // DWMS - Customer Invoice && DW Morgan Services Europe Limited
                    if (intForm == 239 && intSubsidiary == 24){
                        let intCustomer = newRecord.getValue({
                            fieldId: 'entity',
                        });
        
                        if (intCustomer){
                            log.debug('intCustomer', intCustomer)
                            let objResults = {}
                            let intTransId = null
                            let arrResults = searchTranaction(intCustomer)
    
                            if (arrResults.length > 0){
                                log.debug('if')
                                objResults.prefix = arrResults[0].prefix
                                let rawTranId = arrResults[0].tranId
                                if (rawTranId.includes('INV')){
                                    log.debug('includes')
                                    objResults.tranId = '1'
                                    intTransId = objResults.prefix + objResults.tranId
                                } else {
                                    log.debug('includes else')
                                    arrDocuNumber = rawTranId.split(objResults.prefix)
                                    arrRawLastDocumentNumber = arrDocuNumber[1]

                                    let newNumber = (parseInt(arrRawLastDocumentNumber, 10) + 1);
                        
                                    objResults.tranId = newNumber;

                                    intTransId = objResults.prefix + objResults.tranId;
                                }
                            } else {
                                log.debug('else')
                                let fieldLookUp = search.lookupFields({
                                    type: 'entity',
                                    id: intCustomer,
                                    columns: 'custentity_inv_prefix'
                                });
                                if (fieldLookUp){
                                    objResults.prefix = fieldLookUp.custentity_inv_prefix
                                    objResults.tranId = '1'
                                    intTransId = objResults.prefix + objResults.tranId
                                }
                            }
                            log.debug('objResults', objResults)
    
                            log.debug('intTransId', intTransId)
    
                            newRecord.setValue({
                                fieldId: 'tranid',
                                value: intTransId
                            });
                        }
                    }
    
                } catch (error) {
                    log.error('beforeSubmit', error.message)
                }
            };
        }

        // Private Function
        const searchTranaction = (intCustomer) => {
            let arrResults = []
            let objResults = {}
            const invoiceSearch = search.create({
                type: search.Type.INVOICE,
                filters: [
                    ['type', 'anyof', 'CustInvc'],
                    'AND',
                    ['subsidiary', 'anyof', '24'],
                    'AND',
                    ['customer.internalid', 'anyof', intCustomer],
                ],
                columns: [
                    search.createColumn({ name: 'tranid'}),
                    search.createColumn({ name: 'custentity_inv_prefix', join: 'customer' }),
                    search.createColumn({ name: 'internalid', sort: search.Sort.DESC }),
                ]
            });
            const result = invoiceSearch.run().getRange({ start: 0, end: 1 });

            if (result.length > 0) {
                objResults.tranId = result[0].getValue('tranid');
                objResults.prefix = result[0].getValue({ name: 'custentity_inv_prefix', join: 'customer' });
                arrResults.push(objResults)
            }

            log.debug('arrResults', arrResults)

            return arrResults
        }


        return {beforeLoad, beforeSubmit}

    });
