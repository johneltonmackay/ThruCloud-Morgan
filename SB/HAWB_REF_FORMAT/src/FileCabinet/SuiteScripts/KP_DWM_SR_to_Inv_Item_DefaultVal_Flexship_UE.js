/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/search','N/format'], 
function(record,search, format){

    /**
 * Function definition to be triggered before record is loaded.
 *a
 * @param {Object} scriptContext
 * @param {Record} scriptContext.newRecord - New record
 * @param {string} scriptContext.type - Trigger type
 * @param {Form} scriptContext.form - Current form
 * @Since 2015.2
 */
    
    function beforeLoad_sr_to_inv_default_item(scriptContext){
        try {
            log.debug('scriptContext.type', scriptContext.type)
            var invFlexshipRecord = scriptContext.newRecord;
            if(scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.UserEventType.COPY){
                
                var itemList = [124,118,114,111,106,104,108,112,109,105,103,292,293,126,119,139,298,125,120,107,115,143,144,116,302,127,350,349,110,135,138,140,142,342,371,98,117,128,136]
                log.debug('itemList',itemList.length)
                var srRateArr = [];
                var createdFrom = invFlexshipRecord.getValue({
                    fieldId: 'createdfrom'
                })
    
                log.debug('createdFrom',createdFrom)
                if(createdFrom){
                    var entityText = invFlexshipRecord.getText({
                        fieldId: 'entity'
                    })
    
                    var hawbVal = invFlexshipRecord.getText({
                        fieldId: 'cseg_hawborig'
                    })
    
    
                    var hawbDate = invFlexshipRecord.getValue({
                        fieldId: 'trandate'
                    })
    
                    var subVal = invFlexshipRecord.getValue({
                        fieldId: 'subsidiary'
                    })
         
            
                    invFlexshipRecord.setValue({
                        fieldId: 'custbody_hawbdate',
                        value: hawbDate
                    })
           
                    invFlexshipRecord.setValue({
                        fieldId: 'tranid',
                        value: hawbVal
                    })
    
                    var clientFuel = entityText.split(" ");
    
                    var SL = invFlexshipRecord.getValue({
                        fieldId: 'custbody_servicelevel'
                    })
        
                    var srFreight = invFlexshipRecord.getValue({
                        fieldId: 'custbody_freight'
                    })
                    srRateArr.push(srFreight)
        
                    var srDiscount = invFlexshipRecord.getValue({
                        fieldId: 'custbody_discount'
                    })
                    srRateArr.push(srDiscount)
        
                    var srFuel = invFlexshipRecord.getValue({
                        fieldId: 'custbody_fuel_surcharge'
                    })
                    srRateArr.push(srFuel)
        
                    var srWaitPU = invFlexshipRecord.getValue({
                        fieldId: 'custbody_wait_time_on_pickup'
                    })
                    srRateArr.push(srWaitPU)
        
                    var srWaitDel = invFlexshipRecord.getValue({
                        fieldId: 'custbody_wait_time_on_dlvy'
                    })
                    srRateArr.push(srWaitDel)
        
                    var srSameDayDel = invFlexshipRecord.getValue({
                        fieldId: 'custbody_same_day_delivery_requested'
                    })
                    srRateArr.push(srSameDayDel)
        
                    var srAHPU = invFlexshipRecord.getValue({
                        fieldId: 'custbody_after_hours_pickup'
                    })
                    srRateArr.push(srAHPU)
        
                    var srAHDel = invFlexshipRecord.getValue({
                        fieldId: 'custbody_after_hours_delivery'
                    })
                    srRateArr.push(srAHDel)
        
                    var srStorage = invFlexshipRecord.getValue({
                        fieldId: 'custbody_storage'
                    })
                    srRateArr.push(srStorage)
        
                    var srManpower = invFlexshipRecord.getValue({
                        fieldId: 'custbody_additional_manpower'
                    })
                    srRateArr.push(srManpower)
        
                    var srSmartPal = invFlexshipRecord.getValue({
                        fieldId: 'custbody_smart_pallet'
                    })
                    srRateArr.push(srSmartPal)
    
                    var srCFC = invFlexshipRecord.getValue({
                        fieldId: 'custbody_cfc'
                    })
                    srRateArr.push(srCFC)
        
                    var srFAG = invFlexshipRecord.getValue({
                        fieldId: 'custbody_fag'
                    })
                    srRateArr.push(srFAG)
    
                    var srHOL = invFlexshipRecord.getValue({
                        fieldId: 'custbody_weekend_or_holiday_delivery'
                    })
                    srRateArr.push(srHOL)
    
                    var srSpec = invFlexshipRecord.getValue({
                        fieldId: 'custbody_special'
                    })
                    srRateArr.push(srSpec)
    
                    var srHand = invFlexshipRecord.getValue({
                        fieldId: 'custbody_handling'
                    })
                    srRateArr.push(srHand)
        
                    var srSH = invFlexshipRecord.getValue({
                        fieldId: 'custbody_special_handling'
                    })
                    srRateArr.push(srSH)
    
                    var srHAZ = invFlexshipRecord.getValue({
                        fieldId: 'custbody_hazardous_cargo'
                    })
                    srRateArr.push(srHAZ)
        
                    var srLF = invFlexshipRecord.getValue({
                        fieldId: 'custbody_layover_fee'
                    })
                    srRateArr.push(srLF)
    
                    var srWPD = invFlexshipRecord.getValue({
                        fieldId: 'custbody_weekend_pickup_dlvy'
                    })
                    srRateArr.push(srWPD)
    
                    var srDet = invFlexshipRecord.getValue({
                        fieldId: 'custbody_detention_charge'
                    })
                    srRateArr.push(srDet)
    
                    var srVehOrigin = invFlexshipRecord.getValue({
                        fieldId: 'custbody_vehicle_waiting_time_origin'
                    })
                    srRateArr.push(srVehOrigin)
    
                    var srVehDest = invFlexshipRecord.getValue({
                        fieldId: 'custbody_vehicle_waiting_time_dest'
                    })
                    srRateArr.push(srVehDest)
    
                    var srTruckOrder = invFlexshipRecord.getValue({
                        fieldId: 'custbody_truck_ordered_not_used'
                    })
                    srRateArr.push(srTruckOrder)
    
                    var srAttemptedPU = invFlexshipRecord.getValue({
                        fieldId: 'custbody_attempted_pickup'
                    })
                    srRateArr.push(srAttemptedPU)
    
                    var srHUL = invFlexshipRecord.getValue({
                        fieldId: 'custbody_lift_gate_truck_or_forklift'
                    })
    
                    srRateArr.push(srHUL)
                    
                    var srHHB = invFlexshipRecord.getValue({
                        fieldId: 'custbody_brokerage_govt_fees'
                    })
                    
                    srRateArr.push(srHHB)
                    var sr104 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_screening'
                    })
                    srRateArr.push(sr104)
                    var sr263 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_overtime_charges'
                    })
                    srRateArr.push(sr263)
                    var sr298 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_break_bulk_fee'
                    })
                    srRateArr.push(sr298)
                    var sr365 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_edi_fee'
                    })
                    srRateArr.push(sr365)
                    var srCSF = invFlexshipRecord.getValue({
                        fieldId: 'custbody_customs_formalities'
                    })
                    srRateArr.push(srCSF)
                    var srPUD = invFlexshipRecord.getValue({
                        fieldId: 'custbody_stop_fee'
                    })
                    srRateArr.push(srPUD)
                    var srSCD = invFlexshipRecord.getValue({
                        fieldId: 'custbody_brokerage_customs_duties'
                    })
                    srRateArr.push(srSCD)
                    var sr6 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_attempted_delivery'
                    })
                    srRateArr.push(sr6)
                    var sr10 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_dock_fee'
                    })
                    srRateArr.push(sr10)
                    var sr505 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_warehouse_pick_and_pack'
                    })
                    srRateArr.push(sr505)
                    var srSTR = invFlexshipRecord.getValue({
                        fieldId: 'custbody_storage_at_destination'
                    })
                    srRateArr.push(srSTR)
                    var sr315 = invFlexshipRecord.getValue({
                        fieldId: 'custbody_government_duties_and_taxes'
                    })
                    srRateArr.push(sr315)
                    log.debug('Array List',srRateArr)
                    var isItemFreight = invFlexshipRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        line: 0
                    });
                    
                    var srRateObj = new Array;
                    log.debug('srRateArr length',srRateArr.length)
                    log.debug('srRateArr',srRateArr)
                    for(var j=0; j<srRateArr.length; j++){
                        if(srRateArr[j]){
                           // log.debug('clientFuel[0]',clientFuel[0])
                            log.debug('j',j)
                            //log.debug('SL',SL)
                            if(j==2 && (clientFuel[0] == 'INTEL' && (SL != 15 && SL != 113 && SL != 102))){
                                log.debug('if Fuel',291)
                                srRateObj.push({
                                    "itemno": 291,
                                    "rate": srRateArr[j],
                                }); 
                            }
                            else{
                               log.debug('Regular item List',itemList[j])
                                srRateObj.push({
                                    "itemno": itemList[j],
                                    "rate": srRateArr[j],
                                }); 
                                
                            }
                        }
                        else if(!srRateArr[j] && j==0){
                           srRateObj.push({
                                    "itemno": itemList[j],
                                    "rate": 0,
                                }); 
                        }
                    }
                   
                    if(isItemFreight == 124){
                        log.debug('srRateObj length',srRateObj.length)
                        log.debug('srRateObj',srRateObj)
                        for(var i=0; i<srRateObj.length; i++){
                            log.debug('srRateObj[i].itemno',srRateObj[i].itemno)
                                invFlexshipRecord.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'item',
                                    line: i,
                                    value: srRateObj[i].itemno
                                });
    
                                var itemDept = search.lookupFields({
                                    type: search.Type.ITEM,
                                    id: srRateObj[i].itemno,
                                    columns: ['salesdescription']
                                });
    
                                log.debug('itemDept.salesdescription',itemDept.salesdescription)
                                if(itemDept.salesdescription){
                                    log.debug('Here if')
                                    invFlexshipRecord.setSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'description',
                                        line: i,
                                        value: itemDept.salesdescription
                                    });
                                }   
                               
    
                                invFlexshipRecord.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'quantity',
                                    line: i,
                                    value: 1
                                });
    
                                log.debug('srRateObj[i].rate',srRateObj[i].rate)
    
                                invFlexshipRecord.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'rate',
                                    line: i,
                                    value: srRateObj[i].rate
                                });
                                invFlexshipRecord.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'amount',
                                    line: i,
                                    value: srRateObj[i].rate
                                });
    
                                if(subVal == 20){
                                    invFlexshipRecord.setSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'taxcode',
                                        line: i,
                                        value: 246
                                    });
                                }
                        }
                    }    
                }
    
               var freightFieldArr = [];
                var billAcc = invFlexshipRecord.getValue({
                    fieldId: 'custbody_billtoaccount'
                })
                var SL = invFlexshipRecord.getValue({
                    fieldId: 'custbody_servicelevel'
                })
                var hawbDate = invFlexshipRecord.getValue({
                    fieldId: 'trandate'
                })
    
                var hawbDateOnly;
                if(hawbDate){
                    hawbDateOnly = format.format({
                        value: hawbDate,
                        type: format.Type.DATE
                    });
                }
                
    
                var origin = invFlexshipRecord.getValue({
                    fieldId: 'custbody_origin'
                })
                var dest = invFlexshipRecord.getValue({
                    fieldId: 'custbody_destination'
                })
    
                var shipperAddress = invFlexshipRecord.getValue({
                    fieldId: 'custbody_shipper_address'
                })
                var consigneeAddress = invFlexshipRecord.getValue({
                    fieldId: 'custbody_consignee_address'
                })
                if(billAcc && SL && hawbDateOnly && origin && dest && shipperAddress && consigneeAddress){
                    var customrecord_freightratetableSearchColItemName = search.createColumn({ name: 'custrecord_accessorialcodes' });
                    var customrecord_freightratetableSearchColValueBy = search.createColumn({ name: 'custrecord_valueby' });
                    var customrecord_freightratetableSearchColValue = search.createColumn({ name: 'custrecord_valuecust' });
                    var customrecord_freightratetableSearchColMinweight = search.createColumn({ name: 'custrecord_minweight' });
                    var customrecord_freightratetableSearchColMaxweight = search.createColumn({ name: 'custrecord_maxweight' });
                                                                      
                    var customrecord_freightratetableSearchFreight = search.create({
                        type: 'customrecord_freightratetable',
                        filters: [
                            ['custrecord_billtocode', 'anyof', billAcc],
                            'AND',
                            ['custrecord_itemname', 'anyof', '124'],
                            'AND',
                            ['custrecord_servicelevel', 'anyof', SL],
                            'AND',
                            ['custrecord_startdate', 'onorbefore', hawbDateOnly],
                            'AND',
                            ['custrecord_enddate', 'onorafter', hawbDateOnly],
                            'AND',
                            [
                                [
                                    ['custrecord_originairport', 'anyof', origin],
                                    'AND',
                                    ['custrecord_destairport', 'anyof', dest],
                                ],
                                'OR',
                                [
                                    ['custrecord_originaddress', 'contains', shipperAddress],
                                    'AND',
                                    ['custrecord_destinationaddress', 'contains', consigneeAddress],
                                ],
                            ],
                            'AND',
                            ['isinactive', 'is', 'F'],  
                        ],
                        columns: [
                            customrecord_freightratetableSearchColItemName,
                            customrecord_freightratetableSearchColValueBy,
                            customrecord_freightratetableSearchColValue,
                            customrecord_freightratetableSearchColMinweight,
                            customrecord_freightratetableSearchColMaxweight 
                        ],
                    });
                            
                    var myResultSetFreight = customrecord_freightratetableSearchFreight.runPaged({ pageSize: 1000 });
                    //log.debug('myResultSetFreight.pageRanges.length',myResultSetFreight.pageRanges.length)
                    for (var k = 0; k < myResultSetFreight.pageRanges.length; k++) {
                        var freightSearchPage = myResultSetFreight.fetch({ index: k });
                        freightSearchPage.data.forEach(function (result) {
                            //get values
                            var codeArr = new Array();
                            var codes = result.getValue({
                                name: 'custrecord_accessorialcodes'
                            });
    
                            codeArr = codes.split(',')
                            //log.debug('codeArr',codeArr)
                            //log.debug('codes',codes)
    
                                                        
                            if(codeArr.indexOf("124") !== -1) {
                                var valueBy = result.getValue({
                                    name: 'custrecord_valueby'
                                });
                                    
                                var value = result.getValue({
                                    name: 'custrecord_valuecust'
                                });
    
                                var minWeight = result.getValue({
                                    name: 'custrecord_minweight'
                                });
        
                                var maxWeight = result.getValue({
                                    name: 'custrecord_maxweight'
                                });
        
                                //log.debug('valueBy',valueBy)
                            
        
                                var internalId = result.id;
    
                           
                                freightFieldArr.push({
                                    "id" : internalId,
                                    "valueby" : valueBy,
                                    "val" : value,
                                    "minwt" : minWeight,
                                    "maxwt" : maxWeight
                                })                       
                            }
                        })
                    }
                    var actWt = invFlexshipRecord.getValue({
                        fieldId: 'custbody_actualweight'
                    });
                    if(!actWt) actWt=0;
                    var dimWt = invFlexshipRecord.getValue({
                        fieldId: 'custbody_dim_weight'
                    });
                    if(!dimWt) dimWt=0;
                    if(actWt>dimWt){
                        var wtUse = actWt;
                    }
                    else{
                        var wtUse = dimWt;
                    }
                    var rateUse;
                    log.debug('wtUse',wtUse)
                    log.debug('freightFieldArr',freightFieldArr)
                    log.debug('freightFieldArr',freightFieldArr.length)
                    if(freightFieldArr.length == 0){
                        var rateUse = .00;
                    }
                    else{
                        for(var j=0;j<freightFieldArr.length;j++){
                            if(freightFieldArr[j].minwt == 0 && freightFieldArr[j].maxwt == 0){
                            log.debug('If',freightFieldArr)
                                if(freightFieldArr[j].valueby == 1){
                                    rateUse = .00;
                                    log.debug('If if',rateUse)
                                }
                                else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                    rateUse = freightFieldArr[j].val;
                                    //rateUse = rateUse.toFixed(2);
                                    log.debug('If else',rateUse)
                                }
                            }
                            else if(parseFloat(freightFieldArr[j].minwt) < wtUse && freightFieldArr[j].maxwt == 0){
                            log.debug('else If',freightFieldArr)
                                if(freightFieldArr[j].valueby == 1){
                                    rateUse = .00;
                                    log.debug('else if if',rateUse)
                                }
                                else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                    rateUse = freightFieldArr[j].val;
                                    //rateUse = rateUse.toFixed(2);
                                    log.debug('else if else if',rateUse)
                                                                    
                                }
                            }
                            else if(freightFieldArr[j].minwt == 0 && parseFloat(freightFieldArr[j].maxwt) > wtUse){
                                log.debug('else If 2',freightFieldArr)
                                if(freightFieldArr[j].valueby == 1 ){
                                    rateUse = .00;
                                    log.debug('else if if 3',rateUse)
                                }
                                else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                    rateUse =freightFieldArr[j].val;
                                    //rateUse = rateUse.toFixed(2);
                                    log.debug('else if else if 3',rateUse)
                                }
                            }
                        }                        
                    }
                    log.debug('rateUse',rateUse)
                    invFlexshipRecord.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_rate_edi',
                        line: 0,
                        value: rateUse
                    });
                }
                
    
                log.debug('createdFrom',createdFrom)
    
                if(createdFrom){
                    let blnValidator = true
                    var hawbRefEntry = null
                    var srRec = record.load({
                        type: record.Type.SALES_ORDER,
                        id: createdFrom
                    });

                    var hawbrefLine = srRec.getLineCount({
                        sublistId: 'recmachcustrecord_sr'
                    });
                    log.debug('hawbrefLine',hawbrefLine)
                    var hawbrefArr = [];
                    for(var j = 0; j<hawbrefLine; j++){
                        var hawbrefName = srRec.getSublistValue({
                            sublistId: 'recmachcustrecord_sr',
                            fieldId: 'name',
                            line: j
                        }); 
    
                        var hawbReftype = srRec.getSublistValue({
                            sublistId: 'recmachcustrecord_sr',
                            fieldId: 'custrecord_referencetype_display',
                            line: j
                        }); 

                        var hawbReftypeId = srRec.getSublistValue({
                            sublistId: 'recmachcustrecord_sr',
                            fieldId: 'custrecord_referencetype',
                            line: j
                        });
                        
                        if (hawbReftypeId == '4'){ // PO
                            let arrCommodityType = ['CAPITAL', 'CONSTRUCT', 'CONSTANT']
                            let strCustomer = srRec.getText({
                                fieldId: 'entity'
                            })
        
                            let intServiceLevel = srRec.getValue({
                                fieldId: 'custbody_servicelevel'
                            })

                            let strCommodityType = srRec.getValue({
                                fieldId: 'custbody_commodity_type'
                            })

                            if (strCustomer.includes('INTEL') && intServiceLevel =='88'){ // 0TG
                                blnValidator = false
                            } else if (strCustomer.includes('INTEL') && arrCommodityType.includes(strCommodityType)){
                                blnValidator = false
                            } else {
                                blnValidator = true
                            }
                        } else {
                            blnValidator = true
                        }
                        
                        if (blnValidator){
                            hawbRefEntry = hawbReftype + '*' + hawbrefName;
                        } else {
                            hawbRefEntry = hawbrefName;
                        }
                        hawbrefArr.push(hawbRefEntry)

                    }
                    var hawbrefText = hawbrefArr.join();

                    log.debug('hawbrefArr',hawbrefArr)
                    log.debug('hawbrefText',hawbrefText)
                    invFlexshipRecord.setValue({
                        fieldId: 'custbody_hawb_ref_text',
                        value: hawbrefText
                    })
    
                    var dimsLine = srRec.getLineCount({
                        sublistId: 'recmachcustrecord_sr_dims'
                    });
                    log.debug('dimsLine',dimsLine)
                    var dimArr = [];
                    for(var y = 0; y<dimsLine; y++){
                        var length = srRec.getSublistValue({
                            sublistId: 'recmachcustrecord_sr_dims',
                            fieldId: 'custrecord_length_new',
                            line: y
                        }); 
        
                        var width = srRec.getSublistValue({
                            sublistId: 'recmachcustrecord_sr_dims',
                            fieldId: 'custrecord_width_new',
                            line: y
                        }); 
        
                        var height = srRec.getSublistValue({
                            sublistId: 'recmachcustrecord_sr_dims',
                            fieldId: 'custrecord_height_new',
                            line: y
                        }); 
        
                       
        
                        var dimEntry = length + '*' + width +'*'+ height;
                        log.debug('dimEntry',dimEntry)
                        dimArr.push(dimEntry)
    
                    }
                    log.debug('dimArr',dimArr)
                    var dimText = dimArr.join();
                    log.debug('dimText',dimText)
                    invFlexshipRecord.setValue({
                        fieldId: 'custbody_dims_ref_text',
                        value: dimText
                    })
                }
            }   
        } catch (error) {
            log.error('beforeLoad_sr_to_inv_default_item Error', error)
        }
    }

    // function beforeSubmit_sr_to_inv_default_item(scriptContext) {
        
    // }
    

    function afterSubmit_sr_to_inv_default_item(scriptContext){
        var invFlexshipRecord = scriptContext.newRecord;
        let strId = invFlexshipRecord.id
        let recType = invFlexshipRecord.type
        if(scriptContext.type === scriptContext.UserEventType.CREATE){
            var createdFrom = invFlexshipRecord.getValue({
                fieldId: 'createdfrom'
            })

            log.debug('createdFrom',createdFrom)
            if(createdFrom){
                var srRec = record.load({
                    type: record.Type.SALES_ORDER,
                    id: createdFrom,
                    isDynamic: true,
                });

                var hawbrefLine = srRec.getLineCount({
                    sublistId: 'recmachcustrecord_sr'
                });

                for(var j = 0; j<hawbrefLine; j++){
                    var HawbRefId = srRec.getSublistValue({
                        sublistId: 'recmachcustrecord_sr',
                        fieldId: 'id',
                        line: j
                    }); 

                    log.debug('HawbRefId',HawbRefId)

                    var hawbRefRec = record.submitFields({
                        type: 'customrecord_hawb_reference_num',
                        id: HawbRefId,
                        values: {
                            custrecord_cust_inv: invFlexshipRecord.id
                        }
                    });
                    log.debug('hawbRefRec',hawbRefRec)

                }

                var dimsLine = srRec.getLineCount({
                    sublistId: 'recmachcustrecord_sr_dims'
                });

                for(var l = 0; l<dimsLine; l++){
                    var dimsId = srRec.getSublistValue({
                        sublistId: 'recmachcustrecord_sr_dims',
                        fieldId: 'id',
                        line: l
                    }); 

                    log.debug('dimsId',dimsId)

                    var dimRec = record.submitFields({
                        type: 'customrecord_dimensions',
                        id: dimsId,
                        values: {
                            custrecord_dims_custinv: invFlexshipRecord.id
                        }
                    });
                    log.debug('dimRec',dimRec)

                }

                addAccessorialCode(strId, recType)

            }
        }
    }

    // Private Function

    const addAccessorialCode = (strId, recType) => {
        log.debug('START addAccessorialCode')
        const ARR_FIELDID = ['custbody_detention_of_trailers', 'custbody_permit_escort_charges', 'custbody_stop_off_charge', 'custbody_layover_charges_destination', 'custbody_cancelled_order_origin'];
        let arrFieldValues = [];
        let objRecord = record.load({
            type: recType,
            id: strId,
            isDynamic: true,
        });
        log.debug("objRecord", objRecord)
        if (objRecord){
            ARR_FIELDID.forEach(strFieldId => {
                let objFieldValues = {}; // Create a new object for each iteration
                let strFieldValue = objRecord.getValue({
                    fieldId: strFieldId
                });
                if (strFieldValue) {
                    objFieldValues[strFieldId] = strFieldValue;
                    arrFieldValues.push(objFieldValues);
                }
            });
            log.debug('arrFieldValues', arrFieldValues);
            
            let numLines = objRecord.getLineCount({
                sublistId: 'item'
            });
        
            if (arrFieldValues.length > 0) {
                for (var i = 0; i < arrFieldValues.length; i++) {
                    let fieldValueObj = arrFieldValues[i];
            
                    // Loop through each key in the object fieldValueObj
                    for (const key in fieldValueObj) {
                        if (fieldValueObj.hasOwnProperty(key)) {
                            const value = fieldValueObj[key];
                            objRecord.selectLine({
                                sublistId: 'item',
                                line: numLines + i
                            });
                            let objAccessorialCode = getAccessorialCode(key)
                            objRecord.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'item',
                                value: objAccessorialCode.intCharges
                            });
                            objRecord.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'description',
                                value: objAccessorialCode.strDescription
                            });
                            objRecord.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'amount',
                                value: value
                            });
                            objRecord.commitLine({
                                sublistId: 'item'
                            });
            
                            log.debug(`Key: ${key}, Value: ${value}`);
                        }
                    }
                }
                let recordId = objRecord.save()
                log.debug('addAccessorialCode recordId', recordId)
            }
        }
    }

    const getAccessorialCode = (fieldId) => {
        let objAccessorialCode = {}
        switch (fieldId) {
        case 'custbody_detention_of_trailers':
            objAccessorialCode.intCharges = 123;
            objAccessorialCode.strDescription = "Detention of Trailers"
            break;
        case 'custbody_permit_escort_charges':
            objAccessorialCode.intCharges = 378;
            objAccessorialCode.strDescription = "Permit/Escort charges"
            break;
        case 'custbody_stop_off_charge':
            objAccessorialCode.intCharges = 379;
            objAccessorialCode.strDescription = "Stop Off Charge"
            break;
        case 'custbody_layover_charges_destination':
            objAccessorialCode.intCharges = 380;
            objAccessorialCode.strDescription = "Layover Charges Destination"
            break;
        case 'custbody_cancelled_order_origin':
            objAccessorialCode.intCharges = 381;
            objAccessorialCode.strDescription = "Cancelled Order Origin"
            break;
        default:
            objAccessorialCode.intCharges = null;
            objAccessorialCode.strDescription = null
        }
        log.debug('getAccessorialCode objAccessorialCode', objAccessorialCode)
        return objAccessorialCode
    }
    


    return {
       beforeLoad: beforeLoad_sr_to_inv_default_item,
    //    beforeSubmit: beforeSubmit_sr_to_inv_default_item,
       afterSubmit: afterSubmit_sr_to_inv_default_item
    };

});