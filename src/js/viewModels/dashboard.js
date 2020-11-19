/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout','ojs/ojcollectiondataprovider',
        'ojs/ojpagingdataproviderview','ojs/ojpagingcontrol',
        'ojs/ojinputtext','ojs/ojlistview',
        'ojs/ojlabel','ojs/ojlabelvalue','ojs/ojbutton','ojs/ojselectcombobox',        
        ],
        
 function(ko, CollectionDataProvider, PagingDataProviderView) {

    function DashboardViewModel() {
        
        var self = this;

        self.value1 = ko.observable('CH');   
        
        // if the contents of the array can change, then replace the [...] with ko.observableArray([...]) 
        self.timeFrames = [
          {id: '1', name: 'MINUTE'},
          {id: '2', name: 'HOUR'},
          {id: '3', name: 'DAY'},
          {id: '4', name: 'WEEK'},
          {id: '5', name: 'MONTH'}
        ];
        
        // observable bound to the Buttonset:
        self.selectedTimeFrame = ko.observable('3');

        /* Variables */        
        //self.selectedTabItem = ko.observable("settings");
        //self.backTestListDataSource = ko.observable();
        self.selectedBackTest = ko.observable();
        self.selectedBackTestModel = ko.observable();
        
        self.backTestListDataSource = ko.computed(function () {
           /* List View Collection and Model */
            var backTestModelItem = oj.Model.extend({
                idAttribute: 'id'
            });

            var backTestListCollection = new oj.Collection(null, {
                url: "http://dnssemantikos:8080/TradingService/api/periods/20/" + self.selectedTimeFrame(),
                model: backTestModelItem
            });                

            self.backTestList = ko.observable(backTestListCollection);                         

            //self.backTestListDataSource(new oj.CollectionTableDataSource(self.backTestList()));   
            return new PagingDataProviderView(new CollectionDataProvider(self.backTestList()));
        });                              
        
        /* List selection listener */
        
        self.listSelectionChanged = function () {                                            
            self.selectedBackTestModel(self.backTestList().get(self.selectedBackTest()));          
            //console.log(JSON.stringify(self.selectedBackTestModel()));
            //self.selectedBackTestModel(backTestListCollection);          
        };                
    }
    
    /*
    Bootstrap.whenDocumentReady().then(
        function () {
            //ko.cleanNode(document.getElementById('form-container'));
            alert(document.getElementById('form-container'));
            ko.applyBindings(new DashboardViewModel(), document.getElementById('form-container'));            
        }
    );
    */
   
    /*
    $(
        function() 
        {
            ko.applyBindings(new viewModel(), document.getElementById('listview').parentNode);
        }
    );
    */
    

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
