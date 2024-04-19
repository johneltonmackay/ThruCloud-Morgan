    /**
     * @NApiVersion 2.1
     * @NScriptType Suitelet
     * @NModuleScope SameAccount
     */
    var PAGE_SIZE = 1000;


    define(['N/search', 'N/ui/serverWidget', 'N/url', 'N/redirect', 'N/record', 'N/format', 'N/https','N/runtime'], function(search, serverWidget, url, redirect, record, format, https, runtime) {
    
        function onRequest(context) {
            if (context.request.method === 'GET') {
                var page = context.request.parameters.page;
                var invIds = context.request.parameters.ids;
                var postDate = context.request.parameters.postdate;
                var createdFrom = context.request.parameters.createdfrom;
                var copyEdi = context.request.parameters.copyedi;
                var entity = context.request.parameters.entity;
                var action = context.request.parameters.action;

                log.debug('postDate',postDate)
                log.debug('createdFrom',createdFrom)
                log.debug('copyEdi',copyEdi)
                log.debug('action',action)

                
                if(action == 'post'){
                    var inv = invIds.split(",");
                    var postDateArr = postDate.split(",");
                    var createdFromArr = createdFrom.split(",");
                    var copyEdiArr = copyEdi.split(",");

                    log.debug('postDateArr',postDateArr)
                    log.debug('createdFromArr',createdFromArr)
                    log.debug('copyEdiArr',copyEdiArr)
                    if(inv.length>0){
            
                        log.debug('inv',inv)
                
                        var applyInvId = [];
                        var applyInvalid = [];
                        for(var x=0;x<inv.length;x++){
                            var invId = inv[x];
                            var postDateRep = postDateArr[x];
                            var soId = createdFromArr[x];
                            var testReady = copyEdiArr[x];

                            var setPostDate = new Date(postDateRep)

                            log.debug('postDateRep',postDateRep)
                            log.debug('soId',soId)
                            log.debug('testReady',testReady)
                
                                var invRec = record.submitFields({
                                    type: record.Type.INVOICE,
                                    id: invId,
                                    values: {
                                        custbody_inv_approval_status: 5,
                                        approvalstatus: 2,
                                        trandate : setPostDate,
                                        custbodyintegrationstatus : testReady,
                                        custbody_inv_posting_date : setPostDate
                                    }
                                })
                
                                log.debug('invRec',invRec)
                    
                                if(soId)
                                var srRec = record.submitFields({
                                    type: record.Type.SALES_ORDER,
                                    id: soId,
                                    values: {
                                        custbody_inv_posting_date: setPostDate
                                    }
                                })

                        }
                    }
                    return true;

                }
                if(action == 'approve'){
                    var soIds = invIds.split(",");
                    if(soIds.length>0){
            
                        log.debug('soIds',soIds)
                
                        var applyInvId = [];
                        var applyInvalid = [];
                        for(var x=0;x<soIds.length;x++){
                            var invId = soIds[x];
                            var invFields = search.lookupFields({
                                type: search.Type.INVOICE,
                                id: invId,
                                columns: ['custbody_date_posted_rep_hidden','custbody_inv_approval_status','tranid','createdfrom','custbody_copy_to_edi']
                            });
                
                            log.debug('invFields',invFields)
                
                            if(invFields.custbody_inv_approval_status[0].text == "Pending Approval"){
                                applyInvId.push(invFields.tranid)
                                
                                var invRec = record.submitFields({
                                    type: record.Type.INVOICE,
                                    id: invId,
                                    values: {
                                        approvalstatus: 1,
                                        custbody_inv_approval_status: 2
                                    }
                                 })
                            }
                            else if(invFields.custbody_inv_approval_status[0].text == "Pending Posting"){
                                applyInvalid.push(invFields.tranid)
                            }   
                        }
                    }

                    return true;
                }
            }
        }

        return {
            onRequest : onRequest
        };
    });
    