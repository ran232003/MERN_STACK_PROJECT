class myValidation{
     value;
     maxSize;
     minSize;
     isEmpty;
     constructor(val){this.value = val};
     setMaxSize(val){
         this.maxSize = val
     }
     setMinSize(val){
        this.maxSize = val
    };
    isEmpty(val){
       return this.val.trim().length === 0;
    }
    check(){
        if(!this.value){
            return false;
        }
        if(this.value.length >= this.maxSize){
            return false;
        }
        if(this.value <= this.minSize){
            return false
        }
        return true;
    }


}
module.exports = myValidation;