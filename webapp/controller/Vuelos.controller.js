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

        return Controller.extend("sumfree.controller.Vuelos", {
            onInit: function () {
                var oData = {
                    recipient : {
                       name : "Info de vuelos",
                       compania: "",
                       conexion: "",
                       listaresultado:""
                    }
                 };
                 var oModel = new JSONModel(oData);
                 //this.getView().setModel("recipient",oModel);

                 this.getView().setModel(oModel,"infovuelos");
                 console.log("modelo cargado en la vista");
            },
            onFilter: function (oEvent) {
               const compania = this.getView().getModel("infovuelos").getProperty("/recipient/compania");
               const conexion = this.getView().getModel("infovuelos").getProperty("/recipient/conexion");
               const oData = this.getView().getModel("infovuelos");

                // function fnSuccess(oDatos, oResponse) {
                //     console.log("SUCCESS");
                //     console.log("RESULTADO OBTENIDO");
                //     //console.log(oDatos.Resultado);
                //     oData.setProperty("/recipient/listaresultado", oDatos.results);

                //     }
                // function fnError(oError) {
                //     console.log("Error", oError);
                //     }

                // var oModel = this.getView().getModel("vuelos");//.getData();
                // oModel.read("/ExVuelosSet?$filter=Cod_Compania%20eq%20%27AA%27%20", 
                // {
                //     success: fnSuccess, 
                //     error: fnError
                // });


                let filters = [];
                if (compania !== "") {
                filters.push(new Filter("Cod_Compania", 
                    FilterOperator.EQ, compania));
                    console.log("nombre a buscar: " + compania);
                }
                
                if (conexion !== "") {
                    filters.push(new Filter("Cod_Conexion", 
                    FilterOperator.EQ, conexion));
                }
                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },
            
            onShowHello : function () {
                console.log("empieza");

                const op1 = this.getView().byId("operando1");
                const op2 = this.getView().byId("operando2");
                console.log("op1: " + op1.getValue());

                const nombreModelo="model1";
                const oData = this.getView().getModel(nombreModelo);
                let filters = [];

                console.log("Operando1 = #"+ oData.getProperty("/recipient/operando1")+"#");
                if (oData.getProperty("/recipient/operando1") != "" && oData.getProperty("/recipient/operando1") != undefined){
                    console.log("dentro if. Operando1");
                    filters.push(new Filter("operando1", FilterOperator.Contains, oData.getProperty("/recipient/operando1")));
                    console.log("fin del if");
                }


                // read msg from i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel(nombreModelo).getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                // show message
                MessageToast.show(sMsg);

                //Llamada al servicio web
                console.log("Metadatos del modelo conectando. Obtenido: ");
                console.log(this.getView().getModel().getServiceMetadata());

                function fnSuccess(oDatos, oResponse) {
                    console.log("SUCCESS");
                    console.log("RESULTADO OBTENIDO");
                    console.log(oDatos.Resultado);
                    oData.setProperty("/recipient/resultado", oDatos.Resultado);

                    }
                function fnError(oError) {
                    console.log("Error", oError);
                    }

                var oModel = this.getView().getModel();
                oModel.read("/E_TEST_SUMASSet(Operando_1="+ op1.getValue() + ",Operando_2=" + op2.getValue() + ")", 
                {
                    success: fnSuccess, 
                    error: fnError
                });
                //Fin de llamada servicio web

             }
        });
    });
