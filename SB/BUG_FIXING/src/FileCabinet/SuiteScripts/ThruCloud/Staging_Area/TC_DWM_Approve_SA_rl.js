/**
	 * @NApiVersion 2.1
	 * @NScriptType Restlet
	 * @NModuleScope SameAccount
	 */
define(['N/record','N/search', 'N/ui/serverWidget', 'N/url', 'N/redirect', 'N/format', 'N/https','N/runtime','N/task'], function(record,search, serverWidget, url, redirect, format, https, runtime, task) {
    return{
        post: function(requestBody){

      
        log.debug('Restlet Script', 'Restlet Script Executed');
        var applySrTranId = [];
        
		var srIds = requestBody.ids;
        var action = requestBody.action;
        
        log.debug('srIds',srIds)
        if(action == 'approve'){

            var myUser = runtime.getCurrentUser();

            var applySRIds = [];
            var invFail = [];
            var invIds = [];

            if(srIds){
     
                    var srID = srIds;
                    srID = parseInt(srID);
                    var srRec = search.lookupFields({
                        type: search.Type.SALES_ORDER,
                        id: srID,
                        columns: ['tranid','custbody_invoice','entity','cseg_hawborig','trandate','custbody_owned_by_sa','custbody_freight_rep_hidden','custbody_discount_rep_hidden','custbody_fuel_rep_hidden','custbody_waittimepu_rep_hidden','custbody_waittimedel_rep_hidden','custbody_same_day_del_rep_hidden','custbody_after_hour_pu_rep_hidden','custbody_after_hours_del_rep_hidden','custbody_storage_rep_hidden','custbody_manpower_rep_hidden','custbody_smart_pallet_rep_hidden','custbody_cfc_rep_hidden','custbody_fag_rep_hidden','custbody_weekend_holi_dlvy_rep_hidden','custbody_special_rep_hidden','custbody_handling_rep_hidden','custbody_special_handling_rep_hidden','custbody_hazardous_cargo_rep_hidden','custbody_layover_fee_rep_hidden','custbody_weekend_pickup_dlvy_rep_hidde','custbody_detention_charge_rep_hidden','custbody_veh_waiting_time_rep_hidden','custbody_veh_wait_time_dest_rep_hidden','custbody_truck_order_not_rep_hidden','custbody_attempted_pickup_rep_hidden','custbody_liftgate_truck_hidden','custbody_brokerage_govt_fees_hidden','custbody_screening_hidden','custbody_overtime_charges_hidden','custbody_break_bulk_fee_hidden','custbody_edi_fee_hidden','custbody_customs_formalities_hidden','custbody_stop_fee_hidden','custbody_brokerage_customsdutieshidden','custbody_attempted_delivery_hidden','custbody_dock_fee_hidden','custbody_warehouse_pick_pack_hidden','custbody_storage_at_destination_hidden','custbody_government_dutiestaxes_hidden',]
                    });         
        
                    if(srRec.cseg_hawborig.length != 0){
                        var hawbVal = srRec.cseg_hawborig[0].text;
                    }
        
                    var tranidSR = srRec.tranid;
                        
                    var isInv = srRec.custbody_invoice;
                        
                    if(!isInv){
                        applySrTranId.push(tranidSR)
                        applySRIds.push(srID);

                        var hawbDate = srRec.trandate;
                        log.debug('Date Orig',hawbDate)
                        hawbDate = new Date(hawbDate);
                        try{
                            //log.debug('try');
                        var soIdRec = record.submitFields({
                            type: record.Type.SALES_ORDER,
                            id: srID,
                            values: {
                                custbody_invoice: true,
                                custbody_sr_approvalstatus: 3,
                                orderstatus : 'B',
                                custbody_freight : srRec.custbody_freight_rep_hidden,
                                custbody_discount: srRec.custbody_discount_rep_hidden,
                                custbody_fuel_surcharge: srRec.custbody_fuel_rep_hidden,
                                custbody_wait_time_on_pickup : srRec.custbody_waittimepu_rep_hidden,
                                custbody_wait_time_on_dlvy : srRec.custbody_waittimedel_rep_hidden,
                                custbody_same_day_delivery_requested: srRec.custbody_same_day_del_rep_hidden,
                                custbody_after_hours_pickup: srRec.custbody_after_hour_pu_rep_hidden,
                                custbody_after_hours_delivery : srRec.custbody_after_hours_del_rep_hidden,
                                custbody_storage : srRec.custbody_storage_rep_hidden,
                                custbody_additional_manpower: srRec.custbody_manpower_rep_hidden,
                                custbody_smart_pallet: srRec.custbody_smart_pallet_rep_hidden,
                                custbody_cfc : srRec.custbody_cfc_rep_hidden,
                                custbody_fag : srRec.custbody_fag_rep_hidden,
                                custbody_weekend_or_holiday_delivery: srRec.custbody_weekend_holi_dlvy_rep_hidden,
                                custbody_special : srRec.custbody_special_rep_hidden,
                                custbody_handling : srRec.custbody_handling_rep_hidden,
                                custbody_special_handling : srRec.custbody_special_handling_rep_hidden,
                                custbody_hazardous_cargo : srRec.custbody_hazardous_cargo_rep_hidden,
                                custbody_layover_fee: srRec.custbody_layover_fee_rep_hidden,
                                custbody_weekend_pickup_dlvy: srRec.custbody_weekend_pickup_dlvy_rep_hidde,
                                custbody_detention_charge : srRec.custbody_detention_charge_rep_hidden,
                                custbody_vehicle_waiting_time_origin : srRec.custbody_veh_waiting_time_rep_hidden,
                                custbody_vehicle_waiting_time_dest : srRec.custbody_veh_wait_time_dest_rep_hidden,
                                custbody_truck_ordered_not_used : srRec.custbody_truck_order_not_rep_hidden,
                                custbody_attempted_pickup : srRec.custbody_attempted_pickup_rep_hidden,
                                custbody_lift_gate_truck_or_forklift : srRec.custbody_liftgate_truck_hidden,
                                custbody_brokerage_govt_fees : srRec.custbody_brokerage_govt_fees_hidden,
                                custbody_screening: srRec.custbody_screening_hidden,
                                custbody_overtime_charges: srRec.custbody_overtime_charges_hidden,
                                custbody_break_bulk_fee: srRec.custbody_break_bulk_fee_hidden,
                                custbody_edi_fee: srRec.custbody_edi_fee_hidden,
                                custbody_customs_formalities: srRec.custbody_customs_formalities_hidden,
                                custbody_stop_fee: srRec.custbody_stop_fee_hidden,
                                custbody_brokerage_customs_duties: srRec.custbody_brokerage_customsdutieshidden,
                                custbody_attempted_delivery: srRec.custbody_attempted_delivery_hidden,
                                custbody_dock_fee: srRec.custbody_dock_fee_hidden,
                                custbody_warehouse_pick_and_pack: srRec.custbody_warehouse_pick_pack_hidden,
                                custbody_storage_at_destination: srRec.custbody_storage_at_destination_hidden,
                                custbody_government_duties_and_taxes: srRec.custbody_government_dutiestaxes_hidden,
                                custbody_external_notes : srRec.custbody_external_notes_rep_hidden,
                            }
                        });

                        log.debug('soIdRec', soIdRec)
                            log.debug('hawbVal',hawbVal)
                            log.debug('hawbDate',hawbDate)
                            log.debug('srID',srID)
                        
                                var newINVRec = record.transform({
                                    fromType: record.Type.SALES_ORDER,
                                    fromId: srID,
                                    toType: record.Type.INVOICE
                                });
        
                                log.debug('newINVRec',newINVRec)
        
                                newINVRec.setValue({
                                    fieldId: 'custbody_hawbdate',
                                    value: hawbDate
                                })
        
                                log.debug('Record Declaration')
                            
                                newINVRec.setValue({
                                    fieldId: 'tranid',
                                    value: hawbVal
                                })
                
                                log.debug('After Setting')
                                var invId = newINVRec.save();
                                log.debug('invId',invId)
                                invIds.push(invId)
                            }
                            catch (error) {
                                //log.debug('catch');
                                invFail.push(tranidSR)
                                log.error('Error:', error.message);
                                // You can also perform any necessary error handling or recovery steps here
                            }

                            var currentDate = new Date();

                            log.debug('currentDate',currentDate)
                            var year = currentDate.getFullYear(); // Get the current year (e.g., 2023)
                            var month = (currentDate.getMonth() + 1).toString(); // Get the current month (0-based, so January is 0)
                            var day = currentDate.getDate().toString(); // Get the current day of the month (1-31)
                            var hour = currentDate.getHours().toString(); // Get the current hour (0-23)
                            var minute = currentDate.getMinutes().toString(); // Get the current minute (0-59)
                            var second = currentDate.getSeconds().toString(); // Get the current second (0-59)

                            var formattedDate = year+'-'+month+'-'+day+' '+hour+":"+minute+":"+second+ " GMT+0800 (Philippine Standard Time)"

                            
                            //try{
                                var bodyJSON = JSON.stringify({
                                    "customer": srRec.entity[0].text, 
                                    "status": "approved", 
                                    "remarks": "Successfully Approved", 
                                    "updated_by": myUser.email, 
                                    "updated_at": formattedDate 
                                })


                                //SB LINK
                                //var flexshipURL = 'https://staging-chainlinq-messenger.dwmorgantech.com/api/v1/billings/'+hawbVal+'/statuses';
                                //PROD LINK
                                var flexshipURL = 'https://chainlinq-messenger.dwmorgantech.com/api/v1/billings/'+hawbVal+'/statuses';
                                
                                //var flexshipURL = 'https://api.morganflex.com/1.0/billing/'+hawbVal+'/status';
                                
                                //var flexshipURL = 'https://intel.morganflexstaging.net/api/billing/1MRAF0000007962/status';

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
        
                                log.debug('response.body',response.body)
                                log.debug('response.code',response.code)
                        }
                        else{
                            invFail.push(tranidSR)
                            applySRIds.push(srID);
                        }
            }
            var passedCnt = invIds.length;
            var faileCnt = invFail.length;
            
            if(passedCnt){
                var salesRep = 1
            }
            else{
                var salesRep = 0
            }
            

        }
        else if(action == 'autorate'){
            var hasApply=0;
            var applySrTranId = [];
            var applySrId = [];
            var hasInv=0;
            var soIds = srIds.split(",");
            if(soIds.length>0){
                    for(var x=0;x<soIds.length;x++){


                        var srID = soIds[x];
                        log.debug('srID',srID)

                        var srRec = search.lookupFields({
                            type: search.Type.SALES_ORDER,
                            id: srID,
                            columns: ['custbody_owned_by_sa','custbody_invoice','tranid','entity','custbody_billtoaccount','trandate','custbody_servicelevel','custbody_origin','custbody_destination','custbody_shipper_address','custbody_consignee_address','custbody_shipmentstatus','custbody_pieces','custbody_chargeable_weight','custbody_pickupwaittime','custbody_deliverywaittime','custbody_actualweight','custbody_dim_weight','custbody_pickupdate','custbody_deliverdate','custbody_pickuptime','custbody_deliverytime']
                        });
                        
                        
                            hasApply = 1
                            
                            applySrId.push(srID)

                            var isInv = srRec.custbody_invoice;

                            
                            if(isInv == true){
                                //log.debug('Here If',isInv)
                                var srtranid = srRec.tranid;
                                hasInv = 1;
                                applySrTranId.push(srtranid)
                            }
                            else{
                                
                                var entityText = srRec.entity[0].text;
            
                                var billAcc;
                                if(srRec.custbody_billtoaccount.length != 0){
                                    billAcc = srRec.custbody_billtoaccount[0].value;
                                }
                                else{
                                    
                                    var errorMessage = 'Shipment Record(s) '+srRec.tranid+' Bill to Code is mandatory to Calculate';
                                    throw new Error(errorMessage);
                                }

                                var hawbDate;
                                if(srRec.trandate){
                                    hawbDate = srRec.trandate;
                                }
                                else{
                                    
                                    var errorMessage = 'Shipment Record(s) '+srRec.tranid+' HAWB DATE is mandatory to Calculate';
                                    throw new Error(errorMessage);
                                }

                                
                                var SL;
                                if(srRec.custbody_servicelevel.length != 0){
                                    SL = srRec.custbody_servicelevel[0].value;
                                }
                                else{
                                    var errorMessage = 'Shipment Record(s) '+srRec.tranid+' Service Level is mandatory to Calculate';
                                    throw new Error(errorMessage);
                                }

                                var origin;
                                if(srRec.custbody_origin.length != 0){
                                    origin = srRec.custbody_origin[0].value;
                                }

                                var dest;
                                if(srRec.custbody_destination.length != 0){
                                    dest = srRec.custbody_destination[0].value;
                                }
            
                                var shipperAddress = srRec.custbody_shipper_address;
                                
                                var consigneeAddress = srRec.custbody_consignee_address;

                                var shipStatus;

                                if(srRec.custbody_shipmentstatus.length != 0){
                                    shipStatus = srRec.custbody_shipmentstatus[0].value;
                                }
            
                                var hawbDateOnly = hawbDate;
                                var waitTimePU =  srRec.custbody_pickupwaittime;
            
                                var waitTimeDel =  srRec.custbody_deliverywaittime;
                                var totalArr = new Array();
                                if(shipStatus == 1){

                                    var freightFieldArr = new Array();
                                    var puwaitTimeFieldArr = new Array();
                                    var delwaitTimeFieldArr = new Array();
                                    var freightFueldArr = new Array();
                                    var SDDFieldArr = new Array();
                                    var AHPUFieldArr = new Array();
                                    var AHDelFieldArr = new Array();
                                    var storageArr = new Array();
                                    var manPowerArr = new Array();
                                    var smartPalFieldArr = new Array();
                                    var CFCFieldArr = new Array();
                                    var FAGFieldArr = new Array();
                                    var DOCKFieldArr = new Array();
                                    var customrecord_freightratetableSearchColItemName = search.createColumn({ name: 'custrecord_accessorialcodes' });
                                    var customrecord_freightratetableSearchColValueBy = search.createColumn({ name: 'custrecord_valueby' });
                                    var customrecord_freightratetableSearchColValue = search.createColumn({ name: 'custrecord_valuecust' });
                                    var customrecord_freightratetableSearchColMinweight = search.createColumn({ name: 'custrecord_minweight' });
                                    var customrecord_freightratetableSearchColMaxweight = search.createColumn({ name: 'custrecord_maxweight' });
                                    var customrecord_freightratetableSearchColWaitTimeTypeInMins = search.createColumn({ name: 'custrecord_waittimetype' });
                                    var customrecord_freightratetableSearchColWaitTimeRate = search.createColumn({ name: 'custrecord_waittimerate' });
                                    var customrecord_freightratetableSearchColWaitTimeType = search.createColumn({ name: 'custrecord_defaultwaittimetype2' });
                                    var customrecord_freightratetableSearchColWaitTimeType2 = search.createColumn({ name: 'custrecord_waittimetypeoption2' });
                                    var customrecord_freightratetableSearchColCheckOD = search.createColumn({ name: 'custrecord_checkorigindestairport' });
                                    var customrecord_freightratetableSearchColWaitTimeMax = search.createColumn({ name: 'custrecord_wait_time_max2' });
                                    var customrecord_freightratetableSearchColValueByDisc = search.createColumn({ name: 'custrecord_valuebydiscount' });
                                    var customrecord_freightratetableSearchColValueDisc = search.createColumn({ name: 'custrecord_valuediscount' });
                                    var customrecord_freightratetableSearchColValueFuel = search.createColumn({ name: 'custrecord_valuefuel' });
                                    var customrecord_freightratetableSearchColPdSameDay = search.createColumn({ name: 'custrecord_pdsameday' });
                                    var customrecord_freightratetableSearchColOutsideCalendar = search.createColumn({ name: 'custrecord_outsidecalendar' });
                                    var customrecord_freightratetableSearchColCalendar = search.createColumn({ name: 'custrecord_calendar' });
                                    var customrecord_freightratetableSearchColBillToCode = search.createColumn({ name: 'custrecord_billtocode' });
                                    var customrecord_freightratetableSearchColChargeForSmartPallet = search.createColumn({ name: 'custrecord_chargeforsmartpallet' });
                                    
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
                                        customrecord_freightratetableSearchColMaxweight,
                                        customrecord_freightratetableSearchColWaitTimeTypeInMins,
                                        customrecord_freightratetableSearchColWaitTimeRate,
                                        customrecord_freightratetableSearchColWaitTimeType,
                                        customrecord_freightratetableSearchColWaitTimeType2, 
                                        customrecord_freightratetableSearchColCheckOD, 
                                        customrecord_freightratetableSearchColWaitTimeMax,
                                        customrecord_freightratetableSearchColValueByDisc,
                                        customrecord_freightratetableSearchColValueDisc,
                                        customrecord_freightratetableSearchColValueFuel,
                                        customrecord_freightratetableSearchColPdSameDay,
                                        customrecord_freightratetableSearchColOutsideCalendar,
                                        customrecord_freightratetableSearchColCalendar,
                                        customrecord_freightratetableSearchColBillToCode,
                                        customrecord_freightratetableSearchColChargeForSmartPallet
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

                                        if(codeArr.indexOf("111") !== -1) {
                                            var timeType = result.getValue({
                                                name: 'custrecord_waittimetype'
                                            });
                    
                                            var timeRate = result.getValue({
                                                name: 'custrecord_waittimerate'
                                            });
                    
                                            var WaitTimeType = result.getValue({ name: 'custrecord_defaultwaittimetype2' });
                                            var WaitTimeType2 = result.getValue({ name: 'custrecord_waittimetypeoption2' });
                                            var CheckOD = result.getValue({ name: 'custrecord_checkorigindestairport' });
                                            var WaitTimeMax = result.getValue({ name: 'custrecord_wait_time_max2' });
                                        
                                            puwaitTimeFieldArr.push({
                                                "timetype" : timeType,
                                                "timerate" : timeRate,
                                                "WaitTimeType" : WaitTimeType,
                                                "WaitTimeType2" : WaitTimeType2,
                                                "CheckOD" : CheckOD,
                                                "WaitTimeMax" : WaitTimeMax
                                                
                                            })
                                        }
                                        

                                        if(codeArr.indexOf("106") !== -1) {
                                            var timeType = result.getValue({
                                                name: 'custrecord_waittimetype'
                                            });
                    
                                            var timeRate = result.getValue({
                                                name: 'custrecord_waittimerate'
                                            });
                    
                                            var WaitTimeType = result.getValue({ name: 'custrecord_defaultwaittimetype2' });
                                            var WaitTimeType2 = result.getValue({ name: 'custrecord_waittimetypeoption2' });
                                            var CheckOD = result.getValue({ name: 'custrecord_checkorigindestairport' });
                                            var WaitTimeMax = result.getValue({ name: 'custrecord_wait_time_max2' });
                                        

                                            delwaitTimeFieldArr.push({
                                                "timetype" : timeType,
                                                "timerate" : timeRate,
                                                "WaitTimeType" : WaitTimeType,
                                                "WaitTimeType2" : WaitTimeType2,
                                                "CheckOD" : CheckOD,
                                                "WaitTimeMax" : WaitTimeMax
                                            })
                                        }

                                        var valueByDisc = result.getValue({
                                            name: 'custrecord_valueby'
                                        });
                
                                        var valueDisc = result.getValue({
                                            name: 'custrecord_valuecust'
                                        });

                                        /*discountFieldArr.push({
                                            "valueby" : valueByDisc,
                                            "val" : valueDisc
                                            
                                        })*/
                
                                        if (codeArr.indexOf("114") !== -1 || codeArr.indexOf("291") !== -1) {
                                            var valueFuel = result.getValue({
                                                name: 'custrecord_valuefuel'
                                            });

                                            freightFueldArr.push({
                                                "val" : valueFuel
                                            })
                                        }
                
                                        if(codeArr.indexOf("104") !== -1) {
                                            var pdsameDay = result.getValue({
                                                name: 'custrecord_pdsameday'
                                            });

                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 104,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });

                                            //log.debug('bp',bp)

                                            SDDFieldArr.push({
                                                "pd" : pdsameDay,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("108") !== -1) {

                                            var outcal = result.getValue({
                                                name: 'custrecord_outsidecalendar'
                                            });
                
                                            var calendar = result.getValue({
                                                name: 'custrecord_calendar'
                                            });
                
                                            var pdsameDay = result.getValue({
                                                name: 'custrecord_pdsameday'
                                            });

                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 108,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });
                
                                            AHPUFieldArr.push({
                                                "outcal" : outcal,
                                                "calendar" : calendar,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("112") !== -1) {

                                            var outcal = result.getValue({
                                                name: 'custrecord_outsidecalendar'
                                            });
                
                                            var calendar = result.getValue({
                                                name: 'custrecord_calendar'
                                            });

                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 112,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });
            
                                            AHDelFieldArr.push({
                                                "outcal" : outcal,
                                                "calendar" : calendar,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("109") !== -1) {

                                            var billtoCode = result.getValue({
                                                name: 'custrecord_billtocode'
                                            });

                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 109,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });
                
                                            storageArr.push({
                                                "billcode" : billtoCode,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("105") !== -1) {
                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 105,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });

                                            //log.debug('bp',bp)

                                            var billtoCode = result.getValue({
                                                name: 'custrecord_billtocode'
                                            });

                                            manPowerArr.push({
                                                "billcode" : billtoCode,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("103") !== -1) {
                                            var chargePallet = result.getValue({
                                                name: 'custrecord_chargeforsmartpallet'
                                            });

                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 103,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });
                
                                            smartPalFieldArr.push({
                                                "chargePallet" : chargePallet,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("292") !== -1) {
                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 292,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });

                                            CFCFieldArr.push({
                                                "billcode" : billtoCode,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("293") !== -1) {
                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 293,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });

                                            FAGFieldArr.push({
                                                "billcode" : billtoCode,
                                                "bp" : bp
                                            })
                                        }

                                        if(codeArr.indexOf("98") !== -1) {
                                            var itemRec = record.load({
                                                type: record.Type.SERVICE_ITEM, 
                                                id: 98,
                                                isDynamic: true,
                                            })

                                            //log.debug('itemRec',itemRec)

                                            var bp = itemRec.getSublistValue({
                                                sublistId: 'price1',
                                                fieldId: 'price_1_',
                                                line: 0
                                            });

                                            DOCKFieldArr.push({
                                                "billcode" : billtoCode,
                                                "bp" : bp
                                            })
                                        }
                                    })
                                    
                                    //return freightFieldArr;
                                    }

                                    //log.debug('freightFieldArr',freightFieldArr)
                                    var actWt =  srRec.custbody_actualweight;

                                    var wtUse = srRec.custbody_chargeable_weight;
                                    log.debug('wtUse',wtUse)
                                    log.debug('freightFieldArr',freightFieldArr)
                                    log.debug('freightFieldArr',freightFieldArr.length)
                                    if(freightFieldArr.length == 0){
                                        var freightVal = 0;
                                    }
                                    else{
                                        for(var j=0;j<freightFieldArr.length;j++){
                                            //if(hawbDateOnly >= freightFieldArr[j].sdate && hawbDateOnly <= freightFieldArr[j].edate){
                                                log.debug('iterate',j)
                                                if(freightFieldArr[j].minwt == 0 && freightFieldArr[j].maxwt == 0){
                                                    log.debug('If',freightFieldArr)
                                                    if(freightFieldArr[j].valueby == 1){
                                                        var freightVal = freightFieldArr[j].val;
                                                        log.debug('If if',freightVal)
                                                    }
                                                    else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                                        var freightVal = wtUse * freightFieldArr[j].val;
                                                        freightVal = freightVal.toFixed(2);
                                                        log.debug('If else',freightVal)
                                                    }
                                                }
                                                else if(parseFloat(freightFieldArr[j].minwt) < wtUse && freightFieldArr[j].maxwt == 0){
                                                    log.debug('else If',freightFieldArr)
                                                    if(freightFieldArr[j].valueby == 1){
                                                        var freightVal = freightFieldArr[j].val;
                                                        log.debug('else if if',freightVal)
                                                    }
                                                    else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                                        var freightVal = wtUse * freightFieldArr[j].val;
                                                        freightVal = freightVal.toFixed(2);
                                                        log.debug('else if else if',freightVal)
                                                        
                                                    }
                                                }
                                                else if(freightFieldArr[j].minwt == 0 && parseFloat(freightFieldArr[j].maxwt) > wtUse){
                                                    log.debug('else If 2',freightFieldArr)
                                                    if(freightFieldArr[j].valueby == 1 ){
                                                        var freightVal = freightFieldArr[j].val;
                                                        log.debug('else if if 3',freightVal)
                                                    }
                                                    else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                                        var freightVal = wtUse * freightFieldArr[j].val;
                                                        freightVal = freightVal.toFixed(2);
                                                        log.debug('else if else if 3',freightVal)
                                                    }
                                                }
                                        }
                                    
                                    }
                                    totalArr.push(freightVal)

                                    //WAIT TIME PICK UP

                                    var waitTimePUArr = new Array();
                                    
                                    if(puwaitTimeFieldArr.length == 0)var waitTimePUVal = 0;
                                    else{

                                        //log.debug('puwaitTimeFieldArr',puwaitTimeFieldArr)
                                        var waitTimeMax = parseInt(puwaitTimeFieldArr[0].WaitTimeMax)
                                        
                                        if(puwaitTimeFieldArr[0].CheckOD == false){
                                            var WaitTimeType = parseInt(puwaitTimeFieldArr[0].WaitTimeType);
                                        }
                                        else{
                                            var WaitTimeType = parseInt(puwaitTimeFieldArr[0].WaitTimeType2);
                                        }

                                        //log.debug('WaitTimeType',WaitTimeType)
                                        var customrecord_waittimecalculationSearchColMaximumFree = search.createColumn({ name: 'custrecord_maximumfree' });
                                        var customrecord_waittimecalculationSearchColChargeEntireWaitTime = search.createColumn({ name: 'custrecord_chargeentirewaittime' });
                                        var customrecord_waittimecalculationSearch = search.create({
                                        type: 'customrecord_waittimecalculation',
                                        filters: [
                                            ['internalid', 'anyof', WaitTimeType],
                                        ],
                                        columns: [
                                            customrecord_waittimecalculationSearchColMaximumFree,
                                            customrecord_waittimecalculationSearchColChargeEntireWaitTime,
                                        ],
                                        });

                                        var searchResults = customrecord_waittimecalculationSearch.run().getRange({
                                            start: 0,
                                            end: 1 // Adjust the number of results you want to fetch
                                        });

                                        for (var z = 0; z < searchResults.length; z++) {
                                            var MaximumFree = searchResults[z].getValue({ name: 'custrecord_maximumfree' });
                                            var ChargeEntireWaitTime = searchResults[z].getValue({ name: 'custrecord_chargeentirewaittime' });
                                            
                                            
                                            waitTimePUArr.push({
                                                "MaximumFree" : MaximumFree,
                                                "ChargeEntireWaitTime" : ChargeEntireWaitTime
                                            })
                                        }
                                        //log.debug('waitTimePUArr',waitTimePUArr)
                                        waitTimePU = parseInt(waitTimePU)

                                        //log.debug('waitTimePU',waitTimePU)
                                        if(waitTimePUArr[0].ChargeEntireWaitTime == 'Yes'){
                                            if(waitTimePU <= waitTimePUArr[0].MaximumFree){
                                                //Free
                                                var waitTimePUVal = 0;
                                                //log.debug('If If',waitTimePUVal)
                                            }
                                            else{
                                                var waitTimePUVal = waitTimePU * puwaitTimeFieldArr[0].timerate;
                                                waitTimePUVal = waitTimePUVal.toFixed(2);
                                                //log.debug('If else',waitTimePUVal)
                                            }
                                        }
                                        else{
                                            if(waitTimePU <= waitTimePUArr[0].MaximumFree){
                                                //Free
                                                var waitTimePUVal = 0;

                                                //log.debug('else If',waitTimePUVal)
                                            }
                                            else{
                                                var chargeTime = waitTimePU - waitTimePUArr[0].MaximumFree;
                                                var waitTimePUVal = chargeTime * puwaitTimeFieldArr[0].timerate;
                                                waitTimePUVal = waitTimePUVal.toFixed(2);
                                                //log.debug('else else',waitTimePUVal)
                                            }
                                        }                    

                                        if(waitTimePUVal >= waitTimeMax){
                                            waitTimePUVal = waitTimeMax;
                                            //log.debug('if max',waitTimePUVal)
                                        }
                                    }
                                    totalArr.push(waitTimePUVal)
                
                                    //WAIT TIME Delivery
                                    var waitTimeDELArr = new Array();
                                    if(delwaitTimeFieldArr.length == 0)var waitTimeDelVal = 0;
                                    else{
                                        var waitTimeMax = parseInt(delwaitTimeFieldArr[0].WaitTimeMax)
                                        
                                        if(delwaitTimeFieldArr[0].CheckOD == false){
                                            var WaitTimeType = parseInt(delwaitTimeFieldArr[0].WaitTimeType);
                                        }
                                        else{
                                            var WaitTimeType = parseInt(delwaitTimeFieldArr[0].WaitTimeType2);
                                        }

                                        var customrecord_waittimecalculationSearchColMaximumFree = search.createColumn({ name: 'custrecord_maximumfree' });
                                        var customrecord_waittimecalculationSearchColChargeEntireWaitTime = search.createColumn({ name: 'custrecord_chargeentirewaittime' });
                                        var customrecord_waittimecalculationSearch = search.create({
                                        type: 'customrecord_waittimecalculation',
                                        filters: [
                                            ['internalid', 'anyof', WaitTimeType],
                                        ],
                                        columns: [
                                            customrecord_waittimecalculationSearchColMaximumFree,
                                            customrecord_waittimecalculationSearchColChargeEntireWaitTime,
                                        ],
                                        });

                                        var searchResults = customrecord_waittimecalculationSearch.run().getRange({
                                            start: 0,
                                            end: 1 // Adjust the number of results you want to fetch
                                        });

                                        for (var y = 0; y < searchResults.length; y++) {
                                            var MaximumFree = searchResults[y].getValue({ name: 'custrecord_maximumfree' });
                                            var ChargeEntireWaitTime = searchResults[y].getValue({ name: 'custrecord_chargeentirewaittime' });
                                            
                                            waitTimeDELArr.push({
                                                "MaximumFree" : MaximumFree,
                                                "ChargeEntireWaitTime" : ChargeEntireWaitTime
                                            })
                                        }

                                        waitTimeDel = parseInt(waitTimeDel)

                                        if(waitTimeDELArr[0].ChargeEntireWaitTime == 'Yes'){
                                            if(waitTimeDel <= waitTimeDELArr[0].MaximumFree){
                                                //Free
                                                var waitTimeDelVal = 0;
                                            }
                                            else{
                                                var waitTimeDelVal = waitTimeDel * delwaitTimeFieldArr[0].timerate;
                                                waitTimeDelVal = waitTimeDelVal.toFixed(2);
                                            }
                                        }
                                        else{
                                            if(waitTimeDel <= waitTimeDELArr[0].MaximumFree){
                                                //Free
                                                var waitTimeDelVal = 0;
                                            }
                                            else{
                                                var chargeTime = waitTimeDel - waitTimeDELArr[0].MaximumFree;
                                                var waitTimeDelVal = chargeTime * delwaitTimeFieldArr[0].timerate;
                                                waitTimeDelVal = waitTimeDelVal.toFixed(2);
                                            }
                                        }                    

                                        if(waitTimeDelVal >= waitTimeMax){
                                            waitTimeDelVal = waitTimeMax;
                                        }
                                    } 
                                    totalArr.push(waitTimeDelVal)
                                    //Discount Field
                                    var discountFieldArr = new Array();
                                    var customrecord_freightratetableSearchColValueBy = search.createColumn({ name: 'custrecord_valueby' });
                                    var customrecord_freightratetableSearchColValue = search.createColumn({ name: 'custrecord_valuecust' });
                                    var customrecord_freightratetableSearchDiscount = search.create({
                                    type: 'customrecord_freightratetable',
                                    filters: [
                                        ['custrecord_billtocode', 'anyof', billAcc],
                                        'AND',
                                        ['custrecord_itemname', 'anyof', '118'],
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
                                    
                                        customrecord_freightratetableSearchColValueBy,
                                        customrecord_freightratetableSearchColValue
                                        
                                    ],
                                    });
                                    var myResultSetDisc = customrecord_freightratetableSearchDiscount.runPaged({ pageSize: 1000 });
                                    for (var k = 0; k < myResultSetDisc.pageRanges.length; k++) {
                                    var discSearchPage = myResultSetDisc.fetch({ index: k });
                                    discSearchPage.data.forEach(function (result) {
                                        //get values
                                    
                                    
                                        
                                        var valueBy = result.getValue({
                                            name: 'custrecord_valueby'
                                        });
                
                                        var value = result.getValue({
                                            name: 'custrecord_valuecust'
                                        });
                
                
                                        var internalId = result.id;

                                        discountFieldArr.push({
                                            "id" : internalId,
                                        
                                            "valueby" : valueBy,
                                            "val" : value
                                            
                                        })
                                    })
                                        //return discountFieldArr;
                                    }
                                    //log.debug('discountFieldArr',discountFieldArr)
                                    if(discountFieldArr.length == 0)var discountVal = 0;
                                    else{
                                      //log.debug('Else Discount',discountFieldArr[0].val)
                                        var discountVal = freightVal * (discountFieldArr[0].val/100);
                                        discountVal = discountVal.toFixed(2);
                                    } 
                                   // log.debug('discountVal',discountVal)
                                    totalArr.push(discountVal)
                                    //Fuel
                                    var clientFuel = entityText.split(" ");
                                    log.debug('clientFuel',clientFuel)
                                    if(clientFuel[0] == 'INTEL' && (SL == 15 || SL == 113 || SL == 102)){
                                        if(freightFueldArr.length == 0){
                                            log.debug('Intel Air',freightFueldArr.length)
                                            var fuelVal = 0;
                                        }
                                        else{
                                            var fuelVal = wtUse * freightFueldArr[0].val;
                                            fuelVal = fuelVal.toFixed(2); 
                                            log.debug('Intel Air',fuelVal)
                                        }
                                    }
                                    else{
                                        if(clientFuel[0] == 'INTEL'){
                                            var cliFuel = 788;
                                        }
                                        else{
                                            var cliFuel = 557;
                                        }

                                        if(freightFueldArr.length != 0){
                                            var fuelFieldArr = new Array();
                                            var customrecord_fuelratetableSearchColClient = search.createColumn({ name: 'custrecord_client' });
                                            var customrecord_fuelratetableSearchColStartDate = search.createColumn({ name: 'custrecord_ft_startdate' });
                                            var customrecord_fuelratetableSearchColEndDate = search.createColumn({ name: 'custrecord_ft_enddate' });
                                            var customrecord_fuelratetableSearchColPercent = search.createColumn({ name: 'custrecord_percent' });
                                            var customrecord_fuelratetableSearch = search.create({
                                            type: 'customrecord_fuelratetable',
                                            filters: [
                                                ['custrecord_client', 'anyof', cliFuel],
                                                'AND',
                                                ['custrecord_ft_startdate', 'onorbefore', hawbDateOnly],
                                                'AND',
                                                ['custrecord_ft_enddate', 'onorafter', hawbDateOnly],
                                                'AND',
                                                ['isinactive', 'is', 'F'],
                                            ],
                                            columns: [
                                                customrecord_fuelratetableSearchColClient,
                                                customrecord_fuelratetableSearchColStartDate,
                                                customrecord_fuelratetableSearchColEndDate,
                                                customrecord_fuelratetableSearchColPercent,
                                            ],
                                            });
                                            var myResultSetFuel = customrecord_fuelratetableSearch.runPaged({ pageSize: 1000 });
                                            for (var k = 0; k < myResultSetFuel.pageRanges.length; k++) {
                                            var fuelSearchPage = myResultSetFuel.fetch({ index: k });
                                            fuelSearchPage.data.forEach(function (result) {
                                                //get values
                                                
                                                var customer = result.getValue({
                                                    name: 'custrecord_client'
                                                });
                                                
                                                var sdate = result.getValue({
                                                    name: 'custrecord_ft_startdate'
                                                });
                        
                                                var edate = result.getValue({
                                                    name: 'custrecord_ft_enddate'
                                                });
                        
                                                var percent = result.getValue({
                                                    name: 'custrecord_percent'
                                                });
                        
                                                var internalId = result.id;
                        
                                                fuelFieldArr.push({
                                                    "id" : internalId,
                                                    "customer" : customer,
                                                    "sdate" : sdate,
                                                    "edate" : edate,
                                                    "percent" : percent
                                                })
                                            })
                                                //return fuelFieldArr;
                                            }
                                            log.debug('fuelFieldArr',fuelFieldArr)
                                            if(fuelFieldArr.length == 0){
                                                var fuelVal = 0;
                                            }
                                            else{
                                                if(clientFuel[0] == 'INTEL'){
                                                    var percentNum = parseFloat(fuelFieldArr[0].percent);
                                                    log.debug('percentNum',percentNum)
                                                    var flofreightVal = parseFloat(freightVal);
                                                    log.debug('flofreightVal',flofreightVal)
                                                    var fuelVal = flofreightVal *  (percentNum/100);
                                                    log.debug('fuelVal',fuelVal)
                                                    fuelVal = fuelVal.toFixed(2); 
                                                    log.debug('Else If Intel',fuelVal)
                                                }
                                                else{
                                                    var percentNum = parseFloat(fuelFieldArr[0].percent);
        
                                                    var floDiscountVal = parseFloat(discountVal);
                                                    var flofreightVal = parseFloat(freightVal);
                                                    var fuelVal = (flofreightVal + floDiscountVal) *  (percentNum/100);
                                                    fuelVal = fuelVal.toFixed(2); 
                                                    log.debug('Else else Cisco',fuelVal)
                                                }
                                            }
                                        }
                                    }
                                    totalArr.push(fuelVal)
                                    //Same Day Delivery
                                    if(SDDFieldArr.length == 0){
                                        var sameDayDelVal = 0;
                                    }
                                    else{
                                        if(SDDFieldArr[0].pd == 1){
                                            var pickupDate =  srRec.custbody_pickupdate;
                    
                                            var pickupDateOnly = format.format({
                                                value: pickupDate,
                                                type: format.Type.DATE
                                            });
                    
                                            var deliveryDate =  srRec.custbody_deliverdate;
                    
                                            var deliveryDateOnly = format.format({
                                                value: deliveryDate,
                                                type: format.Type.DATE
                                            });
                    
                                            if(pickupDateOnly==deliveryDateOnly){
                                                var sameDayDelVal = SDDFieldArr[0].bp; 
                                            }
                                            else{
                                                var sameDayDelVal = 0;
                                            }
                                        }
                                        else{
                                            var sameDayDelVal = 0;
                                        }
                                    } 
                                    totalArr.push(sameDayDelVal)
                                        //After Hours Pick up
                                        var pickupTime =  srRec.custbody_pickuptime;
                                        //log.debug('pickupTime',pickupTime)
                                        if(AHPUFieldArr.length == 0)var AHPUVal = 0;
                                        else{
                                            log.debug('else','else')
                                            if(AHPUFieldArr[0].outcal == 1){
                                               // log.debug('if',AHPUFieldArr[0].outcal)
                                                var tensDigit = Math.floor(AHPUFieldArr[0].calendar / 10);
                                                var onesDigit = (AHPUFieldArr[0].calendar % 10) + 12;
                                               // log.debug('tensDigit',tensDigit)
                                               // log.debug('onesDigit',onesDigit)
                                                var ahpickupTimeOnly = pickupTime.substring(0, 5);
                                               // log.debug('ahpickupTimeOnly',ahpickupTimeOnly)
                                                var timeArrAHPU = ahpickupTimeOnly.split(':')
                                                //log.debug('timeArrAHPU',timeArrAHPU)
                                                if(timeArrAHPU[0] == '10' || timeArrAHPU[0] == '11' || timeArrAHPU[0] == '12' || timeArrAHPU[0] == '00'){
                                                    var ampm = pickupTime.substring(6, 8);
                                                   // log.debug('if ampm',ampm)
                                                }
                                                else{
                                                    var ampm = pickupTime.substring(5, 7);
                                                    //log.debug('else ampm',ampm)
                                                }

                                                if(ampm == 'am'){
                                                    var hourAHPU = parseInt(timeArrAHPU[0]);
                                                }
                                                else if(ampm == 'pm'){
                                                    var hourAHPU = parseInt(timeArrAHPU[0])+12;
                                                }
                                               // log.debug('hourAHPU',hourAHPU)
                                                if(tensDigit <= hourAHPU && (hourAHPU < onesDigit || (hourAHPU == onesDigit && timeArrAHPU[1] == '00'))){
                                                    var AHPUVal = 0;
                                                   // log.debug('AHPUVal if',AHPUVal)
                                                }
                                                else{
                                                    var AHPUVal = AHPUFieldArr[0].bp;
                                                   // log.debug('AHPUVal else',AHPUVal)
                                                }
                                            }
                                            else{
                                                var AHPUVal = 0;
                                            }
                                        }
                                        totalArr.push(AHPUVal)
                                        //After Hours Delivery
                                        var AHDeliveryTime =  srRec.custbody_deliverytime;
                                        log.debug('AHDeliveryTime',AHDeliveryTime)
                                        log.debug('AHDelFieldArr',AHDelFieldArr)
                                        if(AHDelFieldArr.length == 0){
                                            var AHDelVal = 0;
                                            log.debug('length',AHDelFieldArr.length)
                                        }
                                        else{
                                            log.debug('else',AHDelFieldArr.length)
                                            if(AHDelFieldArr[0].outcal == 1){
                                                var tensDigitAHDel = Math.floor(AHDelFieldArr[0].calendar / 10);
                                                var onesDigitAhDel = (AHDelFieldArr[0].calendar % 10) + 12;
                                                log.debug('tensDigit',tensDigit)
                                                log.debug('onesDigit',onesDigit)
                                                var ahDelTimeOnly = AHDeliveryTime.substring(0, 5);
                                                log.debug('ahDelTimeOnly',ahDelTimeOnly)
                                                var timeArrAHDel = ahDelTimeOnly.split(':')
                                                log.debug('timeArrAHDel',timeArrAHDel)
                                                if(timeArrAHDel[0] == '10' || timeArrAHDel[0] == '11' || timeArrAHDel[0] == '12' || timeArrAHDel[0] == '00'){
                                                    var ampm = AHDeliveryTime.substring(6, 8);
                                                    log.debug('if ampm',ampm)
                                                }
                                                else{
                                                    var ampm = AHDeliveryTime.substring(5, 7);
                                                    log.debug('else ampm',ampm)
                                                }
                                                
                                               
                                                if(ampm == 'am'){
                                                    var hourAHDel = parseInt(timeArrAHDel[0]);
                                                }
                                                else if(ampm == 'pm'){
                                                    var hourAHDel = parseInt(timeArrAHDel[0])+12;
                                                }
                                                log.debug('hourAHDel',hourAHDel)
                                            
                                                if(tensDigitAHDel <= hourAHDel && (hourAHDel < onesDigitAhDel || (hourAHDel == onesDigitAhDel && timeArrAHDel[1] == '00'))){
                                                    var AHDelVal = 0;
                                                    log.debug(' if AHDelVal',AHDelVal)
                                                }
                                                else{
                                                    var AHDelVal = AHDelFieldArr[0].bp;
                                                    log.debug(' else AHDelVal',AHDelVal)
                                                }
                                            }
                                            else{
                                                var AHDelVal = 0;
                                            }
                                        }
                                        totalArr.push(AHDelVal)
                                        //Storage
                                        var noPallet = srRec.custbody_pieces;
                                        if(storageArr.length == 0)var storageVal = 0;
                                        else{
                                            var containsDGreen = 0;
                                            var consigneeAddress = srRec.custbody_consignee_address;


                                            if(consigneeAddress){
                                               // log.debug('consigneeAddress',consigneeAddress)
                                                
                                                var conAddressArr = consigneeAddress.split(" ");
                                            
                                                
                                                for(var i = 0; i<conAddressArr.length; i++){
                                                    if(conAddressArr[i] == 'Greens' || conAddressArr[i] == 'greens' || conAddressArr[i] == 'GREENS'){
                                                        containsDGreen = 1;
                                                    }
                                                }

                                               // log.debug('containsDGreen',containsDGreen)
                                            }
                                           
                                            if(billAcc == 4 && origin == 5 && dest == 5 && containsDGreen == 1){
                                                var storageVal = storageArr[0].bp * noPallet;
                                               // log.debug('if storage',storageVal)
                                                
                                            }
                                            else{
                                                var storageVal = 0;
                                                //log.debug('else storage',storageVal)
                                                
                                            }
                                        }
                                        totalArr.push(storageVal)
                                        //Additional Manpower
                                        if(manPowerArr.length == 0)var manpowerVal = 0;
                                        else{
                                            if(billAcc == 1){
                                                var manpowerVal = manPowerArr[0].bp;
                                            }
                                            else{
                                                var manpowerVal = 0;
                                            }
                                        }
                                        totalArr.push(manpowerVal)
                                        //Smart Pallet
                                        if(smartPalFieldArr.length == 0)var smartPalVal = 0;
                                        else{
                                            if(billAcc == 1){
                                                var smartPalVal = smartPalFieldArr[0].bp * noPallet;
                                            }
                                            else{
                                                var smartPalVal = 0;
                                            }
                                        }
                                        totalArr.push(smartPalVal)
                                        //CFC
                                        if(CFCFieldArr.length == 0)var CFCVal = 0;
                                        else{
                                            //log.debug('CFCVAL',CFCVal)
                                            var CFCVal = CFCFieldArr[0].bp;
                                        }
                                        totalArr.push(CFCVal)
                                        //FAG
                                        if(FAGFieldArr.length == 0)var FAGVal = 0;
                                        else{
                                            var FAGVal = FAGFieldArr[0].bp;
                                        }
                                        totalArr.push(FAGVal)
                                        //DOCK Fee
                                        if(DOCKFieldArr.length == 0)var DockVal = 0;
                                        else{
                                            var DockVal = DOCKFieldArr[0].bp;
                                        }
                                        totalArr.push(DockVal)

                                        var totalAC = 0;

                                        for (var k = 0; k < totalArr.length; k++) {
                                            totalAC = parseFloat(totalAC) + parseFloat(totalArr[k]);
                                        }
                                        
                                        if(discountVal == 0){
                                            discountVal = '';
                                        }
                    
                    
                                        if(SL == 16 || SL == 75 || SL == 77 || SL == 109 || SL == 110){
                                            fuelVal = '';
                                        }    
                                        
                                        if(waitTimePUVal == 0){
                                            waitTimePUVal = '';
                                        }
                                    
                                        if(waitTimeDelVal == 0){
                                            waitTimeDelVal = '';
                                        }
                                        
                                        if(sameDayDelVal == 0){
                                            sameDayDelVal = '';
                                        }
                    
                                        if(AHPUVal == 0){
                                            AHPUVal = '';
                                        }
                                        
                                        if(AHDelVal == 0){
                                            AHDelVal = '';
                                        }
                                        
                                        if(storageVal == 0){
                                        storageVal = '';
                                        }
            
                                        if(manpowerVal == 0){
                                        manpowerVal = '';
                                        }
                    
                                        if(smartPalVal == 0){
                                            smartPalVal = '';
                                        }

                                        if(CFCVal == 0){
                                            CFCVal = '';
                                        }

                                        if(FAGVal == 0){
                                            FAGVal = '';
                                        }

                                        if(DockVal == 0){
                                            DockVal = '';
                                        }

                                        log.debug('freightVal',freightVal)
                                        log.debug('discountVal',discountVal)
                                        log.debug('fuelVal',fuelVal)
                                        log.debug('waitTimePUVal',waitTimePUVal)
                                        log.debug('waitTimeDelVal',waitTimeDelVal)
                                        log.debug('sameDayDelVal',sameDayDelVal)
                                        log.debug('AHPUVal',AHPUVal)
                                        log.debug('AHDelVal',AHDelVal)
                                        log.debug('storageVal',storageVal)
                                        log.debug('manpowerVal',manpowerVal)
                                        log.debug('smartPalVal',smartPalVal)
                                        log.debug('CFCVal',CFCVal)
                                        log.debug('FAGVal',FAGVal)
                                        log.debug('DockVal',DockVal)
                                        log.debug('totalAC',totalAC)
                                        
                                        var soRec = record.submitFields({
                                            type: record.Type.SALES_ORDER,
                                            id: srID,
                                            values: {
                                                custbody_freight_rep_hidden: freightVal,
                                                custbody_discount_rep_hidden: discountVal,
                                                custbody_fuel_rep_hidden : fuelVal,
                                                custbody_waittimepu_rep_hidden : waitTimePUVal,
                                                custbody_waittimedel_rep_hidden: waitTimeDelVal,
                                                custbody_same_day_del_rep_hidden: sameDayDelVal,
                                                custbody_after_hour_pu_rep_hidden : AHPUVal,
                                                custbody_after_hours_del_rep_hidden : AHDelVal,
                                                custbody_storage_rep_hidden : storageVal,
                                                custbody_manpower_rep_hidden: manpowerVal,
                                                custbody_smart_pallet_rep_hidden: smartPalVal,
                                                custbody_cfc_rep_hidden : CFCVal,
                                                custbody_fag_rep_hidden : FAGVal,
                                                custbody_fag_rep_hidden : FAGVal,
                                                custbody_dock_fee_hidden : DockVal,
                                                custbody_sr_total : totalAC
                                            }
                                        });

                                        log.debug('soRec',soRec)
                                    
                                
                                }
                                else{
                                    //Freight Field, Wait Time Pick Up and Wait Time Delivery
                                    var freightFieldArr = new Array();
                                    //var discountFieldArr = new Array();
                                    var customrecord_freightratetableSearchColValueBy = search.createColumn({ name: 'custrecord_valueby' });
                                    var customrecord_freightratetableSearchColValue = search.createColumn({ name: 'custrecord_valuecust' });
                                    var customrecord_freightratetableSearchColMinweight = search.createColumn({ name: 'custrecord_minweight' });
                                    var customrecord_freightratetableSearchColMaxweight = search.createColumn({ name: 'custrecord_maxweight' });
                                    var customrecord_freightratetableSearchColValueByDisc = search.createColumn({ name: 'custrecord_valueby' });
                                    var customrecord_freightratetableSearchColValueDisc = search.createColumn({ name: 'custrecord_valuecust' });
                                    
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
                                        customrecord_freightratetableSearchColValueBy,
                                        customrecord_freightratetableSearchColValue,
                                        customrecord_freightratetableSearchColMinweight,
                                        customrecord_freightratetableSearchColMaxweight,
                                        customrecord_freightratetableSearchColValueByDisc,
                                        customrecord_freightratetableSearchColValueDisc
                                        
                                    ],
                                    });
                
                                    var myResultSetFreight = customrecord_freightratetableSearchFreight.runPaged({ pageSize: 1000 });
                                    for (var k = 0; k < myResultSetFreight.pageRanges.length; k++) {
                                    var freightSearchPage = myResultSetFreight.fetch({ index: k });
                                    freightSearchPage.data.forEach(function (result) {
                                        //get values
                                    
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
                
                                        
                                        var internalId = result.id;
                
                                        freightFieldArr.push({
                                            "id" : internalId,
                                            "valueby" : valueBy,
                                            "val" : value,
                                            "minwt" : minWeight,
                                            "maxwt" : maxWeight
                                        })

                                        var valueByDisc = result.getValue({
                                            name: 'custrecord_valueby'
                                        });
                
                                        var valueDisc = result.getValue({
                                            name: 'custrecord_valuecust'
                                        });
                
                
                                    })
                                        //return freightFieldArr;
                                    }
                                    var actWt =  srRec.custbody_actualweight;
                                    if(!actWt) actWt=0;
                                    var dimWt =  srRec.custbody_dim_weight;

                                    if(!dimWt) dimWt=0;
                                    if(actWt>dimWt){
                                        var wtUse = actWt;
                                    }
                                    else{
                                        var wtUse = dimWt;
                                    }
                                    
                                    if(freightFieldArr.length == 0){
                                        var freightVal = 0;
                                    }
                                    else{
                                        for(var j=0;j<freightFieldArr.length;j++){
                                           
                                                if(freightFieldArr[j].minwt == 0 && freightFieldArr[j].maxwt == 0){
                                                    if(freightFieldArr[j].valueby == 1){
                                                        var freightVal = freightFieldArr[j].val;
                                                        
                                                    }
                                                    else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                                        var freightVal = wtUse * freightFieldArr[j].val;
                                                        freightVal = freightVal.toFixed(2);
                                                    }
                                                }
                                                else if(freightFieldArr[j].minwt < wtUse && freightFieldArr[j].maxwt == 0){
                                                    if(freightFieldArr[j].valueby == 1){
                                                        var freightVal = freightFieldArr[j].val;
                                                        
                                                    }
                                                    else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                                        var freightVal = wtUse * freightFieldArr[j].val;
                                                        freightVal = freightVal.toFixed(2);
                                                    }
                                                }
                                                else if(freightFieldArr[j].minwt == 0 && freightFieldArr[j].maxwt > wtUse){
                                                    if(freightFieldArr[j].valueby == 1){
                                                        var freightVal = freightFieldArr[j].val;
                                                        
                                                    }
                                                    else if(freightFieldArr[j].valueby == 2 || freightFieldArr[j].valueby == 3){
                                                        var freightVal = wtUse * freightFieldArr[j].val;
                                                        freightVal = freightVal.toFixed(2);
                                                    }
                                                }
                                           
                                        }
                                    }
                
                                    totalArr.push(freightVal)

                                    //Discount Field
                                    var discountFieldArr = new Array();
                                    var customrecord_freightratetableSearchColValueBy = search.createColumn({ name: 'custrecord_valueby' });
                                    var customrecord_freightratetableSearchColValue = search.createColumn({ name: 'custrecord_valuecust' });
                                    var customrecord_freightratetableSearchDiscount = search.create({
                                    type: 'customrecord_freightratetable',
                                    filters: [
                                        ['custrecord_billtocode', 'anyof', billAcc],
                                        'AND',
                                        ['custrecord_itemname', 'anyof', '118'],
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
                                    
                                        customrecord_freightratetableSearchColValueBy,
                                        customrecord_freightratetableSearchColValue
                                        
                                    ],
                                    });
                                    var myResultSetDisc = customrecord_freightratetableSearchDiscount.runPaged({ pageSize: 1000 });
                                    for (var k = 0; k < myResultSetDisc.pageRanges.length; k++) {
                                    var discSearchPage = myResultSetDisc.fetch({ index: k });
                                    discSearchPage.data.forEach(function (result) {
                                        //get values
                                    
                                    
                                        
                                        var valueBy = result.getValue({
                                            name: 'custrecord_valueby'
                                        });
                
                                        var value = result.getValue({
                                            name: 'custrecord_valuecust'
                                        });
                
                
                                        var internalId = result.id;
                
                            
                                        discountFieldArr.push({
                                            "id" : internalId,
                                        
                                            "valueby" : valueBy,
                                            "val" : value
                                            
                                        })
                                    })
                                        //return discountFieldArr;
                                    }
                                    log.debug('discountFieldArr',discountFieldArr)
                                    if(discountFieldArr.length == 0)var discountVal = 0;
                                    else{
                                        var discountVal = freightVal * (discountFieldArr[0].val/100);
                                        discountVal = discountVal.toFixed(2);
                                    }

                                    totalArr.push(discountVal)

                                    var totalAC = 0;

                                    for (var k = 0; k < totalArr.length; k++) {
                                        totalAC = parseFloat(totalAC) + parseFloat(totalArr[k]);
                                    }
                                    
                                    var soRec = record.submitFields({
                                        type: record.Type.SALES_ORDER,
                                        id: srID,
                                        values: {
                                            custbody_freight_rep_hidden: freightVal,
                                            custbody_discount_rep_hidden: discountVal,
                                            custbody_sr_total : totalAC
                                        }
                                    });

                                    log.debug('soRec',soRec)
                                }
                                
                            }

                        
                        //}
                    }
                
            }
            salesRep = true;
        }

        
        return salesRep
        }
    }
});