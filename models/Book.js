const Book = {};

Book.create = function(bookName, authorName, callback){
   
    //return "hello " +name;
    if(!bookName){
        return callback({
            status : false,
             message: "book name is required"
        });
    }
    if(!authorName){
        return callback({
            status:false,
            message: "author name required"
        });
    }
    console.log("adding book with following details:", bookName, authorName)
    setTimeout(function(){
        return callback(null, {
            status: true,
            message: "book has been successfully stored"
        });
    }, 500)
   

}

Book.update = function(){

}

Book.get = function(){
    
    
}

Book.delete = function(){

}

module.exports = Book;