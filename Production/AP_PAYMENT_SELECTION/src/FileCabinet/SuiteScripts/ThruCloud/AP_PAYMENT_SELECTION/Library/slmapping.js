/**
 * @NApiVersion 2.1
 */
define([],

    () => {

        const SUITELET = {
            scriptid: 'customscript_ap_payment_selection_sl',
            deploymentid: 'customdeploy_ap_payment_selection_sl',
            form: {
                title: "AP Payment Selection",
                fields: {
                    FORM_ENTITY: {
                        id: "custpage_form_entity",
                        type: "SELECT",
                        label: "Entity",
                        hasoption: true,
                    },
                    THIS_WEEK_GRAND_TOTAL: {
                        id: "custpage_thisweek_amt_g",
                        type: "TEXT",
                        label: "THIS WEEK GRAND TOTAL",
                        hasdefault: true,
                    },
                    NEXT_WEEK_GRAND_TOTAL: {
                        id: "custpage_nextweek_amt_g",
                        type: "TEXT",
                        label: "NEXT WEEK GRAND TOTAL",
                        hasdefault: true,
                    },
                    ENTITY: {
                        id: "custpage_vendors_body",
                        type: "MULTISELECT",
                        label: "Selected Vendor",
                        hasoption: true,
                    },
                },
                buttons: {
                    REFRESH: {
                        label: 'REFRESH',
                        id: 'custpage_reset_btn',
                        functionName: 'refreshPage'
                    },
                    APPROVE_ALL: {
                        label: 'Approve All Vendor Invoice',
                        id: 'custpage_approve_all_vendor',
                        // functionName: 'searchItems'
                    },
                },
                sublistfields: {
                    INTERNAL_ID: {
                        id: "custpage_id_head",
                        label: "Internal Id",
                        type : 'TEXT',
                    },
                    TOTAL_LINE_HEAD: {
                        id: "custpage_is_totalline_head",
                        label: "Total line",
                        type : 'TEXT',
                    },
                    DATE: {
                        id: "custpage_date_head",
                        label: "DATE",
                        type : 'TEXT',
                    },
                    INVOICE_DATE: {
                        id: "custpage_invdate_head",
                        label: "Invoice Date",
                        type: "TEXT",
                    },
                    POSTING_PERIOD: {
                        id: "custpage_postingperiod_head",
                        label: "Posting Period",
                        type: "TEXT",
                    },
                    DOCUMENT_NUMBER: {
                        id: "custpage_document_number_head", // x
                        label: "Document Number",
                        type: "TEXT",
                    },
                    ENTITY: {
                        id: "custpage_entity_text",
                        label: "Vendor",
                        type: "TEXT",
                    },
                    AMOUNT: {
                        id: "custpage_amount_head", // x
                        label: "Amount",
                        type: "TEXT",
                    },
                    DUE_DATE: {
                        id: "custpage_duedate_head",
                        label: "Due Date",
                        type: "TEXT",
                    },
                    CURRENCY: {
                        id: "custpage_currency_head",
                        label: "Currency",
                        type: "TEXT",
                    },
                    EXCHANGE_RATE: {
                        id: "custpage_exchange_rate_head",
                        label: "Exchange Rate",
                        type: "TEXT",
                    },
                    THIS_WEEK: {
                        id: "custpage_thisweek_head", // stoop
                        label: "This Week",
                        type: "CHECKBOX",
                    },
                    THIS_WEEK_AMOUNT: {
                        id: "custpage_thisweekamt_head",
                        label: "This Week Amount",
                        type: "TEXT",
                    },
                    NEXT_WEEK: {
                        id: "custpage_nextweek_head",
                        label: "Next Week",
                        type: "CHECKBOX",
                    },
                    NEXT_WEEK_AMOUNT: {
                        id: "custpage_nextweekamt_head",
                        label: "Next Week Amount",
                        type: "TEXT",
                    },
                    MEMO: {
                        id: "custpage_memo_head",
                        label: "Memo",
                        type: "TEXT",
                    },
                    APPROVE_FOR_PAYMENT: {
                        id: "custpage_approveforpayment_head",
                        label: "Approve for payment",
                        type: "CHECKBOX",
                    },
                    AGE_DAYS: {
                        id: "custpage_age_days_head",
                        label: "Age in Days",
                        type: "TEXT",
                    },
                    CURRENT: {
                        id: "custpage_current_head",
                        label: "Current",
                        type: "TEXT",
                    },
                    ONE_TO_THIRTY: {
                        id: "custpage_1_to_30_head",
                        label: "1-30",
                        type: "TEXT",
                    },
                    THIRTY_ONE_TO_SIXTY: {
                        id: "custpage_31_to_60_head",
                        label: "31-60",
                        type: "TEXT",
                    },
                    SIXTY_ONE_TO_NINETY: {
                        id: "custpage_61_to_90_head",
                        label: "61-90",
                        type: "TEXT",
                    },
                    OVER_NINETY: {
                        id: "custpage_over_90_head",
                        label: "Over 90",
                        type: "TEXT",
                    },
                    TOTAL_AMOUNT: {
                        id: "custpage_total_amount_head",
                        label: "Total Amount",
                        type: "TEXT",
                    },
                },
                selectOptions: {
                    // DW_MORGAN: {
                    //     value: '18',
                    //     text: 'DW Morgan Group : DW Morgan, LLC'
                    // },
                    MORGAN_GLOBAL: {
                        value: '20',
                        text: 'Morgan Global Logistics Pte. Ltd.'
                    },
                    // DW_MORGAN_PH: {
                    //     value: '21',
                    //     text: 'DW Morgan (Philippines)'
                    // },
                    CHRONOS_CLOUD: {
                        value: '22',
                        text: 'ChronosCloud, Inc'
                    },
                    // DW_MORGAN_SERVICES: {
                    //     value: '23',
                    //     text: 'DW Morgan Services, LLC'
                    // },
                    // DW_MORGAN_EU: {
                    //     value: '24',
                    //     text: 'DW Morgan Services Europe Limited'
                    // },
                },
                CS_PATH: '../CS/ap_payment_selection_cs.js',
            },
        }

        return { SUITELET }

    });
