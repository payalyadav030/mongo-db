const BookController = {};
const Model = require('./../models/Book.js')

BookController.create = function(request, response){
    var name = request.body.name;
    var author = request.body.author;

    Model.create(name, author, function(error, data){
        if(error){
            return response.status(500).json({
                success : false,
                message: error
            });
        }
        return response.status(200).json(data)
    });
}

BookController.update = function(request, response){
    // Model.update();
}
BookController.get = function(request, response){
   //Model.get();
    // return response.render("book-mvc")
}
BookController.delete = function(request, response){
    // Model.delete();
}

module.exports = BookController;