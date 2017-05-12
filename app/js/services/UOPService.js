var axios = require("axios");
var config = require("./../properties/config.js");

var settingsData={
					"sOrchType": "HP",
					"sPassword": "Welcome@1234",
					"sTargetURL": "http://10.75.14.83:8080",
					"sUsername": "vdsi_onb_vnf_mgr@vdsi"
				};
var ossData={
				"appName": "MyOSS",
				"domainId": "6ea7a82f-1f7c-42d7-abe4-2c6d92d94d30",
				"modeInstanceId": "45698bbf-0419-4be4-acfe-4427c00054f7",
				"modeInstanceUndeployId": "7c10bed4-6aa0-47f2-a54c-00515a410b54",
				"nfvoId": "",
				"orchType": "HP",
				"orgId": "b877eb45-c18d-46eb-8a79-d20c3204d23d",
				"resourceArtifactId": "c4ad5969-f921-3552-8c66-7828a6b5d306",
				"tenantId": "f8ff51d0-3bac-4dbb-998d-d7a155aaf384",
				"vnfGroupId": "43b5dfee-ec46-4101-aaa2-ca412f7ba056"
		};
var deployPackageData={
						"virtualNetworks": ["data-network", "EDN"],
						"vnfDesc": "DNS",
						"vnfName": "DNS-INFO-BLOX",
						"vnfPackageId": "",
						"tenantName": "",
						"vimZoneName": "",
						"vdc": {
								"id": ""
						},
						 "hotPackage": {
								"vapp": {
								  "name": "",
								  "productInfo": {
									"version": "",
									"vendor": ""
								  },
								  "type": "",
								  "flavor": "",
								  "description": "",
								  "configData": [
									{
									  "name": "",
									  "value": ""
									},
									{
									  "name": "",
									  "value": ""
									},
									{
									  "name": "",
									  "value": ""
									},
									{
									  "name": "",
									  "value": ""
									},
									{
									  "name": "",
									  "value": ""
									},
									{
									  "name": "",
									  "value": ""
									},
									{
									  "name": "",
									  "value": ""
								   }
								  ],
							   "configDataEnvFile": [],
								  "configFiles": []
								}
							  }
							};

module.exports={

	deployPackage:function(ossId,packageId,parent){
			var self=this;
			deployPackageData.vnfPackageId=packageId;
				axios({
					method: 'post',
					url: config.uopApi+'/vnfs/instances/',
					  headers: {'Oss-Registration-Id': ossId},
					data:deployPackageData
				}).then(function (response) {
						console.log(response);
						parent.setState({loaderOn: false});
						parent.props.formData.jobId=response.data.jobId;
						parent.props.saveAndSetFormData(self.props.formData);
						self.getJOBStatus(function(response){

						if(response.data.status=="IN_PROGRESS"){
							parent.props.updataConfigurationStatus( "Activating");
						}
						else if(response.data.status=="OK"){
							parent.props.updataConfigurationStatus("ACTIVE")

						}
						else if(response.data.status=="ON_ERROR")
								parent.props.updataConfigurationStatus("ERROR");

						},response.data.jobId,ossId,parent)

					})
					  .catch(function (error) {
						console.log(error);
						parent.setState({loaderOn: false});
					  });
		},getJOBStatus:function(callback,jobId,ossId,parent){
			var self=this;
			var interval=setInterval(function(){
			axios({
					method: 'get',
					url: config.uopApi+'/jobs/'+jobId+"/",
					  headers: {'Oss-Registration-Id': ossId}



					}).then(function (response) {
						callback(response);

					if(response.data.status=="OK"){
							clearInterval(interval)

						}
					})
					  .catch(function (error) {
					  });
		}, 5000);

		},
	getOssId:function(callback,parent){
			var self=this;
			axios({
					method: 'post',
					url: config.uopApi+'/settings/nfvo/',
					data:	settingsData
				}).then(function (response) {
						console.log(response);
						if(response.data.nfvoId)
						self.registerOSSApp(response.data.nfvoId,callback)
					})
					  .catch(function (error) {
						console.log(error);
						parent.setState({loaderOn: false});
					  });
		},registerOSSApp:function(nfvoId,callback,parent){
			var self=this;
			ossData.nfvoId=nfvoId;
				axios({
					method: 'post',
					url: config.uopApi+'/settings/applications/',

					data:ossData




					}).then(function (response) {
						callback(response.data.ossRegistrationId)

					})
					  .catch(function (error) {
						console.log(error);
						parent.setState({loaderOn: false});
					  });
		},
};
