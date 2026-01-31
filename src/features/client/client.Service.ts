export const clientService ={
    
    async getClient(){

        const token =   localStorage.getItem('token')
        
        console.log(token);

        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions = {
            method: "GET",
            headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

        const res = await fetch("http://localhost:8000/crm/getclient", requestOptions)

        if(!res){
                throw new Error(" Problemas obtener Client");
        }
        const result    =   await res.json();
        console.log(result);
        return result
    },
     
    async getRecords(idRecord :string){
        const token =   localStorage.getItem('token')
        if(!token){
            throw new Error("No auth token")
        }

        const requestOptions ={
            method: 'GET',
            headers:{
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                    } 
            }
        const res = await fetch(`http://localhost:8000/crm/getRecord?idRecord=${idRecord}`,requestOptions)
        if(!res.ok){
                throw new Error(" Problemas obtener Client");
        }
        const result =  await res.json();
        return result.Data
    }
} 
//data:   {'idRecord': idRecord}