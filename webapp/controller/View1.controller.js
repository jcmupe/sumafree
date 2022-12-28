sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast,JSONModel) {
        "use strict";

        return Controller.extend("sumfree.controller.View1", {
            onInit: function () {
                var oData = {
                    recipient : {
                       name : "World",
                       operando1: "",
                       operando2: "",
                       resultado: ""
                    }
                 };
                 var oModel = new JSONModel(oData);
                 this.getView().setModel(oModel);
            },
            onShowHello : function () {
                // read msg from i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                // show message
                MessageToast.show(sMsg);
             }
        });
    });
