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
                    title: 'Search Shipment Record'
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
                    source: 'customrecord_sr_to_inv_column_details'
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
    

                var ShipmentStatusF = form.addField({
                    id: 'custpage_form_shipmentstatus',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Shipment Status',
                });
                ShipmentStatusF.updateDisplayType({displayType: 'HIDDEN'});
    
                var billtoCodeF = form.addField({
                    id: 'custpage_form_billtocode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Bill to Code',
                });
                billtoCodeF.updateDisplayType({displayType: 'HIDDEN'});
    
                var CustomerAccountCodeF = form.addField({
                    id: 'custpage_form_customeraccountcode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Account Code',
                });
                CustomerAccountCodeF.updateDisplayType({displayType: 'HIDDEN'});
    
                var HAWBF = form.addField({
                    id: 'custpage_form_hawb_filter',
                    type: serverWidget.FieldType.TEXT,
                    label: 'HAWB',
                });
                HAWBF.updateDisplayType({displayType: 'HIDDEN'});
    
                var OriginF = form.addField({
                    id: 'custpage_form_origin',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Origin',
                });
                OriginF.updateDisplayType({displayType: 'HIDDEN'});
    
                var DestinantionF = form.addField({
                    id: 'custpage_form_destinantion',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Destination',
                });
                DestinantionF.updateDisplayType({displayType: 'HIDDEN'});
    
                var PickupDateF = form.addField({
                    id: 'custpage_form_pickupdate',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Pickup Date',
                });
                PickupDateF.updateDisplayType({displayType: 'HIDDEN'});
    
                var DeliverDateF = form.addField({
                    id: 'custpage_form_deliver_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Deliver Date',
                });
                DeliverDateF.updateDisplayType({displayType: 'HIDDEN'});
    
                var HAWBDateF = form.addField({
                    id: 'custpage_form_hawbdate',
                    type: serverWidget.FieldType.TEXT,
                    label: 'HAWB Date',
                });
                HAWBDateF.updateDisplayType({displayType: 'HIDDEN'});
    
                var HandoverF = form.addField({
                    id: 'custpage_form_handover',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Handover',
                });
                HandoverF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ServiceLevelF = form.addField({
                    id: 'custpage_form_servicelevel',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Service Level',
                });
                ServiceLevelF.updateDisplayType({displayType: 'HIDDEN'});

                var ShipperCompanyF = form.addField({
                    id: 'custpage_form_shippercompany',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Shipper Company',
                });
                ShipperCompanyF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ShipperAddressF = form.addField({
                    id: 'custpage_form_shipperaddress',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Shipper Address',
                });
                ShipperAddressF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ConsigneeCompanyF = form.addField({
                    id: 'custpage_form_consigneecompany',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Consignee Company',
                });
                ConsigneeCompanyF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ConsigneeAddressF = form.addField({
                    id: 'custpage_form_consigneeaddress',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Consignee Address',
                });
                ConsigneeAddressF.updateDisplayType({displayType: 'HIDDEN'});
    
    
                var CommodityTypeF = form.addField({
                    id: 'custpage_form_commoditytype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Commodity Type',
                });
                CommodityTypeF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ModeF = form.addField({
                    id: 'custpage_form_mode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Mode',
                });
                ModeF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ZoneF = form.addField({
                    id: 'custpage_form_zone',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Zone',
                });
                ZoneF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ProgramF = form.addField({
                    id: 'custpage_form_program',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Program',
                });
                ProgramF.updateDisplayType({displayType: 'HIDDEN'});
    
                var DistanceF = form.addField({
                    id: 'custpage_form_distance',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Distance',
                });
                DistanceF.updateDisplayType({displayType: 'HIDDEN'});
    
                var TruckIdF = form.addField({
                    id: 'custpage_form_truckid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Truck ID',
                });
                TruckIdF.updateDisplayType({displayType: 'HIDDEN'});
    
                var ControlF = form.addField({
                    id: 'custpage_form_control',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Control',
                });
                ControlF.updateDisplayType({displayType: 'HIDDEN'});
    
                var EquipmentCodeF = form.addField({
                    id: 'custpage_form_equipment_code',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Equipment Code',
                });
                EquipmentCodeF.updateDisplayType({displayType: 'HIDDEN'});

                var StatusF = form.addField({
                    id: 'custpage_form_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Status',
                });
                StatusF.updateDisplayType({displayType: 'HIDDEN'});

                var invDateF = form.addField({
                    id: 'custpage_form_invoice_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice Date',
                });
                invDateF.updateDisplayType({displayType: 'HIDDEN'});

                var dateCreatedF = form.addField({
                    id: 'custpage_form_date_created',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Date Created',
                });
                dateCreatedF.updateDisplayType({displayType: 'HIDDEN'});

                var entity = context.request.parameters.entity;
                var shipmentStatus = context.request.parameters.shipmentStatus;
                var billtoCode = context.request.parameters.billtoCode;
                var customerAccCode = context.request.parameters.customerAccCode;
                var hawb = context.request.parameters.hawb;
                var origin = context.request.parameters.origin;
                var destination = context.request.parameters.destination;
                var pickupDate = context.request.parameters.pickupDate;
                var deliverDate = context.request.parameters.deliverDate;
                var hawbDate = context.request.parameters.hawbDate;
                var handover = context.request.parameters.handover;
                var serviceLevel = context.request.parameters.serviceLevel;
                var ShipperCompany = context.request.parameters.ShipperCompany;
                var ShipperAddress = context.request.parameters.ShipperAddress;
                var ConsigneeCompany = context.request.parameters.ConsigneeCompany;
                var ConsigneeAddress = context.request.parameters.ConsigneeAddress;
                var CommodityType = context.request.parameters.CommodityType;
                var Mode = context.request.parameters.Mode;
                var Zone = context.request.parameters.Zone;
                var Program = context.request.parameters.Program;
                var Distance = context.request.parameters.Distance;
                var TruckId = context.request.parameters.TruckId;
                var Control = context.request.parameters.Control;
                var EquipmentCode = context.request.parameters.EquipmentCode;
                var status = context.request.parameters.status;
                var invdate = context.request.parameters.invdate;
                var datecreated = context.request.parameters.datecreated;

                form.clientScriptModulePath = 'SuiteScripts/KP_DWM_Search_PopUp_utility_CS.js ';

                if (entity) {
                    entityF.defaultValue = entity;
                }


                if (shipmentStatus) {
                    ShipmentStatusF.defaultValue = shipmentStatus;
                }

                if (billtoCode) {
                    billtoCodeF.defaultValue = billtoCode;
                }

                if (customerAccCode) {
                    CustomerAccountCodeF.defaultValue = customerAccCode;
                }

                if (hawb) {
                    HAWBF.defaultValue = hawb;
                }

                if (origin) {
                    OriginF.defaultValue = origin;
                }

                if (destination) {
                    DestinantionF.defaultValue = destination;
                }

                if (pickupDate) {
                    PickupDateF.defaultValue = pickupDate;
                }

                if (deliverDate) {
                    DeliverDateF.defaultValue = deliverDate;
                }

                if (hawbDate) {
                    HAWBDateF.defaultValue = hawbDate;
                }

                if (handover) {
                    HandoverF.defaultValue = handover;
                }

                if (serviceLevel) {
                    ServiceLevelF.defaultValue = serviceLevel;
                }

                if (ShipperCompany) {
                    ShipperCompanyF.defaultValue = ShipperCompany;
                }

                if (ShipperAddress) {
                    ShipperAddressF.defaultValue = ShipperAddress;
                }

                if (ConsigneeCompany) {
                    ConsigneeCompanyF.defaultValue = ConsigneeCompany;
                }

                if (ConsigneeAddress) {
                    ConsigneeAddressF.defaultValue = ConsigneeAddress;
                }

                if (CommodityType) {
                    CommodityTypeF.defaultValue = CommodityType;
                }

                if (Mode) {
                    ModeF.defaultValue = Mode;
                }

                if (Zone) {
                    ZoneF.defaultValue = Zone;
                }

                if (Program) {
                    ProgramF.defaultValue = Program;
                }

                if (Distance) {
                    DistanceF.defaultValue = Distance;
                }

                if (TruckId) {
                    TruckIdF.defaultValue = TruckId;
                }

                if (Control) {
                    ControlF.defaultValue = Control;
                }

                if (EquipmentCode) {
                    EquipmentCodeF.defaultValue = EquipmentCode;
                }

                if (status) {
                    StatusF.defaultValue = status;
                }

                if (invdate) {
                    invDateF.defaultValue = invdate;
                }

                if (datecreated) {
                    dateCreatedF.defaultValue = datecreated;
                }

                var submitButton = form.addSubmitButton({
                    label : 'Submit'
                })


                context.response.writePage({
                    pageObject: form
                });
            }
            else if (context.request.method === 'POST') {
                var paramArr = new Array(52);
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
                            type: 'customrecord_sr_to_inv_column_details',
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
                        
                        if(fieldparam =='ShipmentStatus'){
                            paramArr[51] = valueParam
                        }
                        if(fieldparam =='BilltoCode'){
                            paramArr[1] = valueParam
                        }
                        if(fieldparam =='CustomerAccountCode'){
                            paramArr[2] = valueParam
                        }
                        if(fieldparam =='HAWB'){
                            paramArr[3] = valueParam
                        }
                        if(fieldparam =='Origin'){
                            paramArr[4] = valueParam
                        }
                        if(fieldparam =='Destination'){
                            paramArr[5] = valueParam
                        }
                        if(fieldparam =='PickupDate'){
                            paramArr[6] = valueParam
                        }
                        if(fieldparam =='DeliverDate'){
                            paramArr[7] = valueParam
                        }
                        if(fieldparam =='HAWBDate'){
                            paramArr[50] = valueParam
                        }
                        if(fieldparam =='Handover'){
                            paramArr[12] = valueParam
                        }
                        if(fieldparam =='ServiceLevel'){
                            paramArr[14] = valueParam
                        }
                        if(fieldparam =='ShipperCompany'){
                            paramArr[46] = valueParam
                        }
                        if(fieldparam =='ShipperAddress'){
                            paramArr[43] = valueParam
                        }
                        if(fieldparam =='ConsigneeCompany'){
                            paramArr[60] = valueParam
                        }
                        if(fieldparam =='ConsigneeAddress'){
                            paramArr[54] = valueParam
                        }
                        
                        if(fieldparam =='CommodityType'){
                            paramArr[33] = valueParam
                        }
                        
                        if(fieldparam =='Mode'){
                            paramArr[34] = valueParam
                        }
                        
                        if(fieldparam =='Zone'){
                            paramArr[35] = valueParam
                        }
                        
                        if(fieldparam =='Program'){
                            paramArr[36] = valueParam
                        }
                        
                        if(fieldparam =='Distance'){
                            paramArr[37] = valueParam
                        }
                        
                        if(fieldparam =='TruckID'){
                            paramArr[38] = valueParam
                        }
                        
                        if(fieldparam =='Control'){
                            paramArr[53] = valueParam
                        }
                        
                        if(fieldparam =='EquipmentCode'){
                            paramArr[24] = valueParam
                        }
                        
                        if(fieldparam =='ShipmentRecordStatus'){
                            paramArr[52] = valueParam
                        }

                        if(fieldparam =='InvoicePostDate'){
                            paramArr[61] = valueParam
                        }

                        if(fieldparam =='DateCreated'){
                            paramArr[62] = valueParam
                        }
                    }
                        var suiteletURL = url.resolveScript({
                            scriptId: 'customscript_tc_staging_area_sl',
                            deploymentId: 'customdeploy_tc_staging_area_sl',
                            params: {
                                page : 0,
                                entity : entity,
                                ShipmentStatus : paramArr[51],
                                BilltoCode : paramArr[1],
                                CustomerAccountCode : paramArr[2],
                                HAWB : paramArr[3],
                                Origin : paramArr[4],
                                Destination : paramArr[5],
                                PickupDate : paramArr[6],
                                DeliverDate : paramArr[7],
                                HAWBDate :  paramArr[50],
                                Handover : paramArr[12],
                                ServiceLevel : paramArr[14],
                                ShipperCompany : paramArr[46],
                                ShipperAddress : paramArr[43],
                                ConsigneeCompany : paramArr[60],
                                ConsigneeAddress : paramArr[54],
                                CommodityType : paramArr[33],
                                Mode : paramArr[34],
                                Zone : paramArr[35],
                                Program : paramArr[36],
                                Distance : paramArr[37],
                                TruckId : paramArr[38],
                                Control : paramArr[53],
                                EquipmentCode : paramArr[24],
                                Status : paramArr[52],
                                invdate : paramArr[61],
                                datecreated : paramArr[62]
                                //paramObj
                            }
                        });
                        redirect.redirect({ url: suiteletURL });
                }
                else{
                        var suiteletURL = url.resolveScript({
                            scriptId: 'customscript_tc_staging_area_sl',
                            deploymentId: 'customdeploy_tc_staging_area_sl',
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
    