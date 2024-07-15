/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/message', 'N/search', 'N/currentRecord', 'N/format', '../Library/slmapping.js', 'N/url', 'N/runtime'],

    function (message, search, currentRecord, format, slMapping, url, runtime) {

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
                const currRecObj = currentRecord.get();
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
            } catch (error) {
                console.log('Error: fieldChanged', error.message)
            }
        }

        function saveRecord(scriptContext) {
            try {
               
            } catch (error) {
                console.log('Error: saveRecord', error.message)
            }
        }

        function refreshPage(scriptContext) {
            try {          
                var sURL = url.resolveScript({
                    scriptId : slMapping.SUITELET.scriptid,
                    deploymentId : slMapping.SUITELET.deploymentid,
                    returnExternalUrl : false,
                });
            
                window.onbeforeunload = null;
                window.location = sURL;
            } catch (error) {
                console.log('Error: refreshPage', error.message)
            }
        }

        // Private Function
        
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
            saveRecord: saveRecord,
            refreshPage: refreshPage,
        };

    });
