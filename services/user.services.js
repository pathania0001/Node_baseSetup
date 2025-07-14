
const {UserRepository} = require('../repositories');
const StatusCode = require('../utils/constants/statuscodes');
const { ApiError } = require('../utils/error');

const userRepository = new UserRepository();

const createUser = async (data) => {  
    try {
         const user = await userRepository.create(data);
         return user;
    } catch (error) {
        //console.log(JSON.stringify(error,null,2));
         if(error.name === "ValidationError" )
         {  
            const messages = Object.keys(error.errors).map((err)=>{
                const error_name = error.errors[err].name;
                const message = error.errors[err].message;
               return {"error_type":error_name,"message":message}
            })
            throw new ApiError(messages,StatusCode.BAD_REQUEST)
        }

        else if( error.name === "TypeError")
            throw new ApiError(error.messages,StatusCode.INTERNAL_SERVER_ERROR)
           
         else if(error.code === 11000)
            throw new ApiError("User Already Exists",StatusCode.CONFLICT)
         
         
          throw new ApiError("Cannot Create new User Obejct",StatusCode.INTERNAL_SERVER_ERROR);
    }
}

const getAllUsers = async () => {
    try{   
        const allUsers = await userRepository.getAll();
        return allUsers;
    } catch (error) {
        throw new ApiError("Error fetching all Users ",StatusCode.INTERNAL_SERVER_ERROR)
    }
}

const getUser = async (id) => {
    try{
        const user = await userRepository.get(id);
        return user;
    }
    catch(error){
         if (error instanceof ApiError){
             throw error;
         }
        throw new ApiError("Error fetching User ",StatusCode.INTERNAL_SERVER_ERROR)
    }
}

const updateUser = async (id, data) => {
  try {
    const user = await userRepository.update(id, data);
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === "CastError") {
      throw new ApiError("User ID is not valid (type mismatch)", StatusCode.BAD_REQUEST);
    }

    throw new ApiError("Error updating user", StatusCode.INTERNAL_SERVER_ERROR);
  }
};

const deleteUser = async(id)=>{
    try{
        const response = await userRepository.delete(id);
        return response;
    }catch(error){
        if (error instanceof ApiError) {
           throw error;
        }

    if (error.name === "CastError") {
      throw new ApiError("User ID is not valid (type mismatch)", StatusCode.BAD_REQUEST);
    }
     
     throw new ApiError("Error updating user",StatusCode.INTERNAL_SERVER_ERROR)

    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}