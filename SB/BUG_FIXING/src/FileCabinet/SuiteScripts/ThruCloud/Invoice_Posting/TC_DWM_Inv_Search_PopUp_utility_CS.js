/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime','N/currentRecord', 'N/search', 'N/record','N/url', 'N/ui/dialog','N/format'],

function(runtime, currentRecord, search, record, url, dialog, format) {

    function pageInit_inv_search_popup(scriptContext) {
        var currRecObj = currentRecord.get();
        var pageId
        var filterFields = new Array;

        var SalesOrderRecord = currRecObj.getValue({
            fieldId: 'custpage_form_shipmentrecord'
        });
        if(SalesOrderRecord){
            filterFields.push({"SalesOrderRecord": SalesOrderRecord})
        }

        var InvoiceDate = currRecObj.getValue({
            fieldId: 'custpage_form_invdate'
        });
        if(InvoiceDate){
            filterFields.push({"InvoiceDate": InvoiceDate})
        }

        var HAWB = currRecObj.getValue({
            fieldId: 'custpage_form_hawb'
        });
        if(HAWB){
            filterFields.push({"HAWB": HAWB})
        }

        var CustomerAccount = currRecObj.getValue({
            fieldId: 'custpage_form_customer'
        });
        if(CustomerAccount){
            filterFields.push({"CustomerAccount" : CustomerAccount})
        }

        var InvoiceAccount = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_account'
        });
        if(InvoiceAccount){
            filterFields.push({"InvoiceAccount": InvoiceAccount})
        }

        var OrderType = currRecObj.getValue({
            fieldId: 'custpage_form_order_type'
        });
        if(OrderType){
            filterFields.push({"OrderType": OrderType})
        }

        var Currency = currRecObj.getValue({
            fieldId: 'custpage_form_currency'
        });
        if(Currency){
            filterFields.push({"Currency": Currency})
        }

        var InvoiceUser = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_user'
        });
        if(InvoiceUser){
            filterFields.push({"InvoiceUser":InvoiceUser})
        }

        for(var i = 0; i<filterFields.length;i++){
            if(filterFields[i].SalesOrderRecord){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 3
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].SalesOrderRecord
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].InvoiceDate){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 4
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].InvoiceDate
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }
            if(filterFields[i].HAWB){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 5
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].HAWB
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].CustomerAccount){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 6
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].CustomerAccount
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].InvoiceAccount){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 7
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].InvoiceAccount
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].OrderType){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 8
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].OrderType
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }
            if(filterFields[i].Currency){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 9
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].Currency
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].InvoiceUser){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 10
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].InvoiceUser
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }
        }


     
    }
  

    return {
        pageInit: pageInit_inv_search_popup
    };
    
});