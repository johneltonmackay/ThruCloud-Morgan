/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([
  "N/runtime",
  "N/currentRecord",
  "N/search",
  "N/record",
  "N/url",
], function (runtime, currentRecord, search, record, url) {
  /**
   * Function to be executed when field is changed.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.sublistId - Sublist name
   * @param {string} scriptContext.fieldId - Field name
   * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
   * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
   *
   * @since 2015.2
   */
  function fieldChanged_mawbhawb_ui(scriptContext) {
      var form = scriptContext.currentRecord;
      if (scriptContext.fieldId == "entity") {
          var currRecObj = currentRecord.get();
          var entityVal = currRecObj.getValue({
              fieldId: "entity",
          });

          var entityVal = currRecObj.getValue({
              fieldId: "entity",
          });

          var emptyVal = "";
          var currentUrl =
              "https://8024578.app.netsuite.com/app/accounting/transactions/vendbill.nl?whence=";
          var newUrl =
              currentUrl +
              "&entity=" +
              encodeURIComponent(entityVal) +
              "&handover=" +
              encodeURIComponent(emptyVal) +
              "&hawbFil=" +
              encodeURIComponent(emptyVal);
          window.location.href = newUrl;
      } else if (scriptContext.fieldId == "cseg_handover3") {
          var currRecObj = currentRecord.get();
          var entityVal = currRecObj.getValue({
              fieldId: "entity",
          });

          var handover = currRecObj.getValue({
              fieldId: "cseg_handover3",
          });

          console.log(handover);
          console.log(handover.length);
          handover = handover.toString();
          var billTotal = currRecObj.getValue({
              fieldId: "custbody_user_bill_total",
          });

          log.debug("billTotal", billTotal);

          var currentUrl =
              "https://8024578.app.netsuite.com/app/accounting/transactions/vendbill.nl?whence=";
          var newUrl =
              currentUrl +
              "&entity=" +
              encodeURIComponent(entityVal) +
              "&handover=" +
              encodeURIComponent(handover) +
              "&billTotal=" +
              encodeURIComponent(billTotal);
          window.location.href = newUrl;

      } else if (scriptContext.fieldId == "custpage_hawb_field_search") {
          var currRecObj = currentRecord.get();
          var entityVal = currRecObj.getValue({
              fieldId: "entity",
          });

          var handover = currRecObj.getValue({
              fieldId: "cseg_handover3",
          });

          var hawbFil = currRecObj.getValue({
              fieldId: "custpage_hawb_field_search",
          });

          var billTotal = currRecObj.getValue({
              fieldId: "custbody_user_bill_total",
          });

          var hawbValues = currRecObj.getValue({
              fieldId: "custbody_vb_hawb",
          });

          var accSub = new Array();
          var mawbSub = new Array();
          var amtSub = new Array();
          var hawbSub = new Array();
          var dateSub = new Array();
          var deptSub = new Array();
          var wtSub = new Array();
          var invAmtSub = new Array();
          var amtVarSub = new Array();

          var expenseCount = currRecObj.getLineCount({
              sublistId: "expense",
          });

          for (var i = 0; i < expenseCount; i++) {
              var account = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "account",
                  line: i,
              });
              accSub.push(account);

              var mawb = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "cseg_mawb",
                  line: i,
              });
              mawbSub.push(mawb);

              var amount = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "amount",
                  line: i,
              });
              amtSub.push(amount);

              var hawb = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "cseg_hawborig",
                  line: i,
              });
              hawbSub.push(hawb);

              var invDate = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_vi_vendor_invoice",
                  line: i,
              });
              dateSub.push(invDate);

              var department = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "department",
                  line: i,
              });
              deptSub.push(department);

              var weight = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_hawb_weight",
                  line: i,
              });
              wtSub.push(weight);

              var invoiceAmount = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_invoice_amount",
                  line: i,
              });
              invAmtSub.push(invoiceAmount);

              var amtVariance = currRecObj.getSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_amount_variance",
                  line: i,
              });
              amtVarSub.push(amtVariance);
          }

          var currentUrl =
              "https://8024578.app.netsuite.com/app/accounting/transactions/vendbill.nl?whence=";
          var newUrl =
              currentUrl +
              "&entity=" +
              encodeURIComponent(entityVal) +
              "&handover=" +
              encodeURIComponent(handover) +
              "&billTotal=" +
              encodeURIComponent(billTotal) +
              "&hawbFil=" +
              encodeURIComponent(hawbFil) +
              "&hawbValues=" +
              encodeURIComponent(hawbValues) +
              "&accSub=" +
              encodeURIComponent(accSub) +
              "&mawbSub=" +
              encodeURIComponent(mawbSub) +
              "&hawbSub=" +
              encodeURIComponent(hawbSub) +
              "&amtSub=" +
              encodeURIComponent(amtSub) +
              "&dateSub=" +
              encodeURIComponent(dateSub) +
              "&deptSub=" +
              encodeURIComponent(deptSub) +
              "&wtSub=" +
              encodeURIComponent(wtSub) +
              "&invAmtSub=" +
              encodeURIComponent(invAmtSub) +
              "&amtVarSub=" +
              encodeURIComponent(amtVarSub);
          window.location.href = newUrl;
      } else if (
          scriptContext.fieldId == "custpage_mark_hawb" ||
          scriptContext.fieldId == "custbody_user_bill_total"
      ) {
          console.log("scriptcontext", scriptContext);
          var currRecObj = currentRecord.get();
          var weightTotal = 0;
          var hasHawBSelected = 0;
          var hawbselected = new Array();
          var hawbRemoved = new Array();
          var entityVal = currRecObj.getValue({
              fieldId: "entity",
          });

          var handoverVal = currRecObj.getValue({
              fieldId: "cseg_handover3",
          });

          var isMarkAll = currRecObj.getValue({
              fieldId: "custbody_custom",
          });

          var billTotal = currRecObj.getValue({
              fieldId: "custbody_user_bill_total",
          });

          log.debug("billTotal", billTotal);

          if (!isMarkAll) {
              var hawbListCount = currRecObj.getLineCount({
                  sublistId: "custpage_sublist_hawb",
              });

              if (hawbListCount > 0) {
                  for (var i = 0; i < hawbListCount; i++) {
                      var isApply = currRecObj.getSublistValue({
                          sublistId: "custpage_sublist_hawb",
                          fieldId: "custpage_mark_hawb",
                          line: i,
                      });

                      if (isApply == true) {
                          hasHawBSelected = hasHawBSelected + 1;
                          var hawbID = currRecObj.getSublistValue({
                              sublistId: "custpage_sublist_hawb",
                              fieldId: "custpage_id_hawb",
                              line: i,
                          });
                          hawbselected.push(hawbID);

                          if (!billTotal || !entityVal) {
                              currRecObj.selectLine({
                                  sublistId: "custpage_sublist_hawb",
                                  line: i,
                              });

                              currRecObj.setCurrentSublistValue({
                                  sublistId: "custpage_sublist_hawb",
                                  fieldId: "custpage_mark_hawb",
                                  value: false,
                              });

                              currRecObj.commitLine({
                                  sublistId: "custpage_sublist_hawb",
                              });

                              return false;
                          }
                      } else {
                          console.log("apply", false);
                          if (i == scriptContext.line) {
                              var hawbID = currRecObj.getSublistValue({
                                  sublistId: "custpage_sublist_hawb",
                                  fieldId: "custpage_id_hawb",
                                  line: i,
                              });
                              hawbRemoved.push(hawbID);
                          }
                      }
                  }
              }
              if (!entityVal) {
                  alert("Vendor is Required for adding an Expense Item");
                  return false;
              }

              if (!billTotal) {
                  alert("Bill Total is Zero");
                  return false;
              }

              numberOfSelectedOptions = hawbselected.length;

              if (hawbRemoved.length > 0) {
                  console.log("hawbRemoved", hawbRemoved);
                  var lineRem = currRecObj.findSublistLineWithValue({
                      sublistId: "expense",
                      fieldId: "cseg_hawborig",
                      value: hawbRemoved[0],
                  });

                  console.log("lineRem", lineRem);
                  if (lineRem >= 0) {
                      currRecObj.removeLine({
                          sublistId: "expense",
                          line: lineRem,
                      });
                  }
              }

              currRecObj.setValue({
                  fieldId: "custbody_vb_hawb",
                  value: hawbselected,
              });

              var entityField = search.lookupFields({
                  type: search.Type.VENDOR,
                  id: entityVal,
                  columns: ["expenseaccount"],
              });
              var entityFieldString = JSON.stringify(
                  entityField.expenseaccount
              );

              for (var i = 0; i < numberOfSelectedOptions; i++) {
                  currRecObj.selectLine({
                      sublistId: "custpage_sublist_hawb",
                      line: i,
                  });
                  var weightFieldAdden = currRecObj.getCurrentSublistValue({
                      sublistId: "custpage_sublist_hawb",
                      fieldId: "custpage_weight_hawb",
                  });
                  console.log("weightFieldAdden", weightFieldAdden);
                  if (!weightFieldAdden) {
                      alert("No Weight inputed from this HAWB");
                      currRecObj.selectLine({
                          sublistId: "custpage_sublist_hawb",
                          line: scriptContext.line,
                      });

                      currRecObj.setCurrentSublistValue({
                          sublistId: "custpage_sublist_hawb",
                          fieldId: "custpage_mark_hawb",
                          value: false,
                      });

                      currRecObj.commitLine({
                          sublistId: "custpage_sublist_hawb",
                      });
                      return false;
                  } else {
                      weightTotal =
                          parseFloat(weightTotal) +
                          parseFloat(weightFieldAdden);
                  }
              }
              console.log("weightTotal", weightTotal);
              var amtTotal = 0;
              for (var i = 0; i < numberOfSelectedOptions; i++) {
                  console.log("hawbselected[i]", hawbselected[i]);
                  var lineNumber = currRecObj.findSublistLineWithValue({
                      sublistId: "expense",
                      fieldId: "cseg_hawborig",
                      value: hawbselected[i],
                  });

                  console.log("lineNumber", lineNumber);
                  if (lineNumber < 0) {
                      currRecObj.selectNewLine({ sublistId: "expense" });
                      if (entityFieldString === "[]") {
                          currRecObj.setCurrentSublistValue({
                              sublistId: "expense",
                              fieldId: "account",
                              value: 293,
                              forceSyncSourcing: true,
                          });
                      } else {
                          currRecObj.setCurrentSublistValue({
                              sublistId: "expense",
                              fieldId: "account",
                              value: entityField.expenseaccount[0].value,
                              forceSyncSourcing: true,
                          });
                      }

                      currRecObj.setCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "cseg_mawb",
                          value: handoverVal,
                          forceSyncSourcing: true,
                      });

                      currRecObj.setCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "cseg_hawborig",
                          value: hawbselected[i],
                          forceSyncSourcing: true,
                      });

                      currRecObj.selectLine({
                          sublistId: "custpage_sublist_hawb",
                          line: i,
                      });

                      var invDateField = currRecObj.getCurrentSublistValue({
                          sublistId: "custpage_sublist_hawb",
                          fieldId: "custpage_invdate_hawb",
                      });

                      var deptField = currRecObj.getCurrentSublistValue({
                          sublistId: "custpage_sublist_hawb",
                          fieldId: "custpage_dept_hawb",
                      });

                      var invAmtField = currRecObj.getCurrentSublistValue({
                          sublistId: "custpage_sublist_hawb",
                          fieldId: "custpage_invamt_hawb",
                      });

                      var weightField = currRecObj.getCurrentSublistValue({
                          sublistId: "custpage_sublist_hawb",
                          fieldId: "custpage_weight_hawb",
                      });

                      var amt = billTotal * (weightField / weightTotal);

                      console.log("amt", amt);

                      currRecObj.setCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "amount",
                          value: amt,
                      });

                      if (invDateField) {
                          var dateTypeVal = new Date(invDateField);

                          currRecObj.setCurrentSublistValue({
                              sublistId: "expense",
                              fieldId: "custcol_vi_vendor_invoice",
                              value: dateTypeVal,
                          });
                      }

                      if (deptField) {
                          currRecObj.setCurrentSublistValue({
                              sublistId: "expense",
                              fieldId: "department",
                              value: deptField,
                          });
                      }

                      if (invAmtField) {
                          currRecObj.setCurrentSublistValue({
                              sublistId: "expense",
                              fieldId: "custcol_invoice_amount",
                              value: invAmtField,
                          });

                          var invVariance = invAmtField - amt;

                          currRecObj.setCurrentSublistValue({
                              sublistId: "expense",
                              fieldId: "custcol_amount_variance",
                              value: invVariance,
                          });
                      } else {
                          var invVariance = 0 - amt;

                          currRecObj.setCurrentSublistValue({
                              sublistId: "expense",
                              fieldId: "custcol_amount_variance",
                              value: invVariance,
                          });
                      }

                      currRecObj.setCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "custcol_hawb_weight",
                          value: weightField,
                      });

                      currRecObj.commitLine({ sublistId: "expense" });
                  } else {
                      console.log("else", i);
                      currRecObj.selectLine({
                          sublistId: "custpage_sublist_hawb",
                          line: i,
                      });
                      var weightField = currRecObj.getCurrentSublistValue({
                          sublistId: "custpage_sublist_hawb",
                          fieldId: "custpage_weight_hawb",
                      });

                      console.log("weightField", weightField);
                      currRecObj.selectLine({
                          sublistId: "expense",
                          line: i,
                      });

                      var amt = billTotal * (weightField / weightTotal);

                      console.log("amt", amt);

                      currRecObj.setCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "amount",
                          value: amt,
                      });

                      currRecObj.commitLine({ sublistId: "expense" });
                  }
                  amtTotal =
                      parseFloat(amtTotal.toFixed(2)) +
                      parseFloat(amt.toFixed(2));
                  console.log("amtTotal", amtTotal);
              }

              var expLines = currRecObj.getLineCount({
                  sublistId: "expense",
              });
              if (expLines > 0) {
                  if (billTotal < amtTotal) {
                      currRecObj.selectLine({
                          sublistId: "expense",
                          line: 0,
                      });
                      var amt0 = currRecObj.getCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "amount",
                      });
                      console.log("amt0", amt0);
                      var diff = amtTotal - billTotal;
                      console.log("diff", diff);
                      currRecObj.setCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "amount",
                          value: amt0 - diff,
                      });

                      currRecObj.commitLine({ sublistId: "expense" });
                  } else if (billTotal > amtTotal) {
                      currRecObj.selectLine({
                          sublistId: "expense",
                          line: 0,
                      });
                      var amt0 = currRecObj.getCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "amount",
                      });
                      console.log("amt0", amt0);
                      var diff = billTotal - amtTotal;
                      console.log("diff", diff);
                      currRecObj.setCurrentSublistValue({
                          sublistId: "expense",
                          fieldId: "amount",
                          value: amt0 + diff,
                      });

                      currRecObj.commitLine({ sublistId: "expense" });
                  }
              }
          }
      }
  }

  function markAll() {
      var currRecObj = currentRecord.get();
      var weightTotal = 0;
      var hasHawBSelected = 0;
      var hawbselected = new Array();
      var hawbRemoved = new Array();
      var entityVal = currRecObj.getValue({
          fieldId: "entity",
      });

      currRecObj.setValue({
          fieldId: "custbody_custom",
          value: true,
      });

      var handoverVal = currRecObj.getValue({
          fieldId: "cseg_handover3",
      });

      var billTotal = currRecObj.getValue({
          fieldId: "custbody_user_bill_total",
      });

      log.debug("billTotal", billTotal);

      var hawbListCount = currRecObj.getLineCount({
          sublistId: "custpage_sublist_hawb",
      });

      for (var i = 0; i < hawbListCount; i++) {
          if (!billTotal || !entityVal) {
              alert("Cannot Proceed without Bill Total and Entity");

              return false;
          } else {
              currRecObj.selectLine({
                  sublistId: "custpage_sublist_hawb",
                  line: i,
              });

              currRecObj.setCurrentSublistValue({
                  sublistId: "custpage_sublist_hawb",
                  fieldId: "custpage_mark_hawb",
                  value: true,
              });

              currRecObj.commitLine({
                  sublistId: "custpage_sublist_hawb",
              });

              var hawbID = currRecObj.getSublistValue({
                  sublistId: "custpage_sublist_hawb",
                  fieldId: "custpage_id_hawb",
                  line: i,
              });
              hawbselected.push(hawbID);
          }
      }

      numberOfSelectedOptions = hawbselected.length;

      currRecObj.setValue({
          fieldId: "custbody_vb_hawb",
          value: hawbselected,
      });

      var entityField = search.lookupFields({
          type: search.Type.VENDOR,
          id: entityVal,
          columns: ["expenseaccount"],
      });
      var entityFieldString = JSON.stringify(entityField.expenseaccount);

      for (var i = 0; i < numberOfSelectedOptions; i++) {
          currRecObj.selectLine({
              sublistId: "custpage_sublist_hawb",
              line: i,
          });
          var weightFieldAdden = currRecObj.getCurrentSublistValue({
              sublistId: "custpage_sublist_hawb",
              fieldId: "custpage_weight_hawb",
          });
          console.log("weightFieldAdden", weightFieldAdden);
          if (!weightFieldAdden) {
              alert("No Weight inputed from HAWB line:" + i);
              currRecObj.selectLine({
                  sublistId: "custpage_sublist_hawb",
                  line: i,
              });

              currRecObj.setCurrentSublistValue({
                  sublistId: "custpage_sublist_hawb",
                  fieldId: "custpage_mark_hawb",
                  value: false,
              });

              currRecObj.commitLine({
                  sublistId: "custpage_sublist_hawb",
              });
              return false;
          } else {
              weightTotal =
                  parseFloat(weightTotal) + parseFloat(weightFieldAdden);
          }
      }
      console.log("weightTotal", weightTotal);
      var amtTotal = 0;
      for (var i = 0; i < numberOfSelectedOptions; i++) {
          currRecObj.selectNewLine({ sublistId: "expense" });
          if (entityFieldString === "[]") {
              currRecObj.setCurrentSublistValue({
                  sublistId: "expense",
                  fieldId: "account",
                  value: 293,
                  forceSyncSourcing: true,
              });
          } else {
              currRecObj.setCurrentSublistValue({
                  sublistId: "expense",
                  fieldId: "account",
                  value: entityField.expenseaccount[0].value,
                  forceSyncSourcing: true,
              });
          }

          currRecObj.setCurrentSublistValue({
              sublistId: "expense",
              fieldId: "cseg_mawb",
              value: handoverVal,
              forceSyncSourcing: true,
          });

          currRecObj.setCurrentSublistValue({
              sublistId: "expense",
              fieldId: "cseg_hawborig",
              value: hawbselected[i],
              forceSyncSourcing: true,
          });

          currRecObj.selectLine({
              sublistId: "custpage_sublist_hawb",
              line: i,
          });

          var invDateField = currRecObj.getCurrentSublistValue({
              sublistId: "custpage_sublist_hawb",
              fieldId: "custpage_invdate_hawb",
          });

          var deptField = currRecObj.getCurrentSublistValue({
              sublistId: "custpage_sublist_hawb",
              fieldId: "custpage_dept_hawb",
          });

          var invAmtField = currRecObj.getCurrentSublistValue({
              sublistId: "custpage_sublist_hawb",
              fieldId: "custpage_invamt_hawb",
          });

          var weightField = currRecObj.getCurrentSublistValue({
              sublistId: "custpage_sublist_hawb",
              fieldId: "custpage_weight_hawb",
          });

          var amt = billTotal * (weightField / weightTotal);

          console.log("amt", amt);

          currRecObj.setCurrentSublistValue({
              sublistId: "expense",
              fieldId: "amount",
              value: amt,
          });

          if (invDateField) {
              var dateTypeVal = new Date(invDateField);

              currRecObj.setCurrentSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_vi_vendor_invoice",
                  value: dateTypeVal,
              });
          }

          if (deptField) {
              currRecObj.setCurrentSublistValue({
                  sublistId: "expense",
                  fieldId: "department",
                  value: deptField,
              });
          }

          if (invAmtField) {
              currRecObj.setCurrentSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_invoice_amount",
                  value: invAmtField,
              });

              var invVariance = invAmtField - amt;

              currRecObj.setCurrentSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_amount_variance",
                  value: invVariance,
              });
          } else {
              var invVariance = 0 - amt;

              currRecObj.setCurrentSublistValue({
                  sublistId: "expense",
                  fieldId: "custcol_amount_variance",
                  value: invVariance,
              });
          }

          currRecObj.setCurrentSublistValue({
              sublistId: "expense",
              fieldId: "custcol_hawb_weight",
              value: weightField,
          });

          currRecObj.commitLine({ sublistId: "expense" });
          amtTotal =
              parseFloat(amtTotal.toFixed(2)) + parseFloat(amt.toFixed(2));
          console.log("amtTotal", amtTotal);
      }

      if (billTotal < amtTotal) {
          currRecObj.selectLine({ sublistId: "expense", line: 0 });
          var amt0 = currRecObj.getCurrentSublistValue({
              sublistId: "expense",
              fieldId: "amount",
          });
          console.log("amt0", amt0);
          var diff = amtTotal - billTotal;
          console.log("diff", diff);
          currRecObj.setCurrentSublistValue({
              sublistId: "expense",
              fieldId: "amount",
              value: amt0 - diff,
          });

          currRecObj.commitLine({ sublistId: "expense" });
      } else if (billTotal > amtTotal) {
          currRecObj.selectLine({ sublistId: "expense", line: 0 });
          var amt0 = currRecObj.getCurrentSublistValue({
              sublistId: "expense",
              fieldId: "amount",
          });
          console.log("amt0", amt0);
          var diff = billTotal - amtTotal;
          console.log("diff", diff);
          currRecObj.setCurrentSublistValue({
              sublistId: "expense",
              fieldId: "amount",
              value: amt0 + diff,
          });

          currRecObj.commitLine({ sublistId: "expense" });
      }
      currRecObj.setValue({
          fieldId: "custbody_custom",
          value: false,
      });
  }

  function unmarkAll() {
      var currRecObj = currentRecord.get();
      var weightTotal = 0;
      var hasHawBSelected = 0;
      var hawbselected = new Array();
      var hawbRemoved = new Array();

      currRecObj.setValue({
          fieldId: "custbody_custom",
          value: true,
      });

      var handoverVal = currRecObj.getValue({
          fieldId: "cseg_handover3",
      });

      var billTotal = currRecObj.getValue({
          fieldId: "custbody_user_bill_total",
      });

      log.debug("billTotal", billTotal);

      var hawbListCount = currRecObj.getLineCount({
          sublistId: "custpage_sublist_hawb",
      });

      for (var i = 0; i < hawbListCount; i++) {
          currRecObj.selectLine({
              sublistId: "custpage_sublist_hawb",
              line: i,
          });

          currRecObj.setCurrentSublistValue({
              sublistId: "custpage_sublist_hawb",
              fieldId: "custpage_mark_hawb",
              value: false,
          });

          currRecObj.commitLine({
              sublistId: "custpage_sublist_hawb",
          });

          var hawbID = currRecObj.getSublistValue({
              sublistId: "custpage_sublist_hawb",
              fieldId: "custpage_id_hawb",
              line: i,
          });
          hawbRemoved.push(hawbID);
          var lineRem = currRecObj.findSublistLineWithValue({
              sublistId: "expense",
              fieldId: "cseg_hawborig",
              value: hawbID,
          });

          console.log("lineRem", lineRem);
          if (lineRem >= 0) {
              currRecObj.removeLine({
                  sublistId: "expense",
                  line: lineRem,
              });
          }
      }

  }

  return {
      fieldChanged: fieldChanged_mawbhawb_ui,
      markAll: markAll,
      unmarkAll: unmarkAll,
  };
});
