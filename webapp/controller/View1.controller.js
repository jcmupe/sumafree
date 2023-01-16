sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast,JSONModel, Filter, FilterOperator, ODataModel) {
        "use strict";

        return Controller.extend("sumfree.controller.View1", {
            onInit: function () {
                var oData = {
                    recipient : {
                       name : "World por defecto",
                       operando1: "",
                       operando2: "",
                       resultado: ""
                    }
                 };
                 var oModel = new JSONModel(oData);
                 //this.getView().setModel("recipient",oModel);

                 console.log("antes");
                 this.getView().setModel(oModel,"recipient");
                 console.log("modelo cargado en la vista");
            },
            onFilter: function (oEvent) {
               

            },
            
            onShowHello : function () {
                console.log("empieza");

                const op1 = this.getView().byId("operando1");
                const op2 = this.getView().byId("operando2");
                console.log("op1: " + op1.getValue());
                //var serviceUrl = "proxy/http/fiori:8000/sap/opu/odata/SAP/Z_TEST_SUMA_OP_SRV/E_TEST_SUMASSet(Operando_1="+ op1.getValue() + ",Operando_2="+ op2.getValue() + ")";
                //let url = "/sap/opu/odata/SAP/Z_TEST_SUMA_OP_SRV/E_TEST_SUMASSet(Operando_1="+ op1.getValue() + ",Operando_2="+ op2.getValue() + ")";


                console.log("Metadatos del modelo conectando. Obtenido: ");
                console.log(this.getView().getModel().getServiceMetadata());

                function fnSuccess(oData, oResponse) {
                    // accessing the data from the model now
                    var oProduct1 = oModel.getData("/Products(1)");
                    var oProduct1Name = oModel.getProperty("/Products(1)/ProductName");
                    }
                    function fnError(oError) {
                    console.log("Error", oError);
                    }

                var oModel = this.getView().getModel();
                oModel.read("/E_TEST_SUMASSet(3,4)", 
                {
                    success: fnSuccess, 
                    error: fnError
                });

                const nombreModelo="recipient";
                const oData = this.getView().getModel("recipient");
                let filters = [];

                console.log("Operando1 = #"+ oData.getProperty("/recipient/operando1")+"#");
                if (oData.getProperty("/recipient/operando1") != "" && oData.getProperty("/recipient/operando1") != undefined){
                    console.log("dentro if. Operando1");
                    filters.push(new Filter("operando1", FilterOperator.Contains, oData.getProperty("/recipient/operando1")));
                    console.log("fin del if");
                }


                // read msg from i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                // show message
                MessageToast.show(sMsg);
             }
        });
    });
