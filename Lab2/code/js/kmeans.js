/**
 * @Created Jan 25, 2018
 * @LastUpdate Jan 31, 2020
 * @author Kahin Akram
 */

function kmeans(data, k) {

    //Crap we need
    var iterations = 0;
    var maxLoops = 5;
    var iterations = 0;
    var qualityChange = 0;
    var oldqualitycheck = 0;
    var qualitycheck = 0;
    var converge = false;

    //Parse the data from strings to floats
    var new_array = parseData(data);

    //Task 4.1 - Select random k centroids
    var centroid = initCentroids(new_array,k);

    //Prepare the array for different cluster indices
    var clusterIndexPerPoint = new Array(new_array.length).fill(0);

    //Task 4.2 - Assign each point to the closest mean.
    clusterIndexPerPoint = assignPointsToMeans(new_array, centroid);

    //Master loop -- Loop until quality is good
    do {
        //Task 4.3 - Compute mean of each cluster
        centroid = computeClusterMeans(new_array, clusterIndexPerPoint, k);
        // assign each point to the closest mean.
        var clusterIndexPerPoint = assignPointsToMeans(new_array, centroid);

        //Task 4.4 - Do a quality check for current result
        qualitycheck = qualityCheck(centroid,new_array,clusterIndexPerPoint);

        //End the loop if...
        if(qualityCheck < 1000) break;
        iterations++;
    }
    //while (converge == false)
    while(iterations < 1000)
    //Return results
    return {
        assignments: clusterIndexPerPoint
    };

}

/**
 * Parse data from strings to floats
 * Loop over data length
      loop over every i in data
        Fill array with parsed values, use parseFloat
 * @param {*} data
 * @return {array}
 */
function parseData(data){
    var array = [];
    for(let i = 0; i<data.length; i++)
    {
        var temp = [];
        element = data[i];
        for(n in element)
        {
            temp.push(parseFloat(element[n]));
        }
        array.push(temp);
    }    
    //console.table(array);
    return array;
}

/**
 * Task 4.1 - Randomly place K points
 * Loop over data and Use floor and random in Math
 * @return {array} centroid
 */

function initCentroids(data, k){
    //Create k centroids

    var centroid = [];
    for(let i = 0; i < k; i++){
        var randomObject = Math.floor(Math.random() * data.length);
		centroid.push(data[randomObject]);
	}
    return centroid;
}

/**
* Taks 4.2 - Assign each item to the cluster that has the closest centroid
* Loop over points and fill array, use findClosestMeanIndex(points[i],means)
* Return an array of closest mean index for each point.
* @param points
* @param means
* @return {Array}
*/
function assignPointsToMeans(points, means){
    var assignments = []; 
    for(let i = 0; i < points.length; i++){
        assignments[i] = findClosestMeanIndex(points[i], means);
    }

    //console.table(assignments)
    
    return assignments;
};
/**
 * Calculate the distance to each mean, then return the index of the closest.
 * Loop over menas and fill distance array, use euclideanDistance(point,means[i])
 * return closest cluster use findIndexOfMinimum,
 * @param point
 * @param means
 * @return {Number}
*/
function findClosestMeanIndex(point, means){
    var distances = [];
    for(let i = 0; i < means.length; i++)
    {
        distances.push(euclideanDistance(point, means[i]));
    }
        
    return findIndexOfMinimum(distances);
};
/**
 * Euclidean distance between two points in arbitrary dimension(column/axis)
 * @param {*} point1
 * @param {*} point2
 * @return {Number}
 */

function euclideanDistance(point1, point2){

    if (point1.length != point2.length)
        throw ("point1 and point2 must be of same dimension");
    else
    {
        var sum = 0;
        for(let i = 0; i < point1.length; i++)
        {
            sum += Math.pow(point1[i]-point2[i], 2);
        }
    }
    
    return Math.sqrt(sum);

};

/**
 * Return the index of the smallest value in the array.
 *  Loop over the array and find index of minimum
 * @param array
 * @return {Number}
 */
function findIndexOfMinimum(array){
    if (array.length === 0) {
        return -1;
    }

    var max = array[0];
    var index = 0;

    for (var i = 1; i < array.length; i++) {
        if (array[i] < max) {
            index = i;
            max = array[i];
        }
    }

    return index;
};

/**
 * //Task 4.3 - Compute mean of each cluster
 * For each cluster loop over assignment and check if assignments equal to cluster index
 * if true fill array
 * then if array is not empty fill newMeans, use averagePosition(array)
 * @param {*} points
 * @param {*} assignments
 * @param {*} k
 * @returns {array}
 */
function computeClusterMeans(points, assignments, k){

    if (points.length != assignments.length)
        throw ("points and assignments arrays must be of same dimension");

    else{
        // for each cluster
        var newMeans = [];
        for(let i = 0; i < k; i++)
        {
            var temp = [];
            //console.log(i);
            for(let j = 0; j < assignments.length; j++){
                if(assignments[j]==i)
                {            
                    temp.push(points[j]);
                }
            }
            if(temp.length > 0)
            {
                newMeans[i] = (averagePosition(temp));
            }
        }
    }
    //console.table(newMeans);
    return newMeans;
};

/**
 * Calculate quality of the results
 * For each centroid loop new_array and check if clusterIndexPerPoint equal clsuter
 * if true loop over centriod and calculate qualitycheck.
 * @param {*} centroid
 * @param {*} new_array
 * @param {*} clusterIndexPerPoint
 */
function qualityCheck(centroid, new_array, clusterIndexPerPoint){

    var qualitycheck;

    for(n in centroid){
        for(let i = 0; i < new_array.length; i++){
            if(clusterIndexPerPoint[j] == n){
                for(var j = 0; j < centroid[0].length; j++){
                    qualitycheck += euclideanDistance(centroid[n], new_array[i])
                }
            }
        }
    }
    return qualitycheck;
}
/**
 * Calculate average of points
 * @param {*} points
 * @return {number}
 */
function averagePosition(points){

    var sums = points[0];
    for (var i = 1; i < points.length; i++){
        var point = points[i];
        for (var j = 0; j < point.length; j++){
            sums[j] += point[j];
        }
    }

    for (var k = 0; k < sums.length; k++)
        sums[k] /= points.length;

    //console.log("sums: " + sums)
    return sums;
};
