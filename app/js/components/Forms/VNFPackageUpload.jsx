
var React = require("react");
var $ = require("jquery");
var axios = require("axios");
var toastr = require("toastr");
var Loader = require("react-loading");
var config = require("./../../properties/config.js");
var Dropzone = require("react-dropzone");

var Upload = React.createClass({
    getInitialState: function() {
        return {files: [], loaderOn: false};
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
             vmInfo["VM_"+(i+1)]={
               "generalInfo": {

                   "imagename": v.image,
                   "vmflavorreq": v.flavor,

               }
             }
           });
 self.props.formData.vmInfo=vmInfo;
     self.props.formData.vnfInfo = {
       "vnfBasic": {
         "countvms":   data.vm_count
       }
     };  self.props.formData.isPackageUploaded=true;
   self.props.saveAndSetFormData(self.props.formData);
    },
    onDrop: function(acceptedFiles) {
        this.setState({files: acceptedFiles});
        this.parseHeatTempate()
            var theform = new FormData();
            var nsd = acceptedFiles[0];
            var fileName = nsd.name;
$(".chartContainerH2").show();
            console.log(nsd.name);
            console.log(nsd);
            var self = this;
            var f = fileName.substr(0, fileName.lastIndexOf('.'));
            theform.append('uploadFile', nsd, nsd.name);
            $.ajax({
                url: config.formApi + "/vnf/"+ self.props.id+"/UploadFile",
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
                vmInfo["VM_" + (i + 1)] = {
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
                                    <i className="fa fa-folder fa-lg padd"></i>
                                    <span>Checksums.txt</span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                    {/*<span className="closeFolder"></span>*/}
                                    <i className="fa fa-folder fa-lg padd"></i>
                                    <span>&lt;vnfd_id&gt;_vnfd</span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                  {/*<span className="closeFolder"></span>*/}
                                    <i className="fa fa-folder fa-lg padd"></i>
                                    <span>README</span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                  {/*  <span className="openFolder"></span>*/}
                                    <i className="fa fa-folder-open fa-lg padd"></i>
                                    <span>Icons</span>
                                    <span className="pngFile"><span className="nameFile"><i className="fa fa-file-image-o"></i>&lt;logo_name&gt;.png</span></span>
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
                                    <span>cloud_init</span>
                                    <span className="cloudFile"><span className="nameFile"><i className="fa fa-cloud"></i>&lt;cloud_init_file&gt;
                                    </span>
                                    </span>
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
                                      {/*  <span className="openFolder"></span>*/}
                                        <i className="fa fa-folder-open fa-lg padd"></i>
                                    <span>tests</span>
                                    <span className="txtFile"><span className="nameFile"><i className="fa fa-file-text"></i>&lt;test_file&gt;
                                    </span>
                                    </span>
                                </li>
                                <li>
                                    <span className="vLine"></span>
                                      {/*  <span className="openFolder"></span>*/}
                                        <i className="fa fa-folder-open fa-lg padd"></i>
                                    <span>doc</span>
                                    <span className="docFile"><span className="nameFile"><i className="fa fa-file-word-o"></i>&lt;doc_file&gt;
                                    </span>
                                    </span>
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
                                        <div className="upload">Try dropping some files here, or click to select files to upload.</div>
                                    </Dropzone>
                                    {this.state.files.length > 0
                                        ? <div>
                                                <h2>Uploading {this.state.files.length}
                                                    files...</h2>
                                                <div>{this.state.files.map((file) => <h3>{file.name}</h3>)}</div>
                                            </div>
                                        : null}

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
