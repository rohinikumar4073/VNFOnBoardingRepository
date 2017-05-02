define([
    'react', 'jquery', 'toastr', 'config','react-loading','d3'
], function(React, $, toastr, config, Loader,d3) {

    var WorkFlow = React.createClass({

        componentDidMount: function() {
          debugger;

        
          },
        loadData:function(data){
          $(".chartContainer").empty()

          this.snakeChart(data, document.querySelector(".chartContainer"));

        },
       snakeChart:function(data, chartContainer){

        var boxWidthPercent = 10; // in percentage
        var boxHeightPercent = 10; // in percentage
        var xMargin = 20;
        var yMArgin = 40;
        var arrowWidth  = 8;
        var arrowHeight = 8;
        var linkSpace = 30;
        var rowMArgin = 50;
        var rowNum = 0; /* to keep track whether we are on odd or even row while plotting g*/
        var containerWidth = chartContainer.clientWidth;
        var boxWidth = Math.round((boxWidthPercent * containerWidth)/100);
        var boxHeight = Math.round((boxHeightPercent * containerWidth)/100);
        var boxGroupWidth = boxWidth+linkSpace+arrowWidth;
        var boxGroupFitNo = Math.floor(containerWidth/boxGroupWidth);

        var rowHeight = boxHeight + rowMArgin;
        var totalRows = Math.round((data.length / boxGroupFitNo)+0.5);

        var  svgWidth = containerWidth-xMargin;
        var  svgHeight = totalRows * rowHeight + yMArgin;

             svgHeight = svgHeight - rowMArgin;

        chartContainer.style.height=svgHeight+"px";

        var svg = d3.select(chartContainer).append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
                .style("display","block")
                .style("margin","auto");


            var currentX = 0;
            var currentY = 0;
            var currentDirection;
            var bar = svg.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) {
                    var num = i % boxGroupFitNo;
                    var baseWidth = linkSpace + boxWidth + xMargin - arrowWidth;
                    if(num == 0) {
                        // change direction
                         currentY += rowNum == 0 ? yMArgin :  rowHeight;
                        rowNum++;
                    }
                    else if(rowNum % 2 == 0){
                        // go left
                        currentX -= baseWidth;
                    }else{
                        // go right
                        currentX += baseWidth;
                    }
                return "translate("+currentX+"," + currentY + ")";
            })
            /* Storing the index of box, will be using this in stepped arrow paths. */
            .attr("data-index", function(d,i){
                return i+1;
            });

        bar.append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("width",boxWidth)
            .attr("height",boxHeight)
            .attr("fill","none")
            .attr("stroke","none");

            bar.append("foreignObject")
            .attr({
                "x" : 0,
                "y" : 0,
                "width" : boxWidth+"px",
                "height" : boxHeight+"px"
            })
            .append("xhtml:body")
            .html(
                '<div class="displayData">'+
                    '<div class="panel panel-primary">'+
                        '<div class="panel-heading">Panel Heading</div>'+
                        '<div class="panel-body"></div>'+
                        '<div class="panel-footer">Panel footer</div>'+
                    '</div>'+
                '</div>'
                );

           for (var i=0;i<data.length; i++){
               var textElements1 = document.querySelectorAll(".displayData .panel-body");
               var textElements2 = document.querySelectorAll(".displayData .panel-heading");

               textElements1[i].textContent = data[i].content;
               textElements2[i].textContent = data[i].content;

            }
            d3.selectAll(".displayData")
                .style({
                    "height" : boxHeight+"px",
                    "width" : boxWidth+"px"
                });

        defs = svg.append("defs");
        defs.append("marker")
            .attr({
                "id":"markerArrow",
                "refX":"0",
                "refY":"4",
                "markerWidth":arrowWidth,
                "markerHeight":arrowHeight,
                "orient":"auto"
            })
            .append("path")
            .attr("d", "M0,4 L8,4 L4,1 L8,4 L4,7")
            .style("fill","none")
            .style("stroke","black")
            .style("stroke-width",1);

        var lineFunction = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("linear");

        var lineGraph = bar.append("path")
            .attr("d",function(d, i){
                var num = (i+1) % boxGroupFitNo;
                var localRowNum = Math.floor(i / boxGroupFitNo);
                var sourceX = 0;
                var sourceY = 0;
                var targetX;
                var targetY;
                if(num == 0){
                    // point down
                    sourceX = boxWidth/2;
                    sourceY = boxHeight ;
                    targetX = sourceX;
                    targetY = sourceY +  rowMArgin - linkSpace;

                }else if(localRowNum % 2 == 0){
                    // point right
                    sourceX = boxWidth;
                    sourceY = boxHeight/2;
                    targetX = sourceX+(linkSpace-arrowWidth);
                    targetY = boxHeight/2;

                }else{
                    // point left
                    sourceX = 0
                    sourceY = boxHeight/2;
                    targetX = sourceX - (linkSpace - arrowWidth);
                    targetY = sourceY;
                }
                return lineFunction([
                    // source coordinates
                    {"x" : sourceX, "y" : sourceY},
                    // target coordinates
                    {"x" : targetX, "y" : targetY}]);

            })
            .attr({
                "stroke" : "black",
                "fill" : "none",
                "stroke-width" : 2,
                "marker-end" : "url(#markerArrow)",
                "class" : "arrowLine"
            })
            .attr("", function(d,i){
                // remove last arrow
                if (i == data.length-1 )
                    this.remove();
            });

        },
        render: function() {
            return (
              <div className="chartContainer">


              </div>


            );
        }

    });

    return WorkFlow;
});
