var React =require("react");
var $ = require("jquery");
  var LeftMenu = React.createClass({
      render: function() {
         return (
             <div className={"leftMain "+this.props.className}>
                  <div className="leftMainBody">
                          <div className="leftnav list-group">
                              <div id="generate" className="submenuList">
                                <a href="javascript:void(0)" id="generalInfo" onClick={this.changeRightPanel.bind(this,"homePage")} className="list-group-item subactive"><span>Home</span> <i className="fa fa-home" aria-hidden="true"></i></a>

                                  <a href="javascript:void(0)" id="generalInfo" onClick={this.changeRightPanel.bind(this,"generalInfo")} className="list-group-item subactive"><span>General Information</span> <i className="fa fa-user-plus" aria-hidden="true"></i></a>
                                  <a href="javascript:void(0)" id="networkInfo" onClick={this.changeRightPanel.bind(this,"networkInfo")} className="list-group-item"><span>Network Information</span> <i className="fa fa-random" aria-hidden="true"></i></a>

                                <a href="javascript:void(0)" id="vnfInfo" onClick={this.changeRightPanel.bind(this,"vnfInfo")} className="list-group-item"><span>VNF Information</span> <i className="fa fa-info-circle" aria-hidden="true"></i></a>
                                  <a href="javascript:void(0)" id="vmInfo" onClick={this.changeRightPanel.bind(this,"vmInfo")} className="list-group-item"><span>VM Information</span> <i className="fa fa-info-circle" aria-hidden="true"></i></a>
                                    <a href="javascript:void(0)" id="vmManager" onClick={this.changeRightPanel.bind(this,"vmManager")} className="list-group-item"><span>VNF Manager</span> <i className="fa fa-book" aria-hidden="true"></i></a>

                                   <a href="javascript:void(0)" id="verification" onClick={this.changeRightPanel.bind(this,"verification")} className="list-group-item"><span>Verification</span> <i className="fa fa-check-square" aria-hidden="true"></i></a>
                                  <a href="javascript:void(0)" id="additonalInfo" onClick={this.changeRightPanel.bind(this,"additonalInfo")} className="list-group-item"><span>Additional Info</span> <i className="fa fa-archive" aria-hidden="true"></i></a>

                            </div>
                          </div>
                  </div>
                  <div className="leftMainFooter">
                    <a href="#" className="backward" onClick={this.moveBackward.bind(this)}><i className="glyphicon glyphicon-backward"></i> </a>
                      <a href="#" className="forward" onClick={this.moveForward.bind(this)}><i className="glyphicon glyphicon-forward "></i></a>
                  </div>
               </div>
          );
      },
moveBackward:function(){

              var bodyWidth=$('body').width();
              $('.contentFooter').css('width',bodyWidth-95);
              $('.leftMainFooter').css('width','55px');
              $(".backward").hide();
              $('.forward').css('display','inline-block');
              $('.contentMain').css('margin-left','55px');
              $('.contentFooter').css('margin-left','75px');
              $('.leftMainBody').css('width','55px');
              $('.leftnav a span').hide();

  },
  moveForward:function(){

              var bodyWidth=$('body').width();
              $('.contentFooter').css('width',bodyWidth-300);
              $('.leftMainFooter').css('width','260px');
              $(".forward").hide();
              $('.backward').css('display','inline-block');
              $('.contentMain').css('margin-left','260px');
              $('.contentFooter').css('margin-left','280px');
              $('.leftMainBody').css('width','260px');
              $('.leftnav a span').show();

  },
changeRightPanel:function(pageNumber){
  if(pageNumber=="homePage"){
    $(".leftMain").addClass("totalLeftScreenMode")
    $(".rightPanel").addClass("totalRightScreenMode")
  }
          this.props.changeRightPanel(pageNumber)
      },
      changeStatus:function(pageNumber){
        console.log(pageNumber)

        $(".generate").addClass("mainactive")
        $(".package").removeClass("mainactive")

          $(".submenuList a").removeClass("sub-completed").removeClass("sub-progress")
        $(".submenuList a").each( function( index, value ) {
          console.log($(value).attr("id"))

          if($(value).attr("id")!=pageNumber){
            $(value).addClass("sub-completed")
          }else if($(value).attr("id")==pageNumber){
            $(value).addClass("sub-progress");
            return false;

          }

            });
      }


  });
module.exports=LeftMenu;
