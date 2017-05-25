
var React = require("react");
var $ = require("jquery");
var axios = require("axios");
var toastr = require("toastr");
var Loader = require("react-loading");
var config = require("./../../properties/config.js");
var Dropzone = require("react-dropzone");
var DataService=require("./../../services/DataService.js")

var Upload = React.createClass({
    getInitialState: function() {
        return {files: [], loaderOn: false,textAreaVal:""};
    },
    parseHeatTempate:function(){
      var self=this;
      var vmInfo={};
           var data={
           "data": [
             {
               "flavor": "vmx.vfp1",
               "image": "vpfe-15.1F5-S1",
               "network": [
                 "9812c641-5b3a-4375-a54d-67685578ade0",
                 "vmx_internal_network",
                 "3fa4a0e0-c807-4892-9915-3eaf419a7f06",
                 "8efceb35-31b9-4e1e-b63a-1f83aee1dc3e"
               ]
             }
           ],
           "vm_count": 1
          };
        data.data.forEach(function(v,i){
             vmInfo["VNFC_"+(i+1)]={
               "generalInfo": {

                   "imagename": v.image,
                   "vmflavorreq": v.flavor,

               }
             }
           });
 self.props.formData.vmInfo=vmInfo;
     self.props.formData.vnfInfo = {
       "generalInfo": {
         "countvms":   data.vm_count
       }
     };
     self.props.formData.isPackageUploaded=true;
   DataService.saveandUpdateData( self.props.formData,function(){});

    },
    onDrop: function(acceptedFiles) {
        this.setState({files: acceptedFiles});

    },
    uploadVNFPakcage:function(){
      this.parseHeatTempate()
          var theform = new FormData();
          var nsd = this.state.files[0];
          var fileName = nsd.name;
          $(".chartContainerH2").show();
          console.log(nsd.name);
          console.log(nsd);
          var self = this;
          var f = fileName.substr(0, fileName.lastIndexOf('.'));
          theform.append('uploadFile', nsd, nsd.name);
          theform.append('checksumValue', this.state.textAreaVal);

          $.ajax({
              url: config.formApi + "/vnfWorkFlow/"+ self.props.id+"/UploadFile",
              data: theform,
              type: 'POST',
              contentType: false,
              processData: false,
              enctype: 'multipart/form-data',
              success: function(data) {
                //  toastr.success("File Upload Succesfully");
              },
              error: function(data) {
                //  toastr.error("error in file uploaded");
              }
          })


      this.props.transition();
    },
    onOpenClick: function() {
        this.dropzone.open();
    },
    saveAndExit: function() {
        this.props.setPageActive("homePage", "next", {}, "upload");
        $(".leftMain").addClass("totalLeftScreenMode");
        $(".contentMain").addClass("totalRightScreenMode");
    },
    loadHeatTemplate: function() {
        var vmInfo = {};
        var self = this;
        axios.get(config.heatTemplateApi).then(function(response) {
            console.log(response);
            response.data.data.forEach(function(v, i) {
                vmInfo["VNFC_" + (i + 1)] = {
                    "generalInfo": {

                        "imagename": v.image,
                        "vmflavorreq": v.flavor
                    }
                }
            })
            self.props.formData.vmInfo = vmInfo;
            self.props.formData.vnfInfo = {
                "vnfBasic": {
                    "countvms": response.data.vm_count
                }
            };
            self.props.formData.isPackageUploaded = true;
            self.props.saveAndSetFormData(self.props.formData);
        }).catch(function(error) {
            console.log(error);
        });

    },
    handleCheckSumChange:function(event){
  this.setState({textAreaVal: event.target.value});
    },
    uploadPackage: function() {
        var self = this;
        var theform = new FormData();
        var vnf = this.state.files[0];
        if (!vnf) {
            return;
        }
        console.log(vnf.name);
        console.log(vnf);
        var self = this;

        theform.append('vnfimage', vnf, vnf.name);
        self.setState({loaderOn: true});

        $.ajax({
            url: '/formPost',
            data: theform,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data) {
                toastr.success("Successfully uploaded");
                self.setState({loaderOn: false});
                self.loadHeatTemplate();
                //self.props.setPageActive("package", "next", {});

            },
            error: function() {
                self.setState({loaderOn: false});

            }
        });
    },
    render: function() {
        return (
            <div>
                <div className={this.state.loaderOn
                    ? "packageUpload loaderPackageUpload "
                    : "packageUpload "}>
                    <div className="row">
                        <div className="col-sm-12">
                          <div className="col-sm-6 left">
                             <h1 >
                                    VNF Package Structure</h1>
                                    <div>
                                   <p> This describes the defined package structue for VNF to be onboarded to the resource orchestrator.</p>
                                    <p>All packages require a descriptor(*.yaml) file and a checksums.txt, which verifies the integrity of the package contetns.</p>
                                    <p>Pakcages much be in Tar Format and gzipped.</p>
                                    </div>
                                      <h1 >
                                    VNFD Archive Structure</h1>
                                    <div>
                                   <ul className="treeLevel">
                                <li>
                                    <span className="vLine"></span>
                                  {/*  <span className="closeFolder"></span>*/}
                                    <i className="fa fa-file-text fa-lg padFile"></i>
                                    <span>Checksums.txt</span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                    {/*<span className="closeFolder"></span>*/}
                                    <i className="fa fa-file-text fa-lg padFile"></i>
                                    <span>vnfd</span>
                                </li>


                                <li>
                                    <span className="vLine"></span>
                                      {/*  <span className="openFolder"></span>*/}
                                      <i className="fa fa-folder-open fa-lg padd"></i>
                                    <span>scripts</span>
                                    <span className="scriptFile">
                                    <span className="nameFile"><i className="fa fa-file-code-o"></i>&lt;script_file&gt;
                                    </span>
                                    </span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                  {/*  <span className="openFolder"></span>*/}
                                    <i className="fa fa-folder-open fa-lg padd"></i>
                                    <span>icons</span>
                                    <span className="pngFile"><span className="nameFile"><i className="fa fa-file-image-o"></i>&lt;logo_name&gt;.png</span></span>
                                </li>

                                <li>
                                    <span className="vLine"></span>
                                    {/*  <span className="openFolder"></span>*/}
                                      <i className="fa fa-folder-open fa-lg padd"></i>
                                    <span>images</span>
                                    <span className="imgFile"><span className="nameFile"><i className="fa fa-file-o"></i>&lt;image_1&gt;.qcow2
                                    </span>
                                    </span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                        <i className="fa fa-folder-open fa-lg padd"></i>
                                    <span>libs</span>

                                </li>
                                <li>
                                    <span className="vLine"></span>
                                    <i className="fa fa-file-text fa-lg padFile"></i>

                                    <span>config-artifacts</span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                          <i className="fa fa-file-text fa-lg padFile"></i>
                                    <span>api</span>
                                </li>
        </ul>
                                    </div>
                            </div>
                            <div className="col-sm-6 right">
                                <h1>
                                    Upload VNF Package</h1>

                                <div className="uploadfile">
                                    <Dropzone ref={(node) => {
                                        this.dropzone = node;
                                    }} onDrop={this.onDrop} style={{}}>
                                        <div className="upload"><i className="fa fa-upload fa-5x uploadIcon"></i><br/><span className="drag">Drag files to upload</span></div>
                                    </Dropzone>
                                    {this.state.files.length > 0
                                        ? <div>
                                                <div>{this.state.files.map((file) => <h3>{file.name}</h3>)}</div>
                                            </div>
                                        : null}
                                        <h3>Checksum (SHA1)</h3>
                                        <textarea className="form-control checksumtxt" onChange={this.handleCheckSumChange}></textarea>
                                        <br/>
                                        <button disabled={(this.state.textAreaVal && this.state.files.length > 0 )? false : true } className="btn btn-danger btn-sm "  onClick={this.uploadVNFPakcage}>Validate Package</button>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className={this.state.loaderOn
                    ? "showLoader"
                    : "hideLoader"}>
                    <Loader type='spinningBubbles' color='#A80309'></Loader>
                </div>
            </div>

        );
    }

});

module.exports = Upload;
