/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/message', 'N/search', 'N/currentRecord', 'N/format', '../Library/slmapping.js', 'N/url', 'N/runtime', 'N/record'],

    function (message, search, currentRecord, format, slMapping, url, runtime, record) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {
            try {
                console.log('Page Fully Loaded.');
                const currRecObj = currentRecord.get();
                let currentUser = runtime.getCurrentUser();
                let arrChkBoxFields = ['custpage_this_week', 'custpage_next_week', 'custpage_approveforpayment']

                let urlParams = new URLSearchParams(window.location.search);
                let dataParam = urlParams.get('data');
                let arrjsonData = JSON.parse(dataParam);
                console.log('arrjsonData', arrjsonData);
                if (arrjsonData) {
                    if (arrjsonData.action == 'fieldChanged'){
                        showMessage()
                    }
                    if (arrjsonData.entity){
                        currRecObj.setValue({
                            fieldId : 'custpage_form_entity',
                            value: arrjsonData.entity,
                            ignoreFieldChange: true,
                            fireSlavingSync: true
                        })
                    }
                    if (arrjsonData.vendor){
                        currRecObj.setValue({
                            fieldId : 'custpage_vendors_body',
                            value: arrjsonData.vendor,
                            ignoreFieldChange: true,
                            fireSlavingSync: true
                        })
                    }

                    var numLines = currRecObj.getLineCount({
                        sublistId: 'custpage_sublist',
                    });
                    for(var x = 0; x < numLines; x++){
                        let styleField = currRecObj.getSublistValue({
                            sublistId: 'custpage_sublist',
                            fieldId: 'custpage_style_on',
                            line: x
                        });
                        if (styleField == '<b>true</b>'){
                            arrChkBoxFields.forEach(fieldId => {
                                let chkBoxField = currRecObj.getSublistField({
                                    sublistId: 'custpage_sublist',
                                    fieldId: fieldId,
                                    line: x
                                });
                                chkBoxField.isDisabled = true;
                            });
                        } 
                    }

                } else {
                    showMessage()

                    let strEntity = currRecObj.getValue({
                        fieldId : 'custpage_form_entity'
                    })
    
                    let objParam = {
                        entity : strEntity,
                        user : currentUser.id
                    }
    
                    redirectUser(objParam)
                }
            } catch (error) {
                console.log('Error: pageInit', error.message);
            }
        }
        

        function fieldChanged(scriptContext) {
            try {
                console.log('fieldId', scriptContext.fieldId)
                const currRecObj = currentRecord.get();
                const currRec = scriptContext.currentRecord;

                let currentUser = runtime.getCurrentUser();
                
                if (scriptContext.fieldId == 'custpage_form_entity'){
                    let strEntity = currRecObj.getValue({
                        fieldId : 'custpage_form_entity'
                    })

                    let objParam = {
                        entity : strEntity,
                        user : currentUser.id,
                        action : 'fieldChanged'
                    }
            
                    redirectUser(objParam)
                }

                if (scriptContext.fieldId == 'custpage_vendors_body'){

                    let arrVendor = currRecObj.getValue({
                        fieldId : 'custpage_vendors_body'
                    })

                    let strEntity = currRecObj.getValue({
                        fieldId : 'custpage_form_entity'
                    })

                    let objParam = {
                        entity : strEntity,
                        user : currentUser.id,
                        vendor : arrVendor,
                        action : 'fieldChanged'
                    }
            
                    redirectUser(objParam)
                }

                if (scriptContext.fieldId == 'custpage_next_week'){
                    let intAmount = ""
                    let data = {}
                    let blnValue = false

                    let chkBoxFieldValue = currRec.getCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: scriptContext.fieldId,
                    });

                    if (!chkBoxFieldValue){
                        blnValue = true
                    } 

                    currRec.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_this_week',
                        value: blnValue,
                        ignoreFieldChange: true,
                        fireSlavingSync: true
                    });

                    console.log('blnValue', blnValue)
                    if (chkBoxFieldValue || blnValue){
                        let recType =  currRecObj.getSublistValue({
                            sublistId:  'custpage_sublist',
                            fieldId: 'custpage_rec_type',
                            line: scriptContext.line
                        });
                        console.log('recType', recType)

                        if (blnValue){
                            intAmount =  currRecObj.getSublistValue({
                                sublistId:  'custpage_sublist',
                                fieldId: 'custpage_amount_head',
                                line: scriptContext.line
                            });

                            data = {
                                custbody_next_week_amount: null,
                                custbody_next_week: false,
                                custbody_this_week: true, 
                                custbody_this_week_amount: parseFloat(intAmount.replace(/,/g, ''))
                            }

                        } else {
                            intAmount =  currRecObj.getSublistValue({
                                sublistId:  'custpage_sublist',
                                fieldId: 'custpage_amount_head',
                                line: scriptContext.line
                            });

                            data = {
                                custbody_next_week_amount: parseFloat(intAmount.replace(/,/g, '')),
                                custbody_next_week: true,
                                custbody_this_week: false, 
                                custbody_this_week_amount: null
                            }
                        }
                        console.log('intAmount', intAmount)
                        console.log('data', data)
                        intRecId =  currRecObj.getSublistValue({
                            sublistId:  'custpage_sublist',
                            fieldId: 'custpage_id_head',
                            line: scriptContext.line
                        });
                        console.log('intRecId', intRecId)
                        if (recType == 'journalentry'){
                            let intLineKey =  currRecObj.getSublistValue({
                                sublistId:  'custpage_sublist',
                                fieldId: 'custpage_lineuniquekey',
                                line: scriptContext.line
                            });
                            loadRecord(intLineKey, recType, intRecId, data)
                        } else {
                            try {
                                var submitFieldsPromise = record.submitFields.promise({
                                    type: recType,
                                    id: intRecId,
                                    values: data
                                });
                                submitFieldsPromise.then(function(recordId) {
                                    window.onbeforeunload = null;
                                    location.reload();
                                });
                            } catch (e) {
                                console.log({
                                    title: e.name,
                                    details: e.message
                                });
                            }
                        }

                    } 
                }

                if (scriptContext.fieldId == 'custpage_this_week'){

                    let blnValue = false

                    let chkBoxFieldValue = currRec.getCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: scriptContext.fieldId,
                    });

                    if (!chkBoxFieldValue){
                        blnValue = true
                    }

                    currRec.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_next_week',
                        value: blnValue,
                        ignoreFieldChange: true,
                        fireSlavingSync: true
                    });
                    console.log('blnValue', blnValue)
                    if (chkBoxFieldValue || blnValue){
                        let recType =  currRecObj.getSublistValue({
                            sublistId:  'custpage_sublist',
                            fieldId: 'custpage_rec_type',
                            line: scriptContext.line
                        });
                        console.log('recType', recType)

                        if (blnValue){
                            intAmount =  currRecObj.getSublistValue({
                                sublistId:  'custpage_sublist',
                                fieldId: 'custpage_amount_head',
                                line: scriptContext.line
                            });

                            data = {
                                custbody_next_week_amount: parseFloat(intAmount.replace(/,/g, '')),
                                custbody_next_week: true,
                                custbody_this_week: false, 
                                custbody_this_week_amount: null
                            }

                        } else {
                            intAmount =  currRecObj.getSublistValue({
                                sublistId:  'custpage_sublist',
                                fieldId: 'custpage_amount_head',
                                line: scriptContext.line
                            });

                            data = {
                                custbody_next_week_amount: null,
                                custbody_next_week: false,
                                custbody_this_week: true, 
                                custbody_this_week_amount: parseFloat(intAmount.replace(/,/g, ''))
                            }
                        }
                        console.log('intAmount', intAmount)
                        console.log('data', data)
                        intRecId =  currRecObj.getSublistValue({
                            sublistId:  'custpage_sublist',
                            fieldId: 'custpage_id_head',
                            line: scriptContext.line
                        });
                        console.log('intRecId', intRecId)

                        if (recType == 'journalentry'){
                            let intLineKey =  currRecObj.getSublistValue({
                                sublistId:  'custpage_sublist',
                                fieldId: 'custpage_lineuniquekey',
                                line: scriptContext.line
                            });
                            loadRecord(intLineKey, recType, intRecId, data)
                        } else {
                            try {
                                var submitFieldsPromise = record.submitFields.promise({
                                    type: recType,
                                    id: intRecId,
                                    values: data
                                });
                                submitFieldsPromise.then(function(recordId) {
                                    window.onbeforeunload = null;
                                    location.reload();
                                });
                            } catch (e) {
                                console.log({
                                    title: e.name,
                                    details: e.message
                                });
                            }
                        }
                    } 
                }

                if (scriptContext.fieldId == 'custpage_approveforpayment'){
                    let recType =  currRecObj.getSublistValue({
                        sublistId:  'custpage_sublist',
                        fieldId: 'custpage_rec_type',
                        line: scriptContext.line
                    });
                    console.log('recType', recType)

                    intRecId =  currRecObj.getSublistValue({
                        sublistId:  'custpage_sublist',
                        fieldId: 'custpage_id_head',
                        line: scriptContext.line
                    });
                    console.log('intRecId', intRecId)
                    try {
                        var submitFieldsPromise = record.submitFields.promise({
                            type: recType,
                            id: intRecId,
                            values: {
                                custbody_approve_for_payment: true
                            }
                        });
                        submitFieldsPromise.then(function(recordId) {
                            window.onbeforeunload = null;
                            location.reload();
                        });
                    } catch (e) {
                        console.log({
                            title: e.name,
                            details: e.message
                        });
                    }
                }


                
            } catch (error) {
                console.log('Error: fieldChanged', error.message)
            }
        }


        function approveVendors() {
            try {
                let arrRecId = []
                let recType = null
                const currRecObj = currentRecord.get();
                let numLines = currRecObj.getLineCount({
                    sublistId: 'custpage_sublist',
                });
                console.log('numLines', numLines)
                for (let line = 0; line < numLines; line++) {
                    let blnThisWeek = currRecObj.getSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_this_week',
                        line: line
                    });
                    if (blnThisWeek){
                        recType =  currRecObj.getSublistValue({
                            sublistId:  'custpage_sublist',
                            fieldId: 'custpage_rec_type',
                            line: line
                        });
                        console.log('recType', recType)
    
                        intRecId =  currRecObj.getSublistValue({
                            sublistId:  'custpage_sublist',
                            fieldId: 'custpage_id_head',
                            line: line
                        });
                        console.log('intRecId', intRecId)

                        arrRecId.push(intRecId)
                    }
                }
                console.log('arrRecId', arrRecId)
                if (arrRecId.length > 0 && arrRecId){
                    try {
                        let submitFieldsPromise = null
                        arrRecId.forEach(id => {
                            submitFieldsPromise = record.submitFields.promise({
                                type: recType,
                                id: id,
                                values: {
                                    custbody_approve_for_payment: true
                                }
                            });
                        });
                        if (submitFieldsPromise){
                            submitFieldsPromise.then(function(recordId) {
                                window.onbeforeunload = null;
                                location.reload();
                            });
                        }
                    } catch (e) {
                        console.log({
                            title: e.name,
                            details: e.message
                        });
                    }
                } else {
                    alert('No Selected This Week Amount')
                }
            } catch (error) {
                console.log('Error: approveVendors', error.message)
            }

        }

        // Private Function
        function loadRecord(intLineKey, recType, intRecId, data) {
            let loadRecordPromise = record.load.promise({
                type: recType,
                id: intRecId,
                isDynamic: true,
            });
            loadRecordPromise.then(function(objRecord) {
                var lineNumber = objRecord.findSublistLineWithValue({
                    sublistId: 'line',
                    fieldId: 'lineuniquekey',
                    value: intLineKey
                });
                console.log('loadRecord: lineNumber', lineNumber)
                    if(lineNumber != -1){
                        objRecord.selectLine({
                            sublistId: 'line',
                            line: lineNumber
                        });
                        for (const [fieldId, value] of Object.entries(data)) {
                            let sublistFieldId;
                            switch (fieldId) {
                                case 'custbody_next_week_amount':
                                    sublistFieldId = 'custcol_next_week_amt';
                                    break;
                                case 'custbody_next_week':
                                    sublistFieldId = 'custcol_next_week';
                                    break;
                                case 'custbody_this_week':
                                    sublistFieldId = 'custcol_this_week';
                                    break;
                                case 'custbody_this_week_amount':
                                    sublistFieldId = 'custcol_this_week_amt';
                                    break;
                                default:
                                    continue; // Skip if no matching case
                            }
                            objRecord.setCurrentSublistValue({
                                sublistId: 'line',
                                fieldId: sublistFieldId,
                                value: value
                            });
                        }
                        objRecord.commitLine({sublistId:'line'})
                    }
                let recordId = objRecord.save();
                if (recordId){
                    console.log({
                        title: 'Record updated',
                        details: 'Updated record ID: ' + recordId
                    });
                    window.onbeforeunload = null;
                    location.reload();
                }
            }, function(e) {
                alert('Error on Loading Record ID', intRecId)
                console.log({
                    title: 'Unable to load record',
                    details: e.name
                });
            });
        }

        function showMessage() {
            let myMsg = message.create({
                title: 'Data Retrieval in Progress',
                message: 'Your request is being processed. Please wait...',
                type: message.Type.INFORMATION
            });
            myMsg.show({
                duration: 7000 
            });

        }

        function redirectUser(objParam) {
            let suiteletURL = url.resolveScript({
                scriptId : slMapping.SUITELET.scriptid,
                deploymentId : slMapping.SUITELET.deploymentid,
                params: {
                    data : JSON.stringify(objParam)
                }
            });
            window.onbeforeunload = null;
            window.location = suiteletURL;
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            approveVendors: approveVendors
        };

    });

