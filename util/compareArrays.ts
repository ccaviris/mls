class compareArrays {

/**
 * A comparison of two array that prints discrepant values
 * @param firstArray The first array to be comparison
 * @param secondArray The second array for comparison
 * @returns True if the two arrays contain the same values and false otherwise
 */
  public verifyIfEqual(firstArray:string[] = [], secondArray:string[] = []) {
    //One  improvment would be to return a key pair array
    //with a boolean value to denote if they match or do not and a 
    // string with a summary of the discrepent values
    //This string could be used in the error message within the test.
    let arraysMatch = true;
    for(const value of firstArray){
      const index = secondArray.indexOf(value);
      if(index === -1){
        arraysMatch = false;
        console.log(`The vale ${value} was found in the first array but not the second`)
      } else {
        //Remove the found element to save time later
        secondArray.splice(index, 1)
      }
    }
    //If we remove all elements from the first array found in the second array, what is left is values unique to the second array
    //Or valyes that appear more times in the second array than the first (example [1, 2, 3] and [1, 2, 3, 3])
    if(secondArray.length > 0){
      arraysMatch = false;
      console.log(`The second array contains the following values not found in the first array ${secondArray.join(', ')}`)
    }
    return arraysMatch;
  }
} export default new compareArrays();