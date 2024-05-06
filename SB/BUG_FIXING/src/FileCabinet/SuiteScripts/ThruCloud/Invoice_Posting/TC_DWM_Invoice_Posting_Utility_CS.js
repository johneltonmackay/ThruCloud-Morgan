/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime','N/currentRecord', 'N/search', 'N/record','N/url', 'N/ui/dialog','N/format'],

function(runtime, currentRecord, search, record, url, dialog, format) {

    function pageInit_inv_posting(scriptContext) {
        var currRecObj = currentRecord.get();
        var currRecObj = currentRecord.get();
        var invListCount = currRecObj.getLineCount({
            sublistId: 'custpage_invoice_list'
        });

        var currentDateUTC = new Date();

        console.log('currentDateUTC',currentDateUTC)

        var options = { timeZone: 'America/Los_Angeles', timeZoneName: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
        console.log('options',options)
        var dateStringPST = currentDateUTC.toLocaleDateString('en-US', options);

        console.log('dateStringPST',dateStringPST); 

        var pstDateArr = dateStringPST.split(',');
        pstDate = pstDateArr[0];
       

        for(var i=0;i<invListCount;i++){
            var isPosted = currRecObj.getSublistValue({
                sublistId: 'custpage_invoice_list',
                fieldId: 'custpage_order_type',
                line: i
            });
            
            if(isPosted != 'Posted'){
                currRecObj.selectLine({
                    sublistId: 'custpage_invoice_list',
                    line: i
                });
                    
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_invoice_post_date',
                    value: pstDate
                });
                                    
                currRecObj.commitLine({
                    sublistId: 'custpage_invoice_list'
                });
            }
        }
    }    

                

    
    function fieldChanged_sr_to_inv_search(scriptContext) {
        var currRecObj = currentRecord.get();
        var pageId

        if (scriptContext.fieldId == 'custpage_form_entity'){
            var entityVal = currRecObj.getValue({
                fieldId: 'custpage_form_entity'
            });

            var suiteletURL = url.resolveScript({
                scriptId: 'customscript_tc_invoice_posting_sl',
                deploymentId: 'customdeploy_tc_invoice_posting_sl',
                params: {
                    entity : entityVal
                }
            });
            window.location.href = suiteletURL
        }

        if (scriptContext.fieldId == 'custpage_invoice_post_date'){

            var currentDateUTC = new Date();

            console.log('currentDateUTC',currentDateUTC)

            var options = { timeZone: 'America/Los_Angeles', timeZoneName: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
            console.log('options',options)
            var dateStringPST = currentDateUTC.toLocaleDateString('en-US', options);

            console.log('dateStringPST',dateStringPST); 
            
            var pstDateArr = dateStringPST.split(',');
            var pstDateStr = pstDateArr[0];

            var invDateStr = currRecObj.getSublistValue({
                sublistId: 'custpage_invoice_list',
                fieldId: 'custpage_invoice_post_date',
                line: scriptContext.line
            });


            var invDate = new Date(invDateStr)
            var pstDate = new Date(pstDateStr)

            if(invDate > pstDate){
                currRecObj.selectLine({
                    sublistId: 'custpage_invoice_list',
                    line: scriptContext.line
                });
                    
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_invoice_post_date',
                    value: pstDateStr
                });
                                     
                currRecObj.commitLine({
                    sublistId: 'custpage_invoice_list'
                });
                alert("Invalid Posting Date")
            }
            else{
                var invId = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_inv_id',
                    line: scriptContext.line
                });

                var invRec = record.submitFields.promise({
                    type: record.Type.INVOICE,
                    id: invId,
                    values: {
                        custbody_date_posted_rep_hidden : invDateStr
                    }
                });
            }
        }

        if (scriptContext.fieldId == 'custpage_pageid'){
          pageId = currRecObj.getValue({
                fieldId: 'custpage_pageid'
            });

          pageId = parseInt(pageId.split('_')[1]);

		      currRecObj.setValue({
                fieldId: 'custpage_form_pagefield',
                value: pageId
            });

            var entityVal = currRecObj.getValue({
                fieldId: 'custpage_form_entity'
            });

           var suiteletURL = url.resolveScript({
            scriptId: 'customscript_tc_invoice_posting_sl',
            deploymentId: 'customdeploy_tc_invoice_posting_sl',
            params: {
                page : pageId,
                entity : entityVal
            }
           });
           window.location.href = suiteletURL
        }
        if (scriptContext.fieldId == 'custpage_copy_edi'){
            var getCopyEdi = currRecObj.getSublistValue({
                sublistId: 'custpage_invoice_list',
                fieldId: 'custpage_copy_edi',
                line: scriptContext.line
            });

            var invId = currRecObj.getSublistValue({
                sublistId: 'custpage_invoice_list',
                fieldId: 'custpage_inv_id',
                line: scriptContext.line
            });

            var invRec = record.submitFields({
                type: record.Type.INVOICE,
                id: invId,
                values: {
                    custbody_copy_to_edi : getCopyEdi
                }
            });
        }
    }
    
    function markAll() {
        var currRecObj = currentRecord.get();
        var srListCount = currRecObj.getLineCount({
            sublistId: 'custpage_invoice_list'
        });
        if(srListCount>0){
            for(var i=0;i<srListCount;i++){
                currRecObj.selectLine({
                    sublistId: 'custpage_invoice_list',
                    line: i
                });
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_invoice_mark',
                    value: true
                });
                currRecObj.commitLine({
                    sublistId: 'custpage_invoice_list'
                });
            }
        }
    }

    function unmarkAll() {
        var currRecObj = currentRecord.get();
        var srListCount = currRecObj.getLineCount({
            sublistId: 'custpage_invoice_list'
        });
        if(srListCount>0){
            for(var i=0;i<srListCount;i++){
                currRecObj.selectLine({
                    sublistId: 'custpage_invoice_list',
                    line: i
                });
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_invoice_mark',
                    value: false
                });
                currRecObj.commitLine({
                    sublistId: 'custpage_invoice_list'
                });
            }
        }
    }

    function getSuiteletPage() {
        var currRecObj = currentRecord.get();

        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });

        var SalesOrderRecord = currRecObj.getValue({
            fieldId: 'custpage_form_shipmentrecord'
        });

        var InvoiceDate = currRecObj.getValue({
            fieldId: 'custpage_form_invdate'
        });

        var HAWB = currRecObj.getValue({
            fieldId: 'custpage_form_hawb'
        });

        var CustomerAccount = currRecObj.getValue({
            fieldId: 'custpage_form_customer'
        });

        var InvoiceAccount = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_account'
        });

        var OrderType = currRecObj.getValue({
            fieldId: 'custpage_form_order_type'
        });

        var Currency = currRecObj.getValue({
            fieldId: 'custpage_form_currency'
        });

        var InvoiceUser = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_user'
        });

        var suiteletURL = url.resolveScript({
            scriptId: 'customscript_tc_invoice_search_popup_sl',
            deploymentId: 'customdeploy_tc_invoice_search_popup_sl',
            params: {
                entity: entity,
                SalesOrderRecord: SalesOrderRecord,
                InvoiceDate : InvoiceDate,
                HAWB : HAWB,
                CustomerAccount : CustomerAccount,
                InvoiceAccount : InvoiceAccount,
                OrderType : OrderType,
                Currency : Currency,
                InvoiceUser : InvoiceUser
            }
        });
        window.location.href = suiteletURL
    }

    function rejectInv() {
        var currRecObj = currentRecord.get();
        
        var buttonReject = document.getElementById('custpage_reject');
        buttonReject.disabled = true;

        var buttonApp = document.getElementById('custpage_approve');
        buttonApp.disabled = true;

        var buttonPost = document.getElementById('custpage_post');
        buttonPost.disabled = true;

        var invListCount = currRecObj.getLineCount({
            sublistId: 'custpage_invoice_list'
        });

        var applyInvId = [];
        for(var i=0;i<invListCount;i++){
            
            var isApply = currRecObj.getSublistValue({
                sublistId: 'custpage_invoice_list',
                fieldId: 'custpage_invoice_mark',
                line: i
            });
            
            if(isApply){
                var invID =  currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_inv_id',
                    line: i
                });
                
                    var invFields = search.lookupFields({
                        type: search.Type.INVOICE,
                        id: invID,
                        columns: ['createdfrom','tranid']
                    });

                    applyInvId.push(invFields.tranid)

                    if(invFields.createdfrom.length != 0){
                        var srRec = record.submitFields({
                            type: record.Type.SALES_ORDER,
                            id: invFields.createdfrom[0].value,
                            values: {
                                custbody_sr_approvalstatus : 1,
                                custbody_invoice : false,
                            }
                        });

                    }

                    var invRecord = record.delete({
                        type: record.Type.INVOICE,
                        id: invID,
                     });
                    log.debug('invRecord',invRecord)
            }
        }
        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });
            alert("Invoice Record(s) "+applyInvId+" Already been Deleted")
            var suiteletURL = url.resolveScript({
                scriptId: 'customscript_tc_invoice_posting_sl',
                deploymentId: 'customdeploy_tc_invoice_posting_sl',
                params: {
                    page : 0,
                    entity : entity
                }
            });
           window.location.href = suiteletURL


        
      }

      function approveInv() {
        var currRecObj = currentRecord.get();

        var buttonReject = document.getElementById('custpage_reject');
        buttonReject.disabled = true;

        var buttonApp = document.getElementById('custpage_approve');
        buttonApp.disabled = true;

        var buttonPost = document.getElementById('custpage_post');
        buttonPost.disabled = true;
        
        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });

        var pageId = currRecObj.getValue({
            fieldId: 'custpage_pageid'
        });

        pageId = parseInt(pageId.split('_')[1]);

        var invListCount = currRecObj.getLineCount({
            sublistId: 'custpage_invoice_list'
        });

        console.log('invListCount',invListCount)
        var applyTranId = [];
        var applyInvId = [];
        var applyInvalid = [];
        for(var i=0;i<invListCount;i++){
            var isApply = currRecObj.getSublistValue({
                sublistId: 'custpage_invoice_list',
                fieldId: 'custpage_invoice_mark',
                line: i
            });
            
            if(isApply){

                var invId =  currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_inv_id',
                    line: i
                });

                var invFields = search.lookupFields({
                    type: search.Type.INVOICE,
                    id: invId,
                    columns: ['tranid']
                });

                var status =  currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_order_type',
                    line: i
                });

                if(status == 'Pending Approval'){
                    applyInvId.push(invId)
                    applyTranId.push(invFields.tranid)
                }
                else if(status == 'Pending Posting'){
                    applyInvalid.push(invFields.tranid)
                }   
            }
        }
        if(applyInvalid.length != 0){
            alert("Invoice Record(s) "+applyInvalid+" Already Pending Posting")
            var buttonReject = document.getElementById('custpage_reject');
            buttonReject.disabled = false;

            var buttonApp = document.getElementById('custpage_approve');
            buttonApp.disabled = false;

            var buttonPost = document.getElementById('custpage_post');
            buttonPost.disabled = false;
        }
        if(applyTranId.length != 0){
            alert("Invoice Record(s) "+applyTranId+" is Approving")
            const promises = [];
            applyInvId.forEach(function (id) {
                promises.push(new Promise(function (resolve,reject) {
                        var suiteletURL = url.resolveScript({
                            scriptId: 'customscript_tc_ifp_button_func_sl', 
                            deploymentId: 'customdeploy_tc_ifp_button_func_sl',
                            params: {
                                page : pageId,
                                entity : entity,
                                ids : id,
                                action : 'approve'
                            }
                        });
    
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", suiteletURL, true);
                        xhr.setRequestHeader("Content-Type", "application/json");

                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                // Request finished and response is ready
                                var response = xhr.responseText;
                                // Handle response here
                                console.log('response',response)
                                resolve();
                            }
                        };
                        xhr.send();
                        //xhr.send(JSON.stringify(objData));
                }));
            });

            return Promise.all(promises)
            .then(function() {
                // All promises are fulfilled
                var suiteletURLMain = url.resolveScript({
                    scriptId: 'customscript_tc_invoice_posting_sl',
                    deploymentId: 'customdeploy_tc_invoice_posting_sl',
                    params: {
                        entity : entity,
                        page : 0
                    }
                });
            
                window.location.href = suiteletURLMain; // Refresh the page
            })
            .catch(function(error) {
                // Handle errors if any
                console.error(error);
            });
        }
      }

      function postInv() {
        var currRecObj = currentRecord.get();
        var buttonReject = document.getElementById('custpage_reject');
        buttonReject.disabled = true;

        var buttonApp = document.getElementById('custpage_approve');
        buttonApp.disabled = true;

        var buttonPost = document.getElementById('custpage_post');
        buttonPost.disabled = true;

        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });

        var pageId = currRecObj.getValue({
            fieldId: 'custpage_pageid'
        });

        pageId = parseInt(pageId.split('_')[1]);

        var invListCount = currRecObj.getLineCount({
            sublistId: 'custpage_invoice_list'
        });

        console.log('invListCount',invListCount)

        var applyInvId = [];
        var applyPostDate = [];
        var applyCreatedFrom = [];
        var applyCopyEdi = [];
        var applyTranId = [];
        var applyInvalid = [];
        for(var i=0;i<invListCount;i++){
            var isApply = currRecObj.getSublistValue({
                sublistId: 'custpage_invoice_list',
                fieldId: 'custpage_invoice_mark',
                line: i
            });
            
            if(isApply){
                var invId =  currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_inv_id',
                    line: i
                });

                var invFields = search.lookupFields({
                    type: search.Type.INVOICE,
                    id: invId,
                    columns: ['custbody_date_posted_rep_hidden','custbody_inv_approval_status','tranid','createdfrom','custbody_copy_to_edi']
                });
           
                var status =  currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_order_type',
                    line: i
                });

                console.log('status',status)

                if(status == 'Pending Posting'){
                    console.log('if',status)
                    if(invFields.custbody_copy_to_edi){
                        var testReady = 8; // 8 SB
                    }
                    else{
                        var testReady = '';
                    }
                    var srIds
                    var soId = invFields.createdfrom;
                    if(soId.length > 0){
                        srIds = soId[0].value;
                    }
                            
                    applyTranId.push(invFields.tranid)

                    var postDate;
                    if(invFields.custbody_date_posted_rep_hidden){
                        postDate = invFields.custbody_date_posted_rep_hidden;
                    }
                    else{
                        var currentDateUTC = new Date();
                        console.log('currentDateUTC',currentDateUTC)

                        // Format the date as a string
                        var options = { timeZone: 'America/Los_Angeles', timeZoneName: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
                        console.log('options',options)
                        var dateStringPST = currentDateUTC.toLocaleDateString('en-US', options);

                        console.log('dateStringPST',dateStringPST); 
                        
                        var pstDateArr = dateStringPST.split(',');
                        var pstDateStr = pstDateArr[0];
                        postDate = pstDateStr;
                    }
                    applyInvId.push({
                        "page" : pageId,
                        "entity" : entity,
                        "ids" : invId,
                        "postdate" : postDate,
                        "createdfrom" : srIds,
                        "copyedi" : testReady,
                        "action" : 'post'
                    })
                }
                
                else if(status == 'Pending Approval'){
                    console.log('else if',status)
                    applyInvalid.push(invFields.tranid)
                }
                    
            }
        }
        console.log('invFieapplyInvIdlds',applyInvId)
        if(applyInvalid.length != 0){
            alert("Invoice Record(s) "+applyInvalid+" is still Pending Approval and cannot be Posted")
            var buttonReject = document.getElementById('custpage_reject');
            buttonReject.disabled = false;

            var buttonApp = document.getElementById('custpage_approve');
            buttonApp.disabled = false;

            var buttonPost = document.getElementById('custpage_post');
            buttonPost.disabled = false;
        }
        if(applyTranId.length != 0){
            alert("Invoice Record(s) "+applyTranId+" is/are posting")
            const promises = [];
            applyInvId.forEach(function (objData) {
                promises.push(new Promise(function (resolve,reject) {
                        console.log("objData",objData)
                        var page = objData.page;
                        var ent = objData.entity;
                        var applyIdStr = objData.ids;
                        var applyPostDate = objData.postdate;
                        var applyCreatedFrom = objData.createdfrom;
                        var applyCopyEdi = objData.copyedi;
                        
                        console.log('ent',ent)
                        var suiteletURL = url.resolveScript({
                            scriptId: 'customscript_tc_ifp_button_func_sl', // To check why OLD script is RESTLET
                            deploymentId: 'customdeploy_tc_ifp_button_func_sl',
                            params: {
                                page : page,
                                entity : ent,
                                ids : applyIdStr,
                                postdate : applyPostDate,
                                createdfrom : applyCreatedFrom,
                                copyedi : applyCopyEdi,
                                action : 'post'
                            }
                        });
    
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", suiteletURL, true);
                        xhr.setRequestHeader("Content-Type", "application/json");

                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                // Request finished and response is ready
                                var response = xhr.responseText;
                                // Handle response here
                                console.log('response',response)
                                resolve();
                            }
                        };
                        xhr.send();
                        //xhr.send(JSON.stringify(objData));
                }));
            });

            return Promise.all(promises)
            .then(function() {
                // All promises are fulfilled
                var suiteletURLMain = url.resolveScript({
                    scriptId: 'customscript_tc_invoice_posting_sl',
                    deploymentId: 'customdeploy_tc_invoice_posting_sl',
                    params: {
                        entity : entity,
                        page : 0
                    }
                });
            
                window.location.href = suiteletURLMain; // Refresh the page
            })
            .catch(function(error) {
                console.error(error);
            });
        }
      }

      function exportCSV() {
        var currRecObj = currentRecord.get();

        var csvContent = "SALES ORDER RECORD,HAWB,INVOICE POST DATE,CUSTOMER ACCOUNT,INVOICE ACCOUNT,ORDER TYPE,CURRENCY,TOTAL,INVOICE USER,CREATED DATE AND TIME,ALL CHARGED,COPY TO EDI\n";

        var srListCount = currRecObj.getLineCount({
            sublistId: 'custpage_invoice_list'
        });
        
        if(srListCount>0){
            for(var i=0;i<srListCount;i++){
                var column1Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_sales_order',
                    line: i
                });
                var column2Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_hawb',
                    line: i
                });
                var column3Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_invoice_post_date',
                    line: i
                });
                var column4Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_customer_acc',
                    line: i
                });
                column4Value = '"' + column4Value + '"';
                var column5Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_invoice_account',
                    line: i
                });
                var column6Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_order_type',
                    line: i
                });
                var column7Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_currency',
                    line: i
                });
                var column8Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_total',
                    line: i
                });
                var column9Value = currRecObj.getSublistText({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_invoice_user',
                    line: i
                });
                var column10Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_created_date_time',
                    line: i
                });
                var column11Value = currRecObj.getSublistValue({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_all_charged',
                    line: i
                });
                var column12Value = currRecObj.getSublistText({
                    sublistId: 'custpage_invoice_list',
                    fieldId: 'custpage_copy_edi',
                    line: i
                });
                csvContent += column1Value + ',' + column2Value + ',' + column3Value + ',' + column4Value + ',' + column5Value + ',' + column6Value +','+ column7Value + ',' + column8Value + ',' + column9Value +','+ column10Value + ',' + column11Value + ',' + column12Value +'\n';
            }
        }
        var blob = new Blob([csvContent], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Invoice_for_Posting_Data.csv';
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
  

    return {
        getSuiteletPage : getSuiteletPage,
        markAll : markAll,
        unmarkAll : unmarkAll,
        rejectInv : rejectInv,
        approveInv : approveInv,
        postInv : postInv,
        exportCSV : exportCSV,
        pageInit: pageInit_inv_posting,
        fieldChanged: fieldChanged_sr_to_inv_search
    };
    
});