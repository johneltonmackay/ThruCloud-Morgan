/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime','N/currentRecord', 'N/search', 'N/record','N/url', 'N/ui/dialog','N/format'],

function(runtime, currentRecord, search, record, url, dialog, format) {
    
    function pageInit_search_popup(scriptContext) {
        var currRecObj = currentRecord.get();
        var pageId
        var filterFields = new Array;

        var shipmentStatus = currRecObj.getValue({
            fieldId: 'custpage_form_shipmentstatus'
        });
        if(shipmentStatus){
            filterFields.push({"shipmentStatus": shipmentStatus})
        }

        var billtoCode = currRecObj.getValue({
            fieldId: 'custpage_form_billtocode'
        });
        if(billtoCode){
            filterFields.push({"billtoCode": billtoCode})
        }

        var customerAccCode = currRecObj.getValue({
            fieldId: 'custpage_form_customeraccountcode'
        });
        if(customerAccCode){
            filterFields.push({"customerAccCode": customerAccCode})
        }

        var hawb = currRecObj.getValue({
            fieldId: 'custpage_form_hawb_filter'
        });
        if(hawb){
            filterFields.push({"hawb" : hawb})
        }

        var origin = currRecObj.getValue({
            fieldId: 'custpage_form_origin'
        });
        if(origin){
            filterFields.push({"origin": origin})
        }

        var destination = currRecObj.getValue({
            fieldId: 'custpage_form_destinantion'
        });
        if(destination){
            filterFields.push({"destination": destination})
        }

        var pickupDate = currRecObj.getValue({
            fieldId: 'custpage_form_pickupdate'
        });
        if(pickupDate){
            filterFields.push({"pickupDate": pickupDate})
        }

        var deliverDate = currRecObj.getValue({
            fieldId: 'custpage_form_deliver_date'
        });
        if(deliverDate){
            filterFields.push({"deliverDate":deliverDate})
        }

        var hawbDate = currRecObj.getValue({
            fieldId: 'custpage_form_hawbdate'
        });
        if(hawbDate){
            filterFields.push({"hawbDate" : hawbDate})
        }

        var handover = currRecObj.getValue({
            fieldId: 'custpage_form_handover'
        });
        if(handover){
            filterFields.push({"handover": handover})
        }

        var serviceLevel = currRecObj.getValue({
            fieldId: 'custpage_form_servicelevel'
        });
        if(serviceLevel){
            filterFields.push({"serviceLevel": serviceLevel})
        }

        var ShipperCompany = currRecObj.getValue({
            fieldId: 'custpage_form_shippercompany'
        });
        if(ShipperCompany){
            filterFields.push({"ShipperCompany": ShipperCompany})
        }

        var ShipperAddress = currRecObj.getValue({
            fieldId: 'custpage_form_shipperaddress'
        });
        if(ShipperAddress){
            filterFields.push({"ShipperAddress": ShipperAddress})
        }


        var ConsigneeCompany = currRecObj.getValue({
            fieldId: 'custpage_form_consigneecompany'
        });
        if(ConsigneeCompany){
            filterFields.push({"ConsigneeCompany": ConsigneeCompany})
        }

        var ConsigneeAddress = currRecObj.getValue({
            fieldId: 'custpage_form_consigneeaddress'
        });
        if(ConsigneeAddress){
            filterFields.push({"ConsigneeAddress": ConsigneeAddress})
        }


        var CommodityType = currRecObj.getValue({
            fieldId: 'custpage_form_commoditytype'
        });
        if(CommodityType){
            filterFields.push({"CommodityType": CommodityType})
        }

        var Mode = currRecObj.getValue({
            fieldId: 'custpage_form_mode'
        });
        if(Mode){
            filterFields.push({"Mode": Mode})
        }


        var Zone = currRecObj.getValue({
            fieldId: 'custpage_form_zone'
        });
        if(Zone){
            filterFields.push({"Zone": Zone})
        }


        var Program = currRecObj.getValue({
            fieldId: 'custpage_form_program'
        });
        if(Program){
            filterFields.push({"Program": Program})
        }


        var Distance = currRecObj.getValue({
            fieldId: 'custpage_form_distance'
        });
        if(Distance){
            filterFields.push({"Distance": Distance})
        }


        var TruckId = currRecObj.getValue({
            fieldId: 'custpage_form_truckid'
        });
        if(TruckId){
            filterFields.push({"TruckId": TruckId})
        }


        var Control = currRecObj.getValue({
            fieldId: 'custpage_form_control'
        });
        if(Control){
            filterFields.push({"Control": Control})
        }


        var EquipmentCode = currRecObj.getValue({
            fieldId: 'custpage_form_equipment_code'
        });
        if(EquipmentCode){
            filterFields.push({"EquipmentCode": EquipmentCode})
        }

        var status = currRecObj.getValue({
            fieldId: 'custpage_form_status'
        });
        if(status){
            filterFields.push({"status": status})
        }

        var invdate = currRecObj.getValue({
            fieldId: 'custpage_form_invoice_date'
        });
        if(invdate){
            filterFields.push({"invdate": invdate})
        }

        var datecreated = currRecObj.getValue({
            fieldId: 'custpage_form_date_created'
        });
        if(datecreated){
            filterFields.push({"datecreated": datecreated})
        }

        for(var i = 0; i<filterFields.length;i++){
            if(filterFields[i].shipmentStatus){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 51
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].shipmentStatus
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].billtoCode){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 1
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].billtoCode
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }
            if(filterFields[i].customerAccCode){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 2
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].customerAccCode
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].hawb){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 3
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].hawb
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].origin){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 4
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].origin
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].destination){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 5
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].destination
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }
            if(filterFields[i].pickupDate){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 6
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].pickupDate
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].deliverDate){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 7
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].deliverDate
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].hawbDate){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 50
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].hawbDate
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }
            if(filterFields[i].handover){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 12
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].handover
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].serviceLevel){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 14
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].serviceLevel
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].ShipperCompany){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 46
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].ShipperCompany
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].ShipperAddress){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 43
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].ShipperAddress
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].ConsigneeCompany){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 60
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].ConsigneeCompany
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].ConsigneeAddress){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 54
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].ConsigneeAddress
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].CommodityType){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 33
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].CommodityType
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].Mode){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 34
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].Mode
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].Zone){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 35
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].Zone
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].Program){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 36
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].Program
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].Distance){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 37
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].Distance
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].TruckId){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 38
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].TruckId
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].Control){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 53
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].Control
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].EquipmentCode){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 24
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].EquipmentCode
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].invdate){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 61
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].invdate
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

            if(filterFields[i].datecreated){
                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_field_filter',
                    value: 62
                });

                currRecObj.setCurrentSublistValue({
                    sublistId: 'custpage_search_list',
                    fieldId: 'custpage_value_filter',
                    value: filterFields[i].datecreated
                });
            
                currRecObj.commitLine({sublistId: 'custpage_search_list'})
            }

        }


     
    }
  

    return {
        pageInit: pageInit_search_popup
    };
    
});