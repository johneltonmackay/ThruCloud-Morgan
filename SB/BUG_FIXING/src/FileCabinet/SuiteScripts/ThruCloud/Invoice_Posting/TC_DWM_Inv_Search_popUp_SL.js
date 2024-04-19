    /**
     * @NApiVersion 2.1
     * @NScriptType Suitelet
     * @NModuleScope SameAccount
     */
    var PAGE_SIZE = 1000;


    define(['N/search', 'N/ui/serverWidget', 'N/url', 'N/redirect', 'N/record'], function(search, serverWidget, url, redirect, record) {
    
        function onRequest(context) {
            if (context.request.method === 'GET') {
                var form = serverWidget.createForm({
                    title: 'Search Invoice Record'
                });

                var searchSub = form.addSublist({
                    id: 'custpage_search_list',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'Criteria',
                });    

                    // Add columns to the sublist
                var field = searchSub.addField({
                    id: 'custpage_field_filter',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Field',
                    source: 'customlist_invoices_for_posting'
                });

                var value = searchSub.addField({
                        id: 'custpage_value_filter',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Value'
                });
                value.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var entityF = form.addField({
                    id: 'custpage_form_entity',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Entity',
                });
                entityF.updateDisplayType({displayType: 'HIDDEN'});

                var ShipmentRecF = form.addField({
                    id: 'custpage_form_shipmentrecord',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Sales Order Rec',
                });
                ShipmentRecF.updateDisplayType({displayType: 'HIDDEN'});
    
                var invDateF = form.addField({
                    id: 'custpage_form_invdate',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice Date',
                });
                invDateF.updateDisplayType({displayType: 'HIDDEN'});
    
                var HAWBF = form.addField({
                    id: 'custpage_form_hawb',
                    type: serverWidget.FieldType.TEXT,
                    label: 'HAWB',
                });
                HAWBF.updateDisplayType({displayType: 'HIDDEN'});
    
                var customerF = form.addField({
                    id: 'custpage_form_customer',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer',
                });
                customerF.updateDisplayType({displayType: 'HIDDEN'});
    
                var invAccF = form.addField({
                    id: 'custpage_form_invoice_account',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice Account',
                });
                invAccF.updateDisplayType({displayType: 'HIDDEN'});
    
                var orderTypeF = form.addField({
                    id: 'custpage_form_order_type',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Order Type',
                });
                orderTypeF.updateDisplayType({displayType: 'HIDDEN'});
    
                var currencyF = form.addField({
                    id: 'custpage_form_currency',
                    type: serverWidget.FieldType.TEXT,
                    label: 'currency',
                });
                currencyF.updateDisplayType({displayType: 'HIDDEN'});
    
                var invUserF = form.addField({
                    id: 'custpage_form_invoice_user',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice User',
                });
                invUserF.updateDisplayType({displayType: 'HIDDEN'});

                var entity = context.request.parameters.entity;
                var SalesOrderRecord = context.request.parameters.SalesOrderRecord;
                var InvoiceDate = context.request.parameters.InvoiceDate;
                var HAWB = context.request.parameters.HAWB;
                var CustomerAccount = context.request.parameters.CustomerAccount;
                var InvoiceAccount = context.request.parameters.InvoiceAccount;
                var OrderType = context.request.parameters.OrderType;
                var Currency = context.request.parameters.Currency;
                var InvoiceUser = context.request.parameters.InvoiceUser;

                form.clientScriptModulePath = '../Invoice_Posting/TC_DWM_Inv_Search_PopUp_utility_CS.js ';

                if (entity) {
                    entityF.defaultValue = entity;
                }

                if (SalesOrderRecord) {
                    ShipmentRecF.defaultValue = SalesOrderRecord;
                }
    
                if (InvoiceDate) {
                    invDateF.defaultValue = InvoiceDate;
                }
    
                if (HAWB) {
                    HAWBF.defaultValue = HAWB;
                }
    
                if (CustomerAccount) {
                    customerF.defaultValue = CustomerAccount;
                }
    
                if (InvoiceAccount) {
                    invAccF.defaultValue = InvoiceAccount;
                }
    
                if (OrderType) {
                    orderTypeF.defaultValue = OrderType;
                }
    
                if (Currency) {
                    currencyF.defaultValue = Currency;
                }
    
                if (InvoiceUser) {
                    invUserF.defaultValue = InvoiceUser;
                }

                var submitButton = form.addSubmitButton({
                    label : 'Submit'
                })


                context.response.writePage({
                    pageObject: form
                });
            }
            else if (context.request.method === 'POST') {
                var paramArr = new Array(8);
                var entity = context.request.parameters.custpage_form_entity; 
                var lineCount = context.request.getLineCount({
                    group: "custpage_search_list"
                });
                if(lineCount>0)
                {
                    for(var i=0; i<lineCount; i++){  
                        var fieldId = context.request.getSublistValue({
                            group : "custpage_search_list",
                            name : "custpage_field_filter",
                            line: i
                        });
                        
                        var fieldNames = search.lookupFields({
                            type: 'customlist_invoices_for_posting',
                            id: fieldId,
                            columns: ['name']
                        });
                        var fieldparam = fieldNames.name.replace(/ /g, '');
                        var valueParam = context.request.getSublistValue({
                            group : "custpage_search_list",
                            name : "custpage_value_filter",
                            line: i
                        });
                        log.debug('fieldFil',fieldparam)
                        log.debug('valueFil',valueParam)
                        
                        if(fieldparam =='SalesOrderRecord'){
                            paramArr[3] = valueParam
                        }
                        if(fieldparam =='InvoiceDate'){
                            paramArr[4] = valueParam
                        }
                        if(fieldparam =='HAWB'){
                            paramArr[5] = valueParam
                        }
                        if(fieldparam =='CustomerAccount'){
                            paramArr[6] = valueParam
                        }
                        if(fieldparam =='InvoiceAccount'){
                            paramArr[7] = valueParam
                        }
                        if(fieldparam =='OrderType'){
                            paramArr[8] = valueParam
                        }
                        if(fieldparam =='Currency'){
                            paramArr[9] = valueParam
                        }
                        if(fieldparam =='InvoiceUser'){
                            paramArr[10] = valueParam
                        }
                    }
                        var suiteletURL = url.resolveScript({
                            scriptId: 'customscript_tc_invoice_posting_sl',
                            deploymentId: 'customdeploy_tc_invoice_posting_sl',
                            params: {
                                page : 0,
                                entity : entity,
                                SalesOrderRecord: paramArr[3],
                                InvoiceDate : paramArr[4],
                                HAWB : paramArr[5],
                                CustomerAccount : paramArr[6],
                                InvoiceAccount : paramArr[7],
                                OrderType : paramArr[8],
                                Currency : paramArr[9],
                                InvoiceUser : paramArr[10]
                                //paramObj
                            }
                        });
                        redirect.redirect({ url: suiteletURL });
                }
                else{
                        var suiteletURL = url.resolveScript({
                            scriptId: 'customscript_tc_invoice_posting_sl',
                            deploymentId: 'customdeploy_tc_invoice_posting_sl',
                            params: {
                                page : 0,
                                entity : entity
                            }
                        });
                        redirect.redirect({ url: suiteletURL });
                }
                
            }
        }

        return {
            onRequest : onRequest
        };
    });
    