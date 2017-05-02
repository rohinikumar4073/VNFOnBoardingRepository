define([
    'react', 'jquery' ,'react-jsonschema-form', 'toastr'
], function(React, $,  Form, toastr) {
    var FormVNF = Form.default;

const schema = {
  "description": "",
  "name":"vnf",
  "type": "object",
  "properties": {
    "countvms": {
      "title": "How many VMs are in the VNF?",
      "type": "number"
    },"orderingDependencies": {
      "title": "Are there an startup ordering dependencies",
      "type": "boolean"
    },"startUporderingDependencies": {
      "title": "If there are startup order dependencies, explain the steps",
      "type": "string"
    }

  }
};

const uiSchema = {

    "addblockstorage": {
      "items": []
    },
    "orderingDependencies": {
      "ui:widget": "radio",
      "ui:options": {
        "inline": true
      }
    },"startUporderingDependencies":{
      "ui:widget": "textarea"

    }

};

 const formData = {
  "countvms": "",
  "table1": {
    "imagename": "Image name",
    "softwareimage": "Software Image name",
    "vcpusreq": "",
    "memoryamount": "",
    "blockdiskspace": "",
    "cindervolume": "",
    "addblockstorage": [
      "volume",
      "name/type",
      1,
      "IO-ops/second",
      "iSCSI",
      "virtio",
      "disk",
      "hello world"
    ],
    "vmflavorreq": "m1.small",
    "orderingdependencies": true,
    "odsteps": ""
  },
  "listOfStrings": [
    "foo",
    "bar"
  ],
  "multipleChoicesList": [
    "foo",
    "bar"
  ],
  "fixedItemsList": [
    "Some text",
    true,
    123
  ],
  "nestedList": [
    [
      "lorem",
      "ipsum"
    ],
    [
      "dolor"
    ]
  ],
  "unorderable": [
    "one",
    "two"
  ],
  "unremovable": [
    "one",
    "two"
  ],
  "noToolbar": [
    "one",
    "two"
  ],
  "fixedNoToolbar": [
    42,
    true,
    "additional item one",
    "additional item two"
  ]
}
    var VNFBasic = React.createClass({
        getInitialState:function(){
            return({
              vmArr:[],
              formData:this.props.formData,
               noOfVms:0,
               val: ""
            }
            );
        },
        onSubmit: function(e) {
            this.props.saveFormData(e.formData);
            this.setState({formData:e.formData});
        },
        handleConfirm: function(data) {
          if(this.state.val == "saveAndExit"){
            this.props.setPageActive("homePage", "next", data,"vnfInfo");
            $(".leftMain").addClass("totalLeftScreenMode");
            $(".contentMain").addClass("totalRightScreenMode");
          }
          else{
            this.props.setPageActive("vmInfo","next",data,"vnfInfo")
          }
        },
        render: function() {
            return (
                <div id="virRes">
                      <FormVNF schema={schema} uiSchema={uiSchema} formData={this.state.formData} onSubmit={this.onSubmit}>
                        </FormVNF>
                         <div className="contentFooter">
                        {/*    <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.props.setPageActive.bind(this,"networkInfo","prev")}>Previous</a> */}
                            <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>
                            <a href="#"  className="btn btn-danger btn-sm nextBtn"  onClick={this.moveNext}>Next</a>
                         </div>
                        </div>
            );
        },moveNext:function(){
          this.state.val = "";
          $("#virRes button").click();
        },
        saveAndExit: function(){
          this.state.val = "saveAndExit";
            $("#virRes button").click();
          //this.setState({val: "saveAndExit"});

        },
         componentDidMount: function() {
            var bodyWidth=$('body').width();
            $('.contentFooter').css('width',bodyWidth-300);
            $(".leftMain").removeClass("totalLeftScreenMode")
            $(".rightPanel").removeClass("totalRightScreenMode")
         }
    });

    return VNFBasic;

});
