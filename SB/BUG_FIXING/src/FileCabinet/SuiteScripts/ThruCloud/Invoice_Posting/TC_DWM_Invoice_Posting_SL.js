    /**
     * @NApiVersion 2.1
     * @NScriptType Suitelet
     * @NModuleScope SameAccount
     */
    var PAGE_SIZE = 50;
    
    // https://8024578-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=871&deploy=1

    define(['N/search', 'N/ui/serverWidget', 'N/url', 'N/redirect', 'N/record','N/format'], function(search, serverWidget, url, redirect, record,format) {
    
        function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'Invoices for Posting'
            });

            var EntityF = form.addField({
                id: 'custpage_form_entity',
                type: serverWidget.FieldType.SELECT,
                label: 'Entity'
            });

            EntityF.addSelectOption({
                value : '18',
                text : 'Holding Company (Dummy) : DW Morgan Group : DW Morgan, LLC'
            });
            
            EntityF.addSelectOption({
                value : '20',
                text : 'Holding Company (Dummy) : DW Morgan Group : Morgan Global Logistics Pte. Ltd.'
            });

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

            form.clientScriptModulePath = '../Invoice_Posting/TC_DWM_Invoice_Posting_Utility_CS.js ';
    
            // Get parameters
            var pageId = parseInt(context.request.parameters.page);
            var entity = context.request.parameters.entity;
            var SalesOrderRecord = context.request.parameters.SalesOrderRecord;
            var InvoiceDate = context.request.parameters.InvoiceDate;
            var HAWB = context.request.parameters.HAWB;
            var CustomerAccount = context.request.parameters.CustomerAccount;
            var InvoiceAccount = context.request.parameters.InvoiceAccount;
            var OrderType = context.request.parameters.OrderType;
            var Currency = context.request.parameters.Currency;
            var InvoiceUser = context.request.parameters.InvoiceUser;
                log.debug('HAWB', HAWB)
                var sublist = form.addSublist({
                id: 'custpage_invoice_list',
                type: serverWidget.SublistType.LIST,
                label: 'Customer Invoice Record',
                });    

                sublist.addButton({
                    id : 'custpage_mark_all_btn',
                    label : 'Mark All',
                    functionName : 'markAll()'
                });

                sublist.addButton({
                    id : 'custpage_unmark_all_btn',
                    label : 'Unmark All',
                    functionName : 'unmarkAll()'
                });
                
                // Add columns to the sublist
                var isPostInv = sublist.addField({
                id: 'custpage_invoice_mark',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Apply INVOICE',
                });

                var invId = sublist.addField({
                    id: 'custpage_inv_id',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Invoice RECORD ID'
                });
                invId.updateDisplayType({displayType: 'HIDDEN'});

                sublist.addField({
                    id: 'custpage_inv_view',
                    type: serverWidget.FieldType.URL,
                    label: 'VIEW'
                }).linkText = 'View';
    
                
                sublist.addField({
                    id: 'custpage_sales_order',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Sales Order Record'
                });

                sublist.addField({
                    id: 'custpage_hawb',
                    type: serverWidget.FieldType.TEXT,
                    label: 'hawb'
                });

                var invPostDate = sublist.addField({
                    id: 'custpage_invoice_post_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice Post Date'
                });
                
                sublist.addField({
                    id: 'custpage_customer_acc',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Account'
                });

                sublist.addField({
                    id: 'custpage_invoice_account',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice Account'
                });

                sublist.addField({
                    id: 'custpage_order_type',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Order Type'
                });

				sublist.addField({
                    id: 'custpage_currency',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Currency'
                });

                sublist.addField({
                    id: 'custpage_total',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Total'
                });
                
                sublist.addField({
                    id: 'custpage_invoice_user',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice User'
                });
				
				sublist.addField({
                    id: 'custpage_created_date_time',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Created Date and Time'
                });
				
				sublist.addField({
                    id: 'custpage_all_charged',
                    type: serverWidget.FieldType.TEXT,
                    label: 'All Charged'
                });

                sublist.addField({
                    id: 'custpage_copy_edi',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Copy to EDI'
                });
        
                form.addButton({
                    id : 'custpage_post',
                    label : 'Post',
                    functionName : 'postInv()'
                });
                
                form.addButton({
                    id : 'custpage_approve',
                    label : 'Approve',
                    functionName : 'approveInv()'
                });

                form.addButton({
                    id : 'custpage_reject',
                    label : 'Delete',
                    functionName : 'rejectInv()'
                });

                form.addButton({
                    id : 'custpage_search',
                    label : 'Search',
                    functionName : 'getSuiteletPage()'
                });

                form.addButton({
                    id : 'custpage_csv',
                    label : 'Export CSV',
                    functionName : 'exportCSV()'
                });


                var retrieveSearch = runSearch(entity,SalesOrderRecord,InvoiceDate,HAWB,CustomerAccount,InvoiceAccount,OrderType,Currency,InvoiceUser,PAGE_SIZE);
                var pageCount = Math.ceil(retrieveSearch.count / PAGE_SIZE);

                // Set pageId to correct value if out of index
                if (!pageId || pageId == '' || pageId < 0)
                    pageId = 0;
                else if (pageId >= pageCount)
                    pageId = pageCount - 1;

                    var pageField = form.addField({
                        id: 'custpage_form_pagefield',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Page Field'
                    });
                    pageField.updateDisplayType({displayType: 'HIDDEN'});

                    var selectOptions = form.addField({
                        id : 'custpage_pageid',
                        label : 'Page Index',
                        type : serverWidget.FieldType.SELECT
                    });

                    form.clientScriptModulePath = '../Invoice_Posting/TC_DWM_Invoice_Posting_Utility_CS.js ';

            
                for (i = 0; i < pageCount; i++) {
                    if (i == pageId) {
                        selectOptions.addSelectOption({
                            value : 'pageid_' + i,
                            text : ((i * PAGE_SIZE) + 1) + ' - ' + ((i + 1) * PAGE_SIZE),
                            isSelected : true
                        });
                    } else {
                        selectOptions.addSelectOption({
                            value : 'pageid_' + i,
                            text : ((i * PAGE_SIZE) + 1) + ' - ' + ((i + 1) * PAGE_SIZE)
                        });
                    }
                }
                
                // Get subset of data to be shown on page
                if(retrieveSearch.count > 0){
                    var searchResults = fetchSearchResult(retrieveSearch, pageId);

                    var j = 0;
                    searchResults.forEach(function (result) {
                        if(result.id){
                            sublist.setSublistValue({
                                id: 'custpage_inv_id',
                                line: j,
                                value: result.id
                            });

                            var invLink = 'https://8024578.app.netsuite.com/app/accounting/transactions/custinvc.nl?id='
                            sublist.setSublistValue({
                                id: 'custpage_inv_view',
                                line: j,
                                value: invLink+result.id
                            });
                        }

                        if(result.so){
                            sublist.setSublistValue({
                                id: 'custpage_sales_order',
                                line: j,
                                value: result.so
                            });
                        }

						if(result.hawb){
                            sublist.setSublistValue({
                                id: 'custpage_hawb',
                                line: j,
                                value: result.hawb
                            });
                        }

                        if(result.entity){
                            sublist.setSublistValue({
                                id: 'custpage_customer_acc',
                                line: j,
                                value: result.entity
                            });
                        }

                        if(result.billtoAcc){
                            sublist.setSublistValue({
                                id: 'custpage_invoice_account',
                                line: j,
                                value: result.billtoAcc
                            });
                        }

                        if(result.status){
                            sublist.setSublistValue({
                            id: 'custpage_order_type',
                            line: j,
                            value: result.status
                            });

                            if(result.status != 'Posted'){
                                invPostDate.updateDisplayType({
                                    displayType: serverWidget.FieldDisplayType.ENTRY
                                });
                            }
                            else{
                                isPostInv.updateDisplayType({
                                    displayType: serverWidget.FieldDisplayType.HIDDEN
                                });
                                sublist.setSublistValue({
                                    id: 'custpage_invoice_post_date',
                                    line: j,
                                    value: result.invDate
                                });
                            }
                        }
                        
                        if(result.currency){
                            sublist.setSublistValue({
                                id: 'custpage_currency',
                                line: j,
                                value: result.currency
                            });
                        }
                
                        if(result.total){
                            sublist.setSublistValue({
                                id: 'custpage_total',
                                line: j,
                                value: result.total
                            });
                        }

                        if(result.InvUser){
                            sublist.setSublistValue({
                                id: 'custpage_invoice_user',
                                line: j,
                                value: result.InvUser
                            });
                        }

                        if(result.createdDateTime){
                            sublist.setSublistValue({
                                id: 'custpage_created_date_time',
                                line: j,
                                value: result.createdDateTime
                            });
                        }

                        if(result.allCharge){
                            sublist.setSublistValue({
                                id: 'custpage_all_charged',
                                line: j,
                                value: result.allCharge
                            });
                        }

                        if(result.copyEdi){
                            var invRec = search.lookupFields({
                                type: search.Type.INVOICE,
                                id: result.id,
                                columns: ['entity']
                            });

                            var cusEntity = search.lookupFields({
                                type: search.Type.CUSTOMER,
                                id: invRec.entity[0].value,
                                columns: ['category']
                            });

                            if(cusEntity.category[0].value == 1){
                                var copyEdiVal = 'T';
                            }
                            else{
                                if(result.copyEdi == true){
                                    var copyEdiVal = 'T';
                                }
                                else{
                                    var copyEdiVal = 'F';
                                }
                            }
                            
                            sublist.setSublistValue({
                                id: 'custpage_copy_edi',
                                line: j,
                                value: copyEdiVal
                            });
                        }

                        j++
                    });
                }

            if (entity == 18 || entity == null) {
                EntityF.defaultValue = 18;
            }
            else if(entity != 18){
                EntityF.defaultValue = entity;
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

                context.response.writePage({
                    pageObject: form
                });
        }

        }

        return {
            onRequest : onRequest
        };

        function runSearch(entity,SalesOrderRecord,InvoiceDate,HAWB,CustomerAccount,InvoiceAccount,OrderType,Currency,InvoiceUser,searchPageSize) {
           
                var invSearchColFilter = [];
                invSearchColFilter.push(search.createFilter({
                    name: 'type',
                    operator: search.Operator.ANYOF,
                    values: 'CustInvc'
                }));

                invSearchColFilter.push(search.createFilter({
                    name: 'mainline',
                    operator: search.Operator.IS,
                    values: 'T'
                }));

                if (entity == 18 || entity == null) {
                    log.debug('18')
                    invSearchColFilter.push(search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: '18'
                    }));
                }
                else if(entity != 18){
                    log.debug('20')
                    invSearchColFilter.push(search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: '20'
                    }));
                }

                if(!SalesOrderRecord && !InvoiceDate && !HAWB && !CustomerAccount && !InvoiceAccount && !OrderType && !Currency && !InvoiceUser){
                    invSearchColFilter.push(search.createFilter({
                        name: 'status',
                        operator: search.Operator.ANYOF,
                        values: 'CustInvc:D'
                    }));

                    invSearchColFilter.push(search.createFilter({
                        name: 'custbody_inv_approval_status',
                        operator: search.Operator.ANYOF,
                        values: ['1','2']
                    }));
                }
                else{
                    if(SalesOrderRecord){
                        var SRArrSet = SalesOrderRecord.split(",")
                        var SRArr = [];
                        
                        for(var x = 0; x<SRArrSet.length;x++){
                            var salesorderSearchColInternalId = search.createColumn({ name: 'internalid' });
                            var salesorderSearch = search.create({
                            type: 'salesorder',
                            filters: [
                                ['type', 'anyof', 'SalesOrd'],
                                'AND',
                                ['numbertext', 'is', SalesOrderRecord],
                                'AND',
                                ['mainline', 'is', 'T'],
                            ],
                            columns: [
                                salesorderSearchColInternalId,
                            ],
                            });
                            var searchResults = salesorderSearch.run().getRange({
                                start: 0,
                                end: 1 // Adjust the number of results you want to fetch
                            });
                           
                            if(searchResults.length == 0){
                                SRArr.push('@NONE@');
                            }
                            else{
                                for (var i = 0; i < searchResults.length; i++) {
                                    var id = searchResults[i].id;
                                    SRArr.push(id);
                                }
                            }
                        }
                        //should have same value pairs from the columns -> to getValue
                        invSearchColFilter.push(search.createFilter({
                            name: 'createdfrom',
                            operator: search.Operator.ANYOF,
                            values: SRArr
                        }));
                    }
    
                    if(InvoiceDate){
                        var InvoiceDateArrSet = InvoiceDate.split("-")
                    
                            invSearchColFilter.push(search.createFilter({
                                name: 'trandate',
                                operator: search.Operator.WITHIN,
                                values: InvoiceDateArrSet
                            }));
                    }
    
                    if(HAWB){
                        log.debug('runSearch HAWB', HAWB)
                        var HAWBArrSet = HAWB.split(",").map(function(item) {
                            return item.trim();
                        });
                        log.debug('runSearch HAWBArrSet', HAWBArrSet)
                        var HAWBArr = [];
                        for(var x = 0; x<HAWBArrSet.length;x++){
                            
                            var customrecord_cseg_hawborigId = search.createColumn({ name: 'internalid' });
                            var customrecord_cseg_hawborigSearch = search.create({
                            type: 'customrecord_cseg_hawborig',
                            filters: [
                                ['name', 'is', HAWBArrSet[x]],
                            ],
                            columns: [
                                customrecord_cseg_hawborigId,
                            ],
                            });
                            var searchResults = customrecord_cseg_hawborigSearch.run().getRange({
                                start: 0,
                                end: 1 // Adjust the number of results you want to fetch
                            });
                            if(searchResults.length == 0){

                            }
                            else{
                                for (var i = 0; i < searchResults.length; i++) {
                                    var id = searchResults[i].id;
                                    HAWBArr.push(id)
                                }
                            }
                        }
                        log.debug('runSearch HAWBArr', HAWBArr)
                        //should have same value pairs from the columns -> to getValue
                        invSearchColFilter.push(search.createFilter({
                            name: 'cseg_hawborig',
                            operator: search.Operator.ANYOF,
                            values: HAWBArr
                        }));
                    }
    
                    if(CustomerAccount){
                        var customerArrSet = CustomerAccount.split(",")
                        log.debug('CustomerAccount',CustomerAccount)
                        log.debug('customerArrSet',customerArrSet)
                        var customerArr = [];
                        
                        for(var x = 0; x<customerArrSet.length;x++){
                            var customerSearchColInternalId = search.createColumn({ name: 'internalid' });
                            var customerSearch = search.create({
                                type: 'customer',
                                filters: [
                                    ['companyname', 'is', customerArrSet[x]],
                                ],
                                columns: [
                                    customerSearchColInternalId,
                                ],
                            });
                            var searchResults = customerSearch.run().getRange({
                                start: 0,
                                end: 1 // Adjust the number of results you want to fetch
                            });
                            if(searchResults.length == 0){
                                customerArr.push('@NONE@');
                            }
                            else{
                                for (var i = 0; i < searchResults.length; i++) {
                                    var id = searchResults[i].id;
                                    log.debug('id',id)
                                    customerArr.push(id)
                                }
                            }
                        }
                        //should have same value pairs from the columns -> to getValue
                        invSearchColFilter.push(search.createFilter({
                            name: 'name',
                            operator: search.Operator.ANYOF,
                            values: customerArr
                        }));
                    }
    
                    if(InvoiceAccount){
                        var btcArrSet = InvoiceAccount.split(",")
                        
                        var billtocodeArr = [];
                        
                        for(var x = 0; x<btcArrSet.length;x++){
                            var customrecord_billtocodesSearchColInternalId = search.createColumn({ name: 'internalid' });
                            var customrecord_billtocodesSearch = search.create({
                            type: 'customrecord_billtocodes',
                            filters: [
                                ['name', 'is', btcArrSet[x]],
                            ],
                            columns: [
                                customrecord_billtocodesSearchColInternalId,
                            ],
                            });
                            var searchResults = customrecord_billtocodesSearch.run().getRange({
                                start: 0,
                                end: 1 // Adjust the number of results you want to fetch
                            });
                            if(searchResults.length == 0){
                                billtocodeArr.push('@NONE@');
                            }
                            else{
                                for (var i = 0; i < searchResults.length; i++) {
                                    var id = searchResults[i].id;
                                    billtocodeArr.push(id)
                                }
                            }
                        }
                        //should have same value pairs from the columns -> to getValue
                        invSearchColFilter.push(search.createFilter({
                            name: 'custbody_billtoaccount',
                            operator: search.Operator.ANYOF,
                            values: billtocodeArr
                        }));
                    }
    
                    if(OrderType){
                        var StatusArrSet = OrderType.split(",")
                        
                        var StatusArr = [];
                    
                        for(var x = 0; x<StatusArrSet.length;x++){
                            var customlist884SearchColInternalId = search.createColumn({ name: 'internalid' });
                            var customlist884Search = search.create({
                              type: 'customlist884',
                              filters: [
                                ['name', 'is', StatusArrSet[x]],
                              ],
                              columns: [
                                customlist884SearchColInternalId,
                              ],
                            });
                            var searchResults = customlist884Search.run().getRange({
                                start: 0,
                                end: 1 // Adjust the number of results you want to fetch
                            });
                            if(searchResults.length == 0){
                                StatusArr.push('@NONE@');
                            }
                            else{
                                for (var i = 0; i < searchResults.length; i++) {
                                    var id = searchResults[i].id;
                                    StatusArr.push(id)
                                }
                            }
                        }
                        //should have same value pairs from the columns -> to getValue
                    
                        invSearchColFilter.push(search.createFilter({
                                name: 'custbody_inv_approval_status',
                                operator: search.Operator.ANYOF,
                                values: StatusArr
                            }));
                        
                    }

                    if(Currency){
                        var CurrencyArrSet = Currency.split(",")
                        
                        var CurrencyArr = [];
                    
                        for(var x = 0; x<CurrencyArrSet.length;x++){
                            var customlist_currenciesSearchColInternalId = search.createColumn({ name: 'internalid' });
                            var customlist_currenciesSearch = search.create({
                            type: 'customlist_currencies',
                            filters: [
                                ['name', 'is', CurrencyArrSet[x]]
                            ],
                            columns: [
                                customlist_currenciesSearchColInternalId
                            ],
                            });
    
                            var searchResults = customlist_currenciesSearch.run().getRange({
                                start: 0,
                                end: 1 // Adjust the number of results you want to fetch
                            });
                            if(searchResults.length == 0){
                                CurrencyArr.push('@NONE@');
                            }
                            else{
                                for (var i = 0; i < searchResults.length; i++) {
                                    var id = searchResults[i].id;
                                    CurrencyArr.push(id)
                                }
                            }
                        }
                        //should have same value pairs from the columns -> to getValue
                        
                        invSearchColFilter.push(search.createFilter({
                                name: 'currency',
                                operator: search.Operator.ANYOF,
                                values: CurrencyArr
                            }));
                    }
    
    
                    if(InvoiceUser){
                        var InvUserArrSet = InvoiceUser.split(",")
                        
                        var InvUserArr = [];
                    
                        for(var x = 0; x<InvUserArrSet.length;x++){
                            var employeeSearchColId = search.createColumn({ name: 'internalid' });
                            var employeeSearch = search.create({
                                type: 'employee',
                                filters: [
                                  ['entityid', 'is', InvUserArrSet[x]],
                                ],
                                columns: [
                                    employeeSearchColId
                                ],
                            });
    
                            var searchResults = employeeSearch.run().getRange({
                                start: 0,
                                end: 1 // Adjust the number of results you want to fetch
                            });
                            if(searchResults.length == 0){
                                InvUserArr.push('@NONE@');
                            }
                            else{
                                for (var i = 0; i < searchResults.length; i++) {
                                    var id = searchResults[i].id;
                                    InvUserArr.push(id)
                                }
                            }
                        }
                        //should have same value pairs from the columns -> to getValue
                    
                        
                        invSearchColFilter.push(search.createFilter({
                                name: 'createdby',
                                operator: search.Operator.ANYOF,
                                values: InvUserArr
                            }));
                        
                    }    
                }
                
                
                var invoiceSearchColCreatedFrom = search.createColumn({ name: 'createdfrom' });
                var invoiceSearchColInvoiceDate = search.createColumn({ name: 'trandate' });
                var invoiceSearchColHawb = search.createColumn({ name: 'cseg_hawborig' });
                var invoiceSearchColName = search.createColumn({ name: 'entity' });
                var invoiceSearchColBillToAccount = search.createColumn({ name: 'custbody_billtoaccount' });
                var invoiceSearchColStatus = search.createColumn({ name: 'custbody_inv_approval_status' });
                var invoiceSearchColCurrency = search.createColumn({ name: 'currency' });
                var invoiceSearchColTotal = search.createColumn({ name: 'fxamount' });
                var invoiceSearchColInvoiceUser = search.createColumn({ name: 'createdby' });
                var invoiceSearchColCreatedDateAndTime = search.createColumn({ name: 'datecreated' });
                var invoiceSearchColAllCharged = search.createColumn({ name: 'custbody_allcharged' });
                var invoiceSearchColCopyToEdi = search.createColumn({ name: 'custbody_copy_to_edi' });
                var invoiceSearch = search.create({
                type: 'invoice',
                filters: invSearchColFilter,
                columns: [
                    invoiceSearchColCreatedFrom,
                    invoiceSearchColInvoiceDate,
                    invoiceSearchColHawb,
                    invoiceSearchColName,
                    invoiceSearchColBillToAccount,
                    invoiceSearchColStatus,
                    invoiceSearchColCurrency,
                    invoiceSearchColTotal,
                    invoiceSearchColInvoiceUser,
                    invoiceSearchColCreatedDateAndTime,
                    invoiceSearchColAllCharged,
                    invoiceSearchColCopyToEdi,
                ],
                });

            return invoiceSearch.runPaged({
                pageSize : searchPageSize
            });
        }

        function fetchSearchResult(pagedData, pageIndex) {
            var invResults = new Array();
            var searchPage = pagedData.fetch({
                    index : pageIndex
            });

            searchPage.data.forEach(function (result) {
                var internalId = result.id;

                var invoiceSearchColCreatedFrom = result.getText({ name: 'createdfrom' });
                var invoiceSearchColInvoiceDate = result.getValue({ name: 'trandate' });
                var invoiceSearchColHawb = result.getText({ name: 'cseg_hawborig' });
                var invoiceSearchColName = result.getText({ name: 'entity' });
                var invoiceSearchColBillToAccount = result.getText({ name: 'custbody_billtoaccount' });
                var invoiceSearchColStatus = result.getText({ name: 'custbody_inv_approval_status' });
                var invoiceSearchColCurrency = result.getText({ name: 'currency' });
                var invoiceSearchColTotal = result.getValue({ name: 'fxamount' });
                var invoiceSearchColInvoiceUser = result.getText({ name: 'createdby' });
                var invoiceSearchColCreatedDateAndTime = result.getValue({ name: 'datecreated' });
                var invoiceSearchColAllCharged = result.getText({ name: 'custbody_allcharged' });
                var invoiceSearchColCopyToEdi = result.getValue({ name: 'custbody_copy_to_edi' });
                
                invResults.push({
                    "id": internalId,
                    "so": invoiceSearchColCreatedFrom,
                    "invDate": invoiceSearchColInvoiceDate,
                    "hawb": invoiceSearchColHawb,
                    "entity": invoiceSearchColName,
                    "billtoAcc": invoiceSearchColBillToAccount,
                    "status": invoiceSearchColStatus,
                    "currency": invoiceSearchColCurrency,
                    "total" : invoiceSearchColTotal,
                    "InvUser" :invoiceSearchColInvoiceUser,
                    "createdDateTime": invoiceSearchColCreatedDateAndTime,
                    "allCharge" : invoiceSearchColAllCharged,
                    "copyEdi" : invoiceSearchColCopyToEdi
                });
            })
            return invResults;
        }

    });
    