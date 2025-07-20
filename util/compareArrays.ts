class compareArrays {


  public verifyIfEqual(firstArray, secondArray) {
    if(firstArray.sort().join(',')=== secondArray.sort().join(',')){
      return true
    }
    else{
      return false
    }
  }
} export default new compareArrays();