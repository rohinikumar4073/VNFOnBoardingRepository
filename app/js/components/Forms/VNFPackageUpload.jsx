var React = require("react");
var $ = require("jquery");
var  axios= require("axios");
var toastr = require("toastr");
var Loader = require("react-loading");
var config = require("./../../properties/config.js");



    var Upload = React.createClass({
        getInitialState: function() {
            return {files: [],loaderOn: false};
        },

        onDrop: function(acceptedFiles) {
            this.setState({files: acceptedFiles});
        },

        onOpenClick: function() {
            this.dropzone.open();
        },
        saveAndExit: function(){
          this.props.setPageActive("homePage", "next", {},"upload");
          $(".leftMain").addClass("totalLeftScreenMode");
          $(".contentMain").addClass("totalRightScreenMode");
        },
        loadHeatTemplate:function(){
          var vmInfo= {

    };
    var self=this;
        axios.get(config.heatTemplateApi)
  .then(function (response) {
    console.log(response);
    response.data.data.forEach(function(v,i){
      vmInfo["VM_"+(i+1)]={
        "generalInfo": {

            "imagename": v.image,
            "vmflavorreq": v.flavor,

        }
      }
    })
    self.props.formData.vmInfo=vmInfo;
      self.props.formData.vnfInfo = {
        "vnfBasic": {
          "countvms":   response.data.vm_count
        }
      };
      self.props.formData.isPackageUploaded=true;
    self.props.saveAndSetFormData(self.props.formData);
  })
  .catch(function (error) {
    console.log(error);
  });

},
  uploadPackage: function() {
          var self=this;
            var theform = new FormData();
            var vnf = this.state.files[0];
            if(!vnf){
              return;
            }
            console.log(vnf.name);
            console.log(vnf);
            var self=this;

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
                error:function(){
                  self.setState({loaderOn: false});

                }
            });
        },
        render: function() {
            return (
              <div>
                <div className={this.state.loaderOn
                    ? "packageUpload loaderPackageUpload"
                    : "packageUpload"}>
                    <div className="row">
                        <div className="col-sm-12">
                            <h1>Package Upload</h1>
                            <div className="uploadfile">
                                <Dropzone ref={(node) => {
                                    this.dropzone = node;
                                }} onDrop={this.onDrop}>
                                    <div>Try dropping some files here, or click to select files to upload.</div>
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
                    <a href="#" className="btn  btn-default btn-sm previousBtn" onClick={this.uploadPackage}>Upload</a>
                      <div className="contentFooter">
                         <a href="#" className="btn btn-danger btn-sm nextBtn" onClick={this.saveAndExit}>Save & Exit</a>
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
