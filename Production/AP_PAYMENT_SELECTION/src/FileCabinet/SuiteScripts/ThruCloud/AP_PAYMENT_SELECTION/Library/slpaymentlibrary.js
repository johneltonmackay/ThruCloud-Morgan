/**
 * @NApiVersion 2.1
 */
define(["N/ui/serverWidget", "N/search", "N/format", "N/file", "N/record", "../Library/slmapping.js", 'N/runtime', 'N/url', 'N/ui/message'],

    (serverWidget, search, format, file, record, slMapping, runtime, url, message) => {

        //#constants
        const FORM = {};
        const ACTIONS = {};
        const ARRFIELDTOFORMAT = [
            'custpage_thisweekamt_head',
            'custpage_nextweekamt_head',
            'custpage_amount_head', 
            'custpage_1_to_30_head',
            'custpage_31_to_60_head',
            'custpage_61_to_90_head',
            'custpage_over_90_head',
            'custpage_total_amount_head'
        ];
        //#global functions
        FORM.buildForm = (options) => {
            try {
                let arrVendor = [];
                let arrSearchResults = []
                if (options.dataParam){
                    let objDataParam = JSON.parse(options.dataParam)
                    arrSearchResults = getEntity(objDataParam)
                    log.debug('buildForm objDataParam', objDataParam)
                    if (objDataParam.vendor){
                        arrVendor = objDataParam.vendor
                    }
                }
                
                var objForm = serverWidget.createForm({
                    title: options.title,
                });
                log.debug('buildForm options', options)
                log.debug('buildForm arrVendor', arrVendor)
                addButtons({
                    form: objForm,
                });
                addFields({
                    form: objForm,
                    parameters: arrSearchResults
                });
                addSublistFields({
                    form: objForm,  
                    parameters: arrSearchResults, 
                    vendor: arrVendor
                });

                objForm.clientScriptModulePath = slMapping.SUITELET.form.CS_PATH;

                return objForm;
            } catch (err) {
                log.error('ERROR_BUILD_FORM:', err.message)
            }
        }

        const addButtons = (options) => {
            try {

                for (let strBtnKey in slMapping.SUITELET.form.buttons) {
                    if (slMapping.SUITELET.form.buttons[strBtnKey].id) {
                        options.form.addButton(slMapping.SUITELET.form.buttons[strBtnKey])
                    }

                }

            } catch (err) {
                log.error("BUILD_FORM_ADD_BUTTONS_ERROR", err.message);
            }
        }

        const addFields = (options) => {
            try {
                let arrParam = options.parameters;
                log.debug('addFields arrParam', arrParam);

                for (var strKey in slMapping.SUITELET.form.fields) {

                    options.form.addField(slMapping.SUITELET.form.fields[strKey]);

                    var objField = options.form.getField({
                        id: slMapping.SUITELET.form.fields[strKey].id,
                        container: 'custpage_fieldgroup'
                    });

                    if (slMapping.SUITELET.form.fields[strKey].hasdefault) {
                        // log.debug('strKey', strKey);
                        let intTotalAmountThisWeek = 0;
                        let intTotalAmountNextWeek = 0;
                        arrParam.forEach(data => {
                            if (data.custpage_thisweekamt_head > 0){
                                intTotalAmountThisWeek += data.custpage_thisweekamt_head;
                            }
                            if (data.custpage_nextweekamt_head > 0){
                                intTotalAmountNextWeek += data.custpage_nextweekamt_head;
                            }
                        });
                        if (strKey === 'THIS_WEEK_GRAND_TOTAL') {
                            objField.defaultValue = floatToCurrency(intTotalAmountThisWeek.toFixed(2));
                        }
                        if (strKey === 'NEXT_WEEK_GRAND_TOTAL'){
                            objField.defaultValue = floatToCurrency(intTotalAmountNextWeek.toFixed(2));
                        }
                    }

                    if (slMapping.SUITELET.form.fields[strKey].hasoption) {
                        if (strKey === 'ENTITY') {
                            let objEntity = {};
                            arrParam.forEach(data => {
                                let intEntityID = data.intEntity;
                                let strEntityID = data.strEntity;
                                objEntity[intEntityID] = {
                                    value: intEntityID,
                                    text: strEntityID
                                };
                            });
                            log.debug('objEntity', objEntity)
                            for (var strKey in objEntity) {
                                objField.addSelectOption(objEntity[strKey]);
                            }
                        } else {
                            for (var strKey in slMapping.SUITELET.form.selectOptions) {
                                objField.addSelectOption(slMapping.SUITELET.form.selectOptions[strKey]);
                            }
                        }
                    }
                }
            } catch (err) {
                log.error("BUILD_FORM_ADD_BODY_FILTERS_ERROR", err.message);
            }
        }

        const addSublistFields = (options) => {
            try {
                let arrParam = options.parameters
                let arrVendor = options.vendor
                log.debug('addSublistFields arrParam', arrParam);

                let sublist = options.form.addSublist({
                    id : 'custpage_sublist',
					type : serverWidget.SublistType.LIST,
					label : 'List of Transactions',
					tab: 'custpage_tabid'
                });
                for (var strKey in slMapping.SUITELET.form.sublistfields) {
                    sublist.addField(slMapping.SUITELET.form.sublistfields[strKey]);
                }

                if (arrParam) {
                    let GT1To30 = 0
                    let GT31To60 = 0
                    let GT61To90 = 0
                    let GTOver90 = 0
                    let GTAmount = 0
                    let lineCount = 0
                    arrParam.forEach((item, index) => {
                        let counter = 0
                        let arrAdditionalLines = []
                        let { custpage_1_to_30_head, custpage_31_to_60_head, custpage_61_to_90_head, custpage_over_90_head, custpage_total_amount_head, data: arrData } = item;
                        
                        let parsedInt1To30 = parseFloat(custpage_1_to_30_head);
                        let parsedInt31To60 = parseFloat(custpage_31_to_60_head);
                        let parsedInt61To90 = parseFloat(custpage_61_to_90_head);
                        let parsedIntOver90 = parseFloat(custpage_over_90_head);
                        let parsedIntTotalAmount = parseFloat(custpage_total_amount_head);
                    
                        if (parsedInt1To30 > 0) {
                            GT1To30 += parsedInt1To30;
                        }
                        if (parsedInt31To60 > 0) {
                            GT31To60 += parsedInt31To60;
                        }
                        if (parsedInt61To90 > 0) {
                            GT61To90 += parsedInt61To90;
                        }
                        if (parsedIntOver90 > 0) {
                            GTOver90 += parsedIntOver90;
                        }
                        if (parsedIntTotalAmount > 0) {
                            GTAmount += parsedIntTotalAmount;
                        }
                        // log.debug('addSublistFields item', item);

                        arrData.forEach((element, line) => {
                            let vendorId = element.custpage_entity_head
                            if (arrVendor.length > 0){
                                if (arrVendor.includes(vendorId)){
                                    arrAdditionalLines.push(element)
                                }
                            }
                        });

                        arrAdditionalLines.forEach((additional, line) => {
                            log.debug('addSublistFields additional', additional);
                            lineCount = arrAdditionalLines.length
                            for (const fieldId in additional) {
                                if (validateKeys(fieldId)) {
                                    let addValue = additional[fieldId];
                                    if (addValue || addValue === 0) {
                                        if (ARRFIELDTOFORMAT.includes(fieldId)) {
                                            addValue = floatToCurrency(addValue.toFixed(2));
                                        }
                                        sublist.setSublistValue({
                                            id: fieldId,
                                            line: line,
                                            value: addValue,
                                        });
                                    }
                                }
                            }
                        });
                        log.debug('addSublistFields lineCount', lineCount);
                        for (const key in item) {
                            if (validateKeys(key)) {
                                let value = item[key];
                                if (value || value === 0) {
                                    if (ARRFIELDTOFORMAT.includes(key)) {
                                        value = floatToCurrency(value.toFixed(2));
                                    }
                                    sublist.setSublistValue({
                                        id: key,
                                        line: lineCount + index,
                                        value: '<b>' + value + '</b>',
                                    });
                                }
                            }
                        }

                        // log.debug('addSublistFields arrData', arrData);

                        // log.debug('counter', counter)
                    });

                    
                    // Grand Total
                    // fnSetSublistValue('custpage_currency_head', 'Grand Total', sublist, arrParam);
                    // fnSetSublistValue('custpage_1_to_30_head', floatToCurrency(GT1To30.toFixed(2)), sublist, arrParam);
                    // fnSetSublistValue('custpage_31_to_60_head', floatToCurrency(GT31To60.toFixed(2)), sublist, arrParam);
                    // fnSetSublistValue('custpage_61_to_90_head', floatToCurrency(GT61To90.toFixed(2)), sublist, arrParam);
                    // fnSetSublistValue('custpage_over_90_head', floatToCurrency(GTOver90.toFixed(2)), sublist, arrParam);
                    // fnSetSublistValue('custpage_total_amount_head', floatToCurrency(GTAmount.toFixed(2)), sublist, arrParam);
                }
                
            } catch (err) {
                log.error("BUILD_FORM_ADD_SUBLIST_ERROR", err.message);
            }
        }

        const getEntity = (arrParam) => {
            try {
                log.debug('getEntity arrParam', arrParam);
        
                let entityDataMap = {};
        
                let filters = [
                    ['type', 'anyof', 'VendPymt', 'VendCred', 'VendBill', 'Journal', 'ExpRept'],
                    'AND',
                    ['mainline', 'is', 'T'],
                    'AND',
                    ['accounttype', 'anyof', 'AcctPay'],
                    'AND',
                    ['subsidiary', 'anyof', arrParam.entity],
                ];
        
                log.debug('filters', filters);
        
                let objSavedSearch = search.create({
                    type: 'transaction',
                    filters: filters,
                    columns: [
                        search.createColumn({ name: 'trandate', label: 'custpage_date_head' }),
                        search.createColumn({ name: 'custbody_invoice_date', label: 'custpage_invdate_head' }),
                        search.createColumn({ name: 'postingperiod', label: 'custpage_postingperiod_head' }),
                        search.createColumn({ name: 'tranid', label: 'custpage_id_head' }),
                        search.createColumn({ name: 'entity', label: 'custpage_entity_head' }),
                        search.createColumn({ name: 'entity', label: 'custpage_entity_text' }),
                        search.createColumn({ name: 'currency', label: 'custpage_currency_head' }),
                        search.createColumn({ name: 'exchangerate', label: 'custpage_exchange_rate_head' }),
                        search.createColumn({ name: 'custbody_this_week', label: 'custpage_this_week' }),
                        search.createColumn({ name: 'custbody_this_week_amount', label: 'custpage_this_week_amount' }),
                        search.createColumn({ name: 'custbody_next_week', label: 'custpage_next_week' }),
                        search.createColumn({ name: 'custbody_next_week_amount', label: 'custpage_next_week_amount' }),
                        search.createColumn({ name: 'memo', label: 'custpage_memo' }),
                        search.createColumn({ name: 'custbody_approve_for_payment', label: 'custpage_approve_for_payment' }),
                        search.createColumn({ name: 'formulanumeric', formula: '{TODAY}-{trandate}', label: 'custpage_formula_today_trandate' }),
                        search.createColumn({ name: 'formulacurrency', formula: 'case when ({TODAY}-{trandate})<1 then {fxamount} end', label: 'custpage_formula_less_1' }),
                        search.createColumn({ name: 'formulacurrency', formula: 'case when ({TODAY}-{trandate})between 1 and 30 then {fxamount} end', label: 'custpage_formula_1_3' }),
                        search.createColumn({ name: 'formulacurrency', formula: 'case when ({TODAY}-{trandate})between 31 and 60 then {fxamount} end', label: 'custpage_formula_31_60' }),
                        search.createColumn({ name: 'formulacurrency', formula: 'case when ({TODAY}-{trandate})between 61 and 90 then {fxamount} end', label: 'custpage_formula_61_90' }),
                        search.createColumn({ name: 'formulacurrency', formula: 'case when ({TODAY}-{trandate})>90 then {fxamount} end', label: 'custpage_formula_more_90' }),
                        search.createColumn({ name: 'fxamount', label: 'custpage_fxamount' }),
                        search.createColumn({ name: 'amount', label: 'custpage_amount' }),
                        search.createColumn({ name: 'duedate', label: 'custpage_duedate_head' }),
                        search.createColumn({ name: 'type', label: 'custpage_rec_type' }),
                        search.createColumn({ name: 'creditfxamount', label: 'custpage_credit_amount' }),
                        search.createColumn({ name: 'debitfxamount', label: 'custpage_debit_amount' }),
                    ],
                });
        
                let searchResultCount = objSavedSearch.runPaged().count;
            
                if (searchResultCount !== 0) {
                    let pagedData = objSavedSearch.runPaged({ pageSize: 1000 });
        
                    for (let i = 0; i < pagedData.pageRanges.length; i++) {
                        let currentPage = pagedData.fetch(i);
                        let pageData = currentPage.data;
                        var pageColumns = currentPage.data[0].columns;
                        if (pageData.length > 0) {
                            for (let pageResultIndex = 0; pageResultIndex < pageData.length; pageResultIndex++) {
                                let objData = {};
                                pageColumns.forEach(function (result) {
                                    let resultLabel = result.label;
                                    if (resultLabel == 'custpage_entity_text') {
                                        objData[resultLabel] = pageData[pageResultIndex].getText(result) ? pageData[pageResultIndex].getText(result) : "-None-";
                                    } else {
                                        objData[resultLabel] = pageData[pageResultIndex].getValue(result);
                                    }
                                });

                                if(objData.custpage_rec_type == 'Journal' || objData.custpage_rec_type == 'Expense Report'){
                                    if (objData.custpage_credit_amount){
                                        objData.custpage_amount = objData.custpage_credit_amount
                                    } else {
                                        objData.custpage_amount = objData.custpage_debit_amount
                                    }
                                } else {
                                    objData.custpage_amount = objData.custpage_amount
                                }
        
                                let intEntity = objData.custpage_entity_head;
                                let strEntity = objData.custpage_entity_text;
                                
                                let thisWeekAmt = objData.custpage_this_week_amount ? objData.custpage_this_week_amount : 0;
                                let nextWeekAmt = objData.custpage_next_week_amount ? objData.custpage_next_week_amount : 0;
                                let amount = objData.custpage_amount ? objData.custpage_amount : 0;
                                let formula1_3 = objData.custpage_formula_1_3 ? objData.custpage_formula_1_3 : 0;
                                let formula31_60 = objData.custpage_formula_31_60 ? objData.custpage_formula_31_60 : 0;
                                let formula61_90 = objData.custpage_formula_61_90 ? objData.custpage_formula_61_90  : 0;
                                let formulaMore90 = objData.custpage_formula_more_90 ? objData.custpage_formula_more_90 : 0;
                                let fxAmount = objData.custpage_fxamount ? objData.custpage_fxamount : 0;

                                let thisWeekAmount = thisWeekAmt ? parseFloat(thisWeekAmt) : 0;
                                let nextWeekAmount =  nextWeekAmt ? parseFloat(nextWeekAmt) : 0;
                                let rawAmount = amount ?  parseFloat(amount) : 0;
                                let raw1To30 =  formula1_3 ? parseFloat(formula1_3) : 0;
                                let raw31To60 =  formula31_60 ? parseFloat(formula31_60) : 0;
                                let raw61To90 =  formula61_90 ? parseFloat(formula61_90) : 0;
                                let rawOver90 =  formulaMore90 ? parseFloat(formulaMore90) : 0;
                                let rawTotalAmount =  fxAmount ? parseFloat(fxAmount) : 0;

                                if (!entityDataMap[intEntity]) {
                                    entityDataMap[intEntity] = {
                                        intEntity: intEntity,
                                        strEntity: strEntity,
                                        custpage_entity_text: strEntity,
                                        custpage_thisweekamt_head: thisWeekAmount ? thisWeekAmount : 0,
                                        custpage_nextweekamt_head: nextWeekAmount ? nextWeekAmount : 0,
                                        custpage_amount_head: rawAmount ? rawAmount : 0,
                                        custpage_1_to_30_head: raw1To30 ? raw1To30 : 0,
                                        custpage_31_to_60_head: raw31To60 ? raw31To60 : 0,
                                        custpage_61_to_90_head: raw61To90 ? raw61To90 : 0,
                                        custpage_over_90_head: rawOver90 ? rawOver90 : 0,
                                        custpage_total_amount_head: rawTotalAmount ? rawTotalAmount : 0,
                                        data: []
                                    };
                                } else {
                                    entityDataMap[intEntity].custpage_thisweekamt_head += thisWeekAmount;
                                    entityDataMap[intEntity].custpage_nextweekamt_head += nextWeekAmount;
                                    entityDataMap[intEntity].custpage_amount_head += rawAmount;
                                    entityDataMap[intEntity].custpage_1_to_30_head += raw1To30;
                                    entityDataMap[intEntity].custpage_31_to_60_head += raw31To60;
                                    entityDataMap[intEntity].custpage_61_to_90_head += raw61To90;
                                    entityDataMap[intEntity].custpage_over_90_head += rawOver90;
                                    entityDataMap[intEntity].custpage_total_amount_head += rawTotalAmount;
                                }
                            
                                entityDataMap[intEntity].data.push(objData);


                            }
                        }
                    }
                }
                
                let consolidatedResults = Object.values(entityDataMap);
                createFileLogs(JSON.stringify(consolidatedResults))
                log.debug(`getEntity consolidatedResults ${consolidatedResults.length}`, consolidatedResults);
                return consolidatedResults;
        
            } catch (err) {
                log.error('Error: getEntity', err.message);
            }
        }
        
        const floatToCurrency = (value) => {
            return format.format({value: Number(value), type: format.Type.CURRENCY});
        }

        const sumArray = (numbers) => {
            let results = 0;
            numbers.forEach(element => {
                results += parseFloat(element);
            });
            log.debug('sumArray results', results);
            return results;
        }

        const fnSetSublistValue = (id, value, sublist, arrParam) => {
            sublist.setSublistValue({
                id: id,
                line: arrParam.length,
                value: '<b>' + value + '</b>'
            });
        }

        const validateKeys = (fieldId) => {
            let blnValid = false
            for (var strKey in slMapping.SUITELET.form.sublistfields) {
                let key = slMapping.SUITELET.form.sublistfields[strKey].id
                if (fieldId == key) {
                    blnValid = true
                }
            }
            // log.debug('validateKeys', fieldId + blnValid)
            return blnValid
        }

        const createFileLogs = (arrLogs) => {
            log.debug('createFileLogs arrLogs', arrLogs)
            let today = new Date();
            let fileName = 'logs.txt';

            let fileObj = file.create({
                name: fileName,
                fileType: file.Type.PLAINTEXT,
                contents: arrLogs
            });

            fileObj.folder = 1797; // PROD

            let logId = fileObj.save();
            log.debug('createFileLogs logId', logId)
        }

        return { FORM, ACTIONS }

    });
