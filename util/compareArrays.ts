class compareArrays {

/**
 * A quick and basic comparison of two array
 * @param firstArray The first array to be comparison
 * @param secondArray THe second array for comparison
 * @returns True if the two arrays contain the same values and false otherwise
 */
  public verifyIfEqual(firstArray:string[] = [], secondArray:string[] = []) {
    //This is functional a bit simple and crude, sorting and joining each array and comparing them as string
    //One improvement would be to compare all of the elements of the two arrays and print out all of the values
    //of the first array not present in the second and vice versa. Annother improvment would be to return a key pair array
    //with a boolean value to denote if they match or do not and a string with a summary of the discrepent values
    //This string could be used in the error message within the test.
    if(firstArray.sort().join(',')=== secondArray.sort().join(',')){
      return true
    }
    else{
      return false
    }
  }
} export default new compareArrays();