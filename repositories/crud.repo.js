
const { ApiError } = require('../utils/error')
const StatusCode = require('../utils/constants/statuscodes');

  class CrudRepositories {
    constructor(model){
        this.model = model;
    }

    async create(data){
             
      const response = await this.model.create(data);
             if(!response)
             throw new ApiError(`Failed to create ${this.model.modalname}`,StatusCode.INTERNAL_SERVER_ERROR);
             return response;
    }
    
    async getAll(){
      const response = await this.model.find();
       return response;
    }

    async get(id){

      const response = await this.model.findById(id);

      if(!response)
        throw new ApiError(`${this.model.modalname} not Found`,StatusCode.NOT_FOUND);
      return response;
    }

    async update(id,data){

      await this.get(id);

      const response = await this.model.findByIdAndUpdate( id , data,{
        new:true,
        runValidators:true,
      })

      if(!response){
        throw new ApiError(`Failed to update ${this.model.modelname}`,StatusCode.INTERNAL_SERVER_ERROR);
      }

      return response;
    }

    async delete(id){

      await this.get(id);
      
      const response = await this.model.findByIdAndDelete(id);
      
      if(!response)
        throw new ApiError(`Failed to delete ${this.model.modelname}`,StatusCode.INTERNAL_SERVER_ERROR);

      return response;
    }
  }

  module.exports = CrudRepositories;