const { Logger }=require('../config');

class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        const response=await this.model.create(data);
        return response;
    }
    async destroy(data){
        try{
            const response=await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        } catch(error){
            Logger.error(`Something is wrong in CRUD repo: destroy`);
            throw error;
        }
    }
    async get(data){
        try{
            const response=await this.model.findByPK(data);
            return response;
        } catch(error){
            Logger.error(`Something is wrong in CRUD repo: get`);
            throw error;
        }
    }
    async getAll(){
        try{
            const response=await this.model.finAll();
            return response;
        } catch(error){
            Logger.error(`Something is wrong in CRUD repo: getAll`);
            throw error;
        }
    }
    async update(id,data){
        try{
            const response=await this.model.update(data, {
                where: {
                    id
                }
            });
            return response;
        } catch(error){
            Logger.error(`Something is wrong in CRUD repo: update`);
            throw error;
        }
    }

}


module.exports=CrudRepository;