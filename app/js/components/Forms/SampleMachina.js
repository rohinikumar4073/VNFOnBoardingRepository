var machina=require("machina");
var axios=require("axios");
        var vnfWorkflow = new machina.Fsm({
            initialize: function() {
            },
            namespace: "vnf-workflow",
            initialState: "uninitialized",
            states: {
                uninitialized: {
                    "*": function() {
                     this.deferUntilTransition();
                     this.transition("pause");
                    }
                },
                pause: {
                    _onEnter: function() {
                    },
                    _onExit: function() {}
                },
                upload: {
                    _onEnter: function() {
                        var uploadUrl = "http://10.76.110.81:40512/vnf/123/initialize";
                        var self = this;
                        axios.put(uploadUrl,{}).then(function(response) {
                            console.log(response);

                        }).catch(function(error) {
                            console.log(error);
                        });
                    },
                    _onExit: function() {}
                },
                reset: function() {
                    this.handle("_reset");
                }
            }
        });
module.exports=vnfWorkflow;
