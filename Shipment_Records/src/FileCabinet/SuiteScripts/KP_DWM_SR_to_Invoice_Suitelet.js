    /**
     * @NApiVersion 2.x
     * @NScriptType Suitelet
     * @NModuleScope SameAccount
     */
    var PAGE_SIZE = 50;


    define(['N/search', 'N/ui/serverWidget', 'N/url', 'N/redirect', 'N/record','N/https','N/runtime','N/task'], function(search, serverWidget, url, redirect, record, https,runtime, task) {
    
        function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'Staging Area'
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

            var soBodyfield = form.addField({
                id : 'custpage_sales_order',
                type : serverWidget.FieldType.MULTISELECT,
                label : 'Selected SO',
                source: 'salesorder'
            });
            soBodyfield.updateDisplayType({isplayType: 'HIDDEN'});

            var ShipmentStatusF = form.addField({
                id: 'custpage_form_shipmentstatus',
                type: serverWidget.FieldType.TEXT,
                label: 'Shipment Status',
            });
            ShipmentStatusF.updateDisplayType({isplayType: 'HIDDEN'});

            var billtoCodeF = form.addField({
                id: 'custpage_form_billtocode',
                type: serverWidget.FieldType.TEXT,
                label: 'Bill to Code',
            });
            billtoCodeF.updateDisplayType({isplayType: 'HIDDEN'});

            var CustomerAccountCodeF = form.addField({
                id: 'custpage_form_customeraccountcode',
                type: serverWidget.FieldType.TEXT,
                label: 'Customer Account Code',
            });
            CustomerAccountCodeF.updateDisplayType({isplayType: 'HIDDEN'});

            var HAWBF = form.addField({
                id: 'custpage_form_hawb_filter',
                type: serverWidget.FieldType.TEXT,
                label: 'HAWB',
            });
            HAWBF.updateDisplayType({isplayType: 'HIDDEN'});

            var OriginF = form.addField({
                id: 'custpage_form_origin',
                type: serverWidget.FieldType.TEXT,
                label: 'Origin',
            });
            OriginF.updateDisplayType({isplayType: 'HIDDEN'});

            var DestinantionF = form.addField({
                id: 'custpage_form_destinantion',
                type: serverWidget.FieldType.TEXT,
                label: 'Destination',
            });
            DestinantionF.updateDisplayType({isplayType: 'HIDDEN'});

            var PickupDateF = form.addField({
                id: 'custpage_form_pickupdate',
                type: serverWidget.FieldType.TEXT,
                label: 'Pickup Date',
            });
            PickupDateF.updateDisplayType({isplayType: 'HIDDEN'});

            var DeliverDateF = form.addField({
                id: 'custpage_form_deliver_date',
                type: serverWidget.FieldType.TEXT,
                label: 'Deliver Date',
            });
            DeliverDateF.updateDisplayType({isplayType: 'HIDDEN'});

            var HAWBDateF = form.addField({
                id: 'custpage_form_hawbdate',
                type: serverWidget.FieldType.TEXT,
                label: 'HAWB Date',
            });
            HAWBDateF.updateDisplayType({isplayType: 'HIDDEN'});

            var HandoverF = form.addField({
                id: 'custpage_form_handover',
                type: serverWidget.FieldType.TEXT,
                label: 'Handover',
            });
            HandoverF.updateDisplayType({isplayType: 'HIDDEN'});

            var ServiceLevelF = form.addField({
                id: 'custpage_form_servicelevel',
                type: serverWidget.FieldType.TEXT,
                label: 'Service Level',
            });
            ServiceLevelF.updateDisplayType({isplayType: 'HIDDEN'});

            var ShipperCompanyF = form.addField({
                id: 'custpage_form_shippercompany',
                type: serverWidget.FieldType.TEXT,
                label: 'Shipper Company',
            });
            ShipperCompanyF.updateDisplayType({isplayType: 'HIDDEN'});

            var ShipperAddressF = form.addField({
                id: 'custpage_form_shipperaddress',
                type: serverWidget.FieldType.TEXT,
                label: 'Shipper Address',
            });
            ShipperAddressF.updateDisplayType({isplayType: 'HIDDEN'});

            var ConsigneeCompanyF = form.addField({
                id: 'custpage_form_consigneecompany',
                type: serverWidget.FieldType.TEXT,
                label: 'Consignee Company',
            });
            ConsigneeCompanyF.updateDisplayType({isplayType: 'HIDDEN'});

            var ConsigneeAddressF = form.addField({
                id: 'custpage_form_consigneeaddress',
                type: serverWidget.FieldType.TEXT,
                label: 'Consignee Address',
            });
            ConsigneeAddressF.updateDisplayType({isplayType: 'HIDDEN'});

            var CommodityTypeF = form.addField({
                id: 'custpage_form_commoditytype',
                type: serverWidget.FieldType.TEXT,
                label: 'Commodity Type',
            });
            CommodityTypeF.updateDisplayType({isplayType: 'HIDDEN'});

            var ModeF = form.addField({
                id: 'custpage_form_mode',
                type: serverWidget.FieldType.TEXT,
                label: 'Mode',
            });
            ModeF.updateDisplayType({isplayType: 'HIDDEN'});

            var ZoneF = form.addField({
                id: 'custpage_form_zone',
                type: serverWidget.FieldType.TEXT,
                label: 'Zone',
            });
            ZoneF.updateDisplayType({isplayType: 'HIDDEN'});

            var ProgramF = form.addField({
                id: 'custpage_form_program',
                type: serverWidget.FieldType.TEXT,
                label: 'Program',
            });
            ProgramF.updateDisplayType({isplayType: 'HIDDEN'});

            var DistanceF = form.addField({
                id: 'custpage_form_distance',
                type: serverWidget.FieldType.TEXT,
                label: 'Distance',
            });
            DistanceF.updateDisplayType({isplayType: 'HIDDEN'});

            var TruckIdF = form.addField({
                id: 'custpage_form_truckid',
                type: serverWidget.FieldType.TEXT,
                label: 'Truck ID',
            });
            TruckIdF.updateDisplayType({isplayType: 'HIDDEN'});

            var ControlF = form.addField({
                id: 'custpage_form_control',
                type: serverWidget.FieldType.TEXT,
                label: 'Control',
            });
            ControlF.updateDisplayType({isplayType: 'HIDDEN'});

            var EquipmentCodeF = form.addField({
                id: 'custpage_form_equipment_code',
                type: serverWidget.FieldType.TEXT,
                label: 'Equipment Code',
            });
            EquipmentCodeF.updateDisplayType({isplayType: 'HIDDEN'});

            var StatusF = form.addField({
                id: 'custpage_form_status',
                type: serverWidget.FieldType.TEXT,
                label: 'Status',
            });
            StatusF.updateDisplayType({isplayType: 'HIDDEN'});

            var invDateF = form.addField({
                id: 'custpage_form_invoice_date',
                type: serverWidget.FieldType.TEXT,
                label: 'Invoice Date',
            });
            invDateF.updateDisplayType({isplayType: 'HIDDEN'});

            var dateCreatedF = form.addField({
                id: 'custpage_form_date_created',
                type: serverWidget.FieldType.TEXT,
                label: 'Date Created',
            });
            dateCreatedF.updateDisplayType({isplayType: 'HIDDEN'});
            /*form.addField({
                id: 'custpage_form_field',
                type: serverWidget.FieldType.TEXT,
                label: 'TEST'
            });*/

            form.clientScriptModulePath = 'SuiteScripts/KP_DWM_SR_to_Invoice_SL_utility_CS.js ';
    
            // Get parameters
            var pageId = parseInt(context.request.parameters.page);
            var entity = context.request.parameters.entity;
            var so = context.request.parameters.so;
            var srIds = context.request.parameters.ids;
            var unMarked = context.request.parameters.unMarked;
            var ShipmentStatus = context.request.parameters.ShipmentStatus;
            var BilltoCode = context.request.parameters.BilltoCode;
            var CustomerAccountCode = context.request.parameters.CustomerAccountCode;
            var HAWB = context.request.parameters.HAWB;
            var Origin = context.request.parameters.Origin;
            var Destinantion = context.request.parameters.Destination;
            var PickupDate = context.request.parameters.PickupDate;
            var DeliverDate = context.request.parameters.DeliverDate;
            var HAWBDate = context.request.parameters.HAWBDate;
            var Handover = context.request.parameters.Handover;
            var ServiceLevel = context.request.parameters.ServiceLevel;
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
            var Status = context.request.parameters.Status;
            var invdate = context.request.parameters.invdate;
            var datecreated = context.request.parameters.datecreated;
            /*var action = context.request.parameters.action;
            var taskId = context.request.parameters.taskid;

            if(action == 'scheduled'){
                var myTaskStatus = task.checkStatus({
                    taskId: taskId
                });

                log.debug('myTaskStatus',myTaskStatus)
                log.debug('myTaskStatus.status',myTaskStatus.status)
                
                if(myTaskStatus.status == 'COMPLETE'){
                    var suiteletURL = url.resolveScript({
                        scriptId: 'customscript_sr_to_invoice_approval',
                        deploymentId: 'customdeploy_sr_to_invoice_approval',
                        params: {
                            entity : entity,
                            page : 0
                        }
                    });
                    redirect.redirect({ url: suiteletURL });
                }
                else{
                    var suiteletURL = url.resolveScript({
                        scriptId: 'customscript_sr_to_invoice_approval',
                        deploymentId: 'customdeploy_sr_to_invoice_approval',
                        params: {
                            entity : entity,
                            action : 'scheduled',
                            taskid : taskId,
                            ids : srIds,
                        }
                    });
                    redirect.redirect({ url: suiteletURL }); 
                }
            }*/

            var soArr = new Array();
            var myUser = runtime.getCurrentUser();
           
            //if(customer || fromdate || todate){
                // Create a sublist to display the search results
                var sublist = form.addSublist({
                id: 'custpage_shipment_list',
                type: serverWidget.SublistType.LIST,
                label: 'Shipment Record',
                });    

                //sublist.addMarkAllButtons();

                sublist.addButton({                    id : 'custpage_mark_all_btn',
                    label : 'Mark All',
                    functionName : 'markAll()'
                });

                sublist.addButton({                    id : 'custpage_unmark_all_btn',
                    label : 'Unmark All',
                    functionName : 'unmarkAll()'
                });
                
                // Add columns to the sublist
                var isInvoice = sublist.addField({
                id: 'custpage_shipment_mark',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'APPLY SR',
                });
                //isInvoice.defaultValue = 'T';

                var soId = sublist.addField({
                    id: 'custpage_sr_id',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'SHIPMENT RECORD ID'
                });
                soId.updateDisplayType({isplayType: 'HIDDEN'});

                var customer = sublist.addField({
                    id: 'custpage_sr_customer',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer'
                });
                customer.updateDisplayType({isplayType: 'HIDDEN'});

                sublist.addField({
                    id: 'custpage_invoice',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice'
                });

                sublist.addField({
                    id: 'custpage_owner',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Owned By'
                });

                var ownerId = sublist.addField({
                    id: 'custpage_owner_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Owner ID'
                });
                ownerId.updateDisplayType({isplayType: 'HIDDEN'});

                sublist.addField({
                    id: 'custpage_sr_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Shipment Record Status'
                });

                sublist.addField({
                    id: 'custpage_standard_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Standard Status'
                });
                
                sublist.addField({
                    id: 'custpage_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Shipment Status'
                });

                sublist.addField({
                    id: 'custpage_bill_acc',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Bill to Account'
                });

                sublist.addField({
                    id: 'custpage_hawb',
                    type: serverWidget.FieldType.TEXT,
                    label: 'HAWB'
                });

                sublist.addField({
                    id: 'custpage_mawb',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Hand Over'
                });

                sublist.addField({
                    id: 'custpage_origin',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Origin'
                });

                sublist.addField({
                    id: 'custpage_dest',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Destination'
                });
                
                sublist.addField({
                    id: 'custpage_hawb_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'HAWB Date'
                });

                sublist.addField({
                    id: 'custpage_pickup_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Pick Up Date'
                });
				
				sublist.addField({
                    id: 'custpage_deliver_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Delivery Date'
                });

                sublist.addField({
                    id: 'custpage_pickup_time',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Pick Up Time'
                });
				
				sublist.addField({
                    id: 'custpage_deliver_time',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Delivery Time'
                });

                sublist.addField({
                    id: 'custpage_pickup_wait_time',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Pick Up Wait Time(mins)'
                });
				
				sublist.addField({
                    id: 'custpage_deliver_wait_time',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Delivery Wait Time (mins)'
                });

                sublist.addField({
                    id: 'custpage_service_level',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Service Level'
                });

                sublist.addField({
					id: 'custpage_pieces',
					type: serverWidget.FieldType.INTEGER,
					label: 'Pieces'
                });  

                sublist.addField({
                    id: 'custpage_actual_weight',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Actual Weight'
                });

                sublist.addField({
					id: 'custpage_dim_weight',
					type: serverWidget.FieldType.INTEGER,
					label: 'DIM Weight'
                });   

				sublist.addField({
					id: 'custpage_weight_unit',
					type: serverWidget.FieldType.TEXT,
					label: 'Weight UOM'
                });   
                
                sublist.addField({
                    id: 'custpage_dim_fact',
                    type: serverWidget.FieldType.TEXT,
                    label: 'DIM Fact'
                });

                sublist.addField({
					id: 'custpage_deparment',
					type: serverWidget.FieldType.TEXT,
					label: 'Department'
                }); 
                
                sublist.addField({
					id: 'custpage_shipper_company_name',
					type: serverWidget.FieldType.TEXT,
					label: 'Main Shipper Company Name'
                });   

               sublist.addField({
                    id: 'custpage_shipper_company',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper Company'
                });

                sublist.addField({
                    id: 'custpage_shipper_address',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper Address'
                });  

                sublist.addField({
                    id: 'custpage_shipper_city_town',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper City Town'
                });  

                sublist.addField({
                    id: 'custpage_shipper_region_province',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper State Region Province'
                });
                
                sublist.addField({
                    id: 'custpage_shipper_postal_code',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper Postal Code'
                });  

                sublist.addField({
                    id: 'custpage_shipper_country',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper Country'
                });  

                sublist.addField({
                    id: 'custpage_shipper_airport_code',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper Airport Code'
                });  

                sublist.addField({
					id: 'custpage_consignee_company_name',
					type: serverWidget.FieldType.TEXT,
					label: 'Main Consignee Company Name'
                });  
                
                sublist.addField({
                    id: 'custpage_consignee_company',
					type: serverWidget.FieldType.TEXT,
					label: 'Consignee Company'
                });  

                sublist.addField({
                    id: 'custpage_consignee_address',
					type: serverWidget.FieldType.TEXT,
					label: 'Consignee Address'
                }); 
                
                sublist.addField({
                    id: 'custpage_consignee_city_town',
					type: serverWidget.FieldType.TEXT,
					label: 'Consignee City Town'
                });  

                sublist.addField({
                    id: 'custpage_consignee_region_province',
					type: serverWidget.FieldType.TEXT,
					label: 'Consignee State Region Province'
                }); 

                sublist.addField({
                    id: 'custpage_consignee_postal_code',
					type: serverWidget.FieldType.TEXT,
					label: 'Consignee Postal Code'
                });  

                sublist.addField({
                    id: 'custpage_consignee_country',
					type: serverWidget.FieldType.TEXT,
					label: 'Consignee Country'
                });  

                sublist.addField({
                    id: 'custpage_consignee_airport_code',
					type: serverWidget.FieldType.TEXT,
					label: 'Consignee Airport Code'
                });

                sublist.addField({
					id: 'custpage_description',
					type: serverWidget.FieldType.TEXT,
					label: 'SMK Number'
                });   
				
                sublist.addField({
                    id: 'custpage_customer_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Bill to Name'
                });
                
				sublist.addField({
					id: 'custpage_due_time',
					type: serverWidget.FieldType.TEXT,
					label: 'Due Time'
                });

                sublist.addField({
					id: 'custpage_equipment_code',
					type: serverWidget.FieldType.TEXT,
					label: 'Equipment Code'
                });   				
				
				sublist.addField({
                    id: 'custpage_main_mode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Main Mode'
                });

                sublist.addField({
                    id: 'custpage_commodity_code',
                    type: serverWidget.FieldType.TEXT,
                    label: 'TPT'
                });

                sublist.addField({
                    id: 'custpage_intel_service',
					type: serverWidget.FieldType.TEXT,
					label: 'Intel Service Code'
                });
                
                sublist.addField({
                    id: 'custpage_scac_code',
					type: serverWidget.FieldType.TEXT,
					label: 'SCAC Code'
                });

                sublist.addField({
					id: 'custpage_pay_code',
					type: serverWidget.FieldType.TEXT,
					label: 'Pay Code'
                });  

                sublist.addField({
                    id: 'custpage_customer_per_entity',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer per Entity'
                });

                sublist.addField({
					id: 'custpage_commodity_type',
					type: serverWidget.FieldType.TEXT,
					label: 'Commodity Type'
                });   

				sublist.addField({
					id: 'custpage_mode',
					type: serverWidget.FieldType.TEXT,
					label: 'Mode'
                });   

                sublist.addField({
                    id: 'custpage_distance',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Distance(in miles)'
                });

                sublist.addField({
                    id: 'custpage_truck_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Truck ID'
                });

                sublist.addField({
					id: 'custpage_trailer_id',
					type: serverWidget.FieldType.TEXT,
					label: 'Trailer ID'
                });   

				sublist.addField({
					id: 'custpage_driver_id',
					type: serverWidget.FieldType.TEXT,
					label: 'Driver ID'
                });   

                sublist.addField({
                    id: 'custpage_vendor_name_0',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Name 1'
                });  

                sublist.addField({
                    id: 'custpage_vendor_cost_0',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Invoice Cost 1'
                });  

                sublist.addField({
                    id: 'custpage_vendor_name_1',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Name 2'
                });  

                sublist.addField({
                    id: 'custpage_vendor_cost_1',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Invoice Cost 2'
                });  

                sublist.addField({
                    id: 'custpage_vendor_name_2',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Name 3'
                });  

                sublist.addField({
                    id: 'custpage_vendor_cost_2',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Invoice Cost 3'
                });  

                sublist.addField({
                    id: 'custpage_vendor_name_3',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Name 4'
                });  

                sublist.addField({
                    id: 'custpage_vendor_cost_3',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Invoice Cost 4'
                });  

                sublist.addField({
                    id: 'custpage_vendor_name_4',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Name 5'
                });  

                sublist.addField({
                    id: 'custpage_vendor_cost_4',
					type: serverWidget.FieldType.TEXT,
					label: 'Vendor Invoice Cost 5'
                });

                
                var freightField = sublist.addField({
                    id: 'custpage_freight',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Freight'
                });

                freightField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var discountField = sublist.addField({
                    id: 'custpage_discount',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Discount'
                });

                discountField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var fuelField = sublist.addField({
                    id: 'custpage_fuel',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Fuel'
                });

                fuelField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var waitTimePU = sublist.addField({
                    id: 'custpage_wait_time_pick_up',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Wait Time Pick Up'
                });

                waitTimePU.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var waitTimeDel = sublist.addField({
                    id: 'custpage_wait_time_delivery',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Wait Time Delivery'
                });

                waitTimeDel.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var sameDayDel = sublist.addField({
                    id: 'custpage_same_day_delivery',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Same Day Delivery'
                });

                sameDayDel.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var AHPickUp = sublist.addField({
                    id: 'custpage_after_hours_pick_up',
                    type: serverWidget.FieldType.TEXT,
                    label: 'After Hours Pick Up'
                });

                AHPickUp.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var AHDelivery = sublist.addField({
                    id: 'custpage_after_hours_delivery',
                    type: serverWidget.FieldType.TEXT,
                    label: 'After Hours Delivery'
                });

                AHDelivery.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var storage = sublist.addField({
                    id: 'custpage_storage',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Storage'
                });

                storage.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var manpower = sublist.addField({
                    id: 'custpage_manpower',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Additional Manpower'
                });

                manpower.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var smartPallet = sublist.addField({
                    id: 'custpage_smart_pallet',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Smart Pallet'
                });

                smartPallet.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var cfcField = sublist.addField({
                    id: 'custpage_cfc',
                    type: serverWidget.FieldType.TEXT,
                    label: 'CFC'
                });

                cfcField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var fagField = sublist.addField({
                    id: 'custpage_fag',
                    type: serverWidget.FieldType.TEXT,
                    label: 'FAG'
                });

                fagField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var HOLField = sublist.addField({
                    id: 'custpage_hol',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Weekend or Holiday Delivery'
                });

                HOLField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var specialField = sublist.addField({
                    id: 'custpage_special',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Special'
                });

                specialField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var HandField = sublist.addField({
                    id: 'custpage_handling',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Handling'
                });

                HandField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var specialHandField = sublist.addField({
                    id: 'custpage_special_handling',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Special Handling'
                });

                specialHandField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var HAZField = sublist.addField({
                    id: 'custpage_haz',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Hazardous Cargo Handling Charge at Origin'
                });
                
                HAZField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var layoOverField = sublist.addField({
                    id: 'custpage_layover',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Layover Fee'
                });
                
                layoOverField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var weekendPUDELField = sublist.addField({
                    id: 'custpage_weekend_pickup_delivery',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Weekend Pickup/Dlvy'
                });
                
                weekendPUDELField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var detentionField = sublist.addField({
                    id: 'custpage_detention',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Detention Charge'
                });
                
                detentionField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var vehicleWaitingTimeOrigin = sublist.addField({
                    id: 'custpage_veh_wait_time_origin',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Vehicle Waiting Time at Origin'
                });
                
                vehicleWaitingTimeOrigin.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var vehicleWaitingTimeDest = sublist.addField({
                    id: 'custpage_veh_wait_time_dest',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Vehicle Waiting Time at Destination'
                });
                
                vehicleWaitingTimeDest.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var truckOrder = sublist.addField({
                    id: 'custpage_truck_order',
                    type: serverWidget.FieldType.TEXT,
                    label: ' Truck Order Not Used '
                });
                
                truckOrder.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var attemptedPU = sublist.addField({
                    id: 'custpage_attempted_pick_up',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Attempted Pick Up'
                });
                
                attemptedPU.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var HUL = sublist.addField({
                    id: 'custpage_hul',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Liftgate or Forklift Service'
                });
                
                HUL.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var HHB = sublist.addField({
                    id: 'custpage_hhb',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Brokerage Country Specific Govt Fees'
                });
                
                HHB.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var screening = sublist.addField({
                    id: 'custpage_screening',
                    type: serverWidget.FieldType.TEXT,
                    label: 'screening'
                });
                
                screening.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var otCharge = sublist.addField({
                    id: 'custpage_ot_charge',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Overtime Charge'
                });
                
                otCharge.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var BBF = sublist.addField({
                    id: 'custpage_break_bulk_fee',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Break Bulk Fee'
                });
                
                BBF.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var ediF = sublist.addField({
                    id: 'custpage_edi_fee',
                    type: serverWidget.FieldType.TEXT,
                    label: 'EDI Fee'
                });
                
                ediF.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var cusForm = sublist.addField({
                    id: 'custpage_custom_formalities',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customs Formalities'
                });
                
                cusForm.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var stopF = sublist.addField({
                    id: 'custpage_stop_fee',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Stop Fee'
                });
                
                stopF.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var BCD = sublist.addField({
                    id: 'custpage_bcd',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Brokerage Customs and Duties'
                });
                
                BCD.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var attemptedDel = sublist.addField({
                    id: 'custpage_attempted_del',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Attempted Delivery'
                });
                
                attemptedDel.updateDisplayType({                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var dockF = sublist.addField({
                    id: 'custpage_dock_fee',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Dock Fee'
                });
                
                dockF.updateDisplayType({                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var WPP = sublist.addField({
                    id: 'custpage_wh_pick_pack',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Warehouse Pick and Pack'
                });
                
                WPP.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var stoDest = sublist.addField({
                    id: 'custpage_storage_dest',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Storage at Destination'
                });
                
                stoDest.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var GDT = sublist.addField({
                    id: 'custpage_gov_duty_tax',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Government Duties and Taxes'
                });
                
                GDT.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                var totalLine = sublist.addField({
                    id: 'custpage_total',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Total Charges'
                });

                totalLine.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                sublist.addField({
                    id: 'custpage_int_notes',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Internal Billing Notes'
                });

                var externalNotesField = sublist.addField({
                    id: 'custpage_external_notes',
                    type: serverWidget.FieldType.TEXT,
                    label: 'External Notes'
                });
                
                externalNotesField.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });

                sublist.addField({
                    id: 'custpage_so_view',
                    type: serverWidget.FieldType.URL,
                    label: 'VIEW'
                }).linkText = 'View';

                sublist.addField({
                    id: 'custpage_order_no',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Number #'
                });

                sublist.addField({
                    id: 'custpage_invoice_post_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Invoice Post Date'
                });

                sublist.addField({
                    id: 'custpage_date_and_time',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Created Date and Time'
                });

				/*sublist.addField({
                    id: 'custpage_pallet',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Pallets'
                });

                sublist.addField({
                    id: 'custpage_shipping_address',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Shipping Address'
                });

                sublist.addField({
                    id: 'custpage_consignee_address',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Consignee Address'
                }); 

				sublist.addField({
					id: 'custpage_shipper_reference',
					type: serverWidget.FieldType.TEXT,
					label: 'Shipper Reference'
                });   
				
				sublist.addField({
					id: 'custpage_zone',
					type: serverWidget.FieldType.TEXT,
					label: 'Zone'
                });   				
				
				sublist.addField({
                    id: 'custpage_program',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Program'
                });*/

                //Column 1-Column 20    

                var retrieveSearch = runSearch(entity, srIds, ShipmentStatus,BilltoCode,CustomerAccountCode, HAWB, Origin, Destinantion, PickupDate,DeliverDate,HAWBDate,Handover,ServiceLevel,ShipperCompany,ShipperAddress,ConsigneeCompany,ConsigneeAddress,CommodityType,Mode,Zone,Program,Distance,TruckId,Control,EquipmentCode,Status,invdate,datecreated, PAGE_SIZE);
                var pageCount = Math.ceil(retrieveSearch.count / PAGE_SIZE);

                // Set pageId to correct value if out of index
                if (!pageId || pageId == '' || pageId < 0)
                    pageId = 0;
                else if (pageId >= pageCount)
                    pageId = pageCount - 1;

                // Add buttons to simulate Next & Previous
                /*if (pageId != 0) {‌
                    form.addButton({
                        id : 'custpage_previous',
                        label : 'Previous',
                        functionName : 'getSuiteletPage(' + (pageId - 1) + ',' + partNo + ',' + unitModel + ',' + description +')'
                    });
                }

                if (pageId != pageCount - 1) {‌
                    form.addButton({
                        id : 'custpage_next',
                        label : 'Next',
                        functionName : 'getSuiteletPage(' + (pageId + 1) + ',' + partNo + ',' + unitModel + ',' + description +')'
                    });
                }*/

                    var pageField = form.addField({
                        id: 'custpage_form_pagefield',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Page Field'
                    });
                    pageField.updateDisplayType({isplayType: 'HIDDEN'});

                // Add drop-down and options to navigate to specific pagePAGE_SIZE
                    var selectOptions = form.addField({
                        id : 'custpage_pageid',
                        label : 'Page Index',
                        type : serverWidget.FieldType.SELECT
                    });

                    form.clientScriptModulePath = 'SuiteScripts/KP_DWM_SR_to_Invoice_SL_utility_CS.js ';

            
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

                if(srIds){
                    var idsArr = srIds.split(",");
                    for(var i=0;i<idsArr.length;i++){
                        if(unMarked){
                            sublist.setSublistValue({
                                id: 'custpage_shipment_mark',
                                line: i,
                                value: 'F'
                            });
                        }
                        else{
                            sublist.setSublistValue({
                                id: 'custpage_shipment_mark',
                                line: i,
                                value: 'T'
                            });
                        }
                        

                        var soRecField = search.lookupFields({
                            type: search.Type.SALES_ORDER,
                            id: idsArr[i],
                            columns: ['custbody_freight_rep_hidden','custbody_discount_rep_hidden','custbody_fuel_rep_hidden','custbody_waittimepu_rep_hidden','custbody_waittimedel_rep_hidden','custbody_same_day_del_rep_hidden','custbody_after_hour_pu_rep_hidden','custbody_after_hours_del_rep_hidden','custbody_storage_rep_hidden','custbody_manpower_rep_hidden','custbody_smart_pallet_rep_hidden','custbody_cfc_rep_hidden','custbody_fag_rep_hidden',]
                        });
                        
                        if(soRecField.custbody_freight_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_freight',
                                line: i,
                                value: soRecField.custbody_freight_rep_hidden
                            });
                        }

                        if(soRecField.custbody_discount_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_discount',
                                line: i,
                                value: soRecField.custbody_discount_rep_hidden
                            });
                        }
                        
                        if(soRecField.custbody_fuel_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_fuel',
                                line: i,
                                value: soRecField.custbody_fuel_rep_hidden
                            });
                        }

                        if(soRecField.custbody_waittimepu_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_wait_time_pick_up',
                                line: i,
                                value: soRecField.custbody_waittimepu_rep_hidden
                            });
                        }

                        if(soRecField.custbody_waittimedel_rep_hidden){
                        sublist.setSublistValue({
                            id: 'custpage_wait_time_delivery',
                            line: i,
                            value: soRecField.custbody_waittimedel_rep_hidden
                        });
                        }

                        if(soRecField.custbody_same_day_del_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_same_day_delivery',
                                line: i,
                                value: soRecField.custbody_same_day_del_rep_hidden
                            });
                        }

                        if(soRecField.custbody_after_hour_pu_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_after_hours_pick_up',
                                line: i,
                                value: soRecField.custbody_after_hour_pu_rep_hidden
                            });
                        }
                        
                        if(soRecField.custbody_after_hours_del_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_after_hours_delivery',
                                line: i,
                                value: soRecField.custbody_after_hours_del_rep_hidden
                            });
                        }

                        if(soRecField.custbody_storage_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_storage',
                                line: i,
                                value: soRecField.custbody_storage_rep_hidden
                            });
                        }

                        if(soRecField.custbody_manpower_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_manpower',
                                line: i,
                                value: soRecField.custbody_manpower_rep_hidden
                            });
                        }

                        if(soRecField.custbody_smart_pallet_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_smart_pallet',
                                line: i,
                                value: soRecField.custbody_smart_pallet_rep_hidden
                            });
                        }

                        if(soRecField.custbody_cfc_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_cfc',
                                line: i,
                                value: soRecField.custbody_cfc_rep_hidden
                            });
                        }

                        if(soRecField.custbody_fag_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_fag',
                                line: i,
                                value: soRecField.custbody_fag_rep_hidden
                            });
                        }
                    }
                }

                //log.debug('PageId', pageId)
                // Get subset of data to be shown on page
                if(retrieveSearch.count > 0){
                    var searchResults = fetchSearchResult(retrieveSearch, pageId);

                    var j = 0;
                    searchResults.forEach(function (result) {
                        if(result.id){
                            sublist.setSublistValue({
                                id: 'custpage_sr_id',
                                line: j,
                                value: result.id
                            });

                            var shipmentLink = 'https://8024578.app.netsuite.com/app/accounting/transactions/salesord.nl?id='
                            sublist.setSublistValue({
                                id: 'custpage_so_view',
                                line: j,
                                value: shipmentLink+result.id
                            });

                            var soRecField = search.lookupFields({
                                type: search.Type.SALES_ORDER,
                                id: result.id,
                                columns: ['custbody_freight_rep_hidden','custbody_discount_rep_hidden','custbody_fuel_rep_hidden','custbody_waittimepu_rep_hidden','custbody_waittimedel_rep_hidden','custbody_same_day_del_rep_hidden','custbody_after_hour_pu_rep_hidden','custbody_after_hours_del_rep_hidden','custbody_storage_rep_hidden','custbody_manpower_rep_hidden','custbody_smart_pallet_rep_hidden','custbody_cfc_rep_hidden','custbody_fag_rep_hidden','custbody_weekend_or_holiday_delivery','custbody_special','custbody_handling','custbody_special_handling','custbody_hazardous_cargo','custbody_layover_fee','custbody_weekend_pickup_dlvy','custbody_detention_charge','custbody_vehicle_waiting_time_origin','custbody_vehicle_waiting_time_dest','custbody_truck_ordered_not_used','custbody_attempted_pickup','custbody_lift_gate_truck_or_forklift','custbody_brokerage_govt_fees','custbody_screening','custbody_overtime_charges','custbody_break_bulk_fee','custbody_edi_fee','custbody_customs_formalities','custbody_stop_fee','custbody_brokerage_customs_duties','custbody_attempted_delivery','custbody_dock_fee','custbody_warehouse_pick_and_pack','custbody_storage_at_destination','custbody_government_duties_and_taxes','custbody_sr_total','custbody_external_notes']
                            });
                            
                            if(soRecField.custbody_freight_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_freight',
                                    line: j,
                                    value: soRecField.custbody_freight_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_discount_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_discount',
                                    line: j,
                                    value: soRecField.custbody_discount_rep_hidden
                                });
                            }
                            
                            if(soRecField.custbody_fuel_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_fuel',
                                    line: j,
                                    value: soRecField.custbody_fuel_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_waittimepu_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_wait_time_pick_up',
                                    line: j,
                                    value: soRecField.custbody_waittimepu_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_waittimedel_rep_hidden){
                            sublist.setSublistValue({
                                id: 'custpage_wait_time_delivery',
                                line: j,
                                value: soRecField.custbody_waittimedel_rep_hidden
                            });
                            }
    
                            if(soRecField.custbody_same_day_del_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_same_day_delivery',
                                    line: j,
                                    value: soRecField.custbody_same_day_del_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_after_hour_pu_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_after_hours_pick_up',
                                    line: j,
                                    value: soRecField.custbody_after_hour_pu_rep_hidden
                                });
                            }
                            
                            if(soRecField.custbody_after_hours_del_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_after_hours_delivery',
                                    line: j,
                                    value: soRecField.custbody_after_hours_del_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_storage_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_storage',
                                    line: j,
                                    value: soRecField.custbody_storage_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_manpower_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_manpower',
                                    line: j,
                                    value: soRecField.custbody_manpower_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_smart_pallet_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_smart_pallet',
                                    line: j,
                                    value: soRecField.custbody_smart_pallet_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_cfc_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_cfc',
                                    line: j,
                                    value: soRecField.custbody_cfc_rep_hidden
                                });
                            }
    
                            if(soRecField.custbody_fag_rep_hidden){
                                sublist.setSublistValue({
                                    id: 'custpage_fag',
                                    line: j,
                                    value: soRecField.custbody_fag_rep_hidden
                                });
                            }

                            if(soRecField.custbody_weekend_or_holiday_delivery){
                                sublist.setSublistValue({
                                    id: 'custpage_hol',
                                    line: j,
                                    value: soRecField.custbody_weekend_or_holiday_delivery
                                });
                            }

                            if(soRecField.custbody_special){
                                sublist.setSublistValue({
                                    id: 'custpage_special',
                                    line: j,
                                    value: soRecField.custbody_special
                                });
                            }

                            if(soRecField.custbody_handling){
                                sublist.setSublistValue({
                                    id: 'custpage_handling',
                                    line: j,
                                    value: soRecField.custbody_handling
                                });
                            }
    
                            if(soRecField.custbody_special_handling){
                                sublist.setSublistValue({
                                    id: 'custpage_special_handling',
                                    line: j,
                                    value: soRecField.custbody_special_handling
                                });
                            }
    
                            if(soRecField.custbody_hazardous_cargo){
                                sublist.setSublistValue({
                                    id: 'custpage_haz',
                                    line: j,
                                    value: soRecField.custbody_hazardous_cargo
                                });
                            }
    
                            if(soRecField.custbody_layover_fee){
                                sublist.setSublistValue({
                                    id: 'custpage_layover',
                                    line: j,
                                    value: soRecField.custbody_layover_fee
                                });
                            }
    
                            if(soRecField.custbody_weekend_pickup_dlvy){
                                sublist.setSublistValue({
                                    id: 'custpage_weekend_pickup_delivery',
                                    line: j,
                                    value: soRecField.custbody_weekend_pickup_dlvy
                                });
                            }
    
                            if(soRecField.custbody_detention_charge){
                                sublist.setSublistValue({
                                    id: 'custpage_detention',
                                    line: j,
                                    value: soRecField.custbody_detention_charge
                                });
                            }

                            if(soRecField.custbody_vehicle_waiting_time_origin){
                                sublist.setSublistValue({
                                    id: 'custpage_veh_wait_time_origin',
                                    line: j,
                                    value: soRecField.custbody_vehicle_waiting_time_origin
                                });
                            }

                            if(soRecField.custbody_vehicle_waiting_time_dest){
                                sublist.setSublistValue({
                                    id: 'custpage_veh_wait_time_dest',
                                    line: j,
                                    value: soRecField.custbody_vehicle_waiting_time_dest
                                });
                            }

                            if(soRecField.custbody_truck_ordered_not_used){
                                sublist.setSublistValue({
                                    id: 'custpage_truck_order',
                                    line: j,
                                    value: soRecField.custbody_truck_ordered_not_used
                                });
                            }

                            if(soRecField.custbody_attempted_pickup){
                                sublist.setSublistValue({
                                    id: 'custpage_attempted_pick_up',
                                    line: j,
                                    value: soRecField.custbody_attempted_pickup
                                });
                            }

                            if(soRecField.custbody_lift_gate_truck_or_forklift){
                                sublist.setSublistValue({
                                    id: 'custpage_hul',
                                    line: j,
                                    value: soRecField.custbody_lift_gate_truck_or_forklift
                                });
                            }

                            if(soRecField.custbody_brokerage_govt_fees){
                                sublist.setSublistValue({
                                    id: 'custpage_hhb',
                                    line: j,
                                    value: soRecField.custbody_brokerage_govt_fees
                                });
                            }

                            if(soRecField.custbody_screening){
                                sublist.setSublistValue({
                                    id: 'custpage_screening',
                                    line: j,
                                    value: soRecField.custbody_screening
                                });
                            }

                            if(soRecField.custbody_overtime_charges){
                                sublist.setSublistValue({
                                    id: 'custpage_ot_charge',
                                    line: j,
                                    value: soRecField.custbody_overtime_charges
                                });
                            }

                            if(soRecField.custbody_break_bulk_fee){
                                sublist.setSublistValue({
                                    id: 'custpage_break_bulk_fee',
                                    line: j,
                                    value: soRecField.custbody_break_bulk_fee
                                });
                            }

                            if(soRecField.custbody_edi_fee){
                                sublist.setSublistValue({
                                    id: 'custpage_edi_fee',
                                    line: j,
                                    value: soRecField.custbody_edi_fee
                                });
                            }

                            if(soRecField.custbody_customs_formalities){
                                sublist.setSublistValue({
                                    id: 'custpage_custom_formalities',
                                    line: j,
                                    value: soRecField.custbody_customs_formalities
                                });
                            }

                            if(soRecField.custbody_stop_fee){
                                sublist.setSublistValue({
                                    id: 'custpage_stop_fee',
                                    line: j,
                                    value: soRecField.custbody_stop_fee
                                });
                            }

                            if(soRecField.custbody_brokerage_customs_duties){
                                sublist.setSublistValue({
                                    id: 'custpage_bcd',
                                    line: j,
                                    value: soRecField.custbody_brokerage_customs_duties
                                });
                            }

                            if(soRecField.custbody_attempted_delivery){
                                sublist.setSublistValue({
                                    id: 'custpage_attempted_del',
                                    line: j,
                                    value: soRecField.custbody_attempted_delivery
                                });
                            }

                            if(soRecField.custbody_dock_fee){
                                sublist.setSublistValue({
                                    id: 'custpage_dock_fee',
                                    line: j,
                                    value: soRecField.custbody_dock_fee
                                });
                            }

                            if(soRecField.custbody_warehouse_pick_and_pack){
                                sublist.setSublistValue({
                                    id: 'custpage_wh_pick_pack',
                                    line: j,
                                    value: soRecField.custbody_warehouse_pick_and_pack
                                });
                            }

                            if(soRecField.custbody_dock_fee){
                                sublist.setSublistValue({
                                    id: 'custpage_storage_dest',
                                    line: j,
                                    value: soRecField.custbody_dock_fee
                                });
                            }

                            if(soRecField.custbody_government_duties_and_taxes){
                                sublist.setSublistValue({
                                    id: 'custpage_gov_duty_tax',
                                    line: j,
                                    value: soRecField.custbody_government_duties_and_taxes
                                });
                            }

                            if(soRecField.custbody_sr_total){
                                sublist.setSublistValue({
                                    id: 'custpage_total',
                                    line: j,
                                    value: soRecField.custbody_sr_total
                                });
                            }

                            if(soRecField.custbody_external_notes){
                                sublist.setSublistValue({
                                    id: 'custpage_external_notes',
                                    line: j,
                                    value: soRecField.custbody_external_notes
                                });
                            }
                        }

                        if(result.customer){
                            sublist.setSublistValue({
                                id: 'custpage_sr_customer',
                                line: j,
                                value: result.customer
                            });
                        }

                        if(result.isInv){
                            sublist.setSublistValue({
                                id: 'custpage_invoice',
                                line: j,
                                value: result.isInv
                            });
                        }

                        if(result.owned){
                            sublist.setSublistValue({
                                id: 'custpage_owner',
                                line: j,
                                value: result.owned
                            });

                            sublist.setSublistValue({
                                id: 'custpage_owner_id',
                                line: j,
                                value: result.ownedId
                            });

                            if(myUser.id == result.ownedId){
                                //log.debug('ownedId',result.ownedId)

                                soArr.push(result.id);
                                //log.debug('soArr',soArr)
                            }
                            
                            sublist.setSublistValue({
                                id: 'custpage_shipment_mark',
                                line: j,
                                value: 'T'
                            });
                        }
						
						if(result.status){
                            sublist.setSublistValue({
                                id: 'custpage_status',
                                line: j,
                                value: result.status
                            });
                        }

                        if(result.srstatus){
                            sublist.setSublistValue({
                                id: 'custpage_sr_status',
                                line: j,
                                value: result.srstatus
                            });
                        }

                        if(result.sstatus){
                            sublist.setSublistValue({
                                id: 'custpage_standard_status',
                                line: j,
                                value: result.sstatus
                            });
                        }

                        if(result.billAcc){
                            sublist.setSublistValue({
                            id: 'custpage_bill_acc',
                            line: j,
                            value: result.billAcc
                            });
                        }
                        
                        if(result.docNum){
                            sublist.setSublistValue({
                                id: 'custpage_order_no',
                                line: j,
                                value: result.docNum
                            });
                        }

                        /*if(result.custAcc){
                            sublist.setSublistValue({
                                id: 'custpage_customer_code',
                                line: j,
                                value: result.custAcc
                            });
                        }*/

                        if(result.hawb){
                            sublist.setSublistValue({
                                id: 'custpage_hawb',
                                line: j,
                                value: result.hawb
                            });
                        }

                        if(result.hawbdate){
                            sublist.setSublistValue({
                                id: 'custpage_hawb_date',
                                line: j,
                                value: result.hawbdate
                            });
                        }

                        if(result.invPostDate){
                            sublist.setSublistValue({
                                id: 'custpage_invoice_post_date',
                                line: j,
                                value: result.invPostDate
                            });
                        }
                       
                        if(result.origin){
                            sublist.setSublistValue({
                                id: 'custpage_origin',
                                line: j,
                                value: result.origin
                            });
                        }

                        if(result.dest){
                            sublist.setSublistValue({
                                id: 'custpage_dest',
                                line: j,
                                value: result.dest
                            });
                        }

                        if(result.pickupDate){
                            sublist.setSublistValue({
                                id: 'custpage_pickup_date',
                                line: j,
                                value: result.pickupDate
                            });
                        }

                        if(result.deliverDate){
                            sublist.setSublistValue({
                                id: 'custpage_deliver_date',
                                line: j,
                                value: result.deliverDate
                            });
                        }

                        if(result.pickUpwaitTime){
                            sublist.setSublistValue({
                                id: 'custpage_pickup_wait_time',
                                line: j,
                                value: result.pickUpwaitTime
                            });
                        }

						if(result.deliverywaitTime){
                            sublist.setSublistValue({
                                id: 'custpage_deliver_wait_time',
                                line: j,
                                value: result.deliverywaitTime
                            });
                        }

                        if(result.pickupTime){
                            sublist.setSublistValue({
                                id: 'custpage_pickup_time',
                                line: j,
                                value: result.pickupTime
                            });
                        }

						if(result.deliveryTime){
                            sublist.setSublistValue({
                                id: 'custpage_deliver_time',
                                line: j,
                                value: result.deliveryTime
                            });
                        }

                        if(result.vendors){
                            var vendorsStr = result.vendors;
                            var vendorArr = vendorsStr.split(',')
                            
                            for (var i = 0; i < vendorArr.length; i++) {
                                var vendorField = search.lookupFields({
                                    type: search.Type.VENDOR,
                                    id: vendorArr[i],
                                    columns: ['entityid']
                                });
                            
                                sublist.setSublistValue({
                                    id: 'custpage_vendor_name_'+i,
                                    line: j,
                                    value: vendorField.entityid
                                });

                                if(result.hawbId){
                                    var vendorInvSearch = runSearchVendorInv(vendorArr[i], result.hawbId);
                                    if(vendorInvSearch.count > 0){
                                        var searchResultsVendor = fetchVendorSearchResult(vendorInvSearch);
                    
                                        searchResultsVendor.forEach(function (resultVendor) {
                                            if(resultVendor.vendorCost){
                                                sublist.setSublistValue({
                                                    id: 'custpage_vendor_cost_'+i,
                                                    line: j,
                                                    value: resultVendor.vendorCost
                                                });
                                            }
                                        })
                                    }
                                }
                            }

                        }
						
						if(result.mawb){
                            sublist.setSublistValue({
                                id: 'custpage_mawb',
                                line: j,
                                value: result.mawb
                            });
                        }

                        if(result.dimFactor){
                            sublist.setSublistValue({
                            id: 'custpage_dim_fact',
                            line: j,
                            value: result.dimFactor
                            });
                        }
                        
                        if(result.serviceLevel){
                            sublist.setSublistValue({
                                id: 'custpage_service_level',
                                line: j,
                                value: result.serviceLevel
                            });
                        }

                        if(result.actualWeight){
                            sublist.setSublistValue({
                                id: 'custpage_actual_weight',
                                line: j,
                                value: result.actualWeight
                            });
                        }

                        if(result.dimWeight){
                            sublist.setSublistValue({
                                id: 'custpage_dim_weight',
                                line: j,
                                value: result.dimWeight
                            });
                        }

                        if(result.weightUnit){
                            sublist.setSublistValue({
                                id: 'custpage_weight_unit',
                                line: j,
                                value: result.weightUnit
                            });
                        }

                        if(result.dueTime){
                            sublist.setSublistValue({
                                id: 'custpage_due_time',
                                line: j,
                                value: result.dueTime
                            });
                        }

                        /*if(result.pallets){
                            sublist.setSublistValue({
                                id: 'custpage_pallet',
                                line: j,
                                value: result.pallets
                            });
                        }*/

                        /*if(result.shippingAddress){
                            sublist.setSublistValue({
                                id: 'custpage_shipping_address',
                                line: j,
                                value: result.shippingAddress
                            });
                        }

                        if(result.consignmentAssignment){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_address',
                                line: j,
                                value: result.consignmentAssignment
                            });
                        }*/
						
						if(result.department){
                            sublist.setSublistValue({
                                id: 'custpage_deparment',
                                line: j,
                                value: result.department
                            });
                        }

						
						if(result.description){
                            sublist.setSublistValue({
                                id: 'custpage_description',
                                line: j,
                                value: result.description
                            });
                        }

                        if(result.equipmentCode){
                            sublist.setSublistValue({
                            id: 'custpage_equipment_code',
                            line: j,
                            value: result.equipmentCode
                            });
                        }
                        
                        if(result.mainMode){
                            sublist.setSublistValue({
                                id: 'custpage_main_mode',
                                line: j,
                                value: result.mainMode
                            });
                        }

                        if(result.commodityCode){
                            sublist.setSublistValue({
                                id: 'custpage_commodity_code',
                                line: j,
                                value: result.commodityCode
                            });
                        }

						 if(result.customerName){
                            sublist.setSublistValue({
                                id: 'custpage_customer_name',
                                line: j,
                                value: result.customerName
                            });
                        }
						
                        if(result.pieces){
                            sublist.setSublistValue({
                                id: 'custpage_pieces',
                                line: j,
                                value: result.pieces
                            });
                        }

                        /*if(result.shipperReference){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_reference',
                                line: j,
                                value: result.shipperReference
                            });
                        }*/

                        if(result.paycode){
                            sublist.setSublistValue({
                                id: 'custpage_pay_code',
                                line: j,
                                value: result.paycode
                            });
                        }

                        if(result.createdDate){
                            sublist.setSublistValue({
                                id: 'custpage_date_and_time',
                                line: j,
                                value: result.createdDate
                            });
                        }

                        /*if(result.total){
                            sublist.setSublistValue({
                                id: 'custpage_total',
                                line: j,
                                value: result.Total
                            });
                        }*/

                        if(result.intNotes){
                            sublist.setSublistValue({
                                id: 'custpage_int_notes',
                                line: j,
                                value: result.intNotes
                            });
                        }
						
						if(result.customerperentity){
                            sublist.setSublistValue({
                                id: 'custpage_customer_per_entity',
                                line: j,
                                value: result.customerperentity
                            });
                        }

						
						if(result.commodityType){
                            sublist.setSublistValue({
                                id: 'custpage_commodity_type',
                                line: j,
                                value: result.commodityType
                            });
                        }

                        if(result.mode){
                            sublist.setSublistValue({
                            id: 'custpage_mode',
                            line: j,
                            value: result.mode
                            });
                        }

                        if(result.distanceMiles){
                            sublist.setSublistValue({
                                id: 'custpage_distance',
                                line: j,
                                value: result.distanceMiles
                            });
                        }

                        if(result.truckId){
                            sublist.setSublistValue({
                                id: 'custpage_truck_id',
                                line: j,
                                value: result.truckId
                            });
                        }

                        if(result.trailerId){
                            sublist.setSublistValue({
                                id: 'custpage_trailer_id',
                                line: j,
                                value: result.trailerId
                            });
                        }

                        if(result.driverId){
                            sublist.setSublistValue({
                                id: 'custpage_driver_id',
                                line: j,
                                value: result.driverId
                            });
                        }

                        if(result.shipperCompanyName){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_company_name',
                                line: j,
                                value: result.shipperCompanyName
                            });
                        }

                        if(result.consigneeCompanyName){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_company_name',
                                line: j,
                                value: result.consigneeCompanyName
                            });
                        }

                        if(result.ShipperAddress){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_address',
                                line: j,
                                value: result.ShipperAddress
                            });
                        }

                        if(result.ShipperAirportCode){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_airport_code',
                                line: j,
                                value: result.ShipperAirportCode
                            });
                        }

                        if(result.ShipperCitytown){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_city_town',
                                line: j,
                                value: result.ShipperCitytown
                            });
                        }

                        if(result.ShipperCompany){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_company',
                                line: j,
                                value: result.ShipperCompany
                            });
                        }

                        if(result.ShipperCountry){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_country',
                                line: j,
                                value: result.ShipperCountry
                            });
                        }

                        if(result.ShipperPostalCode){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_postal_code',
                                line: j,
                                value: result.ShipperPostalCode
                            });
                        }

                        if(result.ShipperStateregionprovince){
                            sublist.setSublistValue({
                                id: 'custpage_shipper_region_province',
                                line: j,
                                value: result.ShipperStateregionprovince
                            });
                        }

                        if(result.ConsigneeCompany){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_company',
                                line: j,
                                value: result.ConsigneeCompany
                            });
                        }
						
						if(result.ConsigneeAddress){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_address',
                                line: j,
                                value: result.ConsigneeAddress
                            });
                        }

                        if(result.ConsigneeAirportCode){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_airport_code',
                                line: j,
                                value: result.ConsigneeAirportCode
                            });
                        }

                        if(result.ConsigneeCitytown){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_city_town',
                                line: j,
                                value: result.ConsigneeCitytown
                            });
                        }

                        if(result.ConsigneeCountry){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_country',
                                line: j,
                                value: result.ConsigneeCountry
                            });
                        }

                        if(result.ConsigneePostalCode){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_postal_code',
                                line: j,
                                value: result.ConsigneePostalCode
                            });
                        }

                        if(result.ConsigneeStateregionprovince){
                            sublist.setSublistValue({
                                id: 'custpage_consignee_region_province',
                                line: j,
                                value: result.ConsigneeStateregionprovince
                            });
                        }

                        if(result.intelService){
                            sublist.setSublistValue({
                                id: 'custpage_intel_service',
                                line: j,
                                value: result.intelService
                            });
                        }

                        if(result.SCACCode){
                            sublist.setSublistValue({
                                id: 'custpage_scac_code',
                                line: j,
                                value: result.SCACCode
                            });
                        }

                        j++
                    });
                }
            //}  
                if (entity == 18 || entity == null) {
                    EntityF.defaultValue = 18;
                }
                else if(entity != 18){
                    EntityF.defaultValue = entity;
                }

                if (so) {
                    soBodyfield.defaultValue = so;
                }
                else{
                    soBodyfield.defaultValue = soArr;
                }

                if(srIds){
                    srIds = JSON.stringify(srIds);
                }
                else{
                    srIds = null;
                }

                if (ShipmentStatus) {
                    ShipmentStatusF.defaultValue = ShipmentStatus;
                    ShipmentStatus = JSON.stringify(ShipmentStatus);
                }
                else{
                    ShipmentStatus = null;
                }

                if (BilltoCode) {
                    billtoCodeF.defaultValue = BilltoCode;
                    BilltoCode = JSON.stringify(BilltoCode);
                }
                else{
                    BilltoCode = null;
                }

                if (CustomerAccountCode) {
                    CustomerAccountCodeF.defaultValue = CustomerAccountCode;
                    CustomerAccountCode = JSON.stringify(CustomerAccountCode);
                }
                else{
                    CustomerAccountCode = null;
                }

                if (HAWB) {
                    HAWBF.defaultValue = HAWB;
                    HAWB = JSON.stringify(HAWB);
                }
                else{
                    HAWB = null;
                }

                if (Origin) {
                    OriginF.defaultValue = Origin;
                    Origin = JSON.stringify(Origin);
                }
                else{
                    Origin = null;
                }

                if (Destinantion) {
                    DestinantionF.defaultValue = Destinantion;
                    Destinantion = JSON.stringify(Destinantion);
                }
                else{
                    Destinantion = null;
                }

                if (PickupDate) {
                    PickupDateF.defaultValue = PickupDate;
                    PickupDate = JSON.stringify(PickupDate);
                }
                else{
                    PickupDate = null;
                }

                if (DeliverDate) {
                    DeliverDateF.defaultValue = DeliverDate;
                    DeliverDate = JSON.stringify(DeliverDate);
                }
                else{
                    DeliverDate = null;
                }

                if (HAWBDate) {
                    HAWBDateF.defaultValue = HAWBDate;
                    HAWBDate = JSON.stringify(HAWBDate);
                }
                else{
                    HAWBDate = null;
                }

                if (Handover) {
                    HandoverF.defaultValue = Handover;
                    Handover = JSON.stringify(Handover);
                }
                else{
                    Handover = null;
                }

                if (ServiceLevel) {
                    ServiceLevelF.defaultValue = ServiceLevel;
                    ServiceLevel = JSON.stringify(ServiceLevel);
                }
                else{
                    ServiceLevel = null;
                }

                if (ShipperCompany) {
                    ShipperCompanyF.defaultValue = ShipperCompany;
                    ShipperCompany = JSON.stringify(ShipperCompany);
                }
                else{
                    ShipperCompany = null;
                }

                if (ShipperAddress) {
                    ShipperAddressF.defaultValue = ShipperAddress;
                    ShipperAddress = JSON.stringify(ShipperAddress);
                }
                else{
                    ShipperAddress = null;
                }

                if (ConsigneeCompany) {
                    ConsigneeCompanyF.defaultValue = ConsigneeCompany;
                    ConsigneeCompany = JSON.stringify(ConsigneeCompany);
                }
                else{
                    ConsigneeCompany = null;
                }

                if (ConsigneeAddress) {
                    ConsigneeAddressF.defaultValue = ConsigneeAddress;
                    ConsigneeAddress = JSON.stringify(ConsigneeAddress);
                }
                else{
                    ConsigneeAddress = null;
                }

                if (CommodityType) {
                    CommodityTypeF.defaultValue = CommodityType;
                    CommodityType = JSON.stringify(CommodityType);
                }
                else{
                    CommodityType = null;
                }

                if (Mode) {
                    ModeF.defaultValue = Mode;
                    Mode = JSON.stringify(Mode);
                }
                else{
                    Mode = null;
                }

                if (Zone) {
                    ZoneF.defaultValue = Zone;
                    Zone = JSON.stringify(Zone);
                }
                else{
                    Zone = null;
                }

                if (Program) {
                    ProgramF.defaultValue = Program;
                    Program = JSON.stringify(Program);
                }
                else{
                    Program = null;
                }

                if (Distance) {
                    DistanceF.defaultValue = Distance;
                    Distance = JSON.stringify(Distance);
                }
                else{
                    Distance = null;
                }

                if (TruckId) {
                    TruckIdF.defaultValue = TruckId;
                    TruckId = JSON.stringify(TruckId);
                }
                else{
                    TruckId = null;
                }

                if (Control) {
                    ControlF.defaultValue = Control;
                    Control = JSON.stringify(Control);
                }
                else{
                    Control = null;
                }

                if (EquipmentCode) {
                    EquipmentCodeF.defaultValue = EquipmentCode;
                    EquipmentCode = JSON.stringify(EquipmentCode);
                }
                else{
                    EquipmentCode = null;
                }

                if (Status) {
                    StatusF.defaultValue = Status;
                    Status = JSON.stringify(Status);
                }
                else{
                    Status = null;
                }

                if (invdate) {
                    invDateF.defaultValue = invdate;
                    invdate = JSON.stringify(invdate);
                }
                else{
                    invdate = null;
                }

                if (datecreated) {
                    dateCreatedF.defaultValue = datecreated;
                    datecreated = JSON.stringify(datecreated);
                }
                else{
                    datecreated = null;
                }

               
                form.addButton({
                    id : 'custpage_submit',
                    label : 'Approve',
                    functionName : 'saveRecord_sr_to_inv()'
                })

                //log.debug('params',  entity + ', ' + srIds + ', ' + ShipmentStatus + ', ' +BilltoCode + ', ' + CustomerAccountCode + ',' + HAWB + ',' + Origin + ',' + Destinantion + ',' + PickupDate + ',' +DeliverDate + ',' +HAWBDate + ',' +Handover + ',' +ServiceLevel + ',' +ShipperCompany + ',' +ShipperAddress + ',' + ConsigneeCompany + ',' + ConsigneeAddress + ',' + CommodityType + ',' +Mode + ',' + Zone + ',' + Program + ',' + Distance + ',' + TruckId + ',' + Control + ',' + EquipmentCode + ',' + Status + ',' + PAGE_SIZE)
                form.addButton({                    id : 'custpage_csv',
                    label : 'Export CSV',
                    functionName : 'exportCSV(' + entity + ', ' + srIds + ', ' + ShipmentStatus + ', ' +BilltoCode + ', ' + CustomerAccountCode + ',' + HAWB + ',' + Origin + ',' + Destinantion + ',' + PickupDate + ',' +DeliverDate + ',' +HAWBDate + ',' +Handover + ',' +ServiceLevel + ',' +ShipperCompany + ',' +ShipperAddress + ',' + ConsigneeCompany + ',' + ConsigneeAddress + ',' + CommodityType + ',' +Mode + ',' + Zone + ',' + Program + ',' + Distance + ',' + TruckId + ',' + Control + ',' + EquipmentCode + ',' + Status + ',' + invdate + ',' + datecreated + ',' +PAGE_SIZE +')'
                });
        
                form.addButton({
                    id : 'custpage_reject',
                    label : 'Reject',
                    functionName : 'rejectSR()'
                });

                form.addButton({
                    id : 'custpage_search',
                    label : 'Search',
                    functionName : 'getSuiteletPage()'
                });

                form.addButton({
                    id : 'custpage_autorate',
                    label : 'Auto-Rate',
                    functionName : 'autoRate()'
                })

                var submitButton = form.addSubmitButton({
                    label : 'Refresh'
                })

                context.response.writePage({
                    pageObject: form
                });
        }
        else if (context.request.method === 'POST') {
            log.debug("Suitelet is posting.")
            var myUser = runtime.getCurrentUser();
            //Ownership setting
            /*var SRlineCount = context.request.getLineCount({
                group: 'custpage_shipment_list'
            });
            
            log.debug('SRlineCount',SRlineCount)

            var so = context.request.parameters.custpage_sales_order;
            log.debug('so',so)
            if(so){
                var soIdsVal = so.split('');
            }
            else{
                var soIdsVal = new Array();
            }

            log.debug('soIdsVal',soIdsVal)
            log.debug('soIdsVal lenght',soIdsVal.length)

            for(var i = 0; i<SRlineCount; i++){
                var isMark =  context.request.getSublistValue({
                    group: 'custpage_shipment_list',
                    name: 'custpage_shipment_mark',
                    line: i
                });
                
                var srID =  context.request.getSublistValue({
                    group: 'custpage_shipment_list',
                    name: 'custpage_sr_id',
                    line: i
                });

                var srRec = search.lookupFields({
                    type: search.Type.SALES_ORDER,
                    id: srID,
                    columns: ['tranid','custbody_owned_by_sa']
                });

                //log.debug('srRec.custbody_owned_by_sa',srRec.custbody_owned_by_sa)

                var ownerID =  context.request.getSublistValue({
                    group: 'custpage_shipment_list',
                    name: 'custpage_owner_id',
                    line: i
                });

                if(srRec.custbody_owned_by_sa.length == 0){
                    if(isMark == 'T'){
                        var soRec = record.submitFields({
                            type: record.Type.SALES_ORDER,
                            id: srID,
                            values: {
                                custbody_owned_by_sa: myUser.id
                            }
                        });

                        var soExist = 0;
                        soIdsVal.push(srID);                        
                    }
                }
                else{
                    if(isMark == 'T' && srRec.custbody_owned_by_sa[0].value != myUser.id){
                        //log.debug('Else If')
                    }
                    else if(isMark == 'F' && srRec.custbody_owned_by_sa[0].value == myUser.id){
                        var soRec = record.submitFields({
                            type: record.Type.SALES_ORDER,
                            id: srID,
                            values: {
                                custbody_owned_by_sa: null
                            }
                        });
                        
                        var soExist = 0;

                        var indexOfSO = soIdsVal.indexOf(srID);
                        log.debug('indexOfSO',indexOfSO)
                        if(indexOfSO >= 0){
                            soIdsVal.splice(indexOfSO,1);
                            //log.debug('SO lenght',soIdsVal.length)
                            //log.debug('Here else if for if',soIdsVal)
                        }
                        else{
                            soIdsVal.push(soIdsVal[i]);
                            //log.debug('Here else if for else',soIdsVal)
                        }
                    }
                }
            }

            var soPost = soIdsVal.join(',')*/
            //Params Setting in Referesh
            var entity = context.request.parameters.custpage_form_entity;   
            var so = context.request.parameters.custpage_sales_order;
            var ShipmentStatus = context.request.parameters.custpage_form_shipmentstatus;
            var BilltoCode = context.request.parameters.custpage_form_billtocode;
            var CustomerAccountCode = context.request.parameters.custpage_form_customeraccountcode;
            var HAWB = context.request.parameters.custpage_form_hawb_filter;
            var Origin = context.request.parameters.custpage_form_origin;   
            var Destination = context.request.parameters.custpage_form_destinantion;
            var PickupDate = context.request.parameters.custpage_form_pickupdate;
            var DeliverDate = context.request.parameters.custpage_form_deliver_date;
            var HAWBDate = context.request.parameters.custpage_form_hawbdate;

            var Handover = context.request.parameters.custpage_form_handover;   
            var ServiceLevel = context.request.parameters.custpage_form_servicelevel;
            var ShipperCompany = context.request.parameters.custpage_form_shippercompany;
            var ShipperAddress = context.request.parameters.custpage_form_shipperaddress;
            var ConsigneeCompany = context.request.parameters.custpage_form_consigneecompany;
            var ConsigneeAddress = context.request.parameters.custpage_form_consigneeaddress;   
            var CommodityType = context.request.parameters.custpage_form_commoditytype;
            var Mode = context.request.parameters.custpage_form_mode;
            var Zone = context.request.parameters.custpage_form_zone;
            var Program = context.request.parameters.custpage_form_program;
            var Distance = context.request.parameters.custpage_form_distance;
            var TruckId = context.request.parameters.custpage_form_truckid;
            var Control = context.request.parameters.custpage_form_control;   
            var EquipmentCode = context.request.parameters.custpage_form_equipment_code;
            var Status = context.request.parameters.custpage_form_status;
            var invdate = context.request.parameters.custpage_form_invoice_date;
            var datecreated = context.request.parameters.custpage_form_date_created;

            var suiteletURL = url.resolveScript({
                scriptId: 'customscript_sr_to_invoice_approval',
                deploymentId: 'customdeploy_sr_to_invoice_approval',
                params: {
                    entity : entity,
                    so : so,
                    ShipmentStatus : ShipmentStatus,
                    BilltoCode : BilltoCode,
                    CustomerAccountCode : CustomerAccountCode,
                    HAWB : HAWB,
                    Origin : Origin,
                    Destination : Destination,
                    PickupDate : PickupDate,
                    DeliverDate : DeliverDate,
                    HAWBDate : HAWBDate,
                    Handover : Handover,
                    ServiceLevel : ServiceLevel,
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
                    Status : Status,
                    invdate : invdate,
                    datecreated : datecreated 
                }
            });
            redirect.redirect({ url: suiteletURL });
        }
        }

        return {
            onRequest : onRequest
        };

        function runSearchVendorInv(vendorId, hawbVal){
            //var vendorbillSearchColCompanyName = search.createColumn({ name: 'companyname', join: 'vendor' });
            var vendorbillSearchColAmountForeignCurrency = search.createColumn({ name: 'fxamount', summary: search.Summary.SUM });
            var vendorbillSearch = search.create({
            type: 'vendorbill',
            filters: [
                ['type', 'anyof', 'VendBill'],
                'AND',
                ['line.cseg_hawborig', 'anyof', hawbVal],
                'AND',
                ['name', 'anyof', vendorId],
            ],
            columns: [
                //vendorbillSearchColCompanyName,
                vendorbillSearchColAmountForeignCurrency,
            ],
            });
    
            return vendorbillSearch.runPaged({
                pageSize : 5
            });
        }

        function fetchVendorSearchResult(pagedData) {
            var vendorResults = new Array();

            var searchPage = pagedData.fetch({
                    index : 0
            });

            searchPage.data.forEach(function (result) {
                var vendorCost = result.getValue({name: 'fxamount', summary: "SUM"});
                //log.debug('vendorCost',vendorCost)
    
                vendorResults.push({
                    "vendorCost": vendorCost
                })
            })

            return vendorResults;
                // Continue processing the next page of search results
        }

        function runSearch(entity, srIds, ShipmentStatus, BilltoCode, CustomerAccountCode, HAWB, Origin, Dest, PickupDate, DeliverDate, HAWBDate, Handover, ServiceLevel, ShipperCompany, ShipperAddress, ConsigneeCompany, ConsigneeAddress, CommodityType, Mode, Zone, Program, Distance, TruckId, Control, EquipmentCode, Status, invdate, datecreated, searchPageSize) {
           
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
                    if(!ShipmentStatus && !BilltoCode && !CustomerAccountCode && !HAWB && !Origin && !Dest && !PickupDate && !DeliverDate && !HAWBDate && !Handover && !ServiceLevel && !ShipperCompany && !ShipperAddress && !ConsigneeCompany && !ConsigneeAddress && !CommodityType && !Mode && !Zone&& !Program && !Distance && !TruckId && !Control && !EquipmentCode && !Status && !invdate && !datecreated){
                        salesorderSearchColFilter.push('AND')
                        salesorderSearchColFilter.push(['custbody_sr_approvalstatus', 'anyof', '1'])
                        salesorderSearchColFilter.push('AND')
                        salesorderSearchColFilter.push(['status', 'anyof', 'SalesOrd:A', 'SalesOrd:F'])
                        salesorderSearchColFilter.push('AND')
                        salesorderSearchColFilter.push(['custbody_invoice', 'is', 'F'])
                    }
                    else{
                        if(ShipmentStatus){
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
                        }
                       
        
                        if(BilltoCode){
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
                        }
        
                        if(CustomerAccountCode){
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
                        }
            
                        if(HAWB){
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
                        }
            
                        if(Origin){
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
                        }
            
                        if(Dest){
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
                        }
                    
                        if(PickupDate){
                            var PickupDateArrSet = PickupDate.split("-")
                        
                            //for(var x = 0; x<PickupDateArrSet.length;x++){
                                salesorderSearchColFilter.push('AND')
                                salesorderSearchColFilter.push(['custbody_pickupdate', 'within', PickupDateArrSet])
                               
                            //}    
                        }
            
                        if(DeliverDate){
                            var DeliverDateArrSet = DeliverDate.split("-")
                        
                            //for(var x = 0; x<DeliverDateArrSet.length;x++){
                                salesorderSearchColFilter.push('AND')
                                salesorderSearchColFilter.push(['custbody_deliverdate', 'within', DeliverDateArrSet])
                            //}
                        }
            
                        if(HAWBDate){
                            var HAWBDateArrSet = HAWBDate.split("-")
                        
                            //for(var x = 0; x<HAWBDateArrSet.length;x++){
                            salesorderSearchColFilter.push('AND')
                            salesorderSearchColFilter.push(['trandate', 'within', HAWBDateArrSet])
                            //}
                        }

                        if(invdate){
                            var InvDateArrSet = invdate.split("-")
                            log.debug('InvDateArrSet',InvDateArrSet)
                            //for(var x = 0; x<HAWBDateArrSet.length;x++){
                            salesorderSearchColFilter.push('AND')
                            salesorderSearchColFilter.push(['custbody_inv_posting_date', 'within', InvDateArrSet])
                            //}
                        }

                        if(datecreated){
                            var dateCreateArrSet = datecreated.split("-")
                            log.debug('dateCreateArrSet',dateCreateArrSet)
                            //for(var x = 0; x<HAWBDateArrSet.length;x++){
                            salesorderSearchColFilter.push('AND')
                            salesorderSearchColFilter.push(['datecreated', 'within', dateCreateArrSet])
                            //}
                        }
            
                        if(Handover){
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
                        }
            
                        if(ServiceLevel){
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
                                
                        }

                        if(ShipperCompany){
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
                        }

                        if(ShipperAddress){
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
                        }

                        if(ConsigneeCompany){
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
                        }

                        if(ConsigneeAddress){
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
                        }

                        if(CommodityType){
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
                        }

                        if(Mode){
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
                        }

                        if(Zone){
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
                        }

                        if(Program){
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
                        }

                        if(Distance){
                            var DistanceArrSet = Distance.split("-")
                            
                        
                            //for(var x = 0; x<HAWBDateArrSet.length;x++){
                            salesorderSearchColFilter.push('AND')
                            salesorderSearchColFilter.push(['custbody_distance_in_miles', 'between', DistanceArrSet])
                         }

                         if(TruckId){
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
                        }

                        if(Control){
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
                        }

                        if(EquipmentCode){
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
                        }

                        if(Status){
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
                
                        }
                    }
                }
            
            var salesorderSearchColCustomer = search.createColumn({ name: 'entity' });
            var salesorderSearchColInvoice = search.createColumn({ name: 'custbody_invoice' });
            var salesorderSearchColOwned = search.createColumn({ name: 'custbody_owned_by_sa' });
            var salesorderSearchColFreight = search.createColumn({ name: 'custbody_freight' });
            var salesorderSearchColStatus =  search.createColumn({ name: 'custbody_shipmentstatus' });
            var salesorderSearchBodyStatus =  search.createColumn({ name: 'custbody_sr_approvalstatus' });
            var salesorderSearchSStatus = search.createColumn({ name: 'statusref' });
            var salesorderSearchColBillToAccount = search.createColumn({ name: 'custbody_billtoaccount' });
            var salesorderSearchColDocumentNumber = search.createColumn({ name: 'tranid' });
            var salesorderSearchColTmsCustAccount = search.createColumn({ name: 'custbody_tmscustaccount' });
            var salesorderSearchColHawb = search.createColumn({ name: 'cseg_hawborig' });
            var salesorderSearchColHawbdate = search.createColumn({ name: 'trandate' });
            var salesorderSearchColInvPostDate = search.createColumn({ name: 'custbody_inv_posting_date' });
            var salesorderSearchColOrigin = search.createColumn({ name: 'custbody_origin' });
            var salesorderSearchColDestination = search.createColumn({ name: 'custbody_destination' });
            var salesorderSearchColPickupDate = search.createColumn({ name: 'custbody_pickupdate' });
            var salesorderSearchColDeliverDate = search.createColumn({ name: 'custbody_deliverdate' });
            var salesorderSearchColPickupTime = search.createColumn({ name: 'custbody_pickuptime' });
            var salesorderSearchColDeliveryTime = search.createColumn({ name: 'custbody_deliverytime' });
            var salesorderSearchColPickupWaitTime = search.createColumn({ name: 'custbody_pickupwaittime' });
            var salesorderSearchColDeliverWaitTime = search.createColumn({ name: 'custbody_deliverywaittime' });
            var salesorderSearchColVendors = search.createColumn({ name: 'custbody_hawb_vendor'});
            var salesorderSearchColMawb = search.createColumn({ name: 'cseg_handover3'});
            var salesorderSearchColDimFactor = search.createColumn({ name: 'custbody_dimfactor' });
            var salesorderSearchColServiceLevel = search.createColumn({ name: 'custbody_servicelevel' });
            var salesorderSearchColActualWeight = search.createColumn({ name: 'custbody_actualweight' });
            var salesorderSearchColDimWeight = search.createColumn({ name: 'custbody_dim_weight' });
            var salesorderSearchColWeightUnit = search.createColumn({ name: 'custbody_weightunit' });
            var salesorderSearchColDueTime = search.createColumn({ name: 'custbody_duetime' });
            var salesorderSearchColPallets = search.createColumn({ name: 'custbody_pallets' });
            var salesorderSearchColShippingAddress = search.createColumn({ name: 'custbody_shippingaddress' });
            var salesorderSearchColConsignmentAddress = search.createColumn({ name: 'custbody_consignmentaddress' });
            var salesorderSearchColDepartment = search.createColumn({ name: 'department' });
            var salesorderSearchColDescription = search.createColumn({ name: 'custbody_smk_number' });
            var salesorderSearchColEquipmentCode = search.createColumn({ name: 'custbody_equipment_code' });
            var salesorderSearchColMainMode = search.createColumn({ name: 'custbody_main_mode' });
            var salesorderSearchColCommodityCode = search.createColumn({ name: 'custbody_commodity_code' });
            var salesorderSearchColCustomerName = search.createColumn({ name: 'custbody_customername' });
            var salesorderSearchColPieces = search.createColumn({ name: 'custbody_pieces' });
            var salesorderSearchColShipperReference = search.createColumn({ name: 'custbody_shipperreference' });
            var salesorderSearchColPaycode = search.createColumn({ name: 'custbody_paycode' });
            var salesorderSearchColCreatedDateAndTime = search.createColumn({ name: 'datecreated' });
            var salesorderSearchColIntNotes = search.createColumn({ name: 'custbody_intnotes' });
            var salesorderSearchColCustbodyCustomername = search.createColumn({ name: 'custbody_customername' });
            var salesorderSearchColCommodityType = search.createColumn({ name: 'custbody_commodity_type' });
            var salesorderSearchColMode = search.createColumn({ name: 'custbody_mode' });
            var salesorderSearchColZone = search.createColumn({ name: 'custbody_zone' });
            var salesorderSearchColProgram = search.createColumn({ name: 'custbody_program' });
            var salesorderSearchColDistanceInMiles = search.createColumn({ name: 'custbody_distance_in_miles' });
            var salesorderSearchColTruckId = search.createColumn({ name: 'custbody_truck_id' });
            var salesorderSearchColTrailerId = search.createColumn({ name: 'custbody_trailer_id' });
            var salesorderSearchColDriverId = search.createColumn({ name: 'custbody_driver_id' });
            var salesorderSearchColMainShipperCompanyName = search.createColumn({ name: 'custbody_main_shipper_company_name' });
            var salesorderSearchColMainConsigneeCompanyName = search.createColumn({ name: 'custbody_main_consignee_company_name' });
            var salesorderSearchColShipperAddress = search.createColumn({ name: 'custbody_shipper_address' });
            var salesorderSearchColShipperAirportCode = search.createColumn({ name: 'custbody_shipper_airport_code' });
            var salesorderSearchColShipperCitytown = search.createColumn({ name: 'custbody_shipper_city_town' });
            var salesorderSearchColShipperCompany = search.createColumn({ name: 'custbody_shipper_company' });
            var salesorderSearchColShipperCountry = search.createColumn({ name: 'custbody_shipper_country' });
            var salesorderSearchColShipperPostalCode = search.createColumn({ name: 'custbody_shipper_postal_code' });
            var salesorderSearchColShipperStateregionprovince = search.createColumn({ name: 'custbody_shipper_state_region_province' });
            var salesorderSearchColConsigneeAddress = search.createColumn({ name: 'custbody_consignee_address' });
            var salesorderSearchColConsigneeCompany = search.createColumn({ name: 'custbody_consignee_company' });
            var salesorderSearchColConsigneeAirportCode = search.createColumn({ name: 'custbody_consignee_airport_code' });
            var salesorderSearchColConsigneeCitytown = search.createColumn({ name: 'custbody_consignee_city_town' });
            var salesorderSearchColConsigneeCountry = search.createColumn({ name: 'custbody_consignee_country' });
            var salesorderSearchColConsigneePostalCode = search.createColumn({ name: 'custbody_consignee_postal_code' });
            var salesorderSearchColConsigneeStateregionprovince = search.createColumn({ name: 'custbody_consignee_state_region_provin' });
            var salesorderSearchColIntelService = search.createColumn({ name: 'custbody_intel_sc' });
            var salesorderSearchColSCACCode = search.createColumn({ name: 'custbody_scac_code' });
            var salesorderSearchColtotal = search.createColumn({ name: 'custbody_sr_total' });
            //log.debug('salesorderSearchColFilter',salesorderSearchColFilter)
            var salesorderSearch = search.create({
              type: 'salesorder',
              filters: salesorderSearchColFilter,
              columns: [
                salesorderSearchColCustomer,
                salesorderSearchColInvoice,
                salesorderSearchColOwned,
                salesorderSearchColFreight,
                salesorderSearchColStatus,
                salesorderSearchBodyStatus,
                salesorderSearchSStatus,
                salesorderSearchColBillToAccount,
                salesorderSearchColDocumentNumber,
                salesorderSearchColTmsCustAccount,
                salesorderSearchColHawb,
                salesorderSearchColHawbdate,
                salesorderSearchColInvPostDate,
                salesorderSearchColOrigin,
                salesorderSearchColDestination,
                salesorderSearchColPickupDate,
                salesorderSearchColDeliverDate,
                salesorderSearchColPickupTime,
                salesorderSearchColDeliveryTime,
                salesorderSearchColPickupWaitTime,
                salesorderSearchColDeliverWaitTime,
                salesorderSearchColVendors,
                salesorderSearchColMawb,
                salesorderSearchColDimFactor,
                salesorderSearchColServiceLevel,
                salesorderSearchColActualWeight,
                salesorderSearchColDimWeight,
                salesorderSearchColWeightUnit,
                salesorderSearchColDueTime,
                salesorderSearchColPallets,
                salesorderSearchColShippingAddress,
                salesorderSearchColConsignmentAddress,
                salesorderSearchColDepartment,
                salesorderSearchColDescription,
                salesorderSearchColEquipmentCode,
                salesorderSearchColMainMode,
                salesorderSearchColCommodityCode,
                salesorderSearchColCustomerName,
                salesorderSearchColPieces,
                salesorderSearchColShipperReference,
                salesorderSearchColPaycode,
                salesorderSearchColCreatedDateAndTime,
                salesorderSearchColIntNotes,
                salesorderSearchColCustbodyCustomername,
                salesorderSearchColCommodityType,
                salesorderSearchColMode,
                salesorderSearchColZone,
                salesorderSearchColProgram,
                salesorderSearchColDistanceInMiles,
                salesorderSearchColTruckId,
                salesorderSearchColTrailerId,
                salesorderSearchColDriverId,
                salesorderSearchColMainShipperCompanyName,
                salesorderSearchColMainConsigneeCompanyName,
                salesorderSearchColShipperAddress,
                salesorderSearchColConsigneeCompany,
                salesorderSearchColShipperAirportCode,
                salesorderSearchColShipperCitytown,
                salesorderSearchColShipperCompany,
                salesorderSearchColShipperCountry,
                salesorderSearchColShipperPostalCode,
                salesorderSearchColShipperStateregionprovince,
                salesorderSearchColConsigneeAddress,
                salesorderSearchColConsigneeAirportCode, 
                salesorderSearchColConsigneeCitytown,
                salesorderSearchColConsigneeCountry,
                salesorderSearchColConsigneePostalCode,
                salesorderSearchColConsigneeStateregionprovince,
                salesorderSearchColIntelService,
                salesorderSearchColSCACCode,
                salesorderSearchColtotal
              ],
            });

            return salesorderSearch.runPaged({
                pageSize : searchPageSize
            });
        }

        function fetchSearchResult(pagedData, pageIndex) {
            var srResults = new Array();
            var searchPage = pagedData.fetch({
                    index : pageIndex
            });

            searchPage.data.forEach(function (result) {
                var internalId = result.id;
                var salesorderSearchColCustomer = result.getText({ name: 'entity' });
                var salesorderSearchColInvoice = result.getValue({ name: 'custbody_invoice' });
                var salesorderSearchColOwned = result.getText({ name: 'custbody_owned_by_sa' });
                var salesorderSearchColOwnedId = result.getValue({ name: 'custbody_owned_by_sa' });
                var salesorderSearchColFreight = result.getValue({ name: 'custbody_freight' });
                var salesorderSearchColStatus = result.getText({ name: 'custbody_shipmentstatus'});
                var salesorderSearchBodyStatus =  result.getText({ name: 'custbody_sr_approvalstatus' });
                var salesorderSearchSStatus = result.getText({ name: 'statusref' });
                var salesorderSearchColBillToAccount = result.getText({ name: 'custbody_billtoaccount' });
                var salesorderSearchColDocumentNumber = result.getValue({ name: 'tranid' });
                var salesorderSearchColTmsCustAccount = result.getText({ name: 'custbody_tmscustaccount' });
                var salesorderSearchColHawb = result.getText({ name: 'cseg_hawborig' });
                var salesorderSearchColHawbId = result.getValue({ name: 'cseg_hawborig' });
                var salesorderSearchColHawbdate = result.getValue({ name: 'trandate' });
                var salesorderSearchColInvPostDate = result.getValue({ name: 'custbody_inv_posting_date' });
                var salesorderSearchColOrigin = result.getText({ name: 'custbody_origin' });
                var salesorderSearchColDestination = result.getText({ name: 'custbody_destination' });
                var salesorderSearchColPickupDate = result.getValue({ name: 'custbody_pickupdate' });
                var salesorderSearchColDeliverDate = result.getValue({ name: 'custbody_deliverdate' });
                var salesorderSearchColPickupTime = result.getValue({ name: 'custbody_pickuptime' });
                var salesorderSearchColDeliveryTime = result.getValue({ name: 'custbody_deliverytime' });
                var salesorderSearchColPickupWaitTime = result.getValue({ name: 'custbody_pickupwaittime' });
                var salesorderSearchColDeliverWaitTime = result.getValue({ name: 'custbody_deliverywaittime' });
                var salesorderSearchColVendor = result.getValue({ name: 'custbody_hawb_vendor'});
                var salesorderSearchColMawb = result.getText({ name: 'cseg_handover3'});
                var salesorderSearchColDimFactor = result.getValue({ name: 'custbody_dimfactor' });
                var salesorderSearchColServiceLevel = result.getText({ name: 'custbody_servicelevel' });
                var salesorderSearchColActualWeight = result.getValue({ name: 'custbody_actualweight' });
                var salesorderSearchColDimWeight = result.getValue({ name: 'custbody_dim_weight' });
                var salesorderSearchColWeightUnit = result.getText({ name: 'custbody_weightunit' });
                var salesorderSearchColDueTime = result.getValue({ name: 'custbody_duetime' });
                var salesorderSearchColPallets = result.getValue({ name: 'custbody_pallets' });
                var salesorderSearchColShippingAddress = result.getValue({ name: 'custbody_shippingaddress' });
                var salesorderSearchColConsignmentAddress = result.getValue({ name: 'custbody_consignmentaddress' });
                var salesorderSearchColDepartment = result.getText({ name: 'department' });
                var salesorderSearchColDescription = result.getValue({ name: 'custbody_description' });
                var salesorderSearchColEquipmentCode = result.getValue({ name: 'custbody_equipment_code' });
                var salesorderSearchColMainMode = result.getValue({ name: 'custbody_main_mode' });
                var salesorderSearchColCommodityCode = result.getValue({ name: 'custbody_commodity_code' });
                var salesorderSearchColCustomerName = result.getText({ name: 'custbody_customername' });
                var salesorderSearchColPieces = result.getValue({ name: 'custbody_pieces' });
                var salesorderSearchColShipperReference = result.getValue({ name: 'custbody_shipperreference' });
                var salesorderSearchColPaycode = result.getText({ name: 'custbody_paycode' });
                var salesorderSearchColCreatedDateAndTime = result.getValue({ name: 'datecreated' });     
                var salesorderSearchColIntNotes = result.getValue({ name: 'custbody_intnotes' });
                var salesorderSearchColCustbodyCustomername = result.getText({ name: 'custbody_customername' });
                var salesorderSearchColCommodityType = result.getValue({ name: 'custbody_commodity_type' });
                var salesorderSearchColMode = result.getText({ name: 'custbody_mode' });
                var salesorderSearchColZone = result.getText({ name: 'custbody_zone' });
                var salesorderSearchColProgram = result.getText({ name: 'custbody_program' });
                var salesorderSearchColDistanceInMiles = result.getValue({ name: 'custbody_distance_in_miles' });
                var salesorderSearchColTruckId = result.getValue({ name: 'custbody_truck_id' });
                var salesorderSearchColTrailerId = result.getValue({ name: 'custbody_trailer_id' });
                var salesorderSearchColDriverId = result.getValue({ name: 'custbody_driver_id' });
                var salesorderSearchColMainShipperCompanyName = result.getValue({ name: 'custbody_main_shipper_company_name' });
                var salesorderSearchColMainConsigneeCompanyName = result.getValue({ name: 'custbody_main_consignee_company_name' });
                var salesorderSearchColShipperAddress = result.getValue({ name: 'custbody_shipper_address' });
                var salesorderSearchColShipperAirportCode = result.getValue({ name: 'custbody_shipper_airport_code' });
                var salesorderSearchColShipperCitytown = result.getValue({ name: 'custbody_shipper_city_town' });
                var salesorderSearchColShipperCompany = result.getValue({ name: 'custbody_shipper_company' });
                var salesorderSearchColShipperCountry = result.getValue({ name: 'custbody_shipper_country' });
                var salesorderSearchColShipperPostalCode = result.getValue({ name: 'custbody_shipper_postal_code' });
                var salesorderSearchColShipperStateregionprovince = result.getValue({ name: 'custbody_shipper_state_region_province' });
                var salesorderSearchColConsigneeAddress = result.getValue({ name: 'custbody_consignee_address' });
                var salesorderSearchColConsigneeCompany = result.getValue({ name: 'custbody_consignee_company' });
                var salesorderSearchColConsigneeAirportCode = result.getValue({ name: 'custbody_consignee_airport_code' });
                var salesorderSearchColConsigneeCitytown = result.getValue({ name: 'custbody_consignee_city_town' });
                var salesorderSearchColConsigneeCountry = result.getValue({ name: 'custbody_consignee_country' });
                var salesorderSearchColConsigneePostalCode = result.getValue({ name: 'custbody_consignee_postal_code' });
                var salesorderSearchColConsigneeStateregionprovince = result.getValue({ name: 'custbody_consignee_state_region_provin' });
                var salesorderSearchColIntelService = result.getValue({ name: 'custbody_intel_sc' });
                var salesorderSearchColSCACCode = result.getValue({ name: 'custbody_scac_code' });
                var salesorderSearchColTotal = result.getValue({ name: 'custbody_sr_total' });
                srResults.push({
                    "id": internalId,
                    "customerperentity": salesorderSearchColCustomer,
                     "isInv": salesorderSearchColInvoice,
                     "owned": salesorderSearchColOwned,
                     "ownedId": salesorderSearchColOwnedId,
                     "freight": salesorderSearchColFreight,
					 "status": salesorderSearchColStatus,
                     "srstatus": salesorderSearchBodyStatus,
                     "sstatus": salesorderSearchSStatus,
					 "billAcc": salesorderSearchColBillToAccount, 
					 "docNum": salesorderSearchColDocumentNumber, 
					 "custAcc": salesorderSearchColTmsCustAccount,
                     "hawbId": salesorderSearchColHawbId, 
					 "hawb": salesorderSearchColHawb,
                     "hawbdate": salesorderSearchColHawbdate,
                     "invPostDate": salesorderSearchColInvPostDate,
					 "origin": salesorderSearchColOrigin, 
					 "dest": salesorderSearchColDestination,
					 "pickupDate": salesorderSearchColPickupDate,
					 "deliverDate": salesorderSearchColDeliverDate,
					 "pickupTime": salesorderSearchColPickupTime, 
					 "deliveryTime": salesorderSearchColDeliveryTime,
					 "pickUpwaitTime": salesorderSearchColPickupWaitTime, 
					 "deliverywaitTime": salesorderSearchColDeliverWaitTime,
                     "vendors": salesorderSearchColVendor, 
					 "mawb": salesorderSearchColMawb,
					 "dimFactor": salesorderSearchColDimFactor,
					 "serviceLevel": salesorderSearchColServiceLevel,
					 "actualWeight": salesorderSearchColActualWeight,
					 "dimWeight": salesorderSearchColDimWeight,
					 "weightUnit": salesorderSearchColWeightUnit,
					 "dueTime": salesorderSearchColDueTime,
					 "pallets": salesorderSearchColPallets,
					 "shippingAddress": salesorderSearchColShippingAddress,
					 "consignmentAssignment": salesorderSearchColConsignmentAddress,
					 "department": salesorderSearchColDepartment,
					 "description": salesorderSearchColDescription,
					 "equipmentCode": salesorderSearchColEquipmentCode,
					 "mainMode": salesorderSearchColMainMode,
					 "commodityCode": salesorderSearchColCommodityCode,
					 "customerName": salesorderSearchColCustomerName,
					 "pieces": salesorderSearchColPieces,
					 "shipperReference": salesorderSearchColShipperReference,
					 "paycode": salesorderSearchColPaycode,
					 "createdDate": salesorderSearchColCreatedDateAndTime,
					 "intNotes": salesorderSearchColIntNotes,
					 "customer": salesorderSearchColCustbodyCustomername,
					 "commodityType": salesorderSearchColCommodityType,
					 "mode": salesorderSearchColMode,
					 "zone": salesorderSearchColZone,
					 "program": salesorderSearchColProgram,
					 "distanceMiles": salesorderSearchColDistanceInMiles,
					 "truckId": salesorderSearchColTruckId,
					 "trailerId": salesorderSearchColTrailerId,
					 "driverId": salesorderSearchColDriverId,
					 "shipperCompanyName":salesorderSearchColMainShipperCompanyName,
					 "consigneeCompanyName":salesorderSearchColMainConsigneeCompanyName,
                     "ShipperAddress":salesorderSearchColShipperAddress,
                     "ShipperAirportCode":salesorderSearchColShipperAirportCode,
                     "ShipperCitytown":salesorderSearchColShipperCitytown,
                     "ShipperCompany":salesorderSearchColShipperCompany,
                     "ShipperCountry":salesorderSearchColShipperCountry,
                     "ShipperPostalCode":salesorderSearchColShipperPostalCode, 
                     "ShipperStateregionprovince":salesorderSearchColShipperStateregionprovince,
                     "ConsigneeAddress": salesorderSearchColConsigneeAddress,
                     "ConsigneeCompany": salesorderSearchColConsigneeCompany,
                     "ConsigneeAirportCode": salesorderSearchColConsigneeAirportCode, 
                     "ConsigneeCitytown": salesorderSearchColConsigneeCitytown,
                     "ConsigneeCountry": salesorderSearchColConsigneeCountry,
                     "ConsigneePostalCode": salesorderSearchColConsigneePostalCode,
                     "ConsigneeStateregionprovince": salesorderSearchColConsigneeStateregionprovince,
                     "intelService": salesorderSearchColIntelService,
                     "SCACCode" : salesorderSearchColSCACCode,
                     "Total" : salesorderSearchColTotal
                })
            })
            return srResults;
                // Continue processing the next page of search results
        }

    });
    