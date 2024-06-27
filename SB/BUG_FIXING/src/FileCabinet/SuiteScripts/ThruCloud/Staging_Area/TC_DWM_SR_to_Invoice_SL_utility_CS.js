/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime','N/currentRecord', 'N/search', 'N/record','N/url', 'N/ui/dialog','N/format','N/https'],

function(runtime, currentRecord, search, record, url, dialog, format, https) {

    const ARR_FIELDIDS = [
        'custpage_freight', 'custpage_discount', 'custpage_fuel', 'custpage_wait_time_pick_up', 'custpage_wait_time_delivery', 'custpage_same_day_delivery',
        'custpage_after_hours_pick_up', 'custpage_after_hours_delivery', 'custpage_storage', 'custpage_manpower', 'custpage_smart_pallet', 'custpage_cfc',
        'custpage_fag', 'custpage_hol', 'custpage_special', 'custpage_handling', 'custpage_special_handling', 'custpage_haz', 'custpage_layover', 
        'custpage_weekend_pickup_delivery', 'custpage_detention', 'custpage_veh_wait_time_origin', 'custpage_veh_wait_time_dest', 'custpage_truck_order',
        'custpage_attempted_pick_up', 'custpage_hul', 'custpage_hhb', 'custpage_screening', 'custpage_ot_charge', 'custpage_break_bulk_fee', 'custpage_edi_fee',
        'custpage_custom_formalities', 'custpage_stop_fee', 'custpage_bcd', 'custpage_attempted_del', 'custpage_dock_fee', 'custpage_wh_pick_pack', 'custpage_storage_dest',
        'custpage_gov_duty_tax', 'custpage_detention_of_trailers', 'custpage_permit_escort_charges', 'custpage_stop_off_charge', 'custpage_layover_charges_destination',
        'custpage_cancelled_order_origin', 'custpage_border_crossing'
    ]

    function pageInit_sr_to_inv(scriptContext) {
        var currRecObj = currentRecord.get();
        var myUser = runtime.getCurrentUser();

        var srListCount = currRecObj.getLineCount({
            sublistId: 'custpage_shipment_list'
        });
        
        if(srListCount>0){
            for(var i=0;i<srListCount;i++){
                var ownedBy =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_owner',
                    line: i
                });

                if(ownedBy){
                    if(ownedBy != myUser.name){
                        var inUse = currRecObj.getSublistField({
                            sublistId: 'custpage_shipment_list',
                            fieldId: 'custpage_shipment_mark',
                            line: i
                        });
                        inUse.isDisabled = true;
                    }
                }

                var totalArr = [];
                var ac1 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_freight',
                    line: i
                });

                var ac2 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_discount',
                    line: i
                });

                var ac3 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_fuel',
                    line: i
                });

                var ac4 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_wait_time_pick_up',
                    line: i
                });

                var ac5 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_wait_time_delivery',
                    line: i
                });

                var ac6 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_same_day_delivery',
                    line: i
                });

                var ac7 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_after_hours_pick_up',
                    line: i
                });

                var ac8 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_after_hours_delivery',
                    line: i
                });

                var ac9 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_storage',
                    line: i
                });
                var ac10 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_manpower',
                    line: i
                });

                var ac11 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_smart_pallet',
                    line: i
                });

                var ac12 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_cfc',
                    line: i
                });

                var ac13 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_fag',
                    line: i
                });

                var ac14 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_hol',
                    line: i
                });

                var ac15 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_special',
                    line: i
                });

                var ac16 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_handling',
                    line: i
                });

                var ac17 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_special_handling',
                    line: i
                });

                var ac18 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_haz',
                    line: i
                });

                var ac19 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_layover',
                    line: i
                });
                var ac20 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_weekend_pickup_delivery',
                    line: i
                });

                var ac21 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_detention',
                    line: i
                });

                var ac22 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_veh_wait_time_origin',
                    line: i
                });

                var ac23 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_veh_wait_time_dest',
                    line: i
                });

                var ac24 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_truck_order',
                    line: i
                });
                var ac25 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_attempted_pick_up',
                    line: i
                });

                var ac26 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_hul',
                    line: i
                });

                var ac27 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_hhb',
                    line: i
                });

                var ac28 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_screening',
                    line: i
                });

                var ac29 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_ot_charge',
                    line: i
                });

                var ac30 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_break_bulk_fee',
                    line: i
                });

                var ac31 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_edi_fee',
                    line: i
                });

                var ac32 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_custom_formalities',
                    line: i
                });

                var ac33 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_stop_fee',
                    line: i
                });

                var ac34 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_bcd',
                    line: i
                });

                var ac35 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_attempted_del',
                    line: i
                });

                var ac36 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_dock_fee',
                    line: i
                });

                var ac37 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_wh_pick_pack',
                    line: i
                });

                var ac38 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_storage_dest',
                    line: i
                });

                var ac39 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_gov_duty_tax',
                    line: i
                });

                var ac40 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_detention_of_trailers',
                    line: i
                });

                var ac41 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_permit_escort_charges',
                    line: i
                });

                var ac42 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_stop_off_charge',
                    line: i
                });

                var ac43 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_layover_charges_destination',
                    line: i
                });

                var ac44 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_cancelled_order_origin',
                    line: i
                });

                var ac45 =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_border_crossing',
                    line: i
                });

                if(ac1){
                    totalArr.push(ac1)
                }

                if(ac2){
                    totalArr.push(ac2)
                }
                if(ac3){
                    totalArr.push(ac3)
                }
                if(ac4){
                    totalArr.push(ac4)
                }

                if(ac5){
                    totalArr.push(ac5)
                }
                if(ac6){
                    totalArr.push(ac6)
                }
                if(ac7){
                    totalArr.push(ac7)
                }
                if(ac8){
                    totalArr.push(ac8)
                }
                if(ac9){
                    totalArr.push(ac9)
                }

                if(ac10){
                    totalArr.push(ac10)
                }

                if(ac11){
                    totalArr.push(ac11)
                }

                if(ac12){
                    totalArr.push(ac12)
                }
                if(ac13){
                    totalArr.push(ac13)
                }
                if(ac14){
                    totalArr.push(ac14)
                }

                if(ac15){
                    totalArr.push(ac15)
                }
                if(ac16){
                    totalArr.push(ac16)
                }
                if(ac17){
                    totalArr.push(ac17)
                }
                if(ac18){
                    totalArr.push(ac18)
                }
                if(ac19){
                    totalArr.push(ac19)
                }

                if(ac20){
                    totalArr.push(ac20)
                }

                if(ac21){
                    totalArr.push(ac21)
                }
                if(ac22){
                    totalArr.push(ac22)
                }

                if(ac23){
                    totalArr.push(ac23)
                }
                if(ac24){
                    totalArr.push(ac24)
                }
                if(ac25){
                    totalArr.push(ac25)
                }

                if(ac26){
                    totalArr.push(ac26)
                }
                if(ac27){
                    totalArr.push(ac27)
                }
                if(ac28){
                    totalArr.push(ac28)
                }
                if(ac29){
                    totalArr.push(ac29)
                }

                if(ac30){
                    totalArr.push(ac30)
                }

                if(ac31){
                    totalArr.push(ac31)
                }
                if(ac32){
                    totalArr.push(ac32)
                }

                if(ac33){
                    totalArr.push(ac33)
                }
                if(ac34){
                    totalArr.push(ac34)
                }
                if(ac35){
                    totalArr.push(ac35)
                }

                if(ac36){
                    totalArr.push(ac36)
                }
                if(ac37){
                    totalArr.push(ac37)
                }
                if(ac38){
                    totalArr.push(ac38)
                }
                if(ac39){
                    totalArr.push(ac39)
                }
                if(ac40){
                    totalArr.push(ac40)
                }
                if(ac41){
                    totalArr.push(ac41)
                }
                if(ac42){
                    totalArr.push(ac42)
                }
                if(ac43){
                    totalArr.push(ac43)
                }
                if(ac44){
                    totalArr.push(ac44)
                }
                if(ac45){
                    totalArr.push(ac45)
                }
                
                var totalAC = 0;

                for (var k = 0; k < totalArr.length; k++) {
                    totalAC = parseFloat(totalAC) + parseFloat(totalArr[k]);
                }
        
                totalAC = totalAC.toFixed(2);
                //console.log('totalAC', totalAC)
                currRecObj.selectLine({sublistId: 'custpage_shipment_list', line: i});
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_total',
                    value: totalAC,
                    forceSyncSourcing: true
                });
                
                currRecObj.commitLine({sublistId: 'custpage_shipment_list'})

                var totalLine = currRecObj.getSublistField({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_total',
                    line: i
                });
                totalLine.isDisabled = true;

            }
        }
    }

    function fieldChanged_sr_to_inv_search(scriptContext) {
        // console.log('fieldChanging', scriptContext.fieldId)
        var currRecObj = currentRecord.get();
        var pageId

        if (scriptContext.fieldId == 'custpage_form_entity'){
            var entityVal = currRecObj.getValue({
                fieldId: 'custpage_form_entity'
            });

            var suiteletURL = url.resolveScript({
                scriptId: 'customscript_tc_staging_area_sl',
                deploymentId: 'customdeploy_tc_staging_area_sl',
                params: {
                    entity : entityVal
                }
            });
            window.location.href = suiteletURL
        }

        if (scriptContext.fieldId == 'custpage_pageid'){
            var entityVal = currRecObj.getValue({
                fieldId: 'custpage_form_entity'
            });

          pageId = currRecObj.getValue({
                fieldId: 'custpage_pageid'
            });

          pageId = parseInt(pageId.split('_')[1]);

		      currRecObj.setValue({
                fieldId: 'custpage_form_pagefield',
                value: pageId
            });

            var shipmentStatus = currRecObj.getValue({
                fieldId: 'custpage_form_shipmentstatus'
            });
    
            var billtoCode = currRecObj.getValue({
                fieldId: 'custpage_form_billtocode'
            });
    
            var customerAccCode = currRecObj.getValue({
                fieldId: 'custpage_form_customeraccountcode'
            });
    
            var hawb = currRecObj.getValue({
                fieldId: 'custpage_form_hawb_filter'
            });
    
            var origin = currRecObj.getValue({
                fieldId: 'custpage_form_origin'
            });
    
            var destination = currRecObj.getValue({
                fieldId: 'custpage_form_destinantion'
            });
    
            var pickupDate = currRecObj.getValue({
                fieldId: 'custpage_form_pickupdate'
            });
    
            var deliverDate = currRecObj.getValue({
                fieldId: 'custpage_form_deliver_date'
            });
    
            var hawbDate = currRecObj.getValue({
                fieldId: 'custpage_form_hawbdate'
            });
    
            var handover = currRecObj.getValue({
                fieldId: 'custpage_form_handover'
            });
    
            var serviceLevel = currRecObj.getValue({
                fieldId: 'custpage_form_servicelevel'
            });
    
            var ShipperCompany = currRecObj.getValue({
                fieldId: 'custpage_form_shippercompany'
            });
    
            var ShipperAddress = currRecObj.getValue({
                fieldId: 'custpage_form_shipperaddress'
            });
    
            var ConsigneeCompany = currRecObj.getValue({
                fieldId: 'custpage_form_consigneecompany'
            });
    
            var ConsigneeAddress = currRecObj.getValue({
                fieldId: 'custpage_form_consigneeaddress'
            });
    
            var CommodityType = currRecObj.getValue({
                fieldId: 'custpage_form_commoditytype'
            });
    
            var Mode = currRecObj.getValue({
                fieldId: 'custpage_form_mode'
            });
    
            var Zone = currRecObj.getValue({
                fieldId: 'custpage_form_zone'
            });
    
            var Program = currRecObj.getValue({
                fieldId: 'custpage_form_program'
            });
    
            var Distance = currRecObj.getValue({
                fieldId: 'custpage_form_distance'
            });
    
            var TruckId = currRecObj.getValue({
                fieldId: 'custpage_form_truckid'
            });
    
            var Control = currRecObj.getValue({
                fieldId: 'custpage_form_control'
            });
    
            var EquipmentCode = currRecObj.getValue({
                fieldId: 'custpage_form_equipment_code'
            });
    
            var status = currRecObj.getValue({
                fieldId: 'custpage_form_status'
            });

            var invdate = currRecObj.getValue({
                fieldId: 'custpage_form_invoice_date'
            });

            var datecreated = currRecObj.getValue({
                fieldId: 'custpage_form_date_created'
            });
    

           var suiteletURL = url.resolveScript({
            scriptId: 'customscript_tc_staging_area_sl',
            deploymentId: 'customdeploy_tc_staging_area_sl',
            params: {
                    page : pageId,
                    entity : entityVal,
                    ShipmentStatus : shipmentStatus,
                    BilltoCode : billtoCode,
                    CustomerAccountCode : customerAccCode,
                    HAWB : hawb,
                    Origin : origin,
                    Destination : destination,
                    PickupDate : pickupDate,
                    DeliverDate : deliverDate,
                    HAWBDate : hawbDate,
                    Handover : handover,
                    ServiceLevel : serviceLevel,
                    ShipperCompany : ShipperCompany,
                    ShipperAddress :ShipperAddress,
                    ConsigneeCompany : ConsigneeCompany,
                    ConsigneeAddress : ConsigneeAddress,
                    CommodityType : CommodityType,
                    Mode : Mode,
                    Zone : Zone,
                    Program : Program,
                    Distance : Distance,
                    TruckId : TruckId,
                    Control : Control,
                    EquipmentCode : EquipmentCode,
                    Status : status,
                    invdate : invdate,
                    datecreated : datecreated

            }
           });
           window.location.href = suiteletURL
        }

        if (ARR_FIELDIDS.includes(scriptContext.fieldId)) {
            calculateCharges(scriptContext, currRecObj)
        }


        if (scriptContext.fieldId == 'custpage_external_notes'){
            var entryVal =  currRecObj.getSublistValue({
                sublistId: 'custpage_shipment_list',
                fieldId: 'custpage_external_notes',
                line: scriptContext.line
            });

            var srID =  currRecObj.getSublistValue({
                sublistId: 'custpage_shipment_list',
                fieldId: 'custpage_sr_id',
                line: scriptContext.line
            });

            var soRec = record.submitFields.promise({
                type: record.Type.SALES_ORDER,
                id: srID,
                values: {
                    custbody_external_notes_rep_hidden: entryVal
                }
            });
        }
        
        if (scriptContext.fieldId == 'custpage_shipment_mark'){
            var myUser = runtime.getCurrentUser();

            var isMark =  currRecObj.getSublistValue({
                sublistId: 'custpage_shipment_list',
                fieldId: 'custpage_shipment_mark',
                line: scriptContext.line
            });

            var srID =  currRecObj.getSublistValue({
                sublistId: 'custpage_shipment_list',
                fieldId: 'custpage_sr_id',
                line: scriptContext.line
            });

            var srRec = search.lookupFields({
                type: search.Type.SALES_ORDER,
                id: srID,
                columns: ['tranid','custbody_owned_by_sa']
            });

            if(srRec.custbody_owned_by_sa.length == 0){
                if(isMark == true){
                    var soRec = record.submitFields.promise({
                        type: record.Type.SALES_ORDER,
                        id: srID,
                        values: {
                            custbody_owned_by_sa: myUser.id
                        }
                    });

                    var soArr = new Array();
                    var soExist = 0;
                    var soIdsVal = currRecObj.getValue({
                        fieldId: 'custpage_sales_order'
                    });
            
                    var soFieldString = JSON.stringify(soIdsVal)
                    console.log('soFieldString',soFieldString)
                    if(soFieldString === '[""]'){  
                        soArr.push(srID);
                        console.log('Enter If',soArr)
                    }
                    else{
                        for(var i = 0; i<soIdsVal.length;i++){
                            if(soIdsVal[i] == srID){
                                soExist = 1;
                                soArr.splice(i,1);
                                console.log('For If',soArr)
                            }
                            else{
                                soArr.push(soIdsVal[i]);
                                console.log('For else',soArr)
                            }
                            
                        }
                        if(soExist == 0){
                            soArr.push(srID);
                            console.log('if Exist',soArr)
                        }
                    }

                currRecObj.setValue({
                    fieldId: 'custpage_sales_order',
                    value: soArr
                });
                }
                
            }
            else{
                if(isMark == true && srRec.custbody_owned_by_sa[0].value != myUser.id){
                    alert('Shipment Record(s) '+srRec.tranid+' was already owned by '+ srRec.custbody_owned_by_sa[0].text)
                }
               
                else if(isMark == false && srRec.custbody_owned_by_sa[0].value == myUser.id){
                    var soRec = record.submitFields.promise({
                        type: record.Type.SALES_ORDER,
                        id: srID,
                        values: {
                            custbody_owned_by_sa: null
                        }
                    });
                     
                     var soArr = new Array();
                     var soExist = 0;
                     var soIdsVal = currRecObj.getValue({
                         fieldId: 'custpage_sales_order'
                     });
             
                     var soFieldString = JSON.stringify(soIdsVal)
                     console.log('soFieldString',soFieldString)
                     if(soFieldString === '[""]'){  
                         soArr.push(srID);
                         console.log('Enter If',soArr)
                     }
                     else{
                         for(var i = 0; i<soIdsVal.length;i++){
                             if(soIdsVal[i] == srID){
                                 soExist = 1;
                                 soArr.splice(i,1);
                                 console.log('For If',soArr)
                             }
                             else{
                                 soArr.push(soIdsVal[i]);
                                 console.log('For else',soArr)
                             }
                             
                         }
                         if(soExist == 0){
                             soArr.push(srID);
                             console.log('if Exist',soArr)
                         }
                     }
           
                     currRecObj.setValue({
                         fieldId: 'custpage_sales_order',
                         value: soArr
                     });
                }
            }
        }
    }

    function autoRate() {
        var currRecObj = currentRecord.get();
        var myUser = runtime.getCurrentUser();
        
        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });

        var soIds = currRecObj.getValue({
            fieldId: 'custpage_sales_order'
        });
        var pageId = currRecObj.getValue({
            fieldId: 'custpage_pageid'
        });

        pageId = parseInt(pageId.split('_')[1]);
      
        var hasApply=0;
        var applyInvTranId = [];
        var applySrId = [];
        var hasInv=0
        
        var soIdString = JSON.stringify(soIds)
        const promises = [];
        if(soIds.length > 0){ 
            soIds.forEach(function (id) {
                promises.push(new Promise(function (resolve,reject) {
                    var srRec = search.lookupFields({
                        type: search.Type.SALES_ORDER,
                        id: id,
                        columns: ['custbody_invoice','tranid']
                    });
                    
                    hasApply = 1
                        
                    var isInv = srRec.custbody_invoice;
    
                    if(isInv == true){
                        var srtranid = srRec.tranid;
                        hasInv = 1;
                        applyInvTranId.push(srtranid)
                        resolve();
                    }
                    else{
                        applySrId.push(id)
                        var postData = {"entity" : entity, "ids" : id, "action" : 'autorate'};
                        var restUrl = url.resolveScript({
                            scriptId: 'customscript_tc_approved_sa_rl', // RESTlet scriptId
                            deploymentId: 'customdeploy_tc_approved_sa_rl' // RESTlet deploymentId
                        });
    
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", restUrl, true);
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

                        xhr.send(JSON.stringify(postData));
                    }
                }));
            });

            return Promise.all(promises)
            .then(function() {
                // All promises are fulfilled
                if(hasApply == 0){
                    alert("Please Apply an SR before Calculation")
                    return false;
                }
                if(applyInvTranId.length > 0){
                    alert("Shipment Record(s) "+applyInvTranId+" already have Invoiced")
                    return false;
                }
        
                var applyIdStr = applySrId.toString();		
        
                var suiteletURL = url.resolveScript({
                    scriptId: 'customscript_tc_staging_area_sl',
                    deploymentId: 'customdeploy_tc_staging_area_sl',
                    params: {
                        entity : entity,
                        //page : 0,
                        ids : applyIdStr,
                        unMarked : 0
                    }
                });
            
                window.location.href = suiteletURL; // Refresh the page
            })
            .catch(function(error) {
                // Handle errors if any
                console.error(error);
            });
        }

    }


    function exportCSV(entity, srIds, ShipmentStatus, BilltoCode, CustomerAccountCode, HAWB, Origin, Dest, PickupDate, DeliverDate, HAWBDate, Handover, ServiceLevel, ShipperCompany, ShipperAddress, ConsigneeCompany, ConsigneeAddress, CommodityType, Mode, Zone, Program, Distance, TruckId, Control, EquipmentCode, Status, invdate,datecreated, searchPageSize) {
        let objParam = {
            ShipmentStatus: ShipmentStatus,
            BilltoCode: BilltoCode,
            CustomerAccountCode: CustomerAccountCode,
            HAWB: HAWB,
            Origin: Origin,
            Dest: Dest,
            PickupDate: PickupDate,
            DeliverDate: DeliverDate,
            HAWBDate: HAWBDate,
            Handover: Handover,
            ServiceLevel: ServiceLevel,
            ShipperCompany: ShipperCompany,
            ShipperAddress: ShipperAddress,
            ConsigneeCompany: ConsigneeCompany,
            ConsigneeAddress: ConsigneeAddress,
            CommodityType: CommodityType,
            Mode: Mode,
            Zone: Zone,
            Program: Program,
            Distance: Distance,
            TruckId: TruckId,
            Control: Control,
            EquipmentCode: EquipmentCode,
            Status: Status,
            invdate: invdate,
            datecreated: datecreated,
        };
        log.debug('objParam', objParam)
        var salesorderSearchColFilter = new Array();
            salesorderSearchColFilter = [];
                salesorderSearchColFilter.push(['type', 'anyof', 'SalesOrd'])
                salesorderSearchColFilter.push('AND')
                salesorderSearchColFilter.push(['mainline', 'is', 'T'])
                

                if (entity == 18 || entity == null) {
                    salesorderSearchColFilter.push('AND')
                    salesorderSearchColFilter.push(['subsidiary', 'anyof', 18])
                }
                else if(entity != 18){
                    salesorderSearchColFilter.push('AND')
                    salesorderSearchColFilter.push(['subsidiary', 'anyof', 20])
                }

                if(srIds){
                    var idsArr = srIds.split(",");
                    salesorderSearchColFilter.push('AND')
                    salesorderSearchColFilter.push(['internalid', 'anyof', idsArr])
                }
                else{
                    let blnExecute = checkObjValues(objParam)
                    if (blnExecute){
                        salesorderSearchColFilter.push('AND')
                        salesorderSearchColFilter.push(['custbody_sr_approvalstatus', 'anyof', '1'])
                        salesorderSearchColFilter.push('AND')
                        salesorderSearchColFilter.push(['status', 'anyof', 'SalesOrd:A', 'SalesOrd:F'])
                        log.debug('TC ALL NULL salesorderSearchColFilter', salesorderSearchColFilter)
                    } else {
                        for (let key in objParam) {
                            if (objParam.hasOwnProperty(key) && objParam[key] !== null) {
                                log.debug(key + ': ' + objParam[key]);
                                let objParamValue = objParam[key]
                                let addFilter = determineFunction(key, objParamValue)
                                salesorderSearchColFilter.push(...addFilter);
                            }
                        }
                        log.debug('TC NOT NULL salesorderSearchColFilter', salesorderSearchColFilter)
                    }
                }

                var salesOrderSearchColInvoice = search.createColumn({ name: 'custbody_invoice' });
                var salesOrderSearchColOwnedBy = search.createColumn({ name: 'custbody_owned_by_sa' });
                var salesOrderSearchColShipmentRecordStatus = search.createColumn({ name: 'custbody_sr_approvalstatus' });
                var salesOrderSearchColStatusRef = search.createColumn({ name: 'statusref' });
                var salesOrderSearchColShipmentStatus = search.createColumn({ name: 'custbody_shipmentstatus' });
                var salesOrderSearchColBillToAccount = search.createColumn({ name: 'custbody_billtoaccount' });
                var salesOrderSearchColHAWB = search.createColumn({ name: 'cseg_hawborig' });
                var salesOrderSearchColHANDOVER = search.createColumn({ name: 'cseg_handover3' });
                var salesOrderSearchColOrigin = search.createColumn({ name: 'custbody_origin' });
                var salesOrderSearchColDestination = search.createColumn({ name: 'custbody_destination' });
                var salesOrderSearchColTranDate = search.createColumn({ name: 'trandate' });
                var salesOrderSearchColPickupDate = search.createColumn({ name: 'custbody_pickupdate' });
                var salesOrderSearchColDeliveryDate = search.createColumn({ name: 'custbody_deliverdate' });
                var salesOrderSearchColPickUpTime = search.createColumn({ name: 'custbody_pickuptime' });
                var salesOrderSearchColDeliveryTime = search.createColumn({ name: 'custbody_deliverytime' });
                var salesOrderSearchColPickupWaitTimeMins = search.createColumn({ name: 'custbody_pickupwaittime' });
                var salesOrderSearchColDeliveryWaitTimeMins = search.createColumn({ name: 'custbody_deliverywaittime' });
                var salesOrderSearchColServiceLevel = search.createColumn({ name: 'custbody_servicelevel' });
                var salesOrderSearchColPieces = search.createColumn({ name: 'custbody_pieces' });
                var salesOrderSearchColActualWeight = search.createColumn({ name: 'custbody_actualweight' });
                var salesOrderSearchColDimWeight = search.createColumn({ name: 'custbody_dim_weight' });
                var salesOrderSearchColWeightUOM = search.createColumn({ name: 'custbody_weightunit' });
                var salesOrderSearchColDIMFact = search.createColumn({ name: 'custbody_dimfactor' });
                var salesOrderSearchColDepartment = search.createColumn({ name: 'department' });
                var salesOrderSearchColMainShipperCompanyName = search.createColumn({ name: 'custbody_main_shipper_company_name' });
                var salesOrderSearchColShipperCompany = search.createColumn({ name: 'custbody_shipper_company' });
                var salesOrderSearchColShipperAddress = search.createColumn({ name: 'custbody_shipper_address' });
                var salesOrderSearchColShipperCityTown = search.createColumn({ name: 'custbody_shipper_city_town' });
                var salesOrderSearchColShipperStateRegionProvince = search.createColumn({ name: 'custbody_shipper_state_region_province' });
                var salesOrderSearchColShipperPostalCode = search.createColumn({ name: 'custbody_shipper_postal_code' });
                var salesOrderSearchColShipperCountry = search.createColumn({ name: 'custbody_shipper_country' });
                var salesOrderSearchColShipperAirportCode = search.createColumn({ name: 'custbody_shipper_airport_code' });
                var salesOrderSearchColMainConsigneeCompanyName = search.createColumn({ name: 'custbody_main_consignee_company_name' });
                var salesOrderSearchColConsigneeCompany = search.createColumn({ name: 'custbody_consignee_company' });
                var salesOrderSearchColConsigneeAddress = search.createColumn({ name: 'custbody_consignee_address' });
                var salesOrderSearchColConsigneeCityTown = search.createColumn({ name: 'custbody_consignee_city_town' });
                var salesOrderSearchColConsigneeStateRegionProvince = search.createColumn({ name: 'custbody_consignee_state_region_provin' });
                var salesOrderSearchColConsigneePostalCode = search.createColumn({ name: 'custbody_consignee_postal_code' });
                var salesOrderSearchColConsigneeCountry = search.createColumn({ name: 'custbody_consignee_country' });
                var salesOrderSearchColConsigneeAirportCode = search.createColumn({ name: 'custbody_consignee_airport_code' });
                var salesOrderSearchColDescription = search.createColumn({ name: 'custbody_smk_number' });
                var salesOrderSearchColBillToName = search.createColumn({ name: 'custbody_customername' });
                var salesOrderSearchColDueTime = search.createColumn({ name: 'custbody_duetime' });
                var salesOrderSearchColEquipmentCode = search.createColumn({ name: 'custbody_equipment_code' });
                var salesOrderSearchColMainMode = search.createColumn({ name: 'custbody_main_mode' });
                var salesOrderSearchColTPT = search.createColumn({ name: 'custbody_commodity_code' });
                var salesOrderSearchColIntelServiceCode = search.createColumn({ name: 'custbody_intel_sc' });
                var salesOrderSearchColSCACCode = search.createColumn({ name: 'custbody_scac_code' });
                var salesOrderSearchColPayCode = search.createColumn({ name: 'custbody_paycode' });
                var salesOrderSearchColEntity = search.createColumn({ name: 'entity' });
                var salesOrderSearchColCommodityType = search.createColumn({ name: 'custbody_commodity_type' });
                var salesOrderSearchColMode = search.createColumn({ name: 'custbody_mode' });
                var salesOrderSearchColDistanceInMiles = search.createColumn({ name: 'custbody_distance_in_miles' });
                var salesOrderSearchColTruckId = search.createColumn({ name: 'custbody_truck_id' });
                var salesOrderSearchColTrailerId = search.createColumn({ name: 'custbody_trailer_id' });
                var salesOrderSearchColDriverId = search.createColumn({ name: 'custbody_driver_id' });
                var salesorderSearchColVendors = search.createColumn({ name: 'custbody_hawb_vendor'});
                var salesOrderSearchColFreight = search.createColumn({ name: 'custbody_freight_rep_hidden' });
                var salesOrderSearchColDiscount = search.createColumn({ name: 'custbody_discount_rep_hidden' });
                var salesOrderSearchColFuel = search.createColumn({ name: 'custbody_fuel_rep_hidden' });
                var salesOrderSearchColWaitTimePickup = search.createColumn({ name: 'custbody_waittimepu_rep_hidden' });
                var salesOrderSearchColWaitTimeDelivery = search.createColumn({ name: 'custbody_waittimedel_rep_hidden' });
                var salesOrderSearchColSameDayDelivery = search.createColumn({ name: 'custbody_same_day_del_rep_hidden' });
                var salesOrderSearchColAfterHoursPickup = search.createColumn({ name: 'custbody_after_hour_pu_rep_hidden' });
                var salesOrderSearchColAfterHoursDelivery = search.createColumn({ name: 'custbody_after_hours_del_rep_hidden' });
                var salesOrderSearchColStorage = search.createColumn({ name: 'custbody_storage_rep_hidden' });
                var salesOrderSearchColAdditionalManpower = search.createColumn({ name: 'custbody_manpower_rep_hidden' });
                var salesOrderSearchColSmartPallet = search.createColumn({ name: 'custbody_smart_pallet_rep_hidden' });
                var salesOrderSearchColCFC = search.createColumn({ name: 'custbody_cfc_rep_hidden' });
                var salesOrderSearchColFAG = search.createColumn({ name: 'custbody_fag_rep_hidden' });
                var salesOrderSearchColWeekendOrHolidayDelivery = search.createColumn({ name: 'custbody_weekend_holi_dlvy_rep_hidden' });
                var salesOrderSearchColSpecial = search.createColumn({ name: 'custbody_special_rep_hidden' });
                var salesOrderSearchColHandling = search.createColumn({ name: 'custbody_handling_rep_hidden' });
                var salesOrderSearchColSpecialHandling = search.createColumn({ name: 'custbody_special_handling_rep_hidden' });
                var salesOrderSearchColHazardousCargoHandlingChargeAtOrigin = search.createColumn({ name: 'custbody_hazardous_cargo_rep_hidden' });
                var salesOrderSearchColLayoverFee = search.createColumn({ name: 'custbody_layover_fee_rep_hidden' });
                var salesOrderSearchColWeekendPickupDlvy = search.createColumn({ name: 'custbody_weekend_pickup_dlvy_rep_hidde' });
                var salesOrderSearchColDetentionCharge = search.createColumn({ name: 'custbody_detention_charge_rep_hidden' });
                var salesOrderSearchColVehicleWaitingTimeAtOrigin = search.createColumn({ name: 'custbody_veh_waiting_time_rep_hidden' });
                var salesOrderSearchColVehicleWaitingTimeAtDestination = search.createColumn({ name: 'custbody_veh_wait_time_dest_rep_hidden' });
                var salesOrderSearchColTruckOrderNotUsed = search.createColumn({ name: 'custbody_truck_order_not_rep_hidden' });
                var salesOrderSearchColAttemptedPickup = search.createColumn({ name: 'custbody_attempted_pickup_rep_hidden' });
                var salesOrderSearchColHUL = search.createColumn({ name: 'custbody_liftgate_truck_hidden' });
                var salesOrderSearchColHHB = search.createColumn({ name: 'custbody_brokerage_govt_fees_hidden' });
                var salesOrderSearchCol104 = search.createColumn({ name: 'custbody_screening_hidden' });
                var salesOrderSearchCol263 = search.createColumn({ name: 'custbody_overtime_charges_hidden' });
                var salesOrderSearchCol298 = search.createColumn({ name: 'custbody_break_bulk_fee_hidden' });
                var salesOrderSearchCol365 = search.createColumn({ name: 'custbody_edi_fee_hidden' });
                var salesOrderSearchColCSF = search.createColumn({ name: 'custbody_customs_formalities_hidden' });
                var salesOrderSearchColPUD = search.createColumn({ name: 'custbody_stop_fee_hidden' });
                var salesOrderSearchColSCD = search.createColumn({ name: 'custbody_brokerage_customsdutieshidden' });
                var salesOrderSearchCol6 = search.createColumn({ name: 'custbody_attempted_delivery' });
                var salesOrderSearchCol10 = search.createColumn({ name: 'custbody_dock_fee_hidden' });
                var salesOrderSearchCol505 = search.createColumn({ name: 'custbody_warehouse_pick_pack_hidden' });
                var salesOrderSearchColSTR = search.createColumn({ name: 'custbody_storage_at_destination_hidden' });
                var salesOrderSearchCol315 = search.createColumn({ name: 'custbody_government_dutiestaxes_hidden' });
                var salesOrderSearchCol316 = search.createColumn({ name: 'custbody_detention_of_trailers' });
                var salesOrderSearchCol317 = search.createColumn({ name: 'custbody_permit_escort_charges' });
                var salesOrderSearchCol318 = search.createColumn({ name: 'custbody_stop_off_charge' });
                var salesOrderSearchCol319 = search.createColumn({ name: 'custbody_layover_charges_destination' });
                var salesOrderSearchCol320 = search.createColumn({ name: 'custbody_cancelled_order_origin' });
                var salesOrderSearchCol321 = search.createColumn({ name: 'custbody_border_crossing' });
                
                var salesOrderSearchColTotal = search.createColumn({ name: 'custbody_sr_total' });
                var salesOrderSearchColInternalBillingNotes = search.createColumn({ name: 'custbody_intnotes' });
                var salesOrderSearchColExternalNotes = search.createColumn({ name: 'custbody_extnotes' });
                var salesOrderSearchColTranId = search.createColumn({ name: 'tranid' });
                var salesOrderSearchColInvoicePostDate = search.createColumn({ name: 'custbody_inv_posting_date' });
                var salesOrderSearchColCreatedDateAndTime = search.createColumn({ name: 'custbody_createddateandtime', sort: search.Sort.ASC });
                log.debug('salesorderSearchColFilter', salesorderSearchColFilter)
                var salesOrderSearch = search.create({
                    type: 'salesorder',
                    filters: salesorderSearchColFilter,
                    columns: [
                        salesOrderSearchColInvoice,
                        salesOrderSearchColOwnedBy,
                        salesOrderSearchColShipmentRecordStatus,
                        salesOrderSearchColStatusRef,
                        salesOrderSearchColShipmentStatus,
                        salesOrderSearchColBillToAccount,
                        salesOrderSearchColHAWB,
                        salesOrderSearchColHANDOVER,
                        salesOrderSearchColOrigin,
                        salesOrderSearchColDestination,
                        salesOrderSearchColTranDate,
                        salesOrderSearchColPickupDate,
                        salesOrderSearchColDeliveryDate,
                        salesOrderSearchColPickUpTime,
                        salesOrderSearchColDeliveryTime,
                        salesOrderSearchColPickupWaitTimeMins,
                        salesOrderSearchColDeliveryWaitTimeMins,
                        salesOrderSearchColServiceLevel,
                        salesOrderSearchColPieces,
                        salesOrderSearchColActualWeight,
                        salesOrderSearchColDimWeight,
                        salesOrderSearchColWeightUOM,
                        salesOrderSearchColDIMFact,
                        salesOrderSearchColDepartment,
                        salesOrderSearchColMainShipperCompanyName,
                        salesOrderSearchColShipperCompany,
                        salesOrderSearchColShipperAddress,
                        salesOrderSearchColShipperCityTown,
                        salesOrderSearchColShipperStateRegionProvince,
                        salesOrderSearchColShipperPostalCode,
                        salesOrderSearchColShipperCountry,
                        salesOrderSearchColShipperAirportCode,
                        salesOrderSearchColMainConsigneeCompanyName,
                        salesOrderSearchColConsigneeCompany,
                        salesOrderSearchColConsigneeAddress,
                        salesOrderSearchColConsigneeCityTown,
                        salesOrderSearchColConsigneeStateRegionProvince,
                        salesOrderSearchColConsigneePostalCode,
                        salesOrderSearchColConsigneeCountry,
                        salesOrderSearchColConsigneeAirportCode,
                        salesOrderSearchColDescription,
                        salesOrderSearchColBillToName,
                        salesOrderSearchColDueTime,
                        salesOrderSearchColEquipmentCode,
                        salesOrderSearchColMainMode,
                        salesOrderSearchColTPT,
                        salesOrderSearchColIntelServiceCode,
                        salesOrderSearchColSCACCode,
                        salesOrderSearchColPayCode,
                        salesOrderSearchColEntity,
                        salesOrderSearchColCommodityType,
                        salesOrderSearchColMode,
                        salesOrderSearchColDistanceInMiles,
                        salesOrderSearchColTruckId,
                        salesOrderSearchColTrailerId,
                        salesOrderSearchColDriverId,
                        salesorderSearchColVendors,
                       
                        salesOrderSearchColFreight,
                        salesOrderSearchColDiscount,
                        salesOrderSearchColFuel,
                        salesOrderSearchColWaitTimePickup,
                        salesOrderSearchColWaitTimeDelivery,
                        salesOrderSearchColSameDayDelivery,
                        salesOrderSearchColAfterHoursPickup,
                        salesOrderSearchColAfterHoursDelivery,
                        salesOrderSearchColStorage,
                        salesOrderSearchColAdditionalManpower,
                        salesOrderSearchColSmartPallet,
                        salesOrderSearchColCFC,
                        salesOrderSearchColFAG,
                        salesOrderSearchColWeekendOrHolidayDelivery,
                        salesOrderSearchColSpecial,
                        salesOrderSearchColHandling,
                        salesOrderSearchColSpecialHandling,
                        salesOrderSearchColHazardousCargoHandlingChargeAtOrigin,
                        salesOrderSearchColLayoverFee,
                        salesOrderSearchColWeekendPickupDlvy,
                        salesOrderSearchColDetentionCharge,
                        salesOrderSearchColVehicleWaitingTimeAtOrigin,
                        salesOrderSearchColVehicleWaitingTimeAtDestination,
                        salesOrderSearchColTruckOrderNotUsed,
                        salesOrderSearchColAttemptedPickup,
                        salesOrderSearchColHUL,
                        salesOrderSearchColHHB,
                        salesOrderSearchCol104,
                        salesOrderSearchCol263,
                        salesOrderSearchCol298,
                        salesOrderSearchCol365,
                        salesOrderSearchColCSF,
                        salesOrderSearchColPUD,
                        salesOrderSearchColSCD,
                        salesOrderSearchCol6,
                        salesOrderSearchCol10,
                        salesOrderSearchCol505,
                        salesOrderSearchColSTR,
                        salesOrderSearchCol315,
                        salesOrderSearchCol316,
                        salesOrderSearchCol317,
                        salesOrderSearchCol318,
                        salesOrderSearchCol319,
                        salesOrderSearchCol320,
                        salesOrderSearchCol321,
                        salesOrderSearchColTotal,
                        salesOrderSearchColInternalBillingNotes,
                        salesOrderSearchColExternalNotes,
                        salesOrderSearchColTranId,
                        salesOrderSearchColInvoicePostDate,
                        salesOrderSearchColCreatedDateAndTime,
                    ],
                });

                var csvContent = "INVOICE,OWNED BY,SHIPMENT RECORD STATUS,STANDARD STATUS,SHIPMENT STATUS,BILL TO ACCOUNT,HAWB,HAND OVER,ORIGIN,DESTINATION,HAWB DATE,PICK UP DATE,DELIVERY DATE,PICK UP TIME,DELIVERY TIME,PICK UP WAIT TIME(MINS),DELIVERY WAIT TIME (MINS),SERVICE LEVEL,PIECES,ACTUAL WEIGHT,DIM WEIGHT,WEIGHT UOM,DIM FACT,DEPARTMENT,MAIN SHIPPER COMPANY NAME,SHIPPER COMPANY,SHIPPER ADDRESS,SHIPPER CITY TOWN,SHIPPER STATE REGION PROVINCE,SHIPPER POSTAL CODE,SHIPPER COUNTRY,SHIPPER AIRPORT CODE,MAIN CONSIGNEE COMPANY NAME,CONSIGNEE COMPANY,CONSIGNEE ADDRESS,CONSIGNEE CITY TOWN,CONSIGNEE STATE REGION PROVINCE,CONSIGNEE POSTAL CODE,CONSIGNEE COUNTRY,CONSIGNEE AIRPORT CODE,SMK NUMBER,BILL TO NAME,DUE TIME,EQUIPMENT CODE,MAIN MODE,TPT,INTEL SERVICE CODE,SCAC CODE,PAY CODE,CUSTOMER PER ENTITY,COMMODITY TYPE,MODE,DISTANCE(IN MILES),TRUCK ID,TRAILER ID,DRIVER ID,VENDOR NAME 1,VENDOR INVOICE COST 1,VENDOR NAME 2,VENDOR INVOICE COST 2,VENDOR NAME 3,VENDOR INVOICE COST 3,VENDOR NAME 4,VENDOR INVOICE COST 4,VENDOR NAME 5,VENDOR INVOICE COST 5,FREIGHT,DISCOUNT,FUEL,WAIT TIME PICK UP,WAIT TIME DELIVERY,SAME DAY DELIVERY,AFTER HOURS PICK UP,AFTER HOURS DELIVERY,STORAGE,ADDITIONAL MANPOWER,SMART PALLET,CFC,FAG,WEEKEND OR HOLIDAY DELIVERY,SPECIAL,HANDLING,SPECIAL HANDLING,HAZARDOUS CARGO HANDLING CHARGE AT ORIGIN,LAYOVER FEE,WEEKEND PICKUP/DLVY,DETENTION CHARGE,VEHICLE WAITING TIME AT ORIGIN,VEHICLE WAITING TIME AT DESTINATION,TRUCK ORDER NOT USED,ATTEMPTED PICK UP,LIFTGATE OR FORKLIFT SERVICE,Brokerage Country Specific Govt Fees,Screening,Overtime Charges,Break Bulk Fee,Edi Fee,Customs Formalities,Stop Fee,Brokerage Customs and Duties,Attempted Delivery,Dock Fee,Warehouse Pick and Pack,Storage at Destination,Government Duties and Taxes,Detention of Trailers,Permit/Escort charges,Stop Off Charge,Layover Charges Destination,Cancelled Order Origin,Border Crossing, TOTAL CHARGES,INTERNAL BILLING NOTES,EXTERNAL NOTES,DOCUMENT NUMBER #,INVOICE POST DATE,CREATED DATE AND TIME \n";
                
                console.log(csvContent);
                
                var salesOrderSearchPagedData = salesOrderSearch.runPaged({ pageSize: searchPageSize });
                for (var i = 0; i < salesOrderSearchPagedData.pageRanges.length; i++) {
                    var salesOrderSearchPage = salesOrderSearchPagedData.fetch({ index: i });
                    salesOrderSearchPage.data.forEach(function (result) {
                        var column1Value = result.getValue(salesOrderSearchColInvoice);
                        var column2Value = result.getText(salesOrderSearchColOwnedBy);
                        var column3Value = result.getText(salesOrderSearchColShipmentRecordStatus);
                        var column4Value = result.getText(salesOrderSearchColStatusRef);
                        var column5Value = result.getText(salesOrderSearchColShipmentStatus);
                        var column6Value = result.getText(salesOrderSearchColBillToAccount);
                        var column7Value = result.getText(salesOrderSearchColHAWB);
                        var hawbId = result.getValue(salesOrderSearchColHAWB);
                        var column8Value = result.getText(salesOrderSearchColHANDOVER);
                        column8Value = '"' + column8Value + '"';
                        var column9Value = result.getText(salesOrderSearchColOrigin);
                        var column10Value = result.getText(salesOrderSearchColDestination);
                        var column11Value = result.getValue(salesOrderSearchColTranDate);
                        var column12Value = result.getValue(salesOrderSearchColPickupDate);
                        var column13Value = result.getValue(salesOrderSearchColDeliveryDate);
                        var column14Value = result.getValue(salesOrderSearchColPickUpTime);
                        var column15Value = result.getValue(salesOrderSearchColDeliveryTime);
                        var column16Value = result.getValue(salesOrderSearchColPickupWaitTimeMins);
                        var column17Value = result.getValue(salesOrderSearchColDeliveryWaitTimeMins);
                        var column18Value = result.getText(salesOrderSearchColServiceLevel);
                        var column19Value = result.getValue(salesOrderSearchColPieces);
                        var column20Value = result.getValue(salesOrderSearchColActualWeight);
                        var column21Value = result.getValue(salesOrderSearchColDimWeight);
                        var column22Value = result.getText(salesOrderSearchColWeightUOM);
                        var column23Value = result.getValue(salesOrderSearchColDIMFact);
                        var column24Value = result.getText(salesOrderSearchColDepartment);
                        var column25Value = result.getValue(salesOrderSearchColMainShipperCompanyName);
                        column25Value = '"' + column25Value + '"';
                        var column26Value = result.getValue(salesOrderSearchColShipperCompany);
                        column26Value = '"' + column26Value + '"';
                        var column27Value = result.getValue(salesOrderSearchColShipperAddress);
                        column27Value = '"' + column27Value + '"';
                        var column28Value = result.getValue(salesOrderSearchColShipperCityTown);
                        column28Value = '"' + column28Value + '"';
                        var column29Value = result.getValue(salesOrderSearchColShipperStateRegionProvince);
                        column29Value = '"' + column29Value + '"';
                        var column30Value = result.getValue(salesOrderSearchColShipperPostalCode);
                        column30Value = '"' + column30Value + '"';
                        var column31Value = result.getValue(salesOrderSearchColShipperCountry);
                        column31Value = '"' + column31Value + '"';
                        var column32Value = result.getValue(salesOrderSearchColShipperAirportCode);
                        column32Value = '"' + column32Value + '"';
                        var column33Value = result.getValue(salesOrderSearchColMainConsigneeCompanyName);
                        column33Value = '"' + column33Value + '"';
                        var column34Value = result.getValue(salesOrderSearchColConsigneeCompany);
                        column34Value = '"' + column34Value + '"';
                        var column35Value = result.getValue(salesOrderSearchColConsigneeAddress);
                        column35Value = '"' + column35Value + '"';
                        var column36Value = result.getValue(salesOrderSearchColConsigneeCityTown);
                        column36Value = '"' + column36Value + '"';
                        var column37Value = result.getValue(salesOrderSearchColConsigneeStateRegionProvince);
                        column37Value = '"' + column37Value + '"';
                        var column38Value = result.getValue(salesOrderSearchColConsigneePostalCode);
                        column38Value = '"' + column38Value + '"';
                        var column39Value = result.getValue(salesOrderSearchColConsigneeCountry);
                        column39Value = '"' + column39Value + '"';
                        var column40Value = result.getValue(salesOrderSearchColConsigneeAirportCode);
                        column40Value = '"' + column40Value + '"';
                        var column41Value = result.getValue(salesOrderSearchColDescription);
                        var column42Value = result.getValue(salesOrderSearchColBillToName);
                        var column43Value = result.getValue(salesOrderSearchColDueTime);
                        var column44Value = result.getValue(salesOrderSearchColEquipmentCode);
                        var column45Value = result.getValue(salesOrderSearchColMainMode);
                        var column46Value = result.getValue(salesOrderSearchColTPT);
                        var column47Value = result.getValue(salesOrderSearchColIntelServiceCode);
                        var column48Value = result.getValue(salesOrderSearchColSCACCode);
                        var column49Value = result.getText(salesOrderSearchColPayCode);
                        var column50Value = result.getText(salesOrderSearchColEntity);
                        var column51Value = result.getValue(salesOrderSearchColCommodityType);
                        //console.log('column51Value',column51Value)
                        var column52Value = result.getText(salesOrderSearchColMode);
                        var column53Value = result.getValue(salesOrderSearchColDistanceInMiles);
                        var column54Value = result.getValue(salesOrderSearchColTruckId);
                        var column55Value = result.getValue(salesOrderSearchColTrailerId);
                        var column56Value = result.getValue(salesOrderSearchColDriverId);
                        var vendors = result.getValue(salesorderSearchColVendors);
                        //console.log('vendors',vendors)
                        if(vendors){
                            var vendorArr = vendors.split(',');
                            //console.log('vendorArr',vendorArr)
                            var vendorNameArr = new Array();
                            vendorNameArr[0] = '';
                            vendorNameArr[1] = '';
                            vendorNameArr[2] = '';
                            vendorNameArr[3] = '';
                            vendorNameArr[4] = '';
                            var vendorBCostArr = new Array();
                            vendorBCostArr[0] = '';
                            vendorBCostArr[1] = '';
                            vendorBCostArr[2] = '';
                            vendorBCostArr[3] = '';
                            vendorBCostArr[4] = '';
                                
                            for (var i = 0; i < vendorArr.length; i++) {

                                var vendorSearchColEntityId = search.createColumn({ name: 'entityid'});
                              
                                var vendorSearch = search.create({
                                    type: 'vendor',
                                    filters: ['internalid', 'anyof', vendorArr[i]],
                                    columns: [
                                        vendorSearchColEntityId
                                    ],
                                });
                                
                                var entityId;
                                var vendorSearchPagedData = vendorSearch.runPaged({ pageSize: 1000 });
                                for (var v = 0; v < vendorSearchPagedData.pageRanges.length; v++) {
                                    const vendorSearchPage = vendorSearchPagedData.fetch({ index: v });
                                    vendorSearchPage.data.forEach(function (result){
                                        entityId = result.getValue(vendorSearchColEntityId);
                                        // 
                                    });
                                }

                                var vendorName = '"' + entityId + '"';
                                vendorNameArr[i] = vendorName;

                                if(hawbId){
                                    var vendorbillSearchColAmountForeignCurrency = search.createColumn({ name: 'fxamount', summary: search.Summary.SUM });
                                    var vendorbillSearch = search.create({
                                    type: 'vendorbill',
                                    filters: [
                                        ['type', 'anyof', 'VendBill'],
                                        'AND',
                                        ['line.cseg_hawborig', 'anyof', hawbId],
                                        'AND',
                                        ['name', 'anyof', vendorArr[i]],
                                    ],
                                    columns: [
                                        vendorbillSearchColAmountForeignCurrency,
                                    ],
                                    });

                                    var vendorBillSearchPagedData = vendorbillSearch.runPaged({ pageSize: 5 });
                                    
                                    var vendorBillSearchPage = vendorBillSearchPagedData.fetch({ index: 0 });
                                    vendorBillSearchPage.data.forEach(function (result) {
                                        var vendorCost = result.getValue({name: 'fxamount', summary: "SUM"});

                                        vendorBCostArr[i] = (vendorCost)
                                    })
                                }
                            }
                        }
                        else{
                            var vendorNameArr = new Array();
                            vendorNameArr[0] = '';
                            vendorNameArr[1] = '';
                            vendorNameArr[2] = '';
                            vendorNameArr[3] = '';
                            vendorNameArr[4] = '';
                            var vendorBCostArr = new Array();
                            vendorBCostArr[0] = '';
                            vendorBCostArr[1] = '';
                            vendorBCostArr[2] = '';
                            vendorBCostArr[3] = '';
                            vendorBCostArr[4] = '';
                        }
                        
                       
                        var totalArr = [];
                        var column67Value = result.getValue(salesOrderSearchColFreight);
                        if(column67Value){
                            totalArr.push(column67Value)
                        }
                        var column68Value = result.getValue(salesOrderSearchColDiscount);
                        if(column68Value){
                            totalArr.push(column68Value)
                        }
                        var column69Value = result.getValue(salesOrderSearchColFuel);
                        if(column69Value){
                            totalArr.push(column69Value)
                        }
                        var column70Value = result.getValue(salesOrderSearchColWaitTimePickup);
                        if(column70Value){
                            totalArr.push(column70Value)
                        }
                        var column71Value = result.getValue(salesOrderSearchColWaitTimeDelivery);
                        if(column71Value){
                            totalArr.push(column71Value)
                        }
                        var column72Value = result.getValue(salesOrderSearchColSameDayDelivery);
                        if(column72Value){
                            totalArr.push(column72Value)
                        }
                        var column73Value = result.getValue(salesOrderSearchColAfterHoursPickup);
                        if(column73Value){
                            totalArr.push(column73Value)
                        }
                        var column74Value = result.getValue(salesOrderSearchColAfterHoursDelivery);
                        if(column74Value){
                            totalArr.push(column74Value)
                        }
                        var column75Value = result.getValue(salesOrderSearchColStorage);
                        if(column75Value){
                            totalArr.push(column75Value)
                        }
                        var column76Value = result.getValue(salesOrderSearchColAdditionalManpower);
                        if(column76Value){
                            totalArr.push(column76Value)
                        }
                        var column77Value = result.getValue(salesOrderSearchColSmartPallet);
                        if(column77Value){
                            totalArr.push(column77Value)
                        }
                        var column78Value = result.getValue(salesOrderSearchColCFC);
                        if(column78Value){
                            totalArr.push(column78Value)
                        }
                        var column79Value = result.getValue(salesOrderSearchColFAG);
                        if(column79Value){
                            totalArr.push(column79Value)
                        }
                        var column80Value = result.getValue(salesOrderSearchColWeekendOrHolidayDelivery);
                        if(column80Value){
                            totalArr.push(column80Value)
                        }
                        var column81Value = result.getValue(salesOrderSearchColSpecial);
                        if(column81Value){
                            totalArr.push(column81Value)
                        }
                        var column82Value = result.getValue(salesOrderSearchColHandling);
                        if(column82Value){
                            totalArr.push(column82Value)
                        }
                        var column83Value = result.getValue(salesOrderSearchColSpecialHandling);
                        if(column83Value){
                            totalArr.push(column83Value)
                        }
                        var column84Value = result.getValue(salesOrderSearchColHazardousCargoHandlingChargeAtOrigin);
                        if(column84Value){
                            totalArr.push(column84Value)
                        }
                        var column85Value = result.getValue(salesOrderSearchColLayoverFee);
                        if(column85Value){
                            totalArr.push(column85Value)
                        }
                        var column86Value = result.getValue(salesOrderSearchColWeekendPickupDlvy);
                        if(column86Value){
                            totalArr.push(column86Value)
                        }
                        var column87Value = result.getValue(salesOrderSearchColDetentionCharge);
                        if(column87Value){
                            totalArr.push(column87Value)
                        }
                        var column88Value = result.getValue(salesOrderSearchColVehicleWaitingTimeAtOrigin);
                        if(column88Value){
                            totalArr.push(column88Value)
                        }
                        var column89Value = result.getValue(salesOrderSearchColVehicleWaitingTimeAtDestination);
                        if(column89Value){
                            totalArr.push(column89Value)
                        }
                        var column90Value = result.getValue(salesOrderSearchColTruckOrderNotUsed);
                        if(column90Value){
                            totalArr.push(column90Value)
                        }
                        var column91Value = result.getValue(salesOrderSearchColAttemptedPickup);
                        if(column91Value){
                            totalArr.push(column91Value)
                        }

                        var column91Value = result.getValue(salesOrderSearchColAttemptedPickup);
                        if(column91Value){
                            totalArr.push(column91Value)
                        }

                        var column92Value = result.getValue(salesOrderSearchColHUL);
                        if(column92Value){
                            totalArr.push(column92Value)
                        }

                        var column93Value = result.getValue(salesOrderSearchColHHB);
                        if(column93Value){
                            totalArr.push(column93Value)
                        }

                        var column94Value = result.getValue(salesOrderSearchCol104);
                        if(column94Value){
                            totalArr.push(column94Value)
                        }

                        var column95Value = result.getValue(salesOrderSearchCol263);
                        if(column95Value){
                            totalArr.push(column95Value)
                        }

                        var column96Value = result.getValue(salesOrderSearchCol298);
                        if(column96Value){
                            totalArr.push(column96Value)
                        }

                        var column97Value = result.getValue(salesOrderSearchCol365);
                        if(column97Value){
                            totalArr.push(column97Value)
                        }

                        var column98Value = result.getValue(salesOrderSearchColCSF);
                        if(column98Value){
                            totalArr.push(column98Value)
                        }

                        var column99Value = result.getValue(salesOrderSearchColPUD);
                        if(column99Value){
                            totalArr.push(column99Value)
                        }

                        var column100Value = result.getValue(salesOrderSearchColSCD);
                        if(column100Value){
                            totalArr.push(column100Value)
                        }

                        var column101Value = result.getValue(salesOrderSearchCol6);
                        if(column101Value){
                            totalArr.push(column101Value)
                        }

                        var column102Value = result.getValue(salesOrderSearchCol10);
                        if(column102Value){
                            totalArr.push(column102Value)
                        }

                        var column103Value = result.getValue(salesOrderSearchCol505);
                        if(column103Value){
                            totalArr.push(column103Value)
                        }

                        var column104Value = result.getValue(salesOrderSearchColSTR);
                        if(column104Value){
                            totalArr.push(column104Value)
                        }

                        var column105Value = result.getValue(salesOrderSearchCol315);
                        if(column105Value){
                            totalArr.push(column105Value)
                        }

                        var column116Value = result.getValue(salesOrderSearchCol316);
                        if(column116Value){
                            totalArr.push(column116Value)
                        }

                        var column117Value = result.getValue(salesOrderSearchCol317);
                        if(column117Value){
                            totalArr.push(column117Value)
                        }

                        var column118Value = result.getValue(salesOrderSearchCol318);
                        if(column118Value){
                            totalArr.push(column118Value)
                        }

                        var column119Value = result.getValue(salesOrderSearchCol319);
                        if(column119Value){
                            totalArr.push(column119Value)
                        }

                        var column120Value = result.getValue(salesOrderSearchCol320);
                        if(column120Value){
                            totalArr.push(column120Value)
                        }

                        var column121Value = result.getValue(salesOrderSearchCol321);
                        if(column121Value){
                            totalArr.push(column121Value)
                        }

                        var columnTotalValue = 0;

                        for (var k = 0; k < totalArr.length; k++) {
                            columnTotalValue = parseFloat(columnTotalValue) + parseFloat(totalArr[k]);
                        }
                
                        columnTotalValue = columnTotalValue.toFixed(2);
                        
                        var column106Value = result.getValue(salesOrderSearchColInternalBillingNotes);
                        var column107Value = result.getValue(salesOrderSearchColExternalNotes);
                        var column108Value = result.getValue(salesOrderSearchColTranId);
                        var column109Value = result.getValue(salesOrderSearchColInvoicePostDate);
                        var column110Value = result.getValue(salesOrderSearchColCreatedDateAndTime);

                        // ...
                        csvContent += column1Value + ',' + column2Value + ',' + column3Value + ',' + column4Value + ',' + column5Value + ',' + column6Value + ',' + column7Value + ',' + column8Value + ',' + column9Value + ','+ column10Value + ',' + column11Value + ',' + column12Value +','+ column13Value + ',' + column14Value + ',' + column15Value + ',' + column16Value + ',' + column17Value + ',' + column18Value +','+  column19Value + ',' + column20Value + ',' + column21Value +','+  column22Value + ',' + column23Value + ',' + column24Value +',' + column25Value + ',' + column26Value + ',' + column27Value + ',' + column28Value + ',' + column29Value + ',' + column30Value +','+ column31Value + ',' + column32Value + ',' + column33Value +','+ column34Value + ',' + column35Value + ',' + column36Value +','+ column37Value + ',' + column38Value + ',' + column39Value + ',' + column40Value + ',' + column41Value + ',' + column42Value +','+  column43Value + ',' + column44Value + ',' + column45Value + ',' + column46Value +','+ column47Value + ',' + column48Value + ',' + column49Value + ',' + column50Value + ',' + column51Value + ',' + column52Value + ',' + column53Value +','+ column54Value + ',' + column55Value + ',' + column56Value +','+ vendorNameArr[0] + ',' + vendorBCostArr[0] + ',' + vendorNameArr[1] + ',' + vendorBCostArr[1] + ',' + vendorNameArr[2] + ',' + vendorBCostArr[2] +','+  vendorNameArr[3] + ',' + vendorBCostArr[3] + ',' + vendorNameArr[4] +','+  vendorBCostArr[4] + ',' + column67Value + ',' + column68Value + ',' + column69Value + ',' + column70Value + ',' + column71Value + ',' + column72Value + ',' + column73Value + ',' + column74Value +','+ column75Value + ',' + column76Value + ',' + column77Value +','+ column78Value + ',' + column79Value + ',' + column80Value +','+ column81Value + ',' + column82Value +','+ column83Value + ',' + column84Value + ',' + column85Value +','+ column86Value + ',' + column87Value + ',' + column88Value +','+ column89Value + ',' + column90Value +','+ column91Value + ',' + column92Value +','+ column93Value + ',' + column94Value + ',' + column95Value +','+ column96Value + ',' + column97Value +','+ column98Value + ',' + column99Value +',' + column100Value + ',' + column101Value + ',' + column102Value +','+ column103Value + ',' + column104Value + ',' + column105Value + ',' + column116Value + ',' + column117Value + ',' + column118Value +','+ column119Value + ',' + column120Value + ',' + column121Value +',' + columnTotalValue + ',' + column106Value + ',' + column107Value + ',' + column108Value +',' +column109Value + ',' + column110Value +'\n';
                            
                    })
                }
        var blob = new Blob([csvContent], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Staging_Area_Data.csv';
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    function markAll() {
        var currRecObj = currentRecord.get();
        var myUser = runtime.getCurrentUser();
        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });

        var srListCount = currRecObj.getLineCount({
            sublistId: 'custpage_shipment_list'
        });

        if(srListCount>0){
            for(var i=0;i<srListCount;i++){
                var srID =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_sr_id',
                    line: i
                });

                var srRec = search.lookupFields({
                    type: search.Type.SALES_ORDER,
                    id: srID,
                    columns: ['tranid','custbody_owned_by_sa']
                });

                if(srRec.custbody_owned_by_sa.length == 0){
                    var soRec = record.submitFields({
                        type: record.Type.SALES_ORDER,
                        id: srID,
                        values: {
                            custbody_owned_by_sa: myUser.id
                        }
                    });
                }
            }
        }

        var pageId = currRecObj.getValue({
            fieldId: 'custpage_pageid'
        });

        pageId = parseInt(pageId.split('_')[1]);

        var shipmentStatus = currRecObj.getValue({
            fieldId: 'custpage_form_shipmentstatus'
        });

        var billtoCode = currRecObj.getValue({
            fieldId: 'custpage_form_billtocode'
        });

        var customerAccCode = currRecObj.getValue({
            fieldId: 'custpage_form_customeraccountcode'
        });

        var hawb = currRecObj.getValue({
            fieldId: 'custpage_form_hawb_filter'
        });

        var origin = currRecObj.getValue({
            fieldId: 'custpage_form_origin'
        });

        var destination = currRecObj.getValue({
            fieldId: 'custpage_form_destinantion'
        });

        var pickupDate = currRecObj.getValue({
            fieldId: 'custpage_form_pickupdate'
        });

        var deliverDate = currRecObj.getValue({
            fieldId: 'custpage_form_deliver_date'
        });

        var hawbDate = currRecObj.getValue({
            fieldId: 'custpage_form_hawbdate'
        });

        var handover = currRecObj.getValue({
            fieldId: 'custpage_form_handover'
        });

        var serviceLevel = currRecObj.getValue({
            fieldId: 'custpage_form_servicelevel'
        });

        var ShipperCompany = currRecObj.getValue({
            fieldId: 'custpage_form_shippercompany'
        });

        var ShipperAddress = currRecObj.getValue({
            fieldId: 'custpage_form_shipperaddress'
        });

        var ConsigneeCompany = currRecObj.getValue({
            fieldId: 'custpage_form_consigneecompany'
        });

        var ConsigneeAddress = currRecObj.getValue({
            fieldId: 'custpage_form_consigneeaddress'
        });

        var CommodityType = currRecObj.getValue({
            fieldId: 'custpage_form_commoditytype'
        });

        var Mode = currRecObj.getValue({
            fieldId: 'custpage_form_mode'
        });

        var Zone = currRecObj.getValue({
            fieldId: 'custpage_form_zone'
        });

        var Program = currRecObj.getValue({
            fieldId: 'custpage_form_program'
        });

        var Distance = currRecObj.getValue({
            fieldId: 'custpage_form_distance'
        });

        var TruckId = currRecObj.getValue({
            fieldId: 'custpage_form_truckid'
        });

        var Control = currRecObj.getValue({
            fieldId: 'custpage_form_control'
        });

        var EquipmentCode = currRecObj.getValue({
            fieldId: 'custpage_form_equipment_code'
        });

        var status = currRecObj.getValue({
            fieldId: 'custpage_form_status'
        });

        var invdate = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_date'
        });

        var datecreated = currRecObj.getValue({
            fieldId: 'custpage_form_date_created'
        });

       var suiteletURL = url.resolveScript({
        scriptId: 'customscript_tc_staging_area_sl',
        deploymentId: 'customdeploy_tc_staging_area_sl',
        params: {
                page : pageId,
                entity : entity,
                ShipmentStatus : shipmentStatus,
                BilltoCode : billtoCode,
                CustomerAccountCode : customerAccCode,
                HAWB : hawb,
                Origin : origin,
                Destination : destination,
                PickupDate : pickupDate,
                DeliverDate : deliverDate,
                HAWBDate : hawbDate,
                Handover : handover,
                ServiceLevel : serviceLevel,
                ShipperCompany : ShipperCompany,
                ShipperAddress :ShipperAddress,
                ConsigneeCompany : ConsigneeCompany,
                ConsigneeAddress : ConsigneeAddress,
                CommodityType : CommodityType,
                Mode : Mode,
                Zone : Zone,
                Program : Program,
                Distance : Distance,
                TruckId : TruckId,
                Control : Control,
                EquipmentCode : EquipmentCode,
                Status : status,
                invdate : invdate,
                datecreated : datecreated

        }
       });
       window.location.href = suiteletURL
    }

    function unmarkAll() {
        var currRecObj = currentRecord.get();
        var applySrId = [];
        var myUser = runtime.getCurrentUser();
        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });


        var srListCount = currRecObj.getLineCount({
            sublistId: 'custpage_shipment_list'
        });

        if(srListCount>0){
            for(var i=0;i<srListCount;i++){
                console.log('i',i)
                var srID =  currRecObj.getSublistValue({
                    sublistId: 'custpage_shipment_list',
                    fieldId: 'custpage_sr_id',
                    line: i
                });

                var srRec = search.lookupFields({
                    type: search.Type.SALES_ORDER,
                    id: srID,
                    columns: ['tranid','custbody_owned_by_sa']
                });

                
                if(srRec.custbody_owned_by_sa.length != 0){
                    if(srRec.custbody_owned_by_sa[0].value == myUser.id){
                        var soRec = record.submitFields.promise({
                            type: record.Type.SALES_ORDER,
                            id: srID,
                            values: {
                                custbody_owned_by_sa: null
                            }
                        });
                    }
                }
            }
        }
        var pageId = currRecObj.getValue({
            fieldId: 'custpage_pageid'
        });

        pageId = parseInt(pageId.split('_')[1]);

        var shipmentStatus = currRecObj.getValue({
            fieldId: 'custpage_form_shipmentstatus'
        });

        var billtoCode = currRecObj.getValue({
            fieldId: 'custpage_form_billtocode'
        });

        var customerAccCode = currRecObj.getValue({
            fieldId: 'custpage_form_customeraccountcode'
        });

        var hawb = currRecObj.getValue({
            fieldId: 'custpage_form_hawb_filter'
        });

        var origin = currRecObj.getValue({
            fieldId: 'custpage_form_origin'
        });

        var destination = currRecObj.getValue({
            fieldId: 'custpage_form_destinantion'
        });

        var pickupDate = currRecObj.getValue({
            fieldId: 'custpage_form_pickupdate'
        });

        var deliverDate = currRecObj.getValue({
            fieldId: 'custpage_form_deliver_date'
        });

        var hawbDate = currRecObj.getValue({
            fieldId: 'custpage_form_hawbdate'
        });

        var handover = currRecObj.getValue({
            fieldId: 'custpage_form_handover'
        });

        var serviceLevel = currRecObj.getValue({
            fieldId: 'custpage_form_servicelevel'
        });

        var ShipperCompany = currRecObj.getValue({
            fieldId: 'custpage_form_shippercompany'
        });

        var ShipperAddress = currRecObj.getValue({
            fieldId: 'custpage_form_shipperaddress'
        });

        var ConsigneeCompany = currRecObj.getValue({
            fieldId: 'custpage_form_consigneecompany'
        });

        var ConsigneeAddress = currRecObj.getValue({
            fieldId: 'custpage_form_consigneeaddress'
        });

        var CommodityType = currRecObj.getValue({
            fieldId: 'custpage_form_commoditytype'
        });

        var Mode = currRecObj.getValue({
            fieldId: 'custpage_form_mode'
        });

        var Zone = currRecObj.getValue({
            fieldId: 'custpage_form_zone'
        });

        var Program = currRecObj.getValue({
            fieldId: 'custpage_form_program'
        });

        var Distance = currRecObj.getValue({
            fieldId: 'custpage_form_distance'
        });

        var TruckId = currRecObj.getValue({
            fieldId: 'custpage_form_truckid'
        });

        var Control = currRecObj.getValue({
            fieldId: 'custpage_form_control'
        });

        var EquipmentCode = currRecObj.getValue({
            fieldId: 'custpage_form_equipment_code'
        });

        var status = currRecObj.getValue({
            fieldId: 'custpage_form_status'
        });

        var invdate = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_date'
        });
        var datecreated = currRecObj.getValue({
            fieldId: 'custpage_form_date_created'
        });


       var suiteletURL = url.resolveScript({
        scriptId: 'customscript_tc_staging_area_sl',
        deploymentId: 'customdeploy_tc_staging_area_sl',
        params: {
                page : pageId,
                entity : entity,
                ShipmentStatus : shipmentStatus,
                BilltoCode : billtoCode,
                CustomerAccountCode : customerAccCode,
                HAWB : hawb,
                Origin : origin,
                Destination : destination,
                PickupDate : pickupDate,
                DeliverDate : deliverDate,
                HAWBDate : hawbDate,
                Handover : handover,
                ServiceLevel : serviceLevel,
                ShipperCompany : ShipperCompany,
                ShipperAddress :ShipperAddress,
                ConsigneeCompany : ConsigneeCompany,
                ConsigneeAddress : ConsigneeAddress,
                CommodityType : CommodityType,
                Mode : Mode,
                Zone : Zone,
                Program : Program,
                Distance : Distance,
                TruckId : TruckId,
                Control : Control,
                EquipmentCode : EquipmentCode,
                Status : status,
                invdate : invdate,
                datecreated : datecreated

        }
       });
       window.location.href = suiteletURL
    }

    function getSuiteletPage() {
        var currRecObj = currentRecord.get();

        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });

        var shipmentStatus = currRecObj.getValue({
            fieldId: 'custpage_form_shipmentstatus'
        });

        var billtoCode = currRecObj.getValue({
            fieldId: 'custpage_form_billtocode'
        });

        var customerAccCode = currRecObj.getValue({
            fieldId: 'custpage_form_customeraccountcode'
        });

        var hawb = currRecObj.getValue({
            fieldId: 'custpage_form_hawb_filter'
        });

        var origin = currRecObj.getValue({
            fieldId: 'custpage_form_origin'
        });

        var destination = currRecObj.getValue({
            fieldId: 'custpage_form_destinantion'
        });

        var pickupDate = currRecObj.getValue({
            fieldId: 'custpage_form_pickupdate'
        });

        var deliverDate = currRecObj.getValue({
            fieldId: 'custpage_form_deliver_date'
        });

        var hawbDate = currRecObj.getValue({
            fieldId: 'custpage_form_hawbdate'
        });

        var handover = currRecObj.getValue({
            fieldId: 'custpage_form_handover'
        });

        var serviceLevel = currRecObj.getValue({
            fieldId: 'custpage_form_servicelevel'
        });

        var ShipperCompany = currRecObj.getValue({
            fieldId: 'custpage_form_shippercompany'
        });

        var ShipperAddress = currRecObj.getValue({
            fieldId: 'custpage_form_shipperaddress'
        });

        var ConsigneeCompany = currRecObj.getValue({
            fieldId: 'custpage_form_consigneecompany'
        });

        var ConsigneeAddress = currRecObj.getValue({
            fieldId: 'custpage_form_consigneeaddress'
        });

        var CommodityType = currRecObj.getValue({
            fieldId: 'custpage_form_commoditytype'
        });

        var Mode = currRecObj.getValue({
            fieldId: 'custpage_form_mode'
        });

        var Zone = currRecObj.getValue({
            fieldId: 'custpage_form_zone'
        });

        var Program = currRecObj.getValue({
            fieldId: 'custpage_form_program'
        });

        var Distance = currRecObj.getValue({
            fieldId: 'custpage_form_distance'
        });

        var TruckId = currRecObj.getValue({
            fieldId: 'custpage_form_truckid'
        });

        var Control = currRecObj.getValue({
            fieldId: 'custpage_form_control'
        });

        var EquipmentCode = currRecObj.getValue({
            fieldId: 'custpage_form_equipment_code'
        });

        var status = currRecObj.getValue({
            fieldId: 'custpage_form_status'
        });

        var invdate = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_date'
        });

        console.log('invdate',invdate)

        var datecreated = currRecObj.getValue({
            fieldId: 'custpage_form_date_created'
        });

       
             var suiteletURL = url.resolveScript({
                scriptId: 'customscript_tc_search_popup_sl',
                deploymentId: 'customdeploy_tc_search_popup_sl',
                params: {
                    entity: entity,
                    shipmentStatus: shipmentStatus,
                    billtoCode : billtoCode,
                    customerAccCode : customerAccCode,
                    hawb : hawb,
                    origin : origin,
                    destination : destination,
                    pickupDate : pickupDate,
                    deliverDate : deliverDate,
                    hawbDate : hawbDate,
                    handover : handover,
                    serviceLevel : serviceLevel,
                    ShipperCompany : ShipperCompany,
                    ShipperAddress : ShipperAddress,
                    ConsigneeCompany : ConsigneeCompany,
                    ConsigneeAddress : ConsigneeAddress,
                    CommodityType : CommodityType,
                    Mode : Mode,
                    Zone : Zone,
                    Program : Program,
                    Distance : Distance,
                    TruckId : TruckId,
                    Control : Control,
                    EquipmentCode : EquipmentCode,
                    status: status,
                    invdate : invdate,
                    datecreated : datecreated
                }
            });
            window.location.href = suiteletURL
    }

    function rejectSR() {
        var currRecObj = currentRecord.get();
        var myUser = runtime.getCurrentUser();
        var buttonReject = document.getElementById('custpage_reject');
        buttonReject.disabled = true;

        var buttonSub = document.getElementById('custpage_submit');
        buttonSub.disabled = true;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy;
        
        var soIds = currRecObj.getValue({
            fieldId: 'custpage_sales_order'
        });

        console.log('soIds',soIds)
        console.log('soIds',soIds.length)

        var srListCount = currRecObj.getLineCount({
            sublistId: 'custpage_shipment_list'
        });
        var hasRReason=0;
        var applySrId = [];
        var deleteSr = [];
       
        for(var x=0;x<soIds.length;x++){
            var srID = soIds[x];
            console.log('srID',srID)

            var i = currRecObj.findSublistLineWithValue({
                sublistId: 'custpage_shipment_list',
                fieldId: 'custpage_sr_id',
                value: srID
            });

            var srRec = search.lookupFields({
                type: search.Type.SALES_ORDER,
                id: srID,
                columns: ['tranid','entity','cseg_hawborig','custbody_owned_by_sa']
            });
            
                

                    if(srRec.cseg_hawborig.length != 0){
                        var hawbVal = srRec.cseg_hawborig[0].text;
                    }
                    
                    var RejectInput = window.prompt('Reject Reason: '+srRec.tranid, ''); // Second parameter is the default value

                    console.log('RejectInput',RejectInput)
                    if(RejectInput){
                        hasRReason = 1;
                        var rejectArr = RejectInput.split(' ');
                        var hasDelete = false;
                        if(rejectArr.indexOf("delete") !== -1 ||rejectArr.indexOf("delete") !== -1) {
                            hasDelete = true;
                        }

                        if(hasDelete){
                            deleteSr.push(srRec.tranid)
                            var srDelete = record.delete({
                                type: record.Type.SALES_ORDER,
                                id: srID,
                            });
                        }

                            var soRec = record.submitFields.promise({
                                type: record.Type.SALES_ORDER,
                                id: srID,
                                values: {
                                    custbody_sr_approvalstatus: 4,
                                    custbody_rejection_reason: RejectInput,
                                    orderstatus : 'A',
                                    custbody_rejection_date : today
                                }
                            });
    
                           console.log('soRec',soRec)
                    
                            applySrId.push(srRec.tranid)
    
                            var currentDate = new Date();
    
                            var year = currentDate.getFullYear(); // Get the current year (e.g., 2023)
                            var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the current month (0-based, so January is 0)
                            var day = currentDate.getDate().toString().padStart(2, '0'); // Get the current day of the month (1-31)
                            var hour = currentDate.getHours().toString().padStart(2, '0'); // Get the current hour (0-23)
                            var minute = currentDate.getMinutes().toString().padStart(2, '0'); // Get the current minute (0-59)
                            var second = currentDate.getSeconds().toString().padStart(2, '0'); // Get the current second (0-59)
    
                            var formattedDate = year+'-'+month+'-'+day+' '+hour+":"+minute+":"+second+ " GMT+0800 (Philippine Standard Time)"

                      console.log('formattedDate',formattedDate)
                        try {
                            var bodyJSON = JSON.stringify({
                                "customer": srRec.entity[0].text, 
                                "status": "rejected", 
                                "remarks": RejectInput, 
                                "updated_by": myUser.email, 
                                "updated_at": formattedDate 
                            })

                            //SB LINK
                            //var flexshipURL = 'https://staging-chainlinq-messenger.dwmorgantech.com/api/v1/billings/'+hawbVal+'/statuses';
                            //PROD LINK
                            var flexshipURL = 'https://chainlinq-messenger.dwmorgantech.com/api/v1/billings/'+hawbVal+'/statuses';
                            //var flexshipURL = 'https://api.morganflex.com/1.0/billing/'+hawbVal+'/status';
                            
                            //var flexshipURL = 'https://intel.morganflexstaging.net/api/billing/1MRAF0000007962/status';

                            console.log('flexshipURL',flexshipURL)
                          console.log('bodyJSON',bodyJSON)
                            var response = https.post({
                                url: flexshipURL,
                                body: bodyJSON,
                                headers: {
                                    "Cache-Control": "no-cache",
                                    "Content-Type": "application/json",
                                    "X-token":  "28JHsByukDsMyVvjwiNL",
                                    "X-Email": "karl.angeles@dwmorganhk.com",
                                    "x-api-key": "O2OmImKWp84ZqA3dMKTjbL7wfhb"
                                }
                            });

                            console.log(response)
                            console.log('response.body',response.body)
                            console.log('response.code',response.code)
                        }
                        catch (error) {
                            log.error('Error:', error.message);
                            // You can also perform any necessary error handling or recovery steps here
                        }
                    }

                
                else{
                    hasRReason = 0;
                    
                }
                
            //}
        }
        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });
        if(applySrId.length==0){
            alert("Please Apply a Shipment Record to Reject")
            var buttonReject = document.getElementById('custpage_reject');
            buttonReject.disabled = false;

            var buttonSub = document.getElementById('custpage_submit');
            buttonSub.disabled = false;
        }
        else if(hasRReason == 0){
            alert("Please Enter A Reason to Reject to proceed")
            var buttonReject = document.getElementById('custpage_reject');
            buttonReject.disabled = false;

            var buttonSub = document.getElementById('custpage_submit');
            buttonSub.disabled = false;
        }
        else{
            alert("Shipment Record(s) "+applySrId+" Already been Rejected")
            var suiteletURL = url.resolveScript({
            scriptId: 'customscript_tc_staging_area_sl',
            deploymentId: 'customdeploy_tc_staging_area_sl',
            params: {
                page : 0,
                entity : entity
            }
            });
        window.location.href = suiteletURL
        }

        
    }

    function saveRecord_sr_to_inv() {
        var currRecObj = currentRecord.get();
        var myUser = runtime.getCurrentUser();
        
        var applySRIds = [];
        var invTrue = [];
        var invIds = [];

        var buttonReject = document.getElementById('custpage_reject');
        buttonReject.disabled = true;

        var buttonSub = document.getElementById('custpage_submit');
        buttonSub.disabled = true;

        var entity = currRecObj.getValue({
            fieldId: 'custpage_form_entity'
        });

        var soIds = currRecObj.getValue({
            fieldId: 'custpage_sales_order'
        });

        var pageId = currRecObj.getValue({
            fieldId: 'custpage_pageid'
        });

      pageId = parseInt(pageId.split('_')[1]);

      var totalSuccess = 0;
      var totalFailed = 0;
        console.log('soIds',soIds)
        console.log('soIds',soIds.length)
        const promises = [];
        if(soIds.length > 0){ 
            soIds.forEach(function (id){
                promises.push(new Promise(function (resolve,reject) {
                    var srRec = search.lookupFields({
                        type: search.Type.SALES_ORDER,
                        id: id,
                        columns: ['tranid','custbody_invoice']
                    });

                    var tranidSR = srRec.tranid;
                    
                    var isInv = srRec.custbody_invoice;
                    
                    if(isInv == false){
                        applySRIds.push(id);
                        var postData = {"entity" : entity, "ids" : id, "action" : 'approve'};
                        var restUrl = url.resolveScript({
                            scriptId: 'customscript_tc_approved_sa_rl', // RESTlet scriptId
                            deploymentId: 'customdeploy_tc_approved_sa_rl' // RESTlet deploymentId
                        });

                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", restUrl, true);
                        xhr.setRequestHeader("Content-Type", "application/json");

                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    totalSuccess = parseInt(totalSuccess) + 1;
                                }
                                else {
                                    totalFailed = parseInt(totalFailed) + 1;
                                }
								console.log('totalSuccess',totalSuccess)
                                console.log('totalFailed',totalFailed)
                                resolve();
                            }
                        };

                        xhr.send(JSON.stringify(postData));
                    }
                    else{
                        invTrue.push(tranidSR)
                        resolve();
                    
                    }
                }));
            });

            return Promise.all(promises)
            .then(function() {
                // All promises are fulfilled
                if(applySRIds.length == 0){
                    alert("Please Apply a Shipment Record to Approve");
                }
    
                if(invTrue.length > 0){
                    alert('Shipment Record(s) '+invTrue+' Cannot be approved, Already created an Invoice for this Shipment Record');
                }
    
                if(totalSuccess || totalFailed){
                    alert(totalSuccess+' Shipments Imported and '+totalFailed+' Shipments Failed');
                }
    
                var suiteletURL = url.resolveScript({
                    scriptId: 'customscript_tc_staging_area_sl',
                    deploymentId: 'customdeploy_tc_staging_area_sl',
                    params: {
                        entity : entity,
                        page : 0
                    }
                });
                window.location.href = suiteletURL; // Refresh the page
            })
            .catch(function(error) {
                // Handle errors if any
                console.error(error);
            });
        }
    }

    // Private Function

    const calculateCharges = (scriptContext, currRecObj) => {
        const line = scriptContext.line;
        const currFieldId = scriptContext.fieldId;
        const fields = [
            'custpage_freight', 'custpage_discount', 'custpage_fuel', 'custpage_wait_time_pick_up',
            'custpage_wait_time_delivery', 'custpage_same_day_delivery', 'custpage_after_hours_pick_up',
            'custpage_after_hours_delivery', 'custpage_storage', 'custpage_manpower', 'custpage_smart_pallet',
            'custpage_cfc', 'custpage_fag', 'custpage_hol', 'custpage_special', 'custpage_handling',
            'custpage_special_handling', 'custpage_haz', 'custpage_layover', 'custpage_weekend_pickup_delivery',
            'custpage_detention', 'custpage_veh_wait_time_origin', 'custpage_veh_wait_time_dest', 'custpage_truck_order',
            'custpage_attempted_pick_up', 'custpage_hul', 'custpage_hhb', 'custpage_screening', 'custpage_ot_charge',
            'custpage_break_bulk_fee', 'custpage_edi_fee', 'custpage_custom_formalities', 'custpage_stop_fee',
            'custpage_bcd', 'custpage_attempted_del', 'custpage_dock_fee', 'custpage_wh_pick_pack',
            'custpage_storage_dest', 'custpage_gov_duty_tax', 'custpage_detention_of_trailers',
            'custpage_permit_escort_charges', 'custpage_stop_off_charge', 'custpage_layover_charges_destination',
            'custpage_cancelled_order_origin', 'custpage_border_crossing'
        ];
    
        const totalArr = fields.map(field => currRecObj.getSublistValue({
            sublistId: 'custpage_shipment_list',
            fieldId: field,
            line: line
        })).filter(value => value);
    
        let totalAC = totalArr.reduce((sum, value) => sum + parseFloat(value), 0).toFixed(2);
    
        console.log('calculateCharges totalAC', totalAC);
        currRecObj.selectLine({ sublistId: 'custpage_shipment_list', line: line });
        currRecObj.setCurrentSublistValue({
            sublistId: 'custpage_shipment_list',
            fieldId: 'custpage_total',
            value: totalAC,
            forceSyncSourcing: true
        });
        currRecObj.commitLine({ sublistId: 'custpage_shipment_list' });
    
        let srID = currRecObj.getSublistValue({
            sublistId: 'custpage_shipment_list',
            fieldId: 'custpage_sr_id',
            line: line
        });
        let entryVal = currRecObj.getSublistValue({
            sublistId: 'custpage_shipment_list',
            fieldId: currFieldId,
            line: line
        });
        let keyToUpdate = getRecFieldId(currFieldId)
        console.log('keyToUpdate', keyToUpdate)
        console.log('entryVal', entryVal)
        record.submitFields.promise({
            type: record.Type.SALES_ORDER,
            id: srID,
            values: {
                [keyToUpdate]: entryVal,
                custbody_sr_total: totalAC,

            }
        });
    }
    
    const getRecFieldId = (currFieldId) => {
        let keyField = ""
        switch (currFieldId) {
            case "custpage_border_crossing":
                keyField = 'custbody_border_crossing'
                break;
            case "custpage_cancelled_order_origin":
                keyField = 'custbody_cancelled_order_origin'
                break;
            case "custpage_layover_charges_destination":
                keyField = 'custbody_layover_charges_destination'
                break;
            case "custpage_stop_off_charge":
                keyField = 'custbody_stop_off_charge'
                break;
            case "custpage_permit_escort_charges":
                keyField = 'custbody_permit_escort_charges'
                break;
            case "custpage_detention_of_trailers":
                keyField = 'custbody_detention_of_trailers'
                break;
            case "custpage_gov_duty_tax":
                keyField = 'custbody_government_dutiestaxes_hidden'
                break;
            case "custpage_storage_dest":
                keyField = 'custbody_storage_at_destination_hidden'
                break;
            case "custpage_wh_pick_pack":
                keyField = 'custbody_warehouse_pick_pack_hidden'
                break;
            case "custpage_dock_fee":
                keyField = 'custbody_dock_fee_hidden'
                break;
            case "custpage_attempted_del":
                keyField = 'custbody_attempted_delivery_hidden'
                break;
            case "custpage_bcd":
                keyField = 'custbody_brokerage_customsdutieshidden'
                break;
            case "custpage_stop_fee":
                keyField = 'custbody_stop_fee_hidden'
                break;
            case "custpage_custom_formalities":
                keyField = 'custbody_customs_formalities_hidden'
                break;
            case "custpage_edi_fee":
                keyField = 'custbody_edi_fee_hidden'
                break;
            case "custpage_break_bulk_fee":
                keyField = 'custbody_break_bulk_fee_hidden'
                break;
            case "custpage_ot_charge":
                keyField = 'custbody_overtime_charges_hidden'
                break;
            case "custpage_screening":
                keyField = 'custbody_screening_hidden'
                break;
            case "custpage_hhb":
                keyField = 'custbody_brokerage_govt_fees_hidden'
                break;
            case "custpage_hul":
                keyField = 'custbody_liftgate_truck_hidden'
                break;
            case "custpage_attempted_pick_up":
                keyField = 'custbody_attempted_pickup_rep_hidden'
                break;
            case "custpage_truck_order":
                keyField = 'custbody_truck_order_not_rep_hidden'
                break;
            case "custpage_veh_wait_time_dest":
                keyField = 'custbody_veh_wait_time_dest_rep_hidden'
                break;
            case "custpage_veh_wait_time_origin":
                keyField = 'custbody_veh_waiting_time_rep_hidden'
                break;
            case "custpage_detention":
                keyField = 'custbody_detention_charge_rep_hidden'
                break;
            case "custpage_weekend_pickup_delivery":
                keyField = 'custbody_weekend_pickup_dlvy_rep_hidde'
                break;
            case "custpage_layover":
                keyField = 'custbody_layover_fee_rep_hidden'
                break;
            case "custpage_haz":
                keyField = 'custbody_hazardous_cargo_rep_hidden'
                break;
            case "custpage_special_handling":
                keyField = 'custbody_special_handling_rep_hidden'
                break;
            case "custpage_freight":
                keyField = 'custbody_freight_rep_hidden'
                break;
            case "custpage_discount":
                keyField = 'custbody_discount_rep_hidden'
                break;
            case "custpage_fuel":
                keyField = 'custbody_fuel_rep_hidden'
                break;
            case "custpage_wait_time_pick_up":
                keyField = 'custbody_waittimepu_rep_hidden'
                break;
            case "custpage_wait_time_delivery":
                keyField = 'custbody_waittimedel_rep_hidden'
                break;
            case "custpage_same_day_delivery":
                keyField = 'custbody_same_day_del_rep_hidden'
                break;
            case "custpage_after_hours_pick_up":
                keyField = 'custbody_after_hour_pu_rep_hidden'
                break;
            case "custpage_after_hours_delivery":
                keyField = 'custbody_after_hours_del_rep_hidden'
                break;
            case "custpage_storage":
                keyField = 'custbody_storage_rep_hidden'
                break;
            case "custpage_manpower":
                keyField = 'custbody_manpower_rep_hidden'
                break;
            case "custpage_smart_pallet":
                keyField = 'custbody_smart_pallet_rep_hidden'
                break;
            case "custpage_cfc":
                keyField = 'custbody_cfc_rep_hidden'
                break;
            case "custpage_fag":
                keyField = 'custbody_fag_rep_hidden'
                break;
            case "custpage_hol":
                keyField = 'custbody_weekend_holi_dlvy_rep_hidden'
                break;
            case "custpage_special":
                keyField = 'custbody_special_rep_hidden'
                break;
            case "custpage_handling":
                keyField = 'custbody_handling_rep_hidden'
                break;
            default:
                console.log("That's not a valid Key Field!");
        }
        return keyField
    }

    const checkObjValues = (obj) => {
        let counter = 0
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== null) {
              counter++
            }     
        }
        log.debug('TC counter', counter)
        if (counter > 0){
            return false
        } else {
            return true
        }
    }

    const determineFunction = (key, objParamValue) => {
        let salesorderSearchColFilter = []
        let currFunction = key;
        switch (currFunction) {
            case "ShipmentStatus":
                salesorderSearchColFilter = executeShipmentStatus(objParamValue)
                break;
            case "BilltoCode":
                salesorderSearchColFilter = executeBilltoCode(objParamValue)
                break;
            case "CustomerAccountCode":
                salesorderSearchColFilter = executeCustomerAccountCode(objParamValue)
                break;
            case "HAWB":
                salesorderSearchColFilter = executeHAWB(objParamValue)
                break;
            case "Origin":
                salesorderSearchColFilter = executeOrigin(objParamValue)
                break;
            case "Dest":
                salesorderSearchColFilter = executeDest(objParamValue)
                break;
            case "PickupDate":
                salesorderSearchColFilter = executePickupDate(objParamValue)
                break;
            case "DeliverDate":
                salesorderSearchColFilter = executeDeliverDate(objParamValue)
                break;
            case "HAWBDate":
                salesorderSearchColFilter = executeHAWBDate(objParamValue)
                break;
            case "invdate":
                salesorderSearchColFilter = executeinvdate(objParamValue)
                break;
            case "datecreated":
                salesorderSearchColFilter = executedatecreated(objParamValue)
                break;
            case "Handover":
                salesorderSearchColFilter = executeHandover(objParamValue)
                break;
            case "ServiceLevel":
                salesorderSearchColFilter = executeServiceLevel(objParamValue)
                break;
            case "ShipperCompany":
                salesorderSearchColFilter = executeShipperCompany(objParamValue)
                break;
            case "ShipperAddress":
                salesorderSearchColFilter = executeShipperAddress(objParamValue)
                break;
            case "ConsigneeCompany":
                salesorderSearchColFilter = executeConsigneeCompany(objParamValue)
                break;
            case "ConsigneeAddress":
                salesorderSearchColFilter = executeConsigneeAddress(objParamValue)
                break;
            case "CommodityType":
                salesorderSearchColFilter = executeCommodityType(objParamValue)
                break;
            case "Mode":
                salesorderSearchColFilter = executeMode(objParamValue)
                break;
            case "Zone":
                salesorderSearchColFilter = executeZone(objParamValue)
                break;
            case "Program":
                salesorderSearchColFilter = executeProgram(objParamValue)
                break;
            case "Distance":
                salesorderSearchColFilter = executeDistance(objParamValue)
                break;
            case "TruckId":
                salesorderSearchColFilter = executeTruckId(objParamValue)
                break;
            case "Control":
                salesorderSearchColFilter = executeControl(objParamValue)
                break;
            case "EquipmentCode":
                salesorderSearchColFilter = executeEquipmentCode(objParamValue)
                break;
            case "Status":
                salesorderSearchColFilter = executeStatus(objParamValue)
                break;
            default:
                log.debug("That's not a valid Parameter!");
        }
        return salesorderSearchColFilter
    }

    const executeStatus = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Status = objParamValue

        var StatusArrSet = Status.split(",")
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
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_sr_approvalstatus', 'anyof', StatusArr])                
                                                                                                                                                                                                                           
        return salesorderSearchColFilter
    }

    const executeEquipmentCode = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let EquipmentCode = objParamValue

        var EquipmentCodeArrSet = EquipmentCode.split(",")
        var EquipmentCodeArr = [];
        if(EquipmentCodeArrSet.length > 1){
            for(var x = 0; x<EquipmentCodeArrSet.length;x++){
            
                if(x==0){
                   
                    EquipmentCodeArr.push(['custbody_equipment_code', 'is', EquipmentCodeArrSet[x]])
                }
                else if(x==EquipmentCodeArrSet.length-1){
                    
                    EquipmentCodeArr.push('OR')
                    EquipmentCodeArr.push(['custbody_equipment_code', 'is', EquipmentCodeArrSet[x]])
                }
                else{
                   
                    EquipmentCodeArr.push('OR')
                    EquipmentCodeArr.push(['custbody_equipment_code', 'is', EquipmentCodeArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(EquipmentCodeArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_equipment_code', 'is', EquipmentCode])
        }        
                                                                                                                                                                                                         
        return salesorderSearchColFilter
    }

    const executeControl = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Control = objParamValue

        var ControlArrSet = Control.split(",")
        var ControlArr = [];
        if(ControlArrSet.length > 1){
            for(var x = 0; x<ControlArrSet.length;x++){
            
                if(x==0){
                   
                    ControlArr.push(['custbody_control', 'is', ControlArrSet[x]])
                }
                else if(x==ControlArrSet.length-1){
                    
                    ControlArr.push('OR')
                    ControlArr.push(['custbody_control', 'is', ControlArrSet[x]])
                }
                else{
                   
                    ControlArr.push('OR')
                    ControlArr.push(['custbody_control', 'is', ControlArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(ControlArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_control', 'is', Control])
        }        
                                                                                                               
                                                                                                                                                                 
        return salesorderSearchColFilter
    }

    const executeTruckId = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let TruckId = objParamValue

        var TruckIdArrSet = TruckId.split(",")
        var TruckIdArr = [];
        if(TruckIdArrSet.length > 1){
            for(var x = 0; x<TruckIdArrSet.length;x++){
            
                if(x==0){
                   
                    TruckIdArr.push(['custbody_truck_id', 'is', TruckIdArrSet[x]])
                }
                else if(x==TruckIdArrSet.length-1){
                    
                    TruckIdArr.push('OR')
                    TruckIdArr.push(['custbody_truck_id', 'is', TruckIdArrSet[x]])
                }
                else{
                   
                    TruckIdArr.push('OR')
                    TruckIdArr.push(['custbody_truck_id', 'is', TruckIdArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(TruckIdArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_truck_id', 'is', TruckId])
        }                                                               
                                                                                                                                                                 
        return salesorderSearchColFilter
    }

    const executeDistance = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Distance = objParamValue

        var DistanceArrSet = Distance.split("-")
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_distance_in_miles', 'between', DistanceArrSet])                       
                                                                                                                                                                 
        return salesorderSearchColFilter
    }

    const executeProgram = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Program = objParamValue

        var ProgramArrSet = Program.split(",")
        var ProgramArr = [];
        if(ProgramArrSet.length > 1){
            for(var x = 0; x<ProgramArrSet.length;x++){
            
                if(x==0){
                   
                    ProgramArr.push(['custbody_program', 'is', ProgramArrSet[x]])
                }
                else if(x==ProgramArrSet.length-1){
                    
                    ProgramArr.push('OR')
                    ProgramArr.push(['custbody_program', 'is', ProgramArrSet[x]])
                }
                else{
                   
                    ProgramArr.push('OR')
                    ProgramArr.push(['custbody_program', 'is', ProgramArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(ProgramArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_program', 'is', Program])
        }        
                                                                                                                                                                                                      
        return salesorderSearchColFilter
    }

    const executeZone = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Zone = objParamValue

        var ZoneArrSet = Zone.split(",")
        var ZoneArr = [];
                
        if(ZoneArrSet.length > 1){
            for(var x = 0; x<ZoneArrSet.length;x++){
            
                if(x==0){
                   
                    ZoneArr.push(['custbody_zone', 'is', ZoneArrSet[x]])
                }
                else if(x==ZoneArrSet.length-1){
                    
                    ZoneArr.push('OR')
                    ZoneArr.push(['custbody_zone', 'is', ZoneArrSet[x]])
                }
                else{
                   
                    ZoneArr.push('OR')
                    ZoneArr.push(['custbody_zone', 'is', ZoneArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(ZoneArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_zone', 'is', Zone])
        }                                                                                                                                                
                                                                 
                           
        return salesorderSearchColFilter
    }

    const executeMode = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Mode = objParamValue

        var ModeArrSet = Mode.split(",")
        var ModeArr = [];
                        
        for(var x = 0; x<ModeArrSet.length;x++){
            var customlist_modeSearchColInternalId = search.createColumn({ name: 'internalid' });
            var customlist_modeSearch = search.create({
            type: 'customlist_mode',
            filters: [
                ['name', 'is', ModeArrSet[x]],
            ],
            columns: [
                customlist_modeSearchColInternalId,
            ],
            });
            var searchResults = customlist_modeSearch.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResults.length == 0){
                ModeArr.push('@NONE@');
            }
            else{
                for (var i = 0; i < searchResults.length; i++) {
                    var id = searchResults[i].id;
                    ModeArr.push(id)
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        
        salesorderSearchColFilter.push(search.createFilter({
            name: 'custbody_mode',
            operator: search.Operator.ANYOF,
            values: ModeArr
        }));                                                                                                         
                                                                 
                           
        return salesorderSearchColFilter
    }

    const executeCommodityType = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let CommodityType = objParamValue

        var CommodityTypeArrSet = CommodityType.split(",")
        var CommodityTypeArr = [];
                
        if(CommodityTypeArrSet.length > 1){
            for(var x = 0; x<CommodityTypeArrSet.length;x++){
            
                if(x==0){
                   
                    CommodityTypeArr.push(['custbody_commodity_type', 'is', CommodityTypeArrSet[x]])
                }
                else if(x==CommodityTypeArrSet.length-1){
                    
                    CommodityTypeArr.push('OR')
                    CommodityTypeArr.push(['custbody_commodity_type', 'is', CommodityTypeArrSet[x]])
                }
                else{
                   
                    CommodityTypeArr.push('OR')
                    CommodityTypeArr.push(['custbody_commodity_type', 'is', CommodityTypeArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(CommodityTypeArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_commodity_type', 'is', CommodityType])
        }                                                             
                                                                 
                           
        return salesorderSearchColFilter
    }

    const executeConsigneeAddress = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let ConsigneeAddress = objParamValue

        var ConsigneeAddressArrSet = ConsigneeAddress.split(",")
        var ConsigneeAddressArr = [];

        if(ConsigneeAddressArrSet.length > 1){
            for(var x = 0; x<ConsigneeAddressArrSet.length;x++){
            
                if(x==0){
                   
                    ConsigneeAddressArr.push(['custbody_consignee_address', 'is', ConsigneeAddressArrSet[x]])
                }
                else if(x==ConsigneeAddressArrSet.length-1){
                    
                    ConsigneeAddressArr.push('OR')
                    ConsigneeAddressArr.push(['custbody_consignee_address', 'is', ConsigneeAddressArrSet[x]])
                }
                else{
                   
                    ConsigneeAddressArr.push('OR')
                    ConsigneeAddressArr.push(['custbody_consignee_address', 'is', ConsigneeAddressArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(ConsigneeAddressArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_consignee_address', 'is', ConsigneeAddress])
        }                     
                                                                 
                           
        return salesorderSearchColFilter
    }

    const executeConsigneeCompany = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let ConsigneeCompany = objParamValue

        var ConsigneeCompanyArrSet = ConsigneeCompany.split(",")
        var ConsigneeCompanyArr = [];
        if(ConsigneeCompanyArrSet.length > 1){
            for(var x = 0; x<ConsigneeCompanyArrSet.length;x++){
            
                if(x==0){
                   
                    ConsigneeCompanyArr.push(['custbody_consignee_company', 'is', ConsigneeCompanyArrSet[x]])
                }
                else if(x==ConsigneeCompanyArrSet.length-1){
                    
                    ConsigneeCompanyArr.push('OR')
                    ConsigneeCompanyArr.push(['custbody_consignee_company', 'is', ConsigneeCompanyArrSet[x]])
                }
                else{
                   
                    ConsigneeCompanyArr.push('OR')
                    ConsigneeCompanyArr.push(['custbody_consignee_company', 'is', ConsigneeCompanyArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(ConsigneeCompanyArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_consignee_company', 'is', ConsigneeCompany])
        }                     
                                                                 
                                               
        return salesorderSearchColFilter
    }

    const executeShipperAddress = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let ShipperAddress = objParamValue

        var ShipperAddressArrSet = ShipperAddress.split(",")
        var ShipperAddressArr = [];
                
        if(ShipperAddressArrSet.length > 1){
            for(var x = 0; x<ShipperAddressArrSet.length;x++){
            
                if(x==0){
                   
                    ShipperAddressArr.push(['custbody_shipper_address', 'is', ShipperAddressArrSet[x]])
                }
                else if(x==ShipperAddressArrSet.length-1){
                    
                    ShipperAddressArr.push('OR')
                    ShipperAddressArr.push(['custbody_shipper_address', 'is', ShipperAddressArrSet[x]])
                }
                else{
                   
                    ShipperAddressArr.push('OR')
                    ShipperAddressArr.push(['custbody_shipper_address', 'is', ShipperAddressArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(ShipperAddressArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_shipper_address', 'is', ShipperAddress])
                            }                                
                                               
        return salesorderSearchColFilter
    }

    const executeShipperCompany = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let ShipperCompany = objParamValue

        var ShipperCompanyArrSet = ShipperCompany.split(",")
        var ShipperCompanyArr = [];

        if(ShipperCompanyArrSet.length > 1){
            for(var x = 0; x<ShipperCompanyArrSet.length;x++){
            
                if(x==0){
                   
                    ShipperCompanyArr.push(['custbody_shipper_company', 'is', ShipperCompanyArrSet[x]])
                }
                else if(x==ShipperCompanyArrSet.length-1){
                    
                    ShipperCompanyArr.push('OR')
                    ShipperCompanyArr.push(['custbody_shipper_company', 'is', ShipperCompanyArrSet[x]])
                }
                else{
                   
                    ShipperCompanyArr.push('OR')
                    ShipperCompanyArr.push(['custbody_shipper_company', 'is', ShipperCompanyArrSet[x]])
                }
                
            }  
        
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(ShipperCompanyArr)
        }
        else{
            salesorderSearchColFilter.push('AND')
            salesorderSearchColFilter.push(['custbody_shipper_company', 'is', ShipperCompany])
        }            
                                               
        return salesorderSearchColFilter
    }

    const executeServiceLevel = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let ServiceLevel = objParamValue

        var ServiceLevelArrSet = ServiceLevel.split(",")
        var hasFilter = 0;
        var ServiceLevelArr = [];
        for(var x = 0; x<ServiceLevelArrSet.length;x++){
            var customlist_servicelevelSearchColInternalId = search.createColumn({ name: 'internalid' });
            var customlist_servicelevelSearch = search.create({
            type: 'customrecord_servicelevel',
            filters: [
                ['name', 'is', ServiceLevelArrSet[x]],
            ],
            columns: [
                customlist_servicelevelSearchColInternalId,
            ],
            });
            var searchResults = customlist_servicelevelSearch.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResults.length == 0){
                ServiceLevelArr.push('@NONE@');
            }
            else{
                for (var i = 0; i < searchResults.length; i++) {
                    var id = searchResults[i].id;
                    ServiceLevelArr.push(id)
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_servicelevel', 'anyof', ServiceLevelArr])                
                                               
        return salesorderSearchColFilter
    }

    const executeHandover = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Handover = objParamValue

        var HandoverArrSet = Handover.split(",")
        var hasFilter = 0;
        var HandoverArr = [];
    
        for(var x = 0; x<HandoverArrSet.length;x++){
            var customrecord_cseg_mawbSearchColInternalId = search.createColumn({ name: 'internalid' });
            var customrecord_cseg_mawbSearch = search.create({
            type: 'customrecord_cseg_handover3',
            filters: [
                ['name', 'is', HandoverArrSet[x]],
            ],
            columns: [
                customrecord_cseg_mawbSearchColInternalId,
            ],
            });
            var searchResultsHo = customrecord_cseg_mawbSearch.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResultsHo.length == 0){
                HandoverArr.push('@NONE@');
            }
            else{
                for (var i = 0; i < searchResultsHo.length; i++) {
                    var id = searchResultsHo[i].id;
                    HandoverArr.push(id)
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['cseg_handover3', 'anyof', HandoverArr])

        return salesorderSearchColFilter
    }

    const executedatecreated = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let datecreated = objParamValue

        var dateCreateArrSet = datecreated.split("-")
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['datecreated', 'within', dateCreateArrSet])

        return salesorderSearchColFilter
    }

    const executeinvdate = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let invdate = objParamValue
        var invdateArrSet = invdate.split("-")
                        
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_inv_posting_date', 'within', invdateArrSet])

        return salesorderSearchColFilter
    }

    const executeHAWBDate = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let HAWBDate = objParamValue
        var HAWBDateArrSet = HAWBDate.split("-")
                        
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['trandate', 'within', HAWBDateArrSet])
        return salesorderSearchColFilter
    }

    const executeDeliverDate = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let DeliverDate = objParamValue
        var DeliverDateArrSet = DeliverDate.split("-")
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_deliverdate', 'within', DeliverDateArrSet])
        return salesorderSearchColFilter
    }

    const executePickupDate = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let PickupDate = objParamValue

        var PickupDateArrSet = PickupDate.split("-")
                             
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_pickupdate', 'within', PickupDateArrSet])

        return salesorderSearchColFilter
                   
    }
    const executeDest = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Dest = objParamValue
        var destArrSet = Dest.split(",")
                            
        var destArr = [];
    
        for(var x = 0; x<destArrSet.length;x++){
            var customlist_originSearchColInternalId = search.createColumn({ name: 'internalid' });
            var customlist_originSearch = search.create({
            type: 'customlist_origin',
            filters: [
                ['name', 'is', destArrSet[x]],
            ],
            columns: [
                customlist_originSearchColInternalId,
            ],
            });
            
            var searchResults = customlist_originSearch.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResults.length == 0){
                destArr.push('@NONE@');
            }
            else{
                for (var i = 0; i < searchResults.length; i++) {
                    var id = searchResults[i].id;
                    destArr.push(id)
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_destination', 'anyof', destArr])

        return salesorderSearchColFilter
    }

    const executeOrigin = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let Origin = objParamValue
        var OriginArrSet = Origin.split(",")
                            
        var OriginArr = [];
        
        for(var x = 0; x<OriginArrSet.length;x++){
            var customlist_originSearchColInternalId = search.createColumn({ name: 'internalid' });
            var customlist_originSearch = search.create({
            type: 'customlist_origin',
            filters: [
                ['name', 'is', OriginArrSet[x]],
            ],
            columns: [
                customlist_originSearchColInternalId,
            ],
            });
            
            var searchResults = customlist_originSearch.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResults.length == 0){
                OriginArr.push('@NONE@');
            }
            else{
                for (var i = 0; i < searchResults.length; i++) {
                    var id = searchResults[i].id;
                    OriginArr.push(id)
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_origin', 'anyof', OriginArr])

        return salesorderSearchColFilter
    }

    const executeHAWB = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let HAWB = objParamValue
        var HAWBArrSet = HAWB.split(",")
        var HAWBArr = [];
        for(var x = 0; x<HAWBArrSet.length;x++){
            
            var customrecord_cseg_hawborigId = search.createColumn({ name: 'internalid' });
            var customrecord_cseg_hawborigSearch = search.create({
            type: 'customrecord_cseg_hawborig',
            filters: [
                ['name', 'is', HAWBArrSet[x]],
            ],
            columns: [
                customrecord_cseg_hawborigId
            ],
            });
            var searchResults = customrecord_cseg_hawborigSearch.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResults.length == 0){
                var hasNone = 0;
                for (var n = 0; n < HAWBArr.length; n++) {
                    if (HAWBArr[n] == '@NONE@') {
                        hasNone = 1;
                        break;
                    }
                }

                if(hasNone == 0){
                    HAWBArr.push('@NONE@');
                }
            }
            else{
                for (var i = 0; i < searchResults.length; i++) {
                    var id = searchResults[i].id;
                    HAWBArr.push(id)
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['cseg_hawborig', 'anyof', HAWBArr])

        return salesorderSearchColFilter
    }

    const executeCustomerAccountCode = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let CustomerAccountCode = objParamValue
        var TMSCusAccArrSet = CustomerAccountCode.split(",")
        var hasFilter = 0;
        var TMSCusAccArr = [];
        for(var x = 0; x<TMSCusAccArrSet.length;x++){
            var customrecord_billtocodesSearchColInternalId = search.createColumn({ name: 'internalid' });
            var customrecord_billtocodesSearch = search.create({
            type: 'customrecord_billtocodes',
            filters: [
                ['name', 'is', TMSCusAccArrSet[x]],
            ],
            columns: [
                customrecord_billtocodesSearchColInternalId,
            ],
            });
            var searchResultsTMSCusAcc = customrecord_billtocodesSearch.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResultsTMSCusAcc.length == 0){
                TMSCusAccArr.push('@NONE@');
            }
            else{
                for (var i = 0; i < searchResultsTMSCusAcc.length; i++) {
                    var id = searchResultsTMSCusAcc[i].id;
                    TMSCusAccArr.push(id)
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_tmscustaccount', 'anyof', TMSCusAccArr])

        return salesorderSearchColFilter
    }

    const executeBilltoCode = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let BilltoCode = objParamValue
        var btcArrSet = BilltoCode.split(",")
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
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_billtoaccount', 'anyof', billtocodeArr])

        return salesorderSearchColFilter
    }

    const executeShipmentStatus = (objParamValue) =>{
        let salesorderSearchColFilter = []
        let ShipmentStatus = objParamValue
        var ShipmentStatusSet = ShipmentStatus.split(",")
        var ShipmentStatusArr = [];
        for(var x = 0; x<ShipmentStatusSet.length;x++){
            var customlist866SearchColInternalId = search.createColumn({ name: 'internalid' });
            var customlist866Search = search.create({
            type: 'customlist866',
            filters: [
                ['name', 'is', ShipmentStatusSet[x]],
            ],
            columns: [
                customlist866SearchColInternalId,
            ],
            });
            var searchResults = customlist866Search.run().getRange({
                start: 0,
                end: 1 // Adjust the number of results you want to fetch
            });
            if(searchResults.length == 0){
                ShipmentStatusArr.push('@NONE@');
            }
            else{
                for (var i = 0; i < searchResults.length; i++) {
                    var id = searchResults[i].id;
                    ShipmentStatusArr.push(id);
                }
            }
        }
        //should have same value pairs from the columns -> to getValue
        salesorderSearchColFilter.push('AND')
        salesorderSearchColFilter.push(['custbody_shipmentstatus', 'anyof', ShipmentStatusArr])
        
        return salesorderSearchColFilter
    }

    return {
        autoRate: autoRate,
        getSuiteletPage : getSuiteletPage,
        markAll : markAll,
        unmarkAll : unmarkAll,
        rejectSR : rejectSR,
        exportCSV : exportCSV,
        //selectSR : selectSR,
        pageInit: pageInit_sr_to_inv,
        fieldChanged: fieldChanged_sr_to_inv_search,
        /*postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete*/
        //saveRecord: saveRecord_sr_to_inv
        saveRecord_sr_to_inv: saveRecord_sr_to_inv
    };
    
});