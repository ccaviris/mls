class compareArrays {


  public verifyIfEqual(firstArray, secondArray) {
    console.log('First array : ' + firstArray.sort().join(','));
    console.log('Second array: ' + secondArray.sort().join(','));
    if(firstArray.sort().join(',')=== secondArray.sort().join(',')){
      return true
    }
    else{
      return false
    }
  }
} export default new compareArrays();