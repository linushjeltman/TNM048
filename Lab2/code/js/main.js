/**
 * @Created Jan 25, 2018
 * @LastUpdate Jan 31, 2020
 * @author Kahin Akram
 */

queue()
  .defer(d3.csv,'data/Data1-2clusters.csv')
  .defer(d3.csv,'data/Data2-2clusters.csv')
  .defer(d3.csv,'data/Data3-Xclusters.csv')
  .defer(d3.csv,'data/co2_emission.csv')
  .await(draw);

var pc;

function draw(error, data1, data2, data3, data4){
  if (error) throw error;

  //Test different data at the end!
  pc = new pc(data4);

}
